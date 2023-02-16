import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blockIcon, listIcon, settingIcon } from '../assets'
import { currentTheme } from '../data/theme'
import { selectAllTodos, selectCurrentDir, selectCurrentTheme, selectUsername, setCurrentTheme, setSortByValue, setThemeState, setViewLayoutValue } from '../features/todos/todosSlice'
import { Theme, Todo } from '../interfaces/interfaces'
import SettingModal from './organism_components/SettingModal'
import SetUsernameModal from './organism_components/SetUsernameModal'

interface SelectOption {
    value: string,
    text: string
}

const TodoToolbar = () => {
    const todos = useSelector(selectAllTodos)
    const username = useSelector(selectUsername)
    const dispatch = useDispatch<Dispatch<AnyAction>>();

    const [sortBy, setSortBy] = useState<string>('sort-by')
    const [viewLayout, setViewLayout] = useState<string>(localStorage.getItem('viewLayout')!)
    const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false)
    const [isSetUsernameModalOpen, setIsSetUsernameModalOpen] = useState<boolean>(username === '' ? true : false)

    const currentDir = useSelector(selectCurrentDir)

    const handleSortByChange = () => {
        dispatch(setSortByValue(sortBy))
    }
    const handleViewChange = (view: string) => {
        dispatch(setViewLayoutValue(view))
        setViewLayout(view)
        localStorage.setItem('viewLayout', view)
    }

    const createSelectOption = (value: string, text: string) => (
        <option key={value} value={value}>{text}</option>
    )

    const selectOptions = [
        { value: 'sort-by', text: 'Sort by' },
        { value: 'sort-by-recent', text: 'Recent' },
        { value: 'sort-by-oldest', text: 'Oldest' },
        { value: 'sort-by-important', text: 'Important' },
        { value: 'sort-by-due-date', text: 'Due date' },
        { value: 'sort-by-completed', text: 'Completed' },
    ]

    const generateSelectOptions = (options: SelectOption[]) => {
        return options.map((option) => createSelectOption(option.value, option.text))
    }

    const handleViewClass = (view: string) => viewLayout === view ? 'bg-slate-50 dark:bg-[#33373B]' : ''
    const handleBlockViewClass = handleViewClass('block-view');
    const handleListViewClass = handleViewClass('list-view');

    const completedTodoAmount = todos.filter((todo: Todo) => todo.assignedAt === currentDir && todo.isCompleted === true).length

    useEffect(() => {
        handleSortByChange()
    }, [sortBy])


    const handleSetTheme = (theme: string) => {
        dispatch(setCurrentTheme(theme))
    }

    return (
        <div id='TodoToolbar' className='flex gap-4 items-center'>
            <div className="flex gap-2">
                <button onClick={() => handleViewChange('block-view')} className={`${handleBlockViewClass} hover:bg-slate-100 p-[11px] dark:hover:bg-[#33373B] rounded-md`} id='blockView'>{blockIcon}</button>
                <button onClick={() => handleViewChange('list-view')} className={`${handleListViewClass} hover:bg-slate-100 p-[11px] dark:hover:bg-[#33373B] rounded-md`} id='listView'>{listIcon}</button>
            </div>
            <select className='px-4 py-[11px] dark:text-[#B3B3B3] dark:bg-[#33373B] border-r-8 border-transparent rounded-md' name="sortTodoSelect" id="sortTodoSelect" onChange={(e) => setSortBy(e.target.value)}>
                {generateSelectOptions(selectOptions)}
            </select>
            <div className="w-full max-w-lg">
                <label className='hidden' htmlFor="searchTodo">Search todo</label>
                <input type="search" name="searchTodo" id="searchTodo" placeholder='Search todo'
                    className={`flex w-full px-4 py-[11px] rounded-md  dark:text-[#B3B3B3] dark:bg-[#33373B]`} />
            </div>
            <div className="">
                <h2 className='p-2 font-medium flex items-center gap-3 dark:text-[#B3B3B3]'>Todo completed <span className="px-3 py-1 flex items-center justify-center w-[32px] bg-slate-100 rounded dark:bg-[#33373B] dark:text-[#88888A]">{completedTodoAmount}</span></h2>
            </div>
            <div className="">
                <button onClick={() => handleSetTheme('dark')}
                    id="theme-toggle-dark" type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                    <svg id="theme-toggle-dark-icon" className=" w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                </button>
                <button onClick={() => handleSetTheme('light')}
                    id="theme-toggle-light" type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                    <svg id="theme-toggle-light-icon" className=" w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </button>
            </div>
            <div className="">
                {isSettingOpen ? <SettingModal setIsSettingOpen={setIsSettingOpen} /> : <button onClick={() => setIsSettingOpen(true)} className='p-[11px] rounded-md hover:bg-slate-100'>{settingIcon}</button>}
                {isSetUsernameModalOpen ? <SetUsernameModal setIsSetUsernameModalOpen={setIsSetUsernameModalOpen} /> : ''}
            </div>
        </div>
    )
}

export default TodoToolbar