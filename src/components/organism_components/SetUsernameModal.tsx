import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentTheme, setUsernameState } from '../../features/todos/todosSlice'
import { Theme } from '../../interfaces/interfaces'



const SetUsernameModal = (props: any) => {
    const { setIsSetUsernameModalOpen } = props

    const dispatch = useDispatch()

    const theme: Theme = useSelector(selectCurrentTheme)

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
                <div style={{backgroundColor: theme.primaryColour}} className='p-6 fixed z-1 inset-0 h-max max-w-lg m-auto rounded'>
                    <h2 style={{color: theme.primaryTextColour}} className='text-2xl font-medium'>Welcome, please set your username!</h2>
                    <form className="flex flex-col gap-2 mt-6" onSubmit={(e) => handleOnSubmit(e)}>
                        <label style={{color: theme.primaryTextColour}} htmlFor="username" className='text-[#313233] font-medium'>Username</label>
                        <input style={{backgroundColor: theme.secondaryColour, color: theme.secondaryTextColour}} value={username} onChange={(e) => setUsername(e.target.value)} className="text-[#888F92] px-3 py-2 rounded" placeholder='Enter your username' type="text" id='username' />
                        <div className="submit-btn-wrapper w-full mt-4">
                            <button type="submit" className='w-full px-4 py-3 text-white bg-[#4F46E5] rounded'>Set Username</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SetUsernameModal