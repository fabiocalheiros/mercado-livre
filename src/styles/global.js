import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

import background from '../assets/images/background.svg';

export default createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body{
    background: #191920 url(${background}) no-repeat center top;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, h1 {
    font: 14px Roboto, sans-serif;
  }

  #root{
    padding: 0 20px 50px;
  }

  button{
    cursor: pointer;
  }

  .out-site{
    display: flex;

    .sidebar{
      background: #fff;
      min-width: 300px;
      margin-right: 20px;
      padding: 20px;
      border-radius: 5px;

      ul{
        margin: 0;
        padding: 0;

        li{
          list-style: none;
          margin-bottom: 10px;
        }
      }
    }
  }
`;
