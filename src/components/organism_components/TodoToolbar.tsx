import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blockIcon, listIcon, settingIcon } from '../../assets'
import { selectAllTodos, selectCurrentDir, selectCurrentTheme, selectUsername, selectViewLayout, setCurrentTheme, setSortByValue, setViewLayoutValue } from '../../features/todos/todosSlice'
import { Theme, Todo } from '../../interfaces/interfaces'
import AddCustomThemeModal from './AddCustomThemeModal'
import SettingModal from './SettingModal'
import SetUsernameModal from './SetUsernameModal'
import { BlockIcon, ThemeIcon, ListIcon, SettingIcon } from '../atomic_components/Icons/Icons'

interface SelectOption {
    value: string,
    text: string
}

const TodoToolbar = () => {
    const todos = useSelector(selectAllTodos)
    const username = useSelector(selectUsername)
    const dispatch = useDispatch<Dispatch<AnyAction>>();
    const theme: Theme = useSelector(selectCurrentTheme)

    const [sortBy, setSortBy] = useState<string>('sort-by')
    const [viewLayout, setViewLayout] = useState<string>(useSelector(selectViewLayout))
    const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false)
    const [isSetUsernameModalOpen, setIsSetUsernameModalOpen] = useState<boolean>(username === '' ? true : false)
    const [isThemeSettingOpen, setIsThemeSettingOpen] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('Search todo')

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

    const getTodosLength = (todos: Todo[]) => {
        if (todos) {
            return todos.filter((todo: Todo) => todo.assignedAt === currentDir && todo.isCompleted === true).length
        }
    }

    const completedTodoAmount = todos ? getTodosLength(todos) : 0

    useEffect(() => {
        handleSortByChange()
    }, [sortBy])

    const handleSetTheme = (theme: string) => {
        dispatch(setCurrentTheme(theme))
    }

    const blockButtonRef = useRef<HTMLButtonElement>(null)
    const listButtonRef = useRef<HTMLButtonElement>(null)
    const settingButtonRef = useRef<HTMLButtonElement>(null)
    const themeButtonRef = useRef<HTMLButtonElement>(null)

    const handleHover = (ref: React.RefObject<HTMLButtonElement>, bgColor: string, layout?: string) => {
        if (layout && ref.current) {
            if (viewLayout === layout) {
                ref.current!.style.backgroundColor = bgColor
            } else {
                ref.current!.style.backgroundColor = 'transparent'
            }
            ref.current.addEventListener('mouseover', () => {
                ref.current!.style.backgroundColor = bgColor
            })
            ref.current.addEventListener('mouseout', () => {
                viewLayout === layout ? ref.current!.style.backgroundColor = bgColor : ref.current!.style.backgroundColor = 'transparent'
            })
        } else {
            if (ref.current) {
                ref.current!.addEventListener('mouseover', () => ref.current!.style.backgroundColor = bgColor)
                ref.current!.addEventListener('mouseleave', () => ref.current!.style.backgroundColor = 'transparent')
            }
        }
    }

    const handleIconHover = (ref: React.RefObject<HTMLButtonElement>, bgColor: string) => {
        ref.current?.addEventListener('mouseover', () => ref.current!.style.backgroundColor = bgColor)
        ref.current?.addEventListener('mouseleave', () => ref.current!.style.backgroundColor = 'transparent')
    }

    useEffect(() => {
        handleHover(blockButtonRef, theme.primaryColour, 'block-view')
        handleHover(listButtonRef, theme.primaryColour, 'list-view')
        handleIconHover(settingButtonRef, theme.primaryColour)
        handleIconHover(themeButtonRef, theme.primaryColour)
    }, [theme, viewLayout])


    return (
        <div id='TodoToolbar' className='flex gap-4 items-center'>
            <div className="flex gap-2">
                <button ref={blockButtonRef} onClick={() => handleViewChange('block-view')} className={`p-[11px] dark:hover:bg-[#33373B] rounded-md`} id='blockView'>
                    <BlockIcon colorProp='iconColour' />
                </button>
                <button ref={listButtonRef} onClick={() => handleViewChange('list-view')} className={`p-[11px] dark:hover:bg-[#33373B] rounded-md`} id='listView'>
                    <ListIcon colorProp='iconColour' />
                </button>
            </div>
            <select style={{ backgroundColor: theme.primaryColour, color: theme.primaryTextColour }} className='px-4 py-[11px] dark:text-[#B3B3B3] dark:bg-[#33373B] border-r-8 border-transparent rounded-md' name="sortTodoSelect" id="sortTodoSelect" onChange={(e) => setSortBy(e.target.value)}>
                {generateSelectOptions(selectOptions)}
            </select>
            <div className="w-full max-w-lg">
                <label className='hidden' htmlFor="searchTodo">Search todo</label>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setSearchQuery('')} onBlur={() => setSearchQuery('Search todo')} style={{ backgroundColor: theme.primaryColour, color: theme.primaryTextColour }} type="search" name="searchTodo" id="searchTodo"
                    className={`flex w-full px-4 py-[11px] rounded-md`} />
            </div>
            <div className="">
                <h2 style={{ color: theme.primaryTextColour }} className='p-2 font-medium flex items-center gap-3 dark:text-[#B3B3B3]'>Todo completed
                    <span style={{ backgroundColor: theme.primaryColour, color: theme.primaryTextColour }} className="px-3 py-1 flex items-center justify-center w-[32px] bg-slate-100 rounded dark:bg-[#33373B] dark:text-[#88888A]">{completedTodoAmount}</span></h2>
            </div>
            <div className="flex">
                <button ref={settingButtonRef} onClick={() => setIsSettingOpen(true)} className='p-[11px] rounded-md hover:bg-slate-100'><SettingIcon colorProp='iconColour' /></button>
                <button ref={themeButtonRef} onClick={() => setIsThemeSettingOpen(true)} className='p-[11px] rounded-md hover:bg-slate-100'><ThemeIcon colorProp='iconColour' /></button>
                {isSettingOpen ? <SettingModal setIsSettingOpen={setIsSettingOpen} /> : ''}
                {isSetUsernameModalOpen ? <SetUsernameModal setIsSetUsernameModalOpen={setIsSetUsernameModalOpen} /> : ''}
                {isThemeSettingOpen ? <AddCustomThemeModal setIsThemeSettingOpen={setIsThemeSettingOpen} /> : ''}
            </div>
        </div>
    )
}

export default TodoToolbar