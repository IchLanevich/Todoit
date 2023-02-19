import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUsernameState } from '../../features/todos/todosSlice'



const SetUsernameModal = (props: any) => {
    const { setIsSetUsernameModalOpen } = props

    const dispatch = useDispatch()

    const [username, setUsername] = useState<string>('')

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsSetUsernameModalOpen(false)
    }

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setUsernameState(username))
        setIsSetUsernameModalOpen(false)
    }

    return (
        <>
            <div>
                <div id='modal-bg' onClick={(e) => handleCloseModal(e)} className='w-screen z-[0] h-screen fixed top-0 right-0 bg-black/25'></div>
                <div id='add-todo-form-modal' className='bg-white p-6 fixed z-1 inset-0 h-max max-w-lg m-auto rounded'>
                    <h1 className='text-2xl font-medium'>Welcome, please set your username!</h1>
                    <form className="flex flex-col gap-2 mt-8" onSubmit={(e) => handleOnSubmit(e)}>
                        <label htmlFor="username" className='text-[#313233] font-medium'>Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} className="bg-[#EEEEEE] text-[#888F92] px-3 py-2 rounded" placeholder='Enter your username' type="text" id='username' />
                        <div className="submit-btn-wrapper w-full">
                            <button type="submit" className='w-full px-4 py-3 text-white bg-[#4F46E5] rounded'>Set Username</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SetUsernameModal