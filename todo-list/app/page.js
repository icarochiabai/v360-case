"use client"
import styles from '../styles/app.module.css'
import List from '@/components/list/list'
import Menu from '@/components/menu/menu'
import { TasksContext, TasksDispatchContext, TasksProvider } from './context/TasksContext'
import { useReducer } from 'react'
import Form from '@/components/form/form'
import { FormProvider } from '@/components/form/FormContext'

export default function Home() {
  return (
    <TasksProvider>
      <FormProvider>
        <main className={styles.app}>
          <Form/>
          <List/>
          <div className={styles.listMenu}>
            <Menu
            menuType='list'
            />
          </div>
          <div className={styles.taskMenu}>
            <Menu
              menuType='task'
            />
          </div>
        </main>
      </FormProvider>
    </TasksProvider>
  )
}
