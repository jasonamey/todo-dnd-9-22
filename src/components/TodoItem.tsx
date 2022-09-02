import React, { useRef } from 'react'
import styled from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'

interface ITodoItemProps {
  id: string
  deleteTodo: (id: string) => void
  todoItemContent: string
  setComplete: (id: string, value: boolean) => void
  completed: boolean
  idx: number
  dropHandler: () => void
  setDragStartAndEndIdx: React.Dispatch<React.SetStateAction<number[]>>
  dragStartAndEndIdx: number[]
}

function TodoItem({
  id,
  deleteTodo,
  todoItemContent,
  setComplete,
  completed,
  idx,
  dropHandler,
  setDragStartAndEndIdx,
}: ITodoItemProps) {
  const dragItem: { current: number | null } = useRef(null)
  const dragOverItem: { current: number | null } = useRef(null)

  const dragStart = (e: React.DragEvent<HTMLLIElement>, position: number) => {
    dragItem.current = position
    setDragStartAndEndIdx((prev) => [position, prev[1]])
  }

  const dragEnter = (e: React.DragEvent<HTMLLIElement>, position: number) => {
    dragOverItem.current = position
    setDragStartAndEndIdx((prev) => [prev[0], position])
  }

  const dragEnd = () => {
    if (typeof dragOverItem.current === 'number') {
      dropHandler()
    }
    dragOverItem.current = null
  }

  const changeHandler = () => {
    setComplete(id, !completed)
  }

  return (
    <TodoItemWrapper
      draggable={true}
      onDragStart={(e) => dragStart(e, idx)}
      onDragEnter={(e) => dragEnter(e, idx)}
      onDragEnd={dragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="container-left">
        <label className="checkbox-container btn" htmlFor={id}>
          <input
            id={id}
            type="checkbox"
            checked={completed}
            onChange={changeHandler}
          />

          <span className="checkmark"></span>
        </label>
        <span className={`item-content ${completed && 'finished'}`}>
          {todoItemContent}
        </span>
      </div>
      <span className="delete-btn" onClick={() => deleteTodo(id)}>
        <IoCloseOutline />
      </span>
    </TodoItemWrapper>
  )
}

const TodoItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.appBackgroundColor};
  color: ${({ theme }) => theme.appColor};
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.appDiminishedColor};
  transition: all 0.5s;
  cursor: pointer;
  .container-left {
    display: flex;
    align-items: center;
    .checkbox-container {
      display: flex;
      height: 24px;
      align-items: center;
      position: relative;
      padding-left: 35px;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      input {
        position: absolute;
        opacity: 0;
        cursory: pointer;
        left: 0px;
        height: 20px;
        width: 20px;
        z-index: 1000;
      }
      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        border: 2px solid transparent;
        background: -webkit-linear-gradient(
              ${({ theme }) => theme.appBackgroundColor},
              ${({ theme }) => theme.appBackgroundColor}
            )
            padding-box,
          -webkit-linear-gradient(
              ${({ theme }) => theme.appDiminishedColor},
              ${({ theme }) => theme.appDiminishedColor}
            ) border-box;
        &:after {
          content: '';
          position: absolute;
          display: none;
        }
      }
      input:hover ~ .checkmark {
        background: -webkit-linear-gradient(
              ${({ theme }) => theme.appBackgroundColor},
              ${({ theme }) => theme.appBackgroundColor}
            )
            padding-box,
          -webkit-linear-gradient(left top, #70bff7 0%, #a774f2 100%) border-box;
      }
      input:checked ~ .checkmark {
        background: -webkit-linear-gradient(left top, #70bff7 0%, #a774f2 100%)
          border-box;
      }

      input:checked ~ .checkmark:after {
        display: block;
      }
      .checkmark:after {
        left: 5px;
        top: 0px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 1px 1px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
    .finished {
      text-decoration-line: line-through;
      color: ${({ theme }) => theme.appDiminishedColor};
    }
  }

  .delete-btn {
    cursor: pointer;
  }
  @media only screen and (max-width: 470px) {
  }
`

export default TodoItem
