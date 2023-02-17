import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { ThunkDispatch } from "@reduxjs/toolkit";
import { addTodo, fetchTodos, selectCurrentDir, selectCurrentTheme } from '../features/todos/todosSlice';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid'
import toast, { Toaster } from 'react-hot-toast';

const AddTodoForm = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

    const theme = useSelector(selectCurrentTheme)

    const [todo, setTodo] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [dueDate, setDueDate] = useState<any>('')

    const resetInputValue = (arrayOfSetState: any[]) => {
        arrayOfSetState.forEach((setState) => {
            setState('')
        })
    }
    const stateToReset = [setTodo, setDescription, setDueDate]

    const currentDir = useSelector(selectCurrentDir)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (todo) {
            await dispatch(addTodo({
                id: uuidv4(),
                todo,
                dueDate: dueDate,
                isImportant: false,
                isCompleted: false,
                description,
                createdAt: new Date().toISOString(),
                assignedAt: currentDir,
            }))
            resetInputValue(stateToReset)
            dispatch(fetchTodos())
        }

        toast('✔️ Todo added', {
            duration: 3000,
            style: {
                borderRadius: '6px',
                fontSize: '16px',
                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                fontWeight: 500,
            },
        })

    }

    return (
        <div id='form-wrapper'>
            <div className="flex">
                <form className="flex gap-4 w-full" onSubmit={(e) => handleSubmit(e)}>
                    <input style={{ backgroundColor: theme.secondaryColour, color: theme.textColour }} value={todo} onChange={(e) => setTodo(e.target.value)} className="flex flex-1 rounded-md px-4 py-3 dark:bg-[#33373B] dark:text-[#88888A]" placeholder="Enter todo" type="text" name="todo" id="todo" />
                    <button type="submit" className='px-4 py-3 bg-[#4F46E5] text-white font-medium rounded-md'>Add Todo</button>
                    <Toaster />
                </form>
            </div>
        </div>
    )
}

export default AddTodoForm