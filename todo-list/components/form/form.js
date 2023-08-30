import { useContext, useState } from 'react';
import styles from './form.module.css'
import { FormContext, useDescription, useIsVisible, usePriority, useTitle } from './FormContext';
import { TasksContext, TasksDispatchContext, useIdCounter, useSelectedTask } from '@/app/context/TasksContext';
import Task from '../task/task';

export default function Form(props) {
    const context = useContext(TasksContext);
    const dispatch = useContext(TasksDispatchContext);

    const { isVisible, setIsVisible } = useIsVisible();
    const { title, setTitle } = useTitle();
    const { description, setDescription } = useDescription();
    const { priority, setPriority } = usePriority();
    const { selectedTask, setSelectedTask } = useSelectedTask();
    const tasks = useContext(TasksContext)["tasks"];

    const { idCounter, setIdCounter } = useIdCounter();

    function resetForm() {
        setTitle('');
        setDescription('');
        setPriority(0);
        setSelectedTask(null);
    }

    const handleAddTask = () => {
        if (title) {
            if(selectedTask != null) {
                setIsVisible(false);
                dispatch({
                    type:'changed',
                    tasks,
                    selectedTask,
                    name: title,
                    description: description,
                    priority: priority
                });
            } else {
                setIsVisible(false);
                setIdCounter(idCounter + 1);
                dispatch({
                    type:'added',
                    id: idCounter,
                    name: title,
                    description: description,
                    priority: priority,
                    isChecked: 0,
                    isEditing: false,
                });

            }
            resetForm();
        } else {
            alert("Digita algo, pf.");
        }
    };
        
    return (
        <>
        <form className={styles.form} data-active={isVisible}>
            <label>Title</label>
            <input type="text" placeholder="Enter title" name="title" value={title} onChange={e => setTitle(e.target.value)}/>
            
            <label>Description</label>
            <input type="text" placeholder="Enter description" name="description" value={description} onChange={e => setDescription(e.target.value)}/>
            
            <label>Priority</label>
            <input type="number" placeholder="Enter priority" min="0" name="priority" value={priority} onChange={e => setPriority(e.target.value)}/>

            <button
                type="button"
                onClick= { handleAddTask }>
                Confirmar
            </button>

        </form>
        </>

  )
}
