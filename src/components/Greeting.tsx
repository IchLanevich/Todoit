import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { selectAllTodos, selectCurrentDir, selectDirList } from '../features/todos/todosSlice'
import { Todo } from '../interfaces/interfaces'

const Greeting = () => {
    const todos = useSelector(selectAllTodos)
    const currentDir = useSelector(selectCurrentDir)

    const theme = useSelector(selectCurrentDir)

    const getCurrentDirTodoAmount = (dir: string, todos: Todo[]) => {
        const dirTodoAmount = todos.filter((todo) => todo.assignedAt === dir)
        return dirTodoAmount.length
    }

    const todoAmount = getCurrentDirTodoAmount(currentDir, todos)

    return (
        <div className="">
            <div className='flex gap-3 items-center font-medium text-[32px]'>{currentDir.charAt(0).toUpperCase() + currentDir.slice(1)}<span className="flex items-center px-[14px] py-2 text-base font-bold dark:text-[#B3B3B3] text-[#4B4C4D] dark:bg-[#33373B] bg-[#F6F6F6] rounded">{todoAmount} todo</span></div>
            <h2 id="todays-date" className='text-2xl font-medium text-[#A3A4A6]'>{new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</h2>
        </div>
    )
}

export default Greeting