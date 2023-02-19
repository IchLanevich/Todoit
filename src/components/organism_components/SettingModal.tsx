import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentTheme} from '../../features/todos/todosSlice'
import { Theme } from '../../interfaces/interfaces'
import SelectOption from '../atomic_components/SelectOption'

const SettingModal = (props: any) => {
    const { setIsSettingOpen } = props

    const theme: Theme = JSON.parse(localStorage.getItem('currentTheme')!)

    const [themeVal, setThemeVal] = useState(JSON.parse(localStorage.getItem('currentTheme')!).themeName)
    const [themePresetNames, setThemePresetNames] = useState(JSON.parse(localStorage.getItem('themePresets')!).map((theme: any) => theme.themeName))

    const dispatch = useDispatch()

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setIsSettingOpen(false)
    }

    const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setThemeVal(e.target.value)
        dispatch(setCurrentTheme(e.target.value))
    }

    const generateSelectOptions = (options: string[]) => {
        return options.map((option: string, index) => {
            return <SelectOption key={index} value={option} text={option} />
        })
    }

    return (
        <div>
            <div id='modal-bg' onClick={(e) => handleCloseModal(e)} className='w-screen z-[0] h-screen fixed top-0 right-0 bg-black/25'></div>
            <div style={{ backgroundColor: theme.primaryColour, color: theme.primaryTextColour }} id='add-todo-form-modal' className='p-6 fixed z-1 inset-0 h-max max-w-lg m-auto rounded'>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col justify-center">
                        <select style={{ backgroundColor: theme.secondaryColour }} className='px-3 py-2' value={themeVal} onChange={(e) => handleChangeOption(e)} name="theme" id="theme">
                            {generateSelectOptions(themePresetNames)}
                        </select>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SettingModal