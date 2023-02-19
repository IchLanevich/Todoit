import React from 'react'
import { capitalize } from '../../utils/capitalize'

interface SelectOptionProps {
    value: string
    text: string
}

const SelectOption: React.FC<SelectOptionProps> = (props) => {
    const { value, text } = props

    return (
        <option value={value.toLowerCase()}>{capitalize(text)}</option>
    )
}

export default SelectOption