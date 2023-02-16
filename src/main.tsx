import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { defaultThemes } from './data/theme'


window.onload = () => {
  if (localStorage.getItem('todos') === null) {
    localStorage.setItem('todos', JSON.stringify([]))
    console.log('todos is null')
  }

  if (localStorage.getItem('directoryList') === null) {
    localStorage.setItem('directoryList', JSON.stringify(['home', 'personal', 'study', 'work']))
    console.log('directoryList is null')
  }

  if (localStorage.getItem('themePresets') === null) {
    localStorage.setItem('themePresets', JSON.stringify(defaultThemes))
    console.log('themePresets is null')
  }

  if(localStorage.getItem('currentTheme') === null) {
    localStorage.setItem('currentTheme', JSON.stringify(defaultThemes[0]))
    console.log('currentTheme is null')
  }
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
