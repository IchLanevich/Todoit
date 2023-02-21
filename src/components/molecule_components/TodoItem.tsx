import React, { useLayoutEffect, useRef, useState } from 'react'
import { starIcon, dueDateIcon, deleteIcon, threeDotsVerticalIcon, starIconFill } from '../../assets/index.js'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { ThunkDispatch } from "@reduxjs/toolkit";
import { addTodo, fetchTodos, deleteTodo, updateIsCompleted, updateIsImportant, selectCurrentTheme } from '../../features/todos/todosSlice';
import EditFormModal from '../organism_components/EditFormModal.js';
import toast, { Toaster } from 'react-hot-toast';
import { Theme, Todo } from '../../interfaces/interfaces.js';
import { DeleteIcon, DueDateIcon, MenuIcon } from '../atomic_components/Icons/Icons.js';


const TodoItem: React.FC<Todo> = (props: Todo) => {
    const { id, todo, dueDate, isImportant, isCompleted, description, createdAt } = props
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
        toast('✔️ Todo deleted', {
            duration: 3000,
            style: {
                borderRadius: '6px',
                fontSize: '16px',
                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                fontWeight: 500,
            },
        })
    }

    const createButton = (handleFunction: any, icon: JSX.Element, ref: any) => {
        return (<button ref={ref} style={{ color: theme.secondaryTextColour }} className='hasHoverEffect p-1 rounded' onClick={handleFunction}>{icon}</button>)
    }

    const deleteButtonRef = useRef<HTMLButtonElement>(null)
    const menuButtonRef = useRef<HTMLButtonElement>(null)
    const importantLabelRef = useRef<HTMLLabelElement>(null)


    const handleHover = (ref: any, bgColor: string) => {
        ref.current?.addEventListener('mouseover', () => ref.current.style.backgroundColor = bgColor)
        ref.current?.addEventListener('mouseleave', () => ref.current.style.backgroundColor = 'transparent')
    }

    const removeHoverListener = (ref: any, bgColor: string) => {
        ref.current?.removeEventListener('mouseover', () => ref.current.style.backgroundColor = bgColor)
        ref.current?.removeEventListener('mouseleave', () => ref.current.style.backgroundColor = 'transparent')
    }


    useLayoutEffect(() => {
        if (deleteButtonRef) {
            handleHover(deleteButtonRef, theme.secondaryColour)
            removeHoverListener(deleteButtonRef, theme.secondaryColour)
        }
        if (menuButtonRef) {
            handleHover(menuButtonRef, theme.secondaryColour)
            removeHoverListener(menuButtonRef, theme.secondaryColour)
        }
        if (importantLabelRef) {
            handleHover(importantLabelRef, theme.secondaryColour)
            removeHoverListener(importantLabelRef, theme.secondaryColour)
        }
    }, [theme])

    return (
        <>
            <div style={{ backgroundColor: theme.primaryColour }} className='todo-item flex flex-col w-full max-w-[336px] min-h-[260px] p-[25px] rounded-md bg-[#FFFFFF]'>
                <h4 style={{ color: theme.primaryTextColour }} className='flex font-medium text-lg leading-[20px] mb-2'>{todo}</h4>
                <p style={{ color: theme.secondaryTextColour }} className='flex grow max-h-[300px] font-normal text-sm leading-[18px]'>{description ? description : 'no description'}</p>
                <p style={{ color: theme.secondaryTextColour }} className='flex grow-0 items-center gap-3 flex-1 mb-4 font-normal text-sm leading-[18px]'>
                    <DueDateIcon colorProp='iconColour' />
                    {dueDate}
                </p>
                <div className="separator w-full h-[1px] bg-[#D3D3D3]"></div>
                <div className="mt-4 flex items-center">
                    <input
                        id={`isCompleted${id}`}
                        className='hidden'
                        type="checkbox"
                        checked={isCompletedChecked}
                        onChange={(e) => { handleUpdateIsCompletedChange(e) }} />
                    <label
                        style={{ color: isCompleted ? theme.successColour : theme.secondaryTextColour }}
                        className={`select-none flex flex-1 gap-2 text-base leading-[20px] min-w-[160px] font-normal`}
                        htmlFor={`isCompleted${id}`}>
                        <div style={{backgroundColor: isCompleted ? theme.successColour : theme.secondaryTextColour}} className={`h-6 w-6 rounded-lg`}></div>
                        {isCompleted ? 'completed' : 'uncompleted'}</label>
                    <div className="flex gap-2">
                        <input id={`isImportant${id}`} className='hidden' type="checkbox" checked={isImportantChecked} onChange={(e) => { handleUpdateIsImportantChange(e) }} />
                        <label ref={importantLabelRef} style={{ color: theme.iconColour }} className={`hasHoverEffect p-1 rounded`} htmlFor={`isImportant${id}`}>{isImportant ? starIconFill : starIcon}</label>
                        {createButton(() => handleDelete(), <DeleteIcon colorProp='iconColour' />, deleteButtonRef)}
                        {createButton(() => setIsModalOpen(true), <MenuIcon colorProp='iconColour' />, menuButtonRef)}
                    </div>
                </div>
                <Toaster />
            </div>
            {isModalOpen ? <EditFormModal {...props} setIsModalOpen={setIsModalOpen} /> : null}
        </>
    )
}

export default TodoItem
