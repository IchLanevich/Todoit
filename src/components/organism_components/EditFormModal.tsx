import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { ThunkDispatch } from "@reduxjs/toolkit";
import { addTodo, fetchTodos, selectCurrentDir, selectCurrentTheme, selectDirList, updateIsCompleted, updateTodo } from '../../features/todos/todosSlice';
import { v4 as uuidv4 } from 'uuid'
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import toast, { Toaster } from 'react-hot-toast';
import SelectOption from '../atomic_components/SelectOption';
import CheckBoxInputAndLabel from '../molecule_components/CheckBoxInputAndLabel';
import { Theme } from '../../interfaces/interfaces';

interface EditFormModalProps {
    id: string
    todo: string
    dueDate: string
    isImportant: boolean
    isCompleted: boolean
    description: string
    createdAt: string
    assignedAt: string
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

const EditFormModal: React.FC<EditFormModalProps> = (props: EditFormModalProps) => {
    const currentDir = useSelector(selectCurrentDir)
    const theme: Theme = useSelector(selectCurrentTheme)

    const { setIsModalOpen, todo, isImportant, isCompleted, description, } = props
    const [newDueDate, setNewDueDate] = useState<any>('')
    const [newTodo, setNewTodo] = useState<string>(todo)
    const [newDescription, setNewDescription] = useState<string>(description)
    const [newIsCompleted, setNewIsCompleted] = useState<boolean>(isCompleted)
    const [newIsImportant, setNewIsImportant] = useState<boolean>(isImportant)
    const [newAssignedAt, setNewAssignedAt] = useState<string>(currentDir)


    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

    const dirList = useSelector(selectDirList)

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await dispatch(updateTodo({
            id: props.id,
            todo: newTodo,
            dueDate: newDueDate ? newDueDate.toLocaleDateString('en-GB', dateOptions) : '-',
            isImportant: newIsImportant,
            isCompleted: newIsCompleted,
            description: newDescription,
            createdAt: props.createdAt,
            assignedAt: newAssignedAt
        }))

        dispatch(fetchTodos())
        setIsModalOpen(false)
    }

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setIsModalOpen(false)
    }

    const renderDirListSelectOption = () => {
        return dirList.map((dir: string) => {
            return <SelectOption key={dir} value={dir} text={dir} />
        })
    }

    useEffect(() => { }, [theme])

    return (
        <>
            <div id='modal-bg' onClick={(e) => handleCloseModal(e)} className='w-screen z-[0] h-screen fixed top-0 right-0 bg-black/25'></div>
            <div style={{ backgroundColor: theme.primaryColour, color: theme.primaryTextColour }} id='add-todo-form-modal' className=' p-6 fixed z-1 inset-0 h-max max-w-lg m-auto rounded'>
                <form className="flex flex-col gap-4" onSubmit={(e) => handleEdit(e)}>
                    <div className="flex flex-col flex-1 gap-2">
                        <label htmlFor="todoTask" className='font-medium'>Todo</label>
                        <input style={{ backgroundColor: theme.secondaryColour }} value={newTodo} onChange={(e) => setNewTodo(e.target.value)} className="px-3 py-2 rounded" placeholder='Enter todo' type="text" id='todoTask' />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <label htmlFor="todoDescription" className='font-medium'>Description</label>
                        <textarea style={{ backgroundColor: theme.secondaryColour }} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="px-3 py-2 rounded" name="todoDescription" placeholder='Enter todo description' id="todoDescription" cols={30} rows={10}></textarea>
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <label htmlFor="todoDueDate" className='font-medium'>Due Date</label>
                        <div style={{ backgroundColor: theme.secondaryColour }} className="max-w-fit rounded">
                            <ReactDatePicker className={`px-3 bg-transparent py-2 rounded`} selected={newDueDate} onChange={(date) => setNewDueDate(date)} placeholderText={'Select due date'} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <CheckBoxInputAndLabel checkedValue={newIsCompleted} handleOnChange={() => setNewIsCompleted(state => !state)} id={'todoIsCompleted'} text='Is Completed' />
                        <CheckBoxInputAndLabel checkedValue={newIsImportant} handleOnChange={() => setNewIsImportant(state => !state)} id={'todoIsImportant'} text='Is Important' />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="assignetAt" className='font-medium'>Move to</label>
                        <select style={{ backgroundColor: theme.secondaryColour, color: theme.primaryTextColour }} className='px-3 py-2 border-r-8 border-transparent rounded-md'
                            name="assignedAt"
                            id="assignetAt"
                            value={newAssignedAt}
                            onChange={(e) => setNewAssignedAt(e.target.value)}
                        >
                            {renderDirListSelectOption()}
                        </select>
                    </div>
                    <div className="submit-btn-wrapper w-full">
                        <button type="submit" className='w-full px-4 py-3 text-white bg-[#4F46E5] rounded'>Save Changes</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default EditFormModal