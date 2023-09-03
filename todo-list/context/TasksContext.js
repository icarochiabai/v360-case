import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";
import { useCurrentListIndex, useLists } from "./ListsContext";
export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
    const { lists, setLists } = useLists();
    const { currentListIndex, setCurrentListIndex } = useCurrentListIndex();
    const initialTasks = lists[currentListIndex].tasks;
    const [ tasks, dispatch] = useReducer(
        tasksReducer,
        initialTasks
    );
    const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
    const [idCounter, setIdCounter] = useState(0);
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
        action.lists[action.currentListIndex].tasks = [...(action.lists[action.currentListIndex].tasks), 
            {
                id: action.id,
                name: action.name,
                description: action.description,
                priority: action.priority,
            }];
      return action.lists[action.currentListIndex].tasks;
    }
    case 'changed': {
        action.lists[action.currentListIndex].tasks[action.selectedTaskIndex].name = action.name;
        action.lists[action.currentListIndex].tasks[action.selectedTaskIndex].description = action.description;
        action.lists[action.currentListIndex].tasks[action.selectedTaskIndex].priority = action.priority;
    }
    case 'deleted': {
        if(action.id != null){
            action.lists[action.currentListIndex].tasks = action.lists[action.currentListIndex].tasks.filter(
                t => t.id != action.lists[action.currentListIndex].tasks[action.id].id
            );
            return action.lists[action.currentListIndex].tasks;
        } else {
            return action.lists[action.currentListIndex].tasks;
        }
    }
    case 'sorted': {
        tasks.sort( (a, b) => {
            return b.priority - a.priority;
        }) 
        return tasks;
    }
    case 'listChanged': {
        return action.lists[action.i].tasks;
    }
    case 'checked': {
        action.lists[action.currentListIndex].tasks[action.i].isChecked = !action.lists[action.currentListIndex].tasks[action.i].isChecked;
        return action.lists[action.currentListIndex].tasks;
    }
  }
}
