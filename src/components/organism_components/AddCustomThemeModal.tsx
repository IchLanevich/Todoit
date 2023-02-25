import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addThemePreset, selectCurrentTheme } from '../../features/todos/todosSlice'
import { Theme } from '../../interfaces/interfaces'
import { v4 as uuidv4 } from 'uuid'
import { blockIcon, deleteIcon, listIcon, settingIcon, starIcon, themeIcon, threeDotsVerticalIcon } from '../../assets'
import { BlockIcon, DeleteIcon, ListIcon, SettingIcon, StarIcon, ThemeIcon } from '../atomic_components/Icons/Icons'

interface AddCustomThemeModalProps {
    setIsThemeSettingOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddCustomThemeModal = (props: AddCustomThemeModalProps) => {
    const { setIsThemeSettingOpen } = props
    const theme: Theme = useSelector(selectCurrentTheme)

    const dispatch = useDispatch()

    const [newTheme, setNewTheme] = useState<Theme>({
        id: uuidv4(),
        themeName: '',
        backgroundColour: '#C0C0C0',
        primaryColour: '#FFFFFF',
        secondaryColour: '#E6E6E6',
        accentColour: '#4F46E5',
        primaryTextColour: '#000000',
        secondaryTextColour: '#888888',
        successColour: '#10B981',
        iconColour: '#000000'
    })

    const handleCloseModal = () => {
        setIsThemeSettingOpen(false)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsThemeSettingOpen(false)
        dispatch(addThemePreset(newTheme))
    }

    const createColorInputAndLabel = (id: string, labelText: string, handleSetState: React.Dispatch<React.SetStateAction<Theme>>, propName: string) => {

        return (
            <>
                <div className="flex flex-col w-full gap-[6px]">
                    <label htmlFor={id} className='font-medium'>{labelText}</label>
                    <input style={{ backgroundColor: theme.secondaryColour }} value={newTheme[propName]} onChange={(e) => handleSetState({ ...newTheme, [propName]: e.target.value })} className='flex w-full p-1 h-10 rounded' type="color" name={id} id={id} />
                </div>
            </>
        )
    }

    return (
        <>
            <div id='modal-bg' onClick={() => handleCloseModal()} className='w-screen backdrop-blur-sm z-[0] h-screen fixed top-0 right-0 bg-black/50'></div>
            <div className="flex flex-row-reverse gap-8 p-6 fixed z-1 inset-0 h-max w-fit m-auto rounded">
                <div style={{ backgroundColor: theme.primaryColour, color: theme.primaryTextColour }} className='p-6 w-[460px] h-fit m-auto rounded'>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col flex-1 gap-2">
                            <label htmlFor="themeName" className='font-medium'>Theme name</label>
                            <input onChange={(e) => setNewTheme(state => ({ ...state, themeName: e.target.value }))} style={{ backgroundColor: theme.secondaryColour }} placeholder='Theme name' type="text" id='themeName' className='rounded w-full px-3 py-2' />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex w-full gap-4">
                                {createColorInputAndLabel('backgroundColour', 'Background', setNewTheme, 'backgroundColour')}
                                {createColorInputAndLabel('primaryColour', 'Primary', setNewTheme, 'primaryColour')}
                                {createColorInputAndLabel('secondaryColour', 'Secondary', setNewTheme, 'secondaryColour')}
                                {createColorInputAndLabel('accentColour', 'Accent', setNewTheme, 'accentColour')}
                            </div>
                            <div className="flex w-full gap-4">
                                {createColorInputAndLabel('primaryTextColour', 'Primary Text', setNewTheme, 'primaryTextColour')}
                                {createColorInputAndLabel('secondaryTextColour', 'Secondary Text', setNewTheme, 'secondaryTextColour')}
                                {createColorInputAndLabel('iconColour', 'Icon', setNewTheme, 'iconColour')}
                            </div>
                            <div className="flex w-1/4 gap-4">
                                {createColorInputAndLabel('successColour', 'Success', setNewTheme, 'successColour')}
                            </div>
                        </div>
                        <div className="submit-btn-wrapper w-full mt-2">
                            <button style={{backgroundColor: theme.accentColour, color: '#FFF'}} type="submit" className='w-full px-4 py-3 rounded'>Save Theme Preset</button>
                        </div>
                    </form>
                </div>
                <div style={{ backgroundColor: theme.primaryColour, color: theme.primaryTextColour }} className="flex flex-col gap-6 p-6 h-max max-w-lg m-auto rounded min-w-[400px]">
                    <h2 className='font-medium'>Example</h2>
                    <div style={{ backgroundColor: newTheme.backgroundColour }} className="flex flex-col gap-4 p-4 rounded border border-black">
                        <div style={{ backgroundColor: newTheme.secondaryColour, color: newTheme.primaryTextColour }} className="flex rounded-md items-center px-4 py-[14px]">
                            <h4 className='flex flex-1 font-medium text-sm'>Hovered or Active</h4>
                            <div className='px-2 py-1'>5</div>
                        </div>
                        <div style={{ backgroundColor: newTheme.primaryColour, color: newTheme.primaryTextColour }} className="flex rounded-md items-center px-4 py-[14px]">
                            <h4 className='flex flex-1 font-medium text-sm'>Idle</h4>
                            <div className='px-2 py-1'>0</div>
                        </div>
                        <div style={{ backgroundColor: newTheme.primaryColour }} className='todo-item flex flex-col w-full max-w-[336px] min-h-[260px] p-[25px] rounded-md bg-[#FFFFFF]'>
                            <h4 style={{ color: newTheme.primaryTextColour }} className='flex font-medium text-lg leading-[20px] mb-2'>Todo</h4>
                            <p style={{ color: newTheme.secondaryTextColour }} className='flex grow max-h-[300px] font-normal text-sm leading-[18px]'>Lorem ipsum dolor sit amet consectetur. Risus non dolor in non magna.</p>
                            <p style={{ color: newTheme.secondaryTextColour }} className='flex grow-0 items-center gap-3 flex-1 mb-4 font-normal text-sm leading-[18px]'>
                            </p>
                            <div className="separator w-full h-[1px] bg-[#D3D3D3]"></div>
                            <div className="mt-4 flex items-center">
                                <input
                                    id='isCompleted'
                                    className='hidden'
                                    type="checkbox" />
                                <label style={{ color: newTheme.successColour }} className='select-none flex flex-1 gap-2 text-base leading-[20px] min-w-[160px] font-normal' htmlFor='isCompleted'><div style={{ backgroundColor: newTheme.successColour }} className='h-6 w-6 rounded-lg'></div>completed</label>
                                <div className="flex gap-2">
                                    <button style={{ color: newTheme.iconColour }} className='hasHoverEffect p-1 rounded'>{starIcon}</button>
                                    <button style={{ color: newTheme.iconColour }} className='hasHoverEffect p-1 rounded'>{deleteIcon}</button>
                                    <button style={{ color: newTheme.iconColour }} className='hasHoverEffect p-1 rounded'>{threeDotsVerticalIcon}</button>
                                </div>
                            </div>
                        </div>
                        <div style={{ backgroundColor: newTheme.primaryColour }} className="flex px-4 py-4 rounded-md justify-center">
                            <div style={{ color: newTheme.iconColour }} className="flex gap-4">
                                {blockIcon}
                                {listIcon}
                                {deleteIcon}
                                {settingIcon}
                                {themeIcon}
                                {starIcon}
                            </div>
                        </div>
                        <div className="submit-btn-wrapper w-full mt-2">
                            <button type="submit" style={{ backgroundColor: newTheme.accentColour }} className='w-full px-4 py-3 text-white rounded'>Accent</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCustomThemeModal