import { ThunkDispatch } from '@reduxjs/toolkit';
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteDir, editDirName, selectCurrentDir, selectCurrentTheme, setCurrentDir } from '../../features/todos/todosSlice';
import { Theme, Todo } from '../../interfaces/interfaces';
import toast, { Toaster } from 'react-hot-toast';
import { DeleteIcon, EditIcon } from '../atomic_components/Icons/Icons';
import { deleteIcon, editIcon, threeDotsVerticalIcon } from '../../assets';
import { capitalize } from '../../utils/capitalize';

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

    const [isEditDir, setIsEditDir] = useState(false)
    const [newDirName, setNewDirName] = useState<string>(dirName)

    const handleDeleteDirOnKeyDown = (dirName: string, e: any) => {
        if (dirName.toLowerCase() === 'home') return toast('❌ Cannot delete Home directory', {
            duration: 3000,
            style: {
                backgroundColor: theme.secondaryColour,
                color: theme.primaryTextColour,
                borderRadius: '6px',
                fontSize: '16px',
                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                fontWeight: 500,
            },
        })
        if (e.key === 'Delete' || e.key === 'Backspace') dispatch(deleteDir(dirName.toLowerCase()))
        dispatch(setCurrentDir('home'))
    }

    const handleDeleteDirButton = (dirName: string, e: any) => {
        if (dirName.toLowerCase() === 'home') return toast('❌ Cannot delete Home directory', {
            duration: 3000,
            style: {
                backgroundColor: theme.secondaryColour,
                color: theme.primaryTextColour,
                borderRadius: '6px',
                fontSize: '16px',
                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                fontWeight: 500,
            },
        })
        e.stopPropagation()
        dispatch(deleteDir(dirName.toLowerCase()))
        dispatch(setCurrentDir('home'))
    }

    const liRef = useRef<HTMLLIElement>(null)

    const handleHover = (ref: any, bgColor: string) => {
        if (dirName.toLowerCase() === currentDir) {
            ref.current.style.backgroundColor = bgColor
        } else {
            ref.current.style.backgroundColor = 'transparent'
        }

        ref.current.addEventListener('mouseover', () => {
            ref.current.style.backgroundColor = bgColor
        })

        ref.current.addEventListener('mouseout', () => {
            if (dirName.toLowerCase() === currentDir) {
                ref.current.style.backgroundColor = bgColor
            } else {
                ref.current.style.backgroundColor = 'transparent'
            }
        })

    }

    const deleteButtonRef = useRef<HTMLButtonElement>(null)
    const editIconRef = useRef<HTMLButtonElement>(null)

    const createButton = (handleFunction: any, icon: JSX.Element, ref: any) => {
        return (<button ref={ref} style={{ color: theme.secondaryTextColour }} className='hasHoverEffect p-1 rounded' onClick={handleFunction}>{icon}</button>)
    }

    useLayoutEffect(() => {
        if (isEditDir === false) {
            handleHover(liRef, theme.secondaryColour)
            handleHover(deleteButtonRef, 'transparent')
        }
    }, [theme, currentDir])

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            setIsEditDir(false)
            dispatch(editDirName({ dirName: dirName.toLowerCase(), newDirName: newDirName.toLowerCase() }))
        }
    }


    const handleRenderTabAndInput = () => {
        if (isEditDir) {
            return (
                <div className="" >
                    <label className='hidden' htmlFor="editDir">Create new dir</label>
                    <input
                        autoFocus
                        style={{ backgroundColor: theme.secondaryColour, color: theme.primaryTextColour }}
                        onChange={(e) => setNewDirName(e.target.value)}
                        onBlur={() => setIsEditDir(false)}
                        onKeyDown={(e) => handleKeyDown(e)} id='editDir' type="text" className='w-full dark:text-[#B3B3B3] mt-2 px-4 py-[14px] rounded-md text-sm' />
                </div >)
        } else {
            return (
                <li tabIndex={0} onKeyDown={(e) => handleDeleteDirOnKeyDown(dirName, e)} ref={liRef} onClick={() => handleChangeCurrentDir(dirName)} className='flex w-full items-center rounded gap-4 px-4 py-[14px] font-medium text-sm'>
                    <h4 style={{ color: theme.primaryTextColour }} className='flex flex-1'>{capitalize(dirName)}</h4>
                    <div className="flex gap-1 items-center">
                        {createButton((e: any) => handleDeleteDirButton(dirName, e), <DeleteIcon colorProp='secondaryTextColour' classProp='w-4 h-4' />, deleteButtonRef)}
                        {createButton(() => setIsEditDir(true), <EditIcon colorProp='secondaryTextColour' classProp='w-4 h-4'/>, editIconRef)}
                        <span style={{ backgroundColor: theme.secondaryColour, color: theme.secondaryTextColour }} className="ml-auto px-[10px] py-1 font-semibold rounded">{todoAmount}</span>
                    </div>
                    <Toaster />
                </li>
            )
        }
    }
    return (
        <>
            {handleRenderTabAndInput()}
        </>
    )
}

export default TodoListDirTab