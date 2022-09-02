import { ITheme } from '../utilities/types'
import desktopLight from '../images/bg-desktop-light.jpg'
import desktopDark from '../images/bg-desktop-dark.jpg'
import mobileLight from '../images/bg-mobile-light.jpg'
import mobileDark from '../images/bg-mobile-dark.jpg'

export const darkTheme: ITheme = {
  backgroundColor: '#181824',
  appBackgroundColor: '#24273C',
  appHeadlineColor: '#FCFFF4',
  appColor: '#A3A6BF',
  appSelectedBlue: '#4974DB',
  appCompletedColor: '#4C4F69',
  appDiminishedColor: '#4d5066',
  desktopHeaderImg: desktopDark,
  mobileHeaderImg: mobileDark,
  caretColor: '#A3A6BF',
  body: 'var(--very-light-gray)',
  component: 'var(--white)',
  text: 'var(--black)',
  boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.2)',
}

export const lightTheme: ITheme = {
  backgroundColor: '#FAFAFA',
  appBackgroundColor: '#FFFFFF',
  appHeadlineColor: '#FCFFF4',
  appColor: '#656572',
  appSelectedBlue: '#4974DB',
  appCompletedColor: '#9797A3',
  appDiminishedColor: '#DEDEE0',
  desktopHeaderImg: desktopLight,
  mobileHeaderImg: mobileLight,
  caretColor: '#4974DB',
  body: 'var(--very-dark-blue)',
  component: 'var(--dark-blue)',
  text: 'var(--white)',
  boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.2)',
}
