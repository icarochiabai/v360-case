import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";
export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
    const [ tasks, dispatch] = useReducer(
        tasksReducer,
        initialTasks
    );
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
    const [idCounter, setIdCounter] = useState(tasks.length);
    const [isEditing, setIsEditing] = useState(false);


    return (
        <TasksContext.Provider value={{
            tasks,
            useSelectedTaskIndex: {selectedTaskIndex, setSelectedTaskIndex},
            useIdCounter: { idCounter, setIdCounter},
            useIsEditing: { isEditing, setIsEditing},
            }}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
}

export function useSelectedTaskIndex() {
    const context = useContext(TasksContext)["useSelectedTaskIndex"];
    if(context) {
        return context;
    }
}

export function useIdCounter() {
    const context = useContext(TasksContext)["useIdCounter"];
    if(context) {
        return context;
    }
}

export function useIsEditing() {
    const context = useContext(TasksContext)["useIsEditing"];
    if(context){
        return context;
    }
}

function tasksReducer(tasks, action) {
    switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        name: action.name,
        description: action.description,
        priority: action.priority,
        isChecked: 0,
      }];
    }
    case 'changed': {
        action.tasks[action.selectedTaskIndex].name = action.name;
        action.tasks[action.selectedTaskIndex].description = action.description;
        action.tasks[action.selectedTaskIndex].priority = action.priority;
    }
    case 'deleted': {
        if(action.id != null){
            return tasks.filter(t => t.id !== tasks[action.id].id);
        } else {
            return tasks
        }
    }
    case 'sorted': {
        tasks.sort( (a, b) => {
            return b.priority - a.priority;
        }) 
        return tasks;
    }
  }
}

const initialTasks = [
  { id:0, name: 'teste', description: 'quick description.', priority: 0, isChecked: false },
  { id:1, name: 'teste2', description: 'quick description.', priority: 0, isChecked: false }
]