import { SelectedTask, TasksContext, TasksDispatchContext, TasksProvider, useIdCounter, useIsEditing, useSelectedTaskIndex } from '@/context/TasksContext'
import styles from './menu.module.css'
import { useContext } from 'react'
import { FormContext, useDescription, useIsVisible, useMode, usePriority, useTitle } from '../../context/FormContext';
import Head from 'next/head';

export default function Menu(props) {
    if(props.menuType === "task") {
        const dispatch = useContext(TasksDispatchContext);
        const { isVisible, setIsVisible } = useIsVisible();
        const { selectedTaskIndex, setSelectedTaskIndex } = useSelectedTaskIndex();
        const tasks = useContext(TasksContext)["tasks"];
        const { title, setTitle } = useTitle();
        const { description, setDescription } = useDescription();
        const { priority, setPriority } = usePriority();
        const { mode, setMode } = useMode();

        return (
                <div className={styles.taskMenu}>
                    <button onClick={ () => {
                        setTitle('');
                        setDescription('');
                        setPriority(0);
                        setSelectedTaskIndex(null);
                        setIsVisible(!isVisible);
                        setMode('adding');
                    }
                    }
                    className={styles.button1}
                    >
                        <i className="fa-solid fa-plus"></i>
                    </button>
                    <button onClick={ () => {
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
                        dispatch({
                        type:'deleted',
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
        return (
            <div className={styles.listMenu}>
                <div className={styles.lists}>
                    <h1>Listas</h1>
                    <h2>Lista 1</h2>
                    <h2>Lista 2</h2>
                    <h2>Lista 3</h2>
                    <h2>Lista 4</h2>
                    <h2>Lista 5</h2>
                </div>
                <div className={styles.listButtons}>
                    <h2>Add list</h2>
                    <h2>Rename list</h2>
                    <h2>Delete list</h2>
                </div>
            </div>
        )
    }
}