import { useContext, useState } from 'react';
import styles from './task.module.css'
import { TasksContext, TasksDispatchContext, useIsEditing, useSelectedTaskIndex } from '@/context/TasksContext';
import { useCurrentListIndex, useLists } from '@/context/ListsContext';

import useSound from 'use-sound';
import checkSound from '/public/sound/check.mp3';

export default function Task(props) {
  const { selectedTaskIndex, setSelectedTaskIndex } = useSelectedTaskIndex();
  const { lists, setLists } = useLists();
  const { currentListIndex, setCurrentListIndex } = useCurrentListIndex();
  const dispatch = useContext(TasksDispatchContext);
  const [check] = useSound(checkSound);

  const handleCheck = (taskId) => {
    for(let i = 0; i < lists[currentListIndex].tasks.length; i++){
      if(lists[currentListIndex].tasks[i].id == taskId) {
        if(!lists[currentListIndex].tasks[i].isChecked) {
          check();
        }
        dispatch({
          type: 'checked',
          lists,
          currentListIndex,
          i
        });
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <input onClick={ () => handleCheck(props.id)} type="checkbox" defaultChecked={props.isChecked}></input>
      <div className={styles.box} data-active={props.isSelected} onClick={props.onSelect}>
        <div className={styles.top}>
          <h2 className={styles.title}>{props.name}</h2>
          <div className={styles.priority}>
            {props.description != "" ? <i className="fa-solid fa-circle-info"></i> : "" }
            <small>
              <p>
                <i className="fa-solid fa-triangle-exclamation"></i> { props.priority}
              </p>
            </small>
          </div>
        </div>
        <p className={styles.description}>{props.description}</p>
      </div>
    </div>
  )
}
