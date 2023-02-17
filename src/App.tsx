import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import Greeting from './components/Greeting';
import TodoToolbar from './components/TodoToolbar';
import NavigationSidebar from './components/NavigationSidebar';
import { useSelector } from 'react-redux';
import { selectCurrentTheme, selectThemePresets } from './features/todos/todosSlice';
import { Theme } from './interfaces/interfaces';
import { get } from 'immer/dist/internal';
import Test from './Test';

function App() {

  const theme: Theme = useSelector(selectCurrentTheme)

  const bodyElement = document.querySelector('body')

  useEffect(() => {
    if (bodyElement) {
      bodyElement.style.backgroundColor = theme.backgroundColour
    }
  }, [theme])

  return (
    <div className={`App flex h-screen dark:bg-[#121212]`}>
      <header className='fixed'>
        <NavigationSidebar />
      </header>

      <main className="flex flex-col mx-auto w-full max-w-6xl ">
        <section className="container mx-auto my-8">
          <Greeting />
        </section>

        <section className="container mx-auto my-8">
          <Test />
        </section>

        <section className="container mx-auto mt-4">
          <TodoToolbar />
        </section>

        <section className="container mx-auto mt-4">
          <AddTodoForm />
        </section>

        <section className="container mx-auto mt-8">
          <TodoList />
        </section>

      </main>
    </div>
  )
}

export default App
