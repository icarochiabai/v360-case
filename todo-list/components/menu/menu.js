import { SelectedTask, TasksContext, TasksDispatchContext, TasksProvider, useIdCounter, useIsEditing, useSelectedTask } from '@/app/context/TasksContext'
import styles from './menu.module.css'
import { useContext } from 'react'
import { FormContext, useDescription, useIsVisible, usePriority, useTitle } from '../form/FormContext';

export default function Menu(props) {
    if(props.menuType === "task") {
        const dispatch = useContext(TasksDispatchContext);
        const { isVisible, setIsVisible } = useIsVisible();
        const { selectedTask, setSelectedTask } = useSelectedTask();
        const { isEditing, setIsEditing } = useIsEditing();
        const tasks = useContext(TasksContext)["tasks"];
        const { title, setTitle } = useTitle();
        const { description, setDescription } = useDescription();
        const { priority, setPriority } = usePriority();

        return (
                <div className={styles.taskMenu}>
                    <button onClick={ () => {
                        setTitle('');
                        setDescription('');
                        setPriority(0);
                        setSelectedTask(null);
                        setIsVisible(!isVisible);
                    }
                    }>+</button>
                    <button onClick={ () => {
                        if(selectedTask != null) {
                            setTitle(tasks[selectedTask].name);
                            setDescription(tasks[selectedTask].description);
                            setPriority(tasks[selectedTask].priority);
                            setIsVisible(!isVisible);
                        }
                    }}>%</button>
                    <button onClick={ () => {
                        dispatch({
                        type:'deleted',
                        id: selectedTask,
                        });
                    }
                    }>-</button>
                    <button>x</button>
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
                    <button>+</button>
                    <button>%</button>
                    <button>-</button>
                    <button>x</button>
                </div>
            </div>
        )
    }
}