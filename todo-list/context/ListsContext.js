import { createContext, useContext, useReducer, useState } from "react";

export const ListContext = createContext(null);
export const ListDispatchContext = createContext(null);

export function ListProvider({children}) {
    const initialLists = [
        {id: 0, name:"New List", isEditing:false, tasks:[
        ]}
    ]

    const [ list, setLists ] = useState();
    const [ currentListIndex, setCurrentListIndex ] = useState(0); 
    const [ lists, dispatch ] = useReducer(
        listReducer,
        initialLists
    );
    const [ idCounter, setIdCounter ] = useState(lists.length);
    const [ isEditing, setIsEditing ] = useState([false, null]);

    return (
        <ListContext.Provider value = {{
            useIsEditing: {isEditing, setIsEditing},
            useLists: {lists, setLists},
            useCurrentListIndex: {currentListIndex, setCurrentListIndex},
            useIdCounter: {idCounter, setIdCounter},
        }}>
            <ListDispatchContext.Provider value = {
                dispatch
            }>
                {children}
            </ListDispatchContext.Provider>
        </ListContext.Provider>
    );
}

export function useCurrentListIndex() {
    const context = useContext(ListContext)["useCurrentListIndex"];
    if(context) {
        return context;
    }
}

export function useLists() {
    const context = useContext(ListContext)["useLists"];
    if(context) {
        return context;
    }
}

export function useIdCounter() {
    const context = useContext(ListContext)["useIdCounter"];
    if(context) {
        return context;
    }
}

export function useIsEditing() {
    const context = useContext(ListContext)["useIsEditing"];
    if(context){
        return context;
    }
}

function listReducer(lists, action) {
    switch (action.type) {
    case 'added': {
        return [...lists, {
            id: action.id+1,
            name: "New list " + lists.length,
            tasks: []
        }
        ];
    }
    case 'changed': {
    }
    case 'deleted': {
        if(action.id != null){
            return lists.filter(l => l.id != lists[action.id].id);
        } else {
            return lists;
        }
    }
    case 'listEditing': {
        action.lists[action.i].isEditing = true; 
        return action.lists;
    }
  }
}