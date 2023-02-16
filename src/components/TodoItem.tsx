import React, { useState } from 'react'
import { starIcon, dueDateIcon, deleteIcon, threeDotsVerticalIcon, starIconFill } from '../assets/index.js'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { ThunkDispatch } from "@reduxjs/toolkit";
import { addTodo, fetchTodos, deleteTodo, updateIsCompleted, updateIsImportant, selectCurrentTheme } from '../features/todos/todosSlice';
import EditFormModal from './EditFormModal.js';
import toast, { Toaster } from 'react-hot-toast';
import { Theme, Todo } from '../interfaces/interfaces.js';


const TodoItem: React.FC<Todo> = (props: Todo) => {
    const { id, todo, dueDate, isImportant, isCompleted, description, createdAt } = props
    const [isCompletedChecked, setIsCompletedChecked] = useState<boolean>(isCompleted)
    const [isImportantChecked, setIsImportantChecked] = useState<boolean>(isImportant)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()


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

    const handleDelete = async (event: any) => {
        console.log('clicked', event)
        event.preventDefault()
        event.stopPropagation()
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

    const createButton = (handleFunction: any, icon: JSX.Element) => {
        return (<button className='hover:bg-slate-100 p-1 rounded' onClick={handleFunction}>{icon}</button>)
    }

    const theme: Theme = useSelector(selectCurrentTheme)
    const { backgroundColour, id: themeId, primaryColour, secondaryColour, tertiaryColour, textColour, textColourSecondary, textColourTertiary, } = theme

    console.log(backgroundColour)

    useEffect(() => {
        // console.log('backgroundColour', backgroundColour)
    }, [backgroundColour])

    return (
        <>
            <div className='todo-item flex flex-col w-full max-w-[336px] min-h-[260px] p-[25px] rounded-md bg-[#FFFFFF]'>
                <h3 className='flex font-medium text-lg leading-[20px] text-[#000000] mb-2 dark:text-[#B3B3B3]'>{todo}</h3>
                <p className='flex grow max-h-[300px] font-normal text-sm leading-[18px] text-[#888888]'>{description ? description : 'no description'}</p>
                <p className='flex grow-0 items-center gap-3 flex-1 mb-4 font-normal text-sm leading-[18px] text-[#000000] dark:text-[#B3B3B3]'>
                    {dueDateIcon}
                    {dueDate}
                </p>
                <div className="separator w-full h-[1px] bg-[#D3D3D3]"></div>
                <div className="mt-4 flex items-center">
                    <input id={`isCompleted${id}`} className='hidden' type="checkbox" checked={isCompletedChecked} onChange={(e) => { handleUpdateIsCompletedChange(e) }} />
                    <label className={`select-none flex flex-1 gap-2 text-base leading-[20px] min-w-[160px] font-normal ${isCompleted ? 'dark:text-[#18AB1E] text-[#1CC322]' : 'dark:text-[#808080] text-[#A7A7A7] '}`} htmlFor={`isCompleted${id}`}><div className={`h-6 w-6 rounded-lg ${isCompleted ? 'dark:bg-[#18AB1E] bg-[#1CC322]' : 'dark:bg-[#808080] bg-[#D9D9D9]'}`}></div>
                        {isCompleted ? 'completed' : 'uncompleted'}</label>
                    <div className="flex gap-2">
                        <input id={`isImportant${id}`} className='hidden' type="checkbox" checked={isImportantChecked} onChange={(e) => { handleUpdateIsImportantChange(e) }} />
                        <label className='hover:bg-slate-100 p-1 rounded' htmlFor={`isImportant${id}`}>{isImportant ? starIconFill : starIcon}</label>
                        {createButton((event: any) => handleDelete(event), deleteIcon)}
                        {createButton(() => setIsModalOpen(true), threeDotsVerticalIcon)}
                    </div>
                </div>
                <Toaster />
            </div>
            {isModalOpen ? <EditFormModal {...props} setIsModalOpen={setIsModalOpen} /> : null}
        </>
    )
}

export default TodoItem
