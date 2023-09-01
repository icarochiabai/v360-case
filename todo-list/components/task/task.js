import { useState } from 'react';
import styles from './task.module.css'
import { useIsEditing } from '@/context/TasksContext';

export default function Task(props) {
  return (
    <div className={styles.box} data-active={props.isSelected} onClick={props.onSelect}>
      <div className={styles.top}>
        {props.isChecked ? <s>asdasd<h2 className={styles.title}>{props.name}</h2></s> : <h2 className={styles.title}>{props.name}</h2>}
        {props.description != "" ? <i class="fa-solid fa-circle-info"></i> : "" }
      </div>
      <p className={styles.description}>{props.description}</p>
    </div>
  )
}
