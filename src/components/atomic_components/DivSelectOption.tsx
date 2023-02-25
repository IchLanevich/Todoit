import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { deleteThemePreset, getThemePresets, selectCurrentTheme, selectThemePresets, setCurrentTheme } from '../../features/todos/todosSlice'
import { Theme } from '../../interfaces/interfaces'
import { capitalize } from '../../utils/capitalize'
import EditCustomThemeModal from '../organism_components/EditCustomThemeModal'
import { DeleteIcon, EditIcon } from './Icons/Icons'

interface Props {
    selectValue: string
    setThemeVal: React.Dispatch<React.SetStateAction<string>>
}

const DivSelectOption = ({ selectValue, setThemeVal }: Props) => {
    const [isEditThemePreset, setIsEditThemePreset] = useState(false)

    const theme: Theme = useSelector(selectCurrentTheme)
    const themePresets = useSelector(selectThemePresets)
    const dispatch = useDispatch()

    const divOptionRef = useRef<HTMLDivElement>(null)
    const deleteButtonRef = useRef<HTMLButtonElement>(null)
    const editButtonRef = useRef<HTMLButtonElement>(null)

    const handleDivSelect = (ref: React.RefObject<HTMLDivElement> | React.RefObject<HTMLButtonElement>, bgColor: string) => {
        if (ref.current) {
            ref.current.addEventListener('mouseover', () => {
                ref.current!.style.backgroundColor = bgColor
            })
            ref.current.addEventListener('mouseout', () => {
                ref.current!.style.backgroundColor = 'transparent'
            })
        }
    }

    const handleSelectValue = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setThemeVal(e.currentTarget.dataset.value!)
        dispatch(setCurrentTheme(e.currentTarget.dataset.value!))
        divOptionRef.current!.style.backgroundColor = 'transparent'
    }


    const handleDeleteThemePreset = (selectValue: string) => {
        if (selectValue !== 'light' && selectValue !== 'dark') {
            dispatch(deleteThemePreset(selectValue.toLowerCase()))
            dispatch(setCurrentTheme('light'))
        }
        toast("❌ Can't delete default theme", {
            duration: 3000,
            style: {
                backgroundColor: theme.secondaryColour,
                color: theme.primaryTextColour,
                borderRadius: '6px',
                fontSize: '16px',
                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                fontWeight: 500,
            },
        })

    }

    const createDivSelectButton = (handleFunction: any, icon: JSX.Element, ref: React.RefObject<HTMLButtonElement>) => {
        return (
            <div className="flex items-center" onClick={handleFunction}>
                <button ref={ref} className='hasHoverEffect px-3 h-full'>{icon}</button>
            </div>
        )
    }

    useLayoutEffect(() => {
        handleDivSelect(divOptionRef, theme.primaryColour)
        handleDivSelect(deleteButtonRef, theme.accentColour)
        handleDivSelect(editButtonRef, theme.accentColour)
    }, [theme, themePresets])

    return (
        <div ref={divOptionRef} className='flex w-full rounded select-none' translate='no'>
            <div className="flex w-full">
                <span data-value={selectValue} onClick={(e) => handleSelectValue(e)} className="flex flex-1 px-4 py-2">{capitalize(selectValue)}</span>
                {createDivSelectButton(() => handleDeleteThemePreset(selectValue), <DeleteIcon colorProp='primaryTextColour' classProp='w-5 h-5' />, deleteButtonRef)}
                {createDivSelectButton(() => setIsEditThemePreset(true), <EditIcon colorProp='primaryTextColour' classProp='w-5 h-5' />, editButtonRef)}
            </div>
            {isEditThemePreset && <EditCustomThemeModal setIsEditThemePreset={setIsEditThemePreset} selectValue={selectValue} />}
            <Toaster />
        </div>
    )
}

export default DivSelectOption