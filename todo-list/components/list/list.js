"use client"
import styles from './list.module.css'
import Task from '../task/task'
import { useContext, useState } from 'react'
import { TasksContext, useSelectedTask } from '@/context/TasksContext'
import { useIsVisible } from '../../context/FormContext'

export default function List(props) {
  const context = useContext(TasksContext);
  const tasks = context['tasks'];
  const { selectedTask, setSelectedTask } = useSelectedTask();
  const { isVisible, setIsVisible } = useIsVisible();

  const handleTaskSelect = (taskId) => { 
    setIsVisible(false);
    if(selectedTask != null) {
      if(tasks[selectedTask].id === taskId) {
        setSelectedTask(null);
      } else {
        for(let i = 0; i < tasks.length; i++){
          if(tasks[i].id === taskId) {
            setSelectedTask(i);
          }
        }
      }
    } else {
      for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id === taskId) {
          setSelectedTask(i);
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
                    isChecked={task.isChecked}
                    isSelected={selectedTask != null ? tasks[selectedTask].id === task.id : false}
                    onSelect={ () => handleTaskSelect(task.id) }
                    isEditing ={task.isEditing}
                />
            )
        )}
        </div>
    </div>
  )
}
