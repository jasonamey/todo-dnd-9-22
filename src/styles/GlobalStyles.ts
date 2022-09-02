import { createGlobalStyle } from 'styled-components'
import { ITheme } from '../utilities/types'
export const GlobalStyles = createGlobalStyle<{ theme: ITheme }>`

* {
    padding : 0; 
    margin : 0;
    box-sizing : border-box; 
}

body {
    font-family: "Josefin Sans", sans-serif;
    height : 100vh;
    width : 100%;
    display : flex; 
    justify-content : center;
    background-color: ${({ theme }) => theme.backgroundColor}; 
    background-image : url(${({ theme }) => theme.desktopHeaderImg});
    background-repeat :  no-repeat;
    background-size : 100%;
    transition : background-color .5s;

}
ul { 
    padding : 0px;
    margin : 0px;
}
a {
    text-decoration : none;
}

@media only screen and (max-width: 530px) {
    body {
    background-image : url(${({ theme }) => theme.mobileHeaderImg});
    }

 
}
`
