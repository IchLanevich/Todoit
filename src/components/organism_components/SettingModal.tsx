import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setThemeState } from '../../features/todos/todosSlice'
import SelectOption from '../atomic_components/SelectOption'

const SettingModal = (props: any) => {
    const { setIsSettingOpen } = props

    const [theme, setTheme] = useState(localStorage.getItem('theme'))
    const [themePresetNames, setThemePresetNames] = useState(JSON.parse(localStorage.getItem('themePresets')!))

    const dispatch = useDispatch()

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setIsSettingOpen(false)
    }

    const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value)
        dispatch(setThemeState(e.target.value))
    }

    const generateSelectOptions = (options: string[]) => {
        return options.map((option: string) => {
            return <SelectOption value={option} text={option} />
        })
    }

    return (
        <div>
            <div id='modal-bg' onClick={(e) => handleCloseModal(e)} className='w-screen z-[0] h-screen fixed top-0 right-0 bg-black/25'></div>
            <div id='add-todo-form-modal' className='bg-white dark:bg-[#1E1E1E] p-6 fixed z-1 inset-0 h-max max-w-lg m-auto rounded'>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col justify-center">
                        <select onChange={(e) => handleChangeOption(e)} value={theme!} name="theme" id="theme">
                            {generateSelectOptions(themePresetNames)}
                        </select>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SettingModal