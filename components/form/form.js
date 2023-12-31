import { useContext, useState } from 'react';
import styles from './form.module.css'
import { FormContext, useDescription, useIsVisible, useMode, usePriority, useTitle } from '../../context/FormContext';
import { TasksContext, TasksDispatchContext, useIdCounter, useSelectedTaskIndex, useTasks } from '@/context/TasksContext';
import Task from '../task/task';
import { useCurrentListIndex, useLists } from '@/context/ListsContext';
import useSound from 'use-sound'
import taskSelectSound from '/public/sound/taskSelect.mp3'

export default function Form(props) {
    const context = useContext(TasksContext);
    const dispatch = useContext(TasksDispatchContext);

    const { isVisible, setIsVisible } = useIsVisible();
    const { title, setTitle } = useTitle();
    const { description, setDescription } = useDescription();
    const { priority, setPriority } = usePriority();
    const { selectedTaskIndex, setSelectedTaskIndex } = useSelectedTaskIndex();
    const { mode, setMode } = useMode();
    const tasks = useContext(TasksContext)["tasks"];

    const { lists, setLists } = useLists();
    const { currentListIndex, setCurrentListIndex } = useCurrentListIndex();
    const [ selectSound ] = useSound(taskSelectSound);

    const { idCounter, setIdCounter } = useIdCounter();

    function resetForm() {
        setTitle('');
        setDescription('');
        setPriority(0);
        setSelectedTaskIndex(null);
        setMode('');
    }

    const handleAddTask = () => {
        selectSound(); 
        if (title) {
            if(selectedTaskIndex != null) {
                setIsVisible(false);
                dispatch({
                    type:'changed',
                    lists,
                    currentListIndex,
                    selectedTaskIndex,
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
                    isChecked: false,
                    lists,
                    currentListIndex
                });
            }
            dispatch({
                type:'sorted'
            });
            resetForm();
        } else {
        }
    };
        
    return (
        <>
        <form className={styles.form} data-active={isVisible}>
            <h1>{mode == 'adding' && mode != '' ? "Create task" : "Modify task" }</h1>
            <div className={styles.row1}>
                <input  type="text" placeholder="Write something to do here..." name="title" value={title} onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className={styles.row2}>
                <input type="text" placeholder="Description (optional)" name="description" value={description} onChange={e => setDescription(e.target.value)}/>
                <input type="number" placeholder="Enter priority" min="0" name="priority" value={priority} onChange={e => setPriority(e.target.value)}/>
                <button
                    type="button"
                    onClick= { handleAddTask }
                    >
                    {mode == 'adding' && mode != '' ? <i className="fa-solid fa-plus"></i> : <i className="fa-solid fa-pencil"></i>}
                </button>
            </div>
        </form>
        </>

  )
}
