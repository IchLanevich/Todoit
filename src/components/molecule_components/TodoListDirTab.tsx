import { ThunkDispatch } from '@reduxjs/toolkit';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteDir, selectCurrentDir } from '../../features/todos/todosSlice';
import { Todo } from '../../interfaces/interfaces';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
    dirName: string
    todos: Todo[]
    handleChangeCurrentDir: (dirName: string) => void
    getDirTodoAmount: (dirName: string, todos: Todo[]) => number
}

const TodoListDirTab: React.FC<Props> = (props: Props) => {
    const { dirName, todos, handleChangeCurrentDir, getDirTodoAmount } = props

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

    const todoAmount = getDirTodoAmount(dirName.toLowerCase(), todos)
    const currentDir = useSelector(selectCurrentDir)

    const handleDeleteDir = (dirName: string, e: React.KeyboardEvent<HTMLLIElement>) => {
        if (dirName.toLowerCase() === 'home') return toast.error('Cannot delete Home directory')
        if (e.key === 'Delete' || e.key === 'Backspace') dispatch(deleteDir(dirName.toLowerCase()))
    }

    return (
        <li onKeyDown={(e) => handleDeleteDir(dirName, e)}>
            <button onClick={() => handleChangeCurrentDir(dirName)}
                className={`flex w-full items-center gap-4 px-4 py-[14px] font-medium text-sm rounded-md dark:text-[#B3B3B3] text-black ${currentDir === dirName.toLowerCase() ? 'dark:bg-[#33373B] bg-[#F2F3F5]' : 'dark:bg-transparent bg-white'} dark:hover:bg-[#33373B] hover:bg-[#F2F3F5]`}>
                {dirName}
                <span className="ml-auto px-[10px] py-1 font-semibold dark:text-[#88888A] text-[#7D7E80] dark:bg-[#3E4347] bg-[#E2E3E5] rounded">{todoAmount}</span>
            </button>
            <Toaster />
        </li>
    )
}

export default TodoListDirTab