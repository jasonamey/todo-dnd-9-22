import React, { useState, useEffect } from 'react'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'
import TodoFooter from './TodoFooter'
import { GlobalStyles } from '../styles/GlobalStyles'
import styled, { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../styles/Themes'
import { IoSunny, IoMoonSharp } from 'react-icons/io5'
import { ITodo, ITheme, FilterType } from '../utilities/types'

type ModeType = 'dark' | 'light'

const App = () => {
  const [todo, setTodo] = useState('')
  const [viewFilter, setViewFilter] = useState<FilterType>('all')
  const [mode, setMode] = useState<ModeType>('dark')
  const [dragStartAndEndIdx, setDragStartAndEndIdx] = useState<number[]>([0, 0])
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      return JSON.parse(savedTodos)
    } else {
      return []
    }
  })
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  const handleAddFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setTodos([
      {
        id: todo.trim(),
        text: todo.trim(),
        completed: false,
      },
      ...todos,
    ])
    setTodo('')
  }

  const handleCompleteStatus = (id: string, value: boolean) => {
    const idx = todos.findIndex((item) => item.id === id)
    const updatedTodos = [...todos]
    updatedTodos[idx].completed = value
    setTodos(updatedTodos)
  }

  const handleDelete = (id: string) => {
    const newItems = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(newItems)
  }

  const handleTodosToView = (viewFilterSet: 'all' | 'completed' | 'active') => {
    const todosToView = [...todos]

    switch (viewFilterSet) {
      case 'all':
        return todosToView
      case 'completed':
        return todosToView.filter((item) => {
          if (item.completed === true) {
            return item
          } else {
            return
          }
        })

      case 'active':
        return todosToView.filter((item) => {
          if (item.completed === false) {
            return item
          } else {
            return
          }
        })
      default:
        return todosToView
    }
  }

  const clearCompleted = () => {
    const newTodos = todos.filter((item) => item.completed !== true)
    setTodos(newTodos)
  }

  const dropHandler = () => {
    const copyListItems = [...todos]
    const dragItemContent = copyListItems[dragStartAndEndIdx[0]]
    copyListItems.splice(dragStartAndEndIdx[0], 1)
    copyListItems.splice(dragStartAndEndIdx[1], 0, dragItemContent)

    setTodos(copyListItems)
  }
  const todosToViewContent = handleTodosToView(viewFilter)

  const theme = mode === 'dark' ? darkTheme : lightTheme
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppWrapper>
        <header>
          <h1>todo</h1>
          {mode === 'light' && (
            <IoMoonSharp onClick={() => setMode('dark')} className="sun-icon" />
          )}
          {mode === 'dark' && (
            <IoSunny onClick={() => setMode('light')} className="sun-icon" />
          )}
        </header>
        <TodoForm
          onFormSubmit={handleAddFormSubmit}
          onInputChange={handleChange}
          todoContent={todo}
        />
        <section className="todo-content">
          <ul className="todo-list">
            {todosToViewContent.map(({ text, id, completed }, idx) => (
              <TodoItem
                key={idx}
                idx={idx}
                todoItemContent={text}
                id={id}
                deleteTodo={handleDelete}
                setComplete={handleCompleteStatus}
                completed={completed}
                dropHandler={dropHandler}
                setDragStartAndEndIdx={setDragStartAndEndIdx}
                dragStartAndEndIdx={dragStartAndEndIdx}
              />
            ))}
          </ul>
        </section>
        <TodoFooter
          clearCompleted={clearCompleted}
          todosLength={todos.length}
          viewFilter={viewFilter}
          setViewFilter={setViewFilter}
        />
        <div className="drop-note">
          <p>Drag and drop to reorder list</p>
        </div>
      </AppWrapper>
    </ThemeProvider>
  )
}

const AppWrapper = styled.div<{ theme: ITheme }>`
  width: 476px;
  margin-top: 68px;
  display: flex;
  flex-direction: column;
  header {
    color: ${({ theme }) => theme.appHeadlineColor};
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    h1 {
      text-transform: uppercase;
      font-size: 34px;
      letter-spacing: 16px;
      font-weight: 700;
    }
    .sun-icon {
      font-size: 22px;
      cursor: pointer;
    }
  }
  .todo-content {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    overflow: hidden;
    margin-top: 24px;
  }
  .mobile {
    display: none;
  }
  .drop-note {
    text-align: center;
    padding: 20px 0;
    color: ${({ theme }) => theme.appDiminishedColor};
    font-weight: 500;
    font-size: 12px;
  }
  @media only screen and (max-width: 470px) {
    width: 320px;
    .todo-footer {
      .center {
        position: absolute;
        .footer-actions {
          display: none;
        }
      }
      .left {
        flex: 0.5;
      }
      .right {
        flex: 0.5;
        justify-content: flex-end;
      }
      margin-bottom: 16px;
    }
    .mobile {
      display: flex;
      justify-content: center;
      padding: 16px 20px;
      background-color: ${({ theme }) => theme.appBackgroundColor};
      border-radius: 3px;
      transition: all 0.5s;
    }
    .footer-actions {
      display: flex;
      flex: 0.6;
      justify-content: space-between;
      color: ${({ theme }) => theme.appDiminishedColor};
    }
  }
`
export default App
