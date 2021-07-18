import styled, { createGlobalStyle } from "styled-components";
import BGImage from "./assets/background.jpg";


// 1. Global style
export const GlobalStyle = createGlobalStyle`
  html{
    height:100%;
  }

  body{
    background-image: url(${BGImage});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  *{
    box-sizing: border-box;
    font-family: "Catamaran", sans-serif;
  }
`;

// 2. Specific style
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  // 只给这个Wrapper组件下面的 <p> 设置样式
  > p {
    color: white;
  }

  .score {
    color: white;
    font-size: 2rem;
    margin: 0;
  }

  h1{
    /* background-image: linear-gradient(180deg, white, #87f1ff); */
    /* background-size: 100%;
    background-clip: text; */
    /* --webkit-background-clip: text;
    --webkit-text-fill-color:transparent;
    --moz-background-clip:text;
    --moz-text-fill-color:transparent; */
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 70px;
    font-weight: 400;
    text-align: center;
    margin: 20px;
  }

  .start, .next {
    cursor: pointer;
    border: 2px solid #d38558;
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }

  .start {
    max-width: 200px;
  }


`
