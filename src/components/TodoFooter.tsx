import React from 'react'
import styled from 'styled-components'
import { FilterType } from '../utilities/types'

interface ITodoFooterProps {
  todosLength: number
  clearCompleted: () => void
  viewFilter: FilterType
  setViewFilter: React.Dispatch<React.SetStateAction<FilterType>>
}

const TodoFooter = ({
  todosLength,
  clearCompleted,
  viewFilter,
  setViewFilter,
}: ITodoFooterProps) => {
  const footerActions = (
    <div className="footer-actions">
      <span
        className={`view-filter ${viewFilter === 'all' && 'active-filter'}`}
        onClick={() => setViewFilter('all')}
      >
        All
      </span>
      <span
        className={`view-filter ${viewFilter === 'active' && 'active-filter'}`}
        onClick={() => setViewFilter('active')}
      >
        Active
      </span>
      <span
        className={`view-filter ${
          viewFilter === 'completed' && 'active-filter'
        }`}
        onClick={() => setViewFilter('completed')}
      >
        Completed
      </span>
    </div>
  )

  return (
    <TodoWrapper>
      <section className="todo-footer">
        <div className="left">
          {todosLength > 0 ? `${todosLength} items left` : 'no items'}
        </div>
        <div className="center">{footerActions}</div>
        <div className="right" onClick={clearCompleted}>
          Clear Completed
        </div>
      </section>
      <section className="mobile">{footerActions}</section>
    </TodoWrapper>
  )
}

const TodoWrapper = styled.div`
  .todo-footer {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    background-color: ${({ theme }) => theme.appBackgroundColor};
    color: ${({ theme }) => theme.appDiminishedColor};
    padding: 16px 20px;
    .left {
      flex: 0.25;
    }

    .center {
      flex: 0.35;
      .footer-actions {
        display: flex;
        justify-content: space-around;
        span:hover {
          color: ${({ theme }) => theme.appColor};
        }
        .active-filter {
          color: dodgerblue;
        }
      }
    }

    .right {
      display: flex;
      justify-content: space-around;
      flex: 0.25;
      cursor: pointer;
      :hover {
        color: ${({ theme }) => theme.appColor};
      }
    }
    .view-filter {
      cursor: pointer;
    }
  }
`

export default TodoFooter
