import App from '../App'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('App', () => {
  async function addFourTodos() {
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'Test Todo One{enter}')
    await userEvent.type(input, 'Test Todo Two{enter}')
    await userEvent.type(input, 'Test Todo Three{enter}')
    await userEvent.type(input, 'Test Todo Four{enter}')
  }
  async function deleteAllTodos() {
    const clearButton = screen.getByRole('button', { name: /clear completed/i })
    await userEvent.click(clearButton)
    const deleteBtns = await screen.queryAllByRole('button', {
      name: 'delete button',
    })
    for (let i = 0; i < deleteBtns.length; i++) {
      await userEvent.click(deleteBtns[i])
    }
  }
  beforeEach(async () => {
    render(<App />)
    await addFourTodos()
  })
  afterEach(async () => {
    await deleteAllTodos()
  })
  test('Todo items can be added and deleted', async () => {
    const textBoxes = await screen.findAllByText(/test todo/i)
    expect(textBoxes.length).toBe(4)
    async function clickDeleteButtonAndCheckNumOfTodos(num: number) {
      const deleteBtns = await screen.findAllByRole('button', {
        name: /delete button/,
      })
      await userEvent.click(deleteBtns[0])
      const textBoxes = await screen.queryAllByText(/test todo/i)
      expect(textBoxes.length).toBe(num)
    }
    await clickDeleteButtonAndCheckNumOfTodos(3)
    await clickDeleteButtonAndCheckNumOfTodos(2)
    await clickDeleteButtonAndCheckNumOfTodos(1)
    await clickDeleteButtonAndCheckNumOfTodos(0)
  })
  test('Completed checkbox button changeds todo status and COMPLETED button only lists completed todos', async () => {
    const allButton = screen.getByRole('button', { name: 'All' })
    const completedButton = screen.getByRole('button', { name: 'Completed' })
    async function clickCompleteAndExpectNNumberOfCompletedTodos(n: number) {
      const completeButtons = screen.getAllByRole('checkbox', {
        name: /check box/i,
      })
      for (let i = 0; i < n; i++) {
        await userEvent.click(completeButtons[i])
      }
      await userEvent.click(completedButton)
      const textBoxes = await screen.findAllByText(/test todo/i)
      expect(textBoxes.length).toBe(n)
    }
    //check if any todos are completed
    await userEvent.click(completedButton)
    const textBoxes = screen.queryAllByText(/test todo/i)
    expect(textBoxes.length).toBe(0)
    //reset to all todos
    await userEvent.click(allButton)
    //click all todos as 'completed' and check that they render
    await clickCompleteAndExpectNNumberOfCompletedTodos(4)
  })
  test('Check number of active status todos after marking todos as complete', async () => {
    async function completeTodoAndCheckForNumOfActiveTodos(
      numOfTodosActive: number
    ) {
      const allButton = screen.getByRole('button', { name: 'All' })
      const activeButton = screen.getByRole('button', { name: 'Active' })
      const completeButtons = await screen.findAllByRole('checkbox', {
        name: /check box/i,
      })
      let textBoxes = await screen.findAllByText(/test todo/i)
      const numOfTodos = textBoxes.length
      //choose one todo to mark completed
      await userEvent.click(completeButtons[numOfTodos - numOfTodosActive])
      //active todos should now be 1 less than numOfTodosActive
      await userEvent.click(activeButton)
      textBoxes = await screen.queryAllByText(/test todo/i)
      expect(textBoxes.length).toBe(numOfTodosActive - 1)
      //reset app to view all todos
      await userEvent.click(allButton)
    }
    await completeTodoAndCheckForNumOfActiveTodos(4)
    await completeTodoAndCheckForNumOfActiveTodos(3)
    await completeTodoAndCheckForNumOfActiveTodos(2)
    await completeTodoAndCheckForNumOfActiveTodos(1)
  })
  test('Clear Completed button clears all todos from app', async () => {
    async function markNNumberOfTodosAsComplete(n: number) {
      const completeButtons = screen.getAllByRole('checkbox', {
        name: /check box/i,
      })
      for (let i = 0; i < n; i++) {
        await userEvent.click(completeButtons[i])
      }
    }
    async function checkNNumberOfClearedTodos(numberOfCompletedTodos: number) {
      const clearCompleted = screen.getByRole('button', {
        name: 'Clear Completed',
      })
      let textBoxes = await screen.findAllByText(/test todo/i)
      const numOfTodos = textBoxes.length
      await markNNumberOfTodosAsComplete(numberOfCompletedTodos)
      await userEvent.click(clearCompleted)
      textBoxes = await screen.queryAllByText(/test todo/i)
      expect(textBoxes.length).toBe(numOfTodos - numberOfCompletedTodos)
    }
    await checkNNumberOfClearedTodos(1)
    await deleteAllTodos()
    await addFourTodos()
    await checkNNumberOfClearedTodos(2)
    await deleteAllTodos()
    await addFourTodos()
    await checkNNumberOfClearedTodos(3)
    await deleteAllTodos()
    await addFourTodos()
    await checkNNumberOfClearedTodos(4)
    await deleteAllTodos()
  })
  test('Footer displays proper number of todos', async () => {
    expect(screen.getByText('4 items left')).toBeInTheDocument()
    const deleteBtns = await screen.findAllByRole('button', {
      name: /delete button/,
    })
    await userEvent.click(deleteBtns[0])
    expect(screen.getByText('3 items left')).toBeInTheDocument()
    await userEvent.click(deleteBtns[0])
    expect(screen.getByText('2 items left')).toBeInTheDocument()
    await userEvent.click(deleteBtns[0])
    expect(screen.getByText('1 items left')).toBeInTheDocument()
    await userEvent.click(deleteBtns[0])
    expect(screen.getByText('no items')).toBeInTheDocument()
  })
})
