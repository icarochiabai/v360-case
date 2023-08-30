import { useState } from 'react';
import styles from './task.module.css'
import { useIsEditing } from '@/app/context/TasksContext';

export default function Task(props) {
  const { isEditing, setIsEditing } = useIsEditing();
  if(props.isEditing) {
        return(
          <div className={styles.box} data-active={props.isSelected} onClick={props.onSelect}>
            <input />
            <p className={styles.description}>{props.description}</p>
          </div>
        )
  } else {
    return (
      <div className={styles.box} data-active={props.isSelected} onClick={props.onSelect}>
          <h2 className={styles.title}>{props.name}</h2>
          <p className={styles.description}>{props.description}</p>
      </div>
    )
  }
}
