export interface Todo {
    id: string
    todo: string
    dueDate: string
    isImportant: boolean
    isCompleted: boolean
    description: string
    createdAt: string
    assignedAt: string
}

export interface Theme {
    id: string
    themeName: string
    backgroundColour: string
    primaryColour: string
    secondaryColour: string
    accentColour: string
    primaryTextColour: string
    secondaryTextColour: string
    successColour: '#10B981',
    iconColour: string
    [key: string]: string
}
