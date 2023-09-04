import { SelectedTask, TasksContext, TasksDispatchContext, TasksProvider, useIdCounter, useIsEditing, useSelectedTaskIndex } from '@/context/TasksContext'
import styles from './menu.module.css'
import { useContext, useRef, useState } from 'react'
import { FormContext, useDescription, useIsVisible, useMode, usePriority, useTitle } from '../../context/FormContext';
import Head from 'next/head';
import { ListDispatchContext, useCurrentListIndex, useLists } from '@/context/ListsContext';
import useSound from 'use-sound';
import listSelectSound from '/public/sound/taskSelect.mp3';

export default function Menu(props) {
    const { isVisible, setIsVisible } = useIsVisible();
    const tasks = useContext(TasksContext)["tasks"];
    const { title, setTitle } = useTitle();
    const { description, setDescription } = useDescription();
    const { priority, setPriority } = usePriority();
    const { mode, setMode } = useMode();
    const { lists, setLists } = useLists();
    const { currentListIndex, setCurrentListIndex } = useCurrentListIndex();
    const { selectedTaskIndex, setSelectedTaskIndex } = useSelectedTaskIndex();
    const dispatch = useContext(TasksDispatchContext);
    const listDispatch = useContext(ListDispatchContext);
    const { idCounter, setIdCounter } = useIdCounter();
    const { isEditing, setIsEditing } = useIsEditing();
    const [ name, setName ] = useState("");
    let textInput;
    const [ listSelect ] = useSound(listSelectSound);
    if(props.menuType === "task") {

        return (
                <div className={styles.taskMenu} data-status={props.dataStatus}>
                    <button onClick={ () => {
                        setTitle('');
                        setDescription('');
                        setPriority(0);
                        setSelectedTaskIndex(null);
                        setIsVisible(!isVisible);
                        setMode('adding');
                        listSelect();
                    }
                    }
                    className={styles.button1}
                    >
                        <i className="fa-solid fa-plus"></i>
                    </button>
                    <button onClick={ () => {
                        listSelect();
                        if(selectedTaskIndex != null) {
                            setTitle(tasks[selectedTaskIndex].name);
                            setDescription(tasks[selectedTaskIndex].description);
                            setPriority(tasks[selectedTaskIndex].priority);
                            setIsVisible(!isVisible);
                            setMode('editing');
                        }
                    }}
                    className={styles.button2}
                    >
                        <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button onClick={ () => {
                        listSelect();
                        dispatch({
                        type:'deleted',
                        lists,
                        currentListIndex,
                        id: selectedTaskIndex,
                        });
                        setSelectedTaskIndex(null);
                    }
                    }
                    className={styles.button3}
                    >
                    <i className="fa-solid fa-trash-can"></i>
                    </button>
                </div>
        )
    } else if (props.menuType === "list") {

        const handleListSelect = (listId) => {
            setSelectedTaskIndex(null);
            setIsEditing(false, null);
            listSelect();
            for(let i = 0; i < lists.length; i++){
                if(lists[i].id == listId) {
                    setCurrentListIndex(i);
                    dispatch({
                        type: 'listChanged',
                        lists,
                        i
                    })
                }
            }
        };

        const handleListEdit = (index) => {
            setIsEditing([!isEditing[0], index]);
            setName("");
        };
        
        const handleEnter = (e, index) => {
            if(e.keyCode == 13) {
                if(name != ""){
                    lists[index].name = name;
                    setIsEditing([!isEditing[0], index]);
                }
            }
        };

        return (
            <div className={styles.listMenu}>
                <h1 data-status={props.dataStatus} className={styles.title}>TO-DO<span className={styles.subtitle}>LISTER</span></h1>
                <div className={styles.lists}>
                    {lists.map(
                        (list) => (
                            isEditing[0] && lists[isEditing[1]].id == list.id ?
                            <input
                                type='text'
                                key={list.id}
                                value={ isEditing[0] ? name : list.name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyUp={(e) => handleEnter(e, currentListIndex)}
                                ref={(ti) => textInput = ti}
                                placeholder="Type new title..."
                            autoFocus={true} /> 
                            :
                            <h2
                                key={list.id} 
                                onClick={ () => handleListSelect(list.id) }
                                data-selected={ lists[currentListIndex].id == list.id }
                            >
                                {list.name}
                            </h2>
                        )
                    )}
                </div>
                <div className={styles.listButtons}>
                    <h2
                        onClick={ () => {
                            listSelect();
                            setIsEditing(false, null);
                            setIdCounter(idCounter + 1);
                            listDispatch({
                                type: 'added',
                                id: idCounter,
                            });
                        } }
                    >
                        Add list
                    </h2>

                    <h2
                        onClick={ () => {
                            listSelect();
                            handleListEdit(currentListIndex) 
                        }   
                        } 
                    >
                        Rename list
                    </h2>

                    <h2
                        onClick={ () => {
                            listSelect();
                            if(lists.length > 1){
                                setIsEditing([false, null]);
                                listDispatch({
                                    type: 'deleted',
                                    id: currentListIndex,
                                });
                                if(currentListIndex == lists.length - 1){
                                    setCurrentListIndex(currentListIndex - 1);
                                    dispatch({
                                        type: 'listChanged',
                                        lists,
                                        i: currentListIndex - 1
                                    })
                                } else {
                                    dispatch({
                                        type: 'listChanged',
                                        lists,
                                        i: currentListIndex + 1
                                    })
                                }
                            }
                        } }
                    >
                        Delete list
                    </h2>
                </div>
            </div>
        )
    }
}