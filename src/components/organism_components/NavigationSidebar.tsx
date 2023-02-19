import { ThunkDispatch } from '@reduxjs/toolkit'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { homeIcon, personalIcon, plusIcon, studyIcon, workIcon } from '../../assets'
import { addDir, selectAllTodos, selectCurrentTheme, selectDirList, setCurrentDir } from '../../features/todos/todosSlice'
import { Theme, Todo } from '../../interfaces/interfaces'
import TodoListDirTab from '../molecule_components/TodoListDirTab'


const NavigationSidebar = () => {
    const [isCreateDir, setIsCreateDir] = useState(false)
    const [dirName, setDirName] = useState<string>('')

    const dirList = useSelector(selectDirList)
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
    const todos = useSelector(selectAllTodos)
    const theme: Theme = useSelector(selectCurrentTheme)

    const handleChangeCurrentDir = (dirName: string) => {
        dispatch(setCurrentDir(dirName.toLowerCase()))
    }

    const getCurrentDirTodoAmount = (dirName: string, todos: Todo[]) => {
        const dirTodoAmount = todos.filter((todo) => todo.assignedAt === dirName)
        return dirTodoAmount.length
    }


    const createTodoListDir = (dirName: string, todos: Todo[]) => {
        return (
            <TodoListDirTab key={dirName} dirName={dirName} todos={todos} handleChangeCurrentDir={handleChangeCurrentDir} getDirTodoAmount={getCurrentDirTodoAmount} />
        )
    }

    const renderDirList = () => {
        return dirList.map((dir: string) => {
            return createTodoListDir(dir.charAt(0).toUpperCase() + dir.slice(1), todos)
        })
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setIsCreateDir(false)
            dispatch(addDir(dirName.toLowerCase()))
        }
    }

    const createAddListButton = () => {
        if (isCreateDir === true) {
            return (
                <div className="">
                    <label className='hidden' htmlFor="createDir">Create new dir</label>
                    <input
                        autoFocus
                        style={{ backgroundColor: theme.secondaryColour, color: theme.primaryTextColour }}
                        onChange={(e) => setDirName(e.target.value)}
                        onBlur={() => setIsCreateDir(false)}
                        onKeyDown={(e) => handleKeyDown(e)} id='createDir' type="text" className='w-full dark:text-[#B3B3B3] mt-2 px-4 py-[14px] rounded-md text-sm' />
                </div>
            )
        } else {
            return (
                <button
                    style={{ color: theme.primaryTextColour }}
                    onClick={() => {
                        setIsCreateDir(true);
                    }}
                    className='flex items-center w-full mt-2 gap-2 text-[#8C8D8F] px-4 py-[14px] rounded-md text-sm'>{plusIcon}Create new list</button>
            )
        }
    }

    return (
        <div style={{ backgroundColor: theme.primaryColour, color: theme.textColour }} className='h-screen min-w-[250px] max-w-xs p-6 ml-2 mt-2 mb-2 rounded-md mr-8'>
            <ul className='flex flex-col gap-2'>
                {renderDirList()}
            </ul>
            {createAddListButton()}
        </div>
    )
}

export default NavigationSidebar