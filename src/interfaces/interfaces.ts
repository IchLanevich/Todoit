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
    backgroundColour: string
    primaryColour: string
    secondaryColour: string
    tertiaryColour: string
    textColour: string
    textColourSecondary: string
    textColourTertiary: string
}