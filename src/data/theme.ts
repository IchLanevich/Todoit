
const theme = {
    id: '1',
    themeName: 'light',
    backgroundColour: '#CCCCCC',
    primaryColour: '#FFFFFF',
    secondaryColour: '#F2F3F5',
    tertiaryColour: '#FFFFFF',
    accentColour: '#4F46E5',
    textColour: '#000000',
    textColourSecondary: '#888888',
}

export const defaultThemes = [
    {
        id: '1',
        themeName: 'light',
        backgroundColour: '#CCCCCC',
        primaryColour: '#FFFFFF',
        secondaryColour: '#F2F3F5',
        tertiaryColour: '#FFFFFF',
        accentColour: '#4F46E5',
        textColour: '#000000',
        textColourSecondary: '#888888',
    },
    {
        id: '2',
        themeName: 'dark',
        backgroundColour: '#121212',
        primaryColour: '#1E1E1E',
        secondaryColour: '#33373B',
        tertiaryColour: '#33373B',
        accentColour: '#4F46E5',
        textColour: '#B3B3B3',
        textColourSecondary: '#888888',
    }

]

export const currentTheme = {
    id: theme.id,
    themeName: theme.themeName,
    backgroundColour: theme.backgroundColour,
    primaryColour: theme.primaryColour,
    secondaryColour: theme.secondaryColour,
    tertiaryColour: theme.tertiaryColour,
    accentColour: theme.accentColour,
    textColour: theme.textColour,
    textColourSecondary: theme.textColourSecondary,
}