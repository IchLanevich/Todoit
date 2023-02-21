import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { fetchTodos, selectAllTodos, selectCurrentDir, selectCurrentTheme, selectSortBy, selectTodosStatus, selectViewLayout } from '../../features/todos/todosSlice'
import { ThunkDispatch } from "@reduxjs/toolkit";
import TodoItem from '../molecule_components/TodoItem'
import TodoItemMinimalist from '../molecule_components/TodoItemMinimalist'
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import { Theme } from '../../interfaces/interfaces'

interface Todo {
  id: string
  todo: string
  dueDate: string
  isImportant: boolean
  isCompleted: boolean
  description: string
  createdAt: string
  assignedAt: string
}

const TodoList: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const todos = useSelector(selectAllTodos)
  const status = useSelector(selectTodosStatus)
  const sortBy = useSelector(selectSortBy)
  const viewLayout = useSelector(selectViewLayout)
  const currentDir = useSelector(selectCurrentDir)

  const theme: Theme = useSelector(selectCurrentTheme)

  const sortByBoolean = (todos: Todo[], propertyKey: string) => {
    return [...todos].sort((a: any, b: any) => {
      if (a[propertyKey] === b[propertyKey]) return 0
      return a[propertyKey] ? -1 : 1
    })
  }

  const sortByDate = (todos: Todo[], isReverse: boolean) => {
    const direction = isReverse ? -1 : 1
    const sortedArray = [...todos].sort((a: any, b: any) => {
      a = a.createdAt.slice(14, 19).split(':')
      b = b.createdAt.slice(14, 19).split(':')
      return direction * (b[2] - a[2] || b[1] - a[1] || b[0] - a[0])
    })
    return sortedArray
  }

  const sortByDueDate = (todos: Todo[]) => {
    const sortedArray = [...todos].sort((a: any, b: any) => {
      a = a.dueDate.split(" ");
      b = b.dueDate.split(" ");
      return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
    })
    return sortedArray
  }


  const renderTodoList = () => {
    if (todos.length === 0) {
      return <div className='flex justify-center col-span-3 px-4 py-2 w-full h-full text-center'>
        <h2 style={{ backgroundColor: theme.primaryColour, color: theme.primaryTextColour }} className='px-4 py-2 font-medium rounded-md'>Todos empty</h2>
      </div>
    }

    let sortedTodos;

    switch (sortBy) {
      case 'sort-by':
        sortedTodos = todos
        break;
      case 'sort-by-recent':
        sortedTodos = sortByDate(todos, false)
        break;
      case 'sort-by-oldest':
        sortedTodos = sortByDate(todos, true)
        break;
      case 'sort-by-due-date':
        sortedTodos = sortByDueDate(todos)
        break;
      case 'sort-by-important':
        sortedTodos = sortByBoolean(todos, 'isImportant')
        break;
      case 'sort-by-completed':
        sortedTodos = sortByBoolean(todos, 'isCompleted')
        break;
      default:
        sortedTodos = todos
        break;
    }


    if (viewLayout === 'block-view') {
      return sortedTodos.map((todo: Todo) => {
        if (todo.assignedAt === currentDir) {
          return <TodoItem key={todo.id} {...todo} />
        }
      })
    } else if (viewLayout === 'list-view') {
      return sortedTodos.map((todo: Todo) => {
        if (todo.assignedAt === currentDir) {
          return <TodoItemMinimalist key={todo.id} {...todo} />
        }
      })
    }


  }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos())
    }
  }, [status, dispatch])


  return (
    <div id='todo-list' className={`${viewLayout === 'block-view' ? 'grid grid-cols-3' : 'flex flex-col'} gap-4`}>
      {renderTodoList()}
    </div>
  )
}

export default TodoList