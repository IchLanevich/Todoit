import React, { ChangeEventHandler, Dispatch, SetStateAction } from 'react'

interface CheckboxProps {
    checkedValue: boolean;
    handleOnChange: ChangeEventHandler<HTMLInputElement>
    id: string;
    text: string;
}

const CheckBoxInputAndLabel = (props: CheckboxProps) => {
    const { checkedValue, handleOnChange, id, text } = props
    return (
        <div className="flex flex-row items-center flex-1 gap-2">
            <input id={id} checked={checkedValue} onChange={handleOnChange} className="bg-[#EEEEEE] h-4 w-4 text-[#888F92] px-3 py-2 rounded" type="checkbox" />
            <label htmlFor={id} className='select-none font-medium'>{text}</label>
        </div>
    )
}

export default CheckBoxInputAndLabel