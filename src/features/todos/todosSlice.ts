import { Theme } from './../../interfaces/interfaces';
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { defaultThemes } from './../../data/theme';
import { createSlice, createAsyncThunk, PayloadAction, current } from '@reduxjs/toolkit';

interface Todo {
  id: string
  todo: string
  dueDate: string
  isImportant: boolean
  isCompleted: boolean
  description: string
  createdAt: string
  assignedAt: string
}

interface TodosState {
  todos: Todo[]
  status: string
  error: string | null
  sortBy: string
  viewLayout: string
  currentDir: string
  dirList: string[]
  themePresets: Theme[]
  currentTheme: object
  username: string
}

const initialState: TodosState = {
  todos: [],
  status: 'idle',
  error: null,
  sortBy: 'sort-by',
  viewLayout: localStorage.getItem('viewLayout') || 'block-view',
  currentDir: 'home',
  dirList: JSON.parse(localStorage.getItem('directoryList')!) || ['home', 'personal', 'study', 'work'],
  themePresets: JSON.parse(localStorage.getItem('themePresets')!) || defaultThemes,
  currentTheme: JSON.parse(localStorage.getItem('currentTheme')!) || defaultThemes[0],
  username: localStorage.getItem('username') || ''
}

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const storedTodos = await localStorage.getItem("todos")
    const data = await JSON.parse((storedTodos)!)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const addTodo = createAsyncThunk('todos/addTodo', async (todo: Todo) => {
  try {
    const storedTodos = await localStorage.getItem("todos")
    const data = await JSON.parse((storedTodos)!)
    const newTodoArray = [...data, todo]
    localStorage.setItem("todos", JSON.stringify(newTodoArray))
    return data
  } catch (error) {
    console.log(error)
  }
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: string) => {
  try {
    const storedTodos = await localStorage.getItem("todos")
    const data = JSON.parse((storedTodos)!)
    const newFilteredTodoArray = data.filter((todo: Todo) => todo.id !== id)
    localStorage.setItem("todos", JSON.stringify(newFilteredTodoArray))
    return data
  } catch (error) {
    console.log(error)
  }
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo: Todo) => {
  try {
    const { id }: { id: string } = todo
    const storedTodos =  await localStorage.getItem("todos")
    const data = await JSON.parse((storedTodos)!)
    const todoIndex = data.findIndex((item: Todo) => item.id === id)
    const updatedTodo = data[todoIndex] = todo
    const newUpdatedTodoArray = data.map((todo: Todo) => {
      return todo.id === id ? updatedTodo : todo
    })
    localStorage.setItem("todos", JSON.stringify(newUpdatedTodoArray))
  } catch (error) {
    console.log(error)
  }
})

export const updateIsCompleted = createAsyncThunk('todos/updateIsCompleted', async (todo: Todo) => {
  try {
    const { id }: { id: string } = todo
    const storedTodos = await localStorage.getItem("todos")
    const data = await JSON.parse((storedTodos)!)
    const todoIndex = data.findIndex((item: Todo) => item.id === id)
    const updatedTodo = data[todoIndex] = todo
    const newUpdatedTodoArray = data.map((todo: Todo) => {
      return todo.id === id ? updatedTodo : todo
    })
    localStorage.setItem("todos", JSON.stringify(newUpdatedTodoArray))
  } catch (error) {
    console.log(error)
  }
})

export const updateIsImportant = createAsyncThunk('todos/updateIsImportant', async (todo: Todo) => {
  try {
    const { id }: { id: string } = todo
    const storedTodos = await localStorage.getItem("todos")
    const data = await JSON.parse((storedTodos)!)
    const todoIndex = data.findIndex((item: Todo) => item.id === id)
    const updatedTodo = data[todoIndex] = todo
    console.log(updatedTodo)
    const newUpdatedTodoArray = data.map((todo: Todo) => {
      return todo.id === id ? updatedTodo : todo
    })
    localStorage.setItem("todos", JSON.stringify(newUpdatedTodoArray))
  } catch (error) {
    console.log(error)
  }
})


const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setSortByValue: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setViewLayoutValue: (state, action: PayloadAction<string>) => {
      localStorage.setItem('viewLayout', action.payload)
      state.viewLayout = localStorage.getItem('viewLayout')!
    },
    setCurrentDir: (state, action: PayloadAction<string>) => {
      state.currentDir = action.payload
    },
    addDir: (state, action: PayloadAction<string>) => {
      const newDirList = [...state.dirList, action.payload]
      state.dirList = newDirList
      localStorage.setItem('directoryList', JSON.stringify(newDirList))
    },
    deleteDir: (state, action: PayloadAction<string>) => {
      const dirNameToDelete = action.payload
      const newDirList = state.dirList.filter((dir: string) => dir !== dirNameToDelete)
      state.dirList = newDirList
      localStorage.setItem('directoryList', JSON.stringify(newDirList))
    },
    editDirName: (state, action: PayloadAction<{ dirName: string, newDirName: string }>) => {
      const { dirName, newDirName } = action.payload
      const dirIndex = state.dirList.findIndex((dir: string) => dir === dirName)
      const newDirList = state.dirList[dirIndex] = newDirName
      localStorage.setItem('directoryList', JSON.stringify(newDirList))
    },
    setUsernameState: (state, action: PayloadAction<string>) => {
      state.username = action.payload
      localStorage.setItem('username', action.payload)
    },
    setCurrentTheme: (state, action: PayloadAction<string>) => {
      const theme = state.themePresets.find((theme: any) => theme.themeName === action.payload)
      if (theme) {
        state.currentTheme = theme
      }
      localStorage.setItem('currentTheme', JSON.stringify(theme))
    },
    addThemePreset: (state, action: PayloadAction<Theme>) => {
      const newThemePreset = [...state.themePresets, action.payload]
      state.themePresets = newThemePreset
      localStorage.setItem('themePresets', JSON.stringify(newThemePreset))
    },
    updateThemePreset: (state, action: PayloadAction<{updatedThemeObject: Theme, oldThemeObject: Theme}>) => {
      const {updatedThemeObject, oldThemeObject} = action.payload
      const themeToUpdateIndex = state.themePresets.findIndex((theme: Theme) => theme.themeName === oldThemeObject.themeName)
      state.themePresets[themeToUpdateIndex] = updatedThemeObject
      localStorage.setItem('themePresets', JSON.stringify(state.themePresets))
    },
    deleteThemePreset: (state, action: PayloadAction<string>) => {
      const themeNameToDelete = action.payload
      const newThemePresets = state.themePresets.filter((theme: any) => theme.themeName !== themeNameToDelete)
      state.themePresets = newThemePresets
      localStorage.setItem('themePresets', JSON.stringify(newThemePresets))
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTodos.pending,
      (state: any) => {
        state.status = "loading";
      });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });
  },
})

export const { setSortByValue, setCurrentTheme, deleteThemePreset, updateThemePreset, setViewLayoutValue, setCurrentDir, addDir, deleteDir, addThemePreset, setUsernameState, editDirName } = todosSlice.actions

export default todosSlice.reducer

export const selectAllTodos = (state: any) => state.todos.todos
export const selectTodosStatus = (state: any) => state.todos.status
export const selectSortBy = (state: any) => state.todos.sortBy
export const selectViewLayout = (state: any) => state.todos.viewLayout
export const selectCurrentDir = (state: any) => state.todos.currentDir
export const selectDirList = (state: any) => state.todos.dirList
export const selectUsername = (state: any) => state.todos.username
export const selectCurrentTheme = (state: any) => state.todos.currentTheme
export const selectThemePresets = (state: any) => state.todos.themePresets