"use client"
import styles from './list.module.css'
import Task from '../task/task'
import { useState } from 'react'

export default function List(props) {
  const taskData = [
    {id: 'task1', name: 'Task 1', description: 'Quick description about Task 1.', priority: '1', isChecked: '0'},
    {id: 'task2', name: 'Task 2', description: 'Quick description about Task 2.', priority: '1', isChecked: '0'},
    {id: 'task3', name: 'Task 3', description: 'Quick description about Task 3.', priority: '1', isChecked: '0'},
    {id: 'task4', name: 'Task 4', description: 'Quick description about Task 4.', priority: '1', isChecked: '0'},
    {id: 'task5', name: 'Task 5', description: 'Quick description about Task 5.', priority: '1', isChecked: '0'},
    {id: 'task6', name: 'Task 6', description: 'Quick description about Task 6.', priority: '1', isChecked: '0'},
    {id: 'task7', name: 'Task 7', description: 'Quick description about Task 7.', priority: '1', isChecked: '0'},
    {id: 'task8', name: 'Task 8', description: 'Quick description about Task 8.', priority: '1', isChecked: '0'},
  ]

  const [selectedTask, setSelectedTask] = useState(null)
  const [tasks, setTasks] = useState(taskData)
  const [taskCounter, setTaskCounter] = useState(tasks.length + 1)

  const handleTaskSelect = (taskId) => { setSelectedTask(taskId) }
  const handleTaskRemove = (taskId) => {
    setTasks(tasks.filter(a => a.id !== taskId))
  }
  const handleTaskAdd = () => {
    setTaskCounter(taskCounter + 1)
    setTasks([...tasks, 
        {id: 'task'+taskCounter, name: 'Task '+ taskCounter, description: 'Quick description about Task ' + taskCounter, priority: '1', isChecked: '0'}
    ])
  }

  return (
    <div className={styles.box}>
        <div>
            <h2>List 1</h2>
            <p>Quick description.</p>
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
                    isSelected={selectedTask === task.id}
                    onSelect={ () => handleTaskSelect(task.id) }
                />
            )
        )}
        </div>
    </div>
  )
}
