"use client"
import styles from './list.module.css'
import Task from '../task/task'
import { useContext, useState } from 'react'
import { TasksContext, useSelectedTaskIndex } from '@/context/TasksContext'
import { useIsVisible } from '../../context/FormContext'

export default function List(props) {
  const context = useContext(TasksContext);
  const tasks = context['tasks'];
  const { selectedTaskIndex, setSelectedTaskIndex } = useSelectedTaskIndex();
  const { isVisible, setIsVisible } = useIsVisible();

  const handleTaskSelect = (taskId) => { 
    setIsVisible(false);
    if(selectedTaskIndex != null) {
      if(tasks[selectedTaskIndex].id === taskId) {
        setSelectedTaskIndex(null);
      } else {
        for(let i = 0; i < tasks.length; i++){
          if(tasks[i].id === taskId) {
            setSelectedTaskIndex(i);
          }
        }
      }
    } else {
      for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id === taskId) {
          setSelectedTaskIndex(i);
        }
      }
    }
  };

  return (
    <div className={styles.box}>
        <div className={styles.listName}>
            <h2>List 1</h2>
            {/* <p>Quick description.</p> */}
        </div>
        <div>
        {tasks.map(
            (task) => (
                <Task
                    key={task.id}
                    name={task.name}
                    description={task.description}
                    priority={task.priority}
                    isSelected={selectedTaskIndex != null ? tasks[selectedTaskIndex].id === task.id : false}
                    onSelect={ () => handleTaskSelect(task.id) }
                />
            )
        )}
        </div>
    </div>
  )
}
