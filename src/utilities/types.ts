export interface ITodo {
  completed: boolean
  id: string
  text: string
}

export type FilterType = 'completed' | 'all' | 'active'

export interface ITheme {
  backgroundColor: string
  appBackgroundColor: string
  appHeadlineColor: string
  appColor: string
  appSelectedBlue: string
  appCompletedColor: string
  appDiminishedColor: string
  desktopHeaderImg: string
  mobileHeaderImg: string
  caretColor: string
  body: string
  component: string
  text: string
  boxShadow: string
}
