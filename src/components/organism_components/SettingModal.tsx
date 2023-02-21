import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectThemePresets, setCurrentTheme } from '../../features/todos/todosSlice'
import { Theme } from '../../interfaces/interfaces'
import { capitalize } from '../../utils/capitalize'
import DivSelectOption from '../atomic_components/DivSelectOption'
import SelectOption from '../atomic_components/SelectOption'
import DivSelectModal from './DivSelectModal'

const SettingModal = (props: any) => {
    const { setIsSettingOpen } = props

    const theme: Theme = JSON.parse(localStorage.getItem('currentTheme')!)

    const [themeVal, setThemeVal] = useState(JSON.parse(localStorage.getItem('currentTheme')!).themeName)
    const [themePresetNames, setThemePresetNames] = useState(JSON.parse(localStorage.getItem('themePresets')!).map((theme: any) => theme.themeName))
    const [isShowSelectDiv, setIsShowSelectDiv] = useState(false)

    const dispatch = useDispatch()

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setIsSettingOpen(false)
    }

    const themePresets = useSelector(selectThemePresets)


    useEffect(() => { }, [themePresets])

    return (
        <div>
            <div id='modal-bg' onClick={(e) => {
                handleCloseModal(e)
            }} className='w-screen h-screen backdrop-blur-sm fixed top-0 right-0 bg-black/25'></div>
            <div style={{ backgroundColor: theme.primaryColour, color: theme.primaryTextColour }} className='flex flex-col p-6 fixed inset-0 h-max max-w-lg m-auto rounded'>
                <div className="flex flex-col gap-2">
                    <h4 style={{ color: theme.primaryTextColour }} className='font-medium'>Select Theme</h4>
                    {isShowSelectDiv ? <div onClick={() => setIsShowSelectDiv(false)} className="w-screen h-screen fixed bg-transparent inset-0"></div> : null}
                    <div onClick={() => setIsShowSelectDiv(true)} className="relative">
                        <div style={{ backgroundColor: theme.secondaryColour }} className="flex w-full px-4 py-2 rounded select-none" translate='no'>{capitalize(themeVal)}</div>
                        {isShowSelectDiv ? <DivSelectModal setThemeVal={setThemeVal} /> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingModal