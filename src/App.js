import React from 'react'
import { createGlobalStyle } from 'styled-components';

import TodoTemplate from './components/views/TodoTemplate'
import TodoHead from './components/views/TodoHead'
import TodoList from './components/views/TodoList'
import TodoCreate from './components/views/TodoCreate'
import { TodoProvider } from './components/views/TodoContext'

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  )
}

export default App
