import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './app/store'
import { Provider, useSelector } from 'react-redux'
import { defaultThemes } from './data/theme'

if (localStorage.getItem('todos') === null) {
  localStorage.setItem('todos', JSON.stringify([]))
}

if (localStorage.getItem('directoryList') === null) {
  localStorage.setItem('directoryList', JSON.stringify(['home', 'personal', 'study', 'work']))
}

if (localStorage.getItem('themePresets') === null) {
  localStorage.setItem('themePresets', JSON.stringify(defaultThemes))
}

if (localStorage.getItem('currentTheme') === null) {
  localStorage.setItem('currentTheme', JSON.stringify(defaultThemes[0]))
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
