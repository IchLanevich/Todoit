import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentTheme, selectThemePresets } from '../../features/todos/todosSlice'
import { Theme } from '../../interfaces/interfaces'
import DivSelectOption from '../atomic_components/DivSelectOption'

interface Props {
    setThemeVal: React.Dispatch<React.SetStateAction<string>>
}

const DivSelectModal = ({ setThemeVal }: Props) => {
    const theme: Theme = useSelector(selectCurrentTheme)

    const themePresetNames = useSelector(selectThemePresets).map((theme: Theme) => theme.themeName)

    const renderDivSelectOptions = (themeNames: string[]) => {
        return themeNames.map((themeName: string) => {
            return <DivSelectOption setThemeVal={setThemeVal} key={themeName} selectValue={themeName} />
        })
    }

    useEffect(() => {}, [themePresetNames, theme])

    return (
        <div style={{ backgroundColor: theme.secondaryColour, border: `1px solid ${theme.secondaryTextColour}` }} className="flex flex-col w-full max-h-40 overflow-y-scroll border rounded absolute">
            {themePresetNames && renderDivSelectOptions(themePresetNames)}
        </div>
    )
}

export default DivSelectModal