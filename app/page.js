"use client"
import styles from '../styles/app.module.css'
import List from '@/components/list/list'
import Menu from '@/components/menu/menu'
import { TasksContext, TasksDispatchContext, TasksProvider } from '../context/TasksContext'
import { useReducer } from 'react'
import Form from '@/components/form/form'
import { FormProvider } from '@/context/FormContext'
import Head from 'next/head'
import { ListProvider } from '@/context/ListsContext'

export default function Home() {
  return (
    <ListProvider>
      <TasksProvider>
        <FormProvider>
          <main className={styles.app}>
            <div className={styles.header}>
              <h1>V360</h1>
              <h2>CASE</h2>
            </div>

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
    </ListProvider>
  )
}
