"use client"
import styles from '../styles/app.module.css'
import List from '@/components/list/list'
import Menu from '@/components/menu/menu'
import { TasksContext, TasksDispatchContext, TasksProvider } from '../context/TasksContext'
import { useReducer, useState } from 'react'
import Form from '@/components/form/form'
import { FormProvider } from '@/context/FormContext'
import Head from 'next/head'
import { ListProvider } from '@/context/ListsContext'

export default function Home() {
  const [ menuState, setMenuState ] = useState('hidden');
  return (
    <ListProvider>
      <TasksProvider>
        <FormProvider>
          <main className={styles.app}>
            <div className={styles.menuBar} data-status={menuState}>
                <i
                  onClick={() => setMenuState(menuState == 'hidden' ? 'show' : 'hidden')}
                  className={menuState=='hidden' ? "fa-solid fa-bars" : "fa-solid fa-xmark"}
                >
                </i>
            </div>
            <div className={styles.header}>
              <h1>V360</h1>
              <h2>CASE</h2>
            </div>

            <Form/>
            <List/>

            <div className={styles.listMenu} data-status={menuState}>
              <Menu
              menuType='list'
              />
            </div>
            <div className={styles.taskMenu}>
              <Menu
                menuType='task'
                dataStatus={menuState}
              />
            </div>
          </main>
        </FormProvider>
      </TasksProvider>
    </ListProvider>
  )
}
