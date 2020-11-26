import styled from "styled-components";
export const Div = styled.div`
  text-align: center;
  margin:70px 0px;
`;
export const Input = styled.input`
  font-size: 16px;
  display:block;
margin:10px auto;
  width: 310px;
  padding: 0.375rem 5px;
  border: 1px solid grey;
  outline: none;
  border-radius: 3px;
  &:hover {
    border: 1px solid darkgrey;
  }
  &:focus {
    border: 1px solid royalblue;
  }
`;
export const Button = styled.input`
border:none;
display:block;
margin:30px auto;
font-size:18px;
width:150px;
color:#f7f7f7;
background-color:royalblue;
cursor:pointer;
padding:5px 0px;
border-radius:3px;
transition:.3s;
&:hover {
    background-color:#343a40;
  transition:.3s;
  }
`
export const EImage = styled.img`
  height: 300px;
`;
export const EDIV = styled.div`
position:absolute;
top:0;
  height:100vh;
  width:100vw;
  background-color: #29303b46;
`;
export const Modal = styled.div`
background-color: #29303b;
border-radius:5px;
`;

export const Cross = styled.div`
font-size:18px;
color:#f7f7f7;
position:absolute;
top:20px;
right:30px;
cursor:pointer;
`;
