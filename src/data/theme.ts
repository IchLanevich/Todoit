import { v4 as uuidv4 } from 'uuid'

export const defaultThemes = [
    {
        id: uuidv4(),
        themeName: 'light',
        backgroundColour: '#EFEFEF',
        primaryColour: '#FFFFFF',
        secondaryColour: '#F2F3F5',
        accentColour: '#4F46E5',
        primaryTextColour: '#19131B',
        secondaryTextColour: '#888888',
        successColour: '#10B981',
        iconColour: '#19131B'
    },
    {
        id: uuidv4(),
        themeName: 'dark',
        backgroundColour: '#131313',
        primaryColour: '#1E1E1E',
        secondaryColour: '#33373B',
        accentColour: '#4F46E5',
        primaryTextColour: '#B3B3B3',
        secondaryTextColour: '#888888',
        successColour: '#10B981',
        iconColour: '#B3B3B3',
    },

]

