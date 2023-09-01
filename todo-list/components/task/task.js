import { useState } from 'react';
import styles from './task.module.css'
import { useIsEditing } from '@/context/TasksContext';

export default function Task(props) {
  return (
    <div className={styles.wrapper}>
      <input type="checkbox"></input>
      <div className={styles.box} data-active={props.isSelected} onClick={props.onSelect}>
        <div className={styles.top}>
          <h2 className={styles.title}>{props.name}</h2>
          <div className={styles.priority}>
            {props.description != "" ? <i class="fa-solid fa-circle-info"></i> : "" }
            <small>
              <p>
                <i class="fa-solid fa-triangle-exclamation"></i> { props.priority}
              </p>
            </small>
          </div>
        </div>
        <p className={styles.description}>{props.description}</p>
      </div>
    </div>
  )
}
