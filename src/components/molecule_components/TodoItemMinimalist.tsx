import React, { useState } from 'react'
import { starIcon, dueDateIcon, deleteIcon, threeDotsVerticalIcon, starIconFill } from '../../assets/index.js'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux/es/exports'
import { ThunkDispatch } from "@reduxjs/toolkit";
import { addTodo, fetchTodos, deleteTodo, updateIsCompleted, updateIsImportant } from '../../features/todos/todosSlice';
import EditFormModal from '../organism_components/EditFormModal.js';

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

    const createButton = (handleFunction: Function, icon: JSX.Element) => {
        return (<button className='hover:bg-slate-100 p-1 rounded' onClick={() => handleFunction()}>{icon}</button>)
    }

    return (
        <>
            <div className='todo-item flex w-full items-center min-h-[76px] p-[25px] rounded-md bg-[#FFFFFF] dark:bg-[#1E1E1E]'>
                <div className="flex">
                    <input id={`isCompleted${id}`} className='hidden' type="checkbox" checked={isCompleted} onChange={(e) => { handleUpdateIsCompletedChange(e) }} />
                    <label className={`select-none flex gap-2 text-base leading-[20px] mr-4 font-normal ${isCompleted ? 'dark:text-[#18AB1E] text-[#1CC322]' : 'text-[#A7A7A7] '}`} htmlFor={`isCompleted${id}`}><div className={`h-6 w-6 rounded-lg ${isCompleted ? 'bg-[#1CC322] dark:bg-[#18AB1E]' : 'bg-[#D9D9D9] dark:bg-[#808080]'}`}></div></label>
                </div>
                <h3 className={`flex ${isCompleted ? 'dark:text-[#18AB1E] text-[#1CC322] line-through' : 'dark:text-[#B3B3B3] text-[#13191b]'} flex-1 font-medium text-lg leading-[20px]`}>{todo}</h3>
                <div className="flex items-center">
                    <div className="flex gap-2">
                        <p className={`flex ${dueDate ? 'dark:bg-[#33373B] bg-[#F2F2F2]' : ''} dark:text-[#B3B3B3] text-[#767676] items-center gap-3 px-2 py-1 rounded font-normal text-base`}>
                            {dueDate}
                        </p>
                        <input id={`isImportant${id}`} className='hidden' type="checkbox" checked={isImportantChecked} onChange={(e) => { handleUpdateIsImportantChange(e) }} />
                        <label className='hover:bg-slate-100 p-1 rounded' htmlFor={`isImportant${id}`}>{isImportant ? starIconFill : starIcon}</label>
                        {createButton(() => handleDelete(), deleteIcon)}
                        {createButton(() => setIsModalOpen(true), threeDotsVerticalIcon)}
                    </div>
                </div>
            </div>
            {isModalOpen ? <EditFormModal {...props} setIsModalOpen={setIsModalOpen} /> : null}
        </>
    )
}

export default TodoItemMinimalist
