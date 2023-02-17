import { ThunkDispatch } from '@reduxjs/toolkit';
import React, { useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteDir, selectCurrentDir, selectCurrentTheme, setCurrentDir } from '../../features/todos/todosSlice';
import { Theme, Todo } from '../../interfaces/interfaces';
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

    const theme: Theme = useSelector(selectCurrentTheme)

    const todoAmount = getDirTodoAmount(dirName.toLowerCase(), todos)
    const currentDir = useSelector(selectCurrentDir)

    const handleDeleteDir = (dirName: string, e: React.KeyboardEvent<HTMLLIElement>) => {
        if (dirName.toLowerCase() === 'home') return toast.error('Cannot delete Home directory')
        if (e.key === 'Delete' || e.key === 'Backspace') dispatch(deleteDir(dirName.toLowerCase()))
        dispatch(setCurrentDir('home'))
    }

    const liRef = useRef<HTMLButtonElement>(null)

    const handleHover = (ref: any, bgColor: string) => {
        ref.current?.addEventListener('mouseover', () => ref.current.style.backgroundColor = bgColor)
        ref.current?.addEventListener('mouseleave', () => ref.current.style.backgroundColor = 'transparent')
    }

    useLayoutEffect(() => {
        if (liRef) {
            handleHover(liRef, theme.secondaryColour)
        }
    }, [theme])

    return (
        <li onKeyDown={(e) => handleDeleteDir(dirName, e)}>
            <button ref={liRef} onClick={() => handleChangeCurrentDir(dirName)}
                style={{ backgroundColor: theme.primaryColour, color: theme.textColour }}
                className={`flex w-full items-center gap-4 px-4 py-[14px] font-medium text-sm rounded-md dark:text-[#B3B3B3] text-black ${currentDir === dirName.toLowerCase() ? 'dark:bg-[#33373B] bg-[#F2F3F5]' : 'dark:bg-transparent bg-white'}`}>
                {dirName}
                <span style={{backgroundColor: theme.tertiaryColour, color: theme.textColourSecondary}} className="ml-auto px-[10px] py-1 font-semibold dark:text-[#88888A] text-[#7D7E80] dark:bg-[#3E4347] bg-[#E2E3E5] rounded">{todoAmount}</span>
            </button>
            <Toaster />
        </li>
    )
}

export default TodoListDirTab