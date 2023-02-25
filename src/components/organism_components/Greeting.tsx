import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { selectAllTodos, selectCurrentDir, selectCurrentTheme, selectDirList } from '../../features/todos/todosSlice'
import { Theme, Todo } from '../../interfaces/interfaces'
import { capitalize } from '../../utils/capitalize'

const Greeting = () => {
    const todos = useSelector(selectAllTodos)
    const currentDir = useSelector(selectCurrentDir)

    const theme: Theme = useSelector(selectCurrentTheme)

    const getCurrentDirTodoAmount = (dir: string, todos: Todo[]) => {
        const dirTodoAmount = todos.filter((todo) => todo.assignedAt === dir)
        return dirTodoAmount.length
    }

    const todoAmount = todos ? getCurrentDirTodoAmount(currentDir, todos) : 0

    useEffect(() => {
    }, [theme])

    return (
        <div className="">
            <div className="flex gap-3 items-center">
                <h2 style={{ color: theme.primaryTextColour }} className='flex items-center font-medium text-[32px]'>{capitalize(currentDir)}</h2>
                <div style={{ backgroundColor: theme.primaryColour, color: theme.primaryTextColour }} className="flex items-center h-10 px-[14px] py-0 text-base font-bold rounded">{todoAmount} todo</div>
            </div>
            <h3 style={{color: theme.secondaryTextColour}} id="todays-date" className='text-2xl font-medium '>{new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</h3>
        </div>
    )
}

export default Greeting