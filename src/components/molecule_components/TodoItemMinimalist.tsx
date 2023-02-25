import React, { useLayoutEffect, useRef, useState } from 'react'
import { starIcon, dueDateIcon, deleteIcon, threeDotsVerticalIcon, starIconFill } from '../../assets/index.js'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { ThunkDispatch } from "@reduxjs/toolkit";
import { addTodo, fetchTodos, deleteTodo, updateIsCompleted, updateIsImportant, selectCurrentTheme } from '../../features/todos/todosSlice';
import EditFormModal from '../organism_components/EditFormModal.js';
import { Theme } from '../../interfaces/interfaces.js';
import { DeleteIcon, MenuIcon } from '../atomic_components/Icons/Icons.js';

interface Props {
    id: string
    todo: string
    dueDate: string
    isImportant: boolean
    isCompleted: boolean
    description: string
    createdAt: string
    assignedAt: string
}

const TodoItemMinimalist: React.FC<Props> = (props: Props) => {
    const { id, todo, dueDate, isImportant, isCompleted } = props
    const [isCompletedChecked, setIsCompletedChecked] = useState<boolean>(isCompleted)
    const [isImportantChecked, setIsImportantChecked] = useState<boolean>(isImportant)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

    const theme: Theme = useSelector(selectCurrentTheme)

    const handleUpdateIsCompletedChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        setIsCompletedChecked(e.target.checked)
        await dispatch(updateIsCompleted({ ...props, isCompleted: e.target.checked }))
        dispatch(fetchTodos())
    }

    const handleUpdateIsImportantChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        setIsImportantChecked(e.target.checked)
        await dispatch(updateIsImportant({ ...props, isImportant: e.target.checked }))
        dispatch(fetchTodos())
    }

    const handleDelete = async () => {
        await dispatch(deleteTodo(id))
        dispatch(fetchTodos())
    }

    const deleteButtonRef = useRef<HTMLButtonElement>(null)
    const menuButtonRef = useRef<HTMLButtonElement>(null)
    const importantLabelRef = useRef<HTMLLabelElement>(null)

    const createButton = (handleFunction: any, icon: JSX.Element, ref: React.RefObject<HTMLButtonElement>) => {
        return (<button ref={ref} style={{ color: theme.secondaryTextColour }} className='hasHoverEffect p-1 rounded' onClick={handleFunction}>{icon}</button>)
    }

    useEffect(() => {}, [theme])

    const handleHover = (ref: React.RefObject<HTMLButtonElement> | React.RefObject<HTMLLabelElement>, bgColor: string) => {
        ref.current?.addEventListener('mouseover', () => ref.current!.style.backgroundColor = bgColor)
        ref.current?.addEventListener('mouseleave', () => ref.current!.style.backgroundColor = 'transparent')
    }



    useLayoutEffect(() => {
        if (deleteButtonRef) {
            handleHover(deleteButtonRef, theme.secondaryColour)
        }
        if (menuButtonRef) {
            handleHover(menuButtonRef, theme.secondaryColour)
        }
        if (importantLabelRef) {
            handleHover(importantLabelRef, theme.secondaryColour)
        }
    }, [theme])

    return (
        <>
            <div style={{backgroundColor: theme.primaryColour}} className='todo-item flex w-full items-center min-h-[76px] p-[25px] rounded-md'>
                <div className="flex">
                    <input id={`isCompleted${id}`} className='hidden' type="checkbox" checked={isCompleted} onChange={(e) => { handleUpdateIsCompletedChange(e) }} />
                    <label style={{backgroundColor: isCompleted ? theme.successColour : '#D9D9D9'}} className={`select-none rounded-md flex gap-2 text-base leading-[20px] mr-4 font-normal`} htmlFor={`isCompleted${id}`}><div className={`h-6 w-6 rounded-lg`}></div></label>
                </div>
                <h3 style={{color: isCompleted ? theme.successColour : theme.primaryTextColour, textDecoration: isCompleted ? 'line-through' : ''}} className={`flex flex-1 font-medium text-lg leading-[20px]`}>{todo}</h3>
                <div className="flex items-center">
                    <div className="flex gap-2">
                        <p style={{backgroundColor: dueDate ? theme.secondaryColour : 'transparent', color: theme.secondaryTextColour}} className={`flex items-center gap-3 px-2 py-1 rounded font-normal text-base`}>
                            {dueDate}
                        </p>
                        <input id={`isImportant${id}`} className='hidden' type="checkbox" checked={isImportantChecked} onChange={(e) => { handleUpdateIsImportantChange(e) }} />
                        <label ref={importantLabelRef} style={{ color: theme.iconColour }} className={`hasHoverEffect p-1 rounded`} htmlFor={`isImportant${id}`}>{isImportant ? starIconFill : starIcon}</label>
                        {createButton(() => handleDelete(), <DeleteIcon colorProp='iconColour'/>, deleteButtonRef)}
                        {createButton(() => setIsModalOpen(true), <MenuIcon colorProp='iconColour'/>, menuButtonRef)}
                    </div>
                </div>
            </div>
            {isModalOpen ? <EditFormModal {...props} setIsModalOpen={setIsModalOpen} /> : null}
        </>
    )
}

export default TodoItemMinimalist
