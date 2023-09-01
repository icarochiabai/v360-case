import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";
export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
    const [ tasks, dispatch] = useReducer(
        tasksReducer,
        initialTasks
    );
    const [selectedTask, setSelectedTask] = useState(null);
    const [idCounter, setIdCounter] = useState(tasks.length);
    const [isEditing, setIsEditing] = useState(false);


    return (
        <TasksContext.Provider value={{
            tasks,
            useSelectedTask: {selectedTask, setSelectedTask},
            useIdCounter: { idCounter, setIdCounter},
            useIsEditing: { isEditing, setIsEditing},
            }}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
}

export function useSelectedTask() {
    const context = useContext(TasksContext)["useSelectedTask"];
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
        action.tasks[action.selectedTask].name = action.name;
        action.tasks[action.selectedTask].description = action.description;
        action.tasks[action.selectedTask].priority = action.priority;
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