import styled from "styled-components";
import {Link} from 'react-router-dom'
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
    border: 1px solid #66ba6a;
  }
`;
export const Button = styled.input`
border:none;
display:block;
margin:30px auto;
font-size:18px;
width:150px;
color:#f7f7f7;
background-color:#317c34;
cursor:pointer;
padding:5px 0px;
border-radius:3px;
transition:.3s;
outline:none;
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
export const IconWrap = styled(Link)`
color:#317c34;
cursor:pointer;
margin:0px 20px;
font-size:30px;
`;
export const SearchBar = styled.input`
height:25px;
width:550px;
display:block;
margin:auto 0px;
outline:none;
border:1px solid #66ba6a;
background-color:#dedede;
padding:5px 10px;
border-right:none;
border-top-left-radius:5px;
border-bottom-left-radius:5px;
color:#444;
font-size:16px;
`;
export const SearchButton = styled.button`
height:37px;
display:block;
margin:auto 0px;
outline:none;
border:1px solid #66ba6a;
background-color:#66ba6a;
padding:07px 15px;
border-top-right-radius:5px;
border-bottom-right-radius:5px;
color:#f7f7f7;
font-size:16px;
border-left:none;
cursor: pointer;
`;
export const DropInput = styled.input`
padding:10px;
width:200px;
background-color:#317c34;
color:#f7f7f7;
font-size:15px;
border-radius:5px;
cursor: pointer;
outline:none;
&:hover {
    background-color:#343a40;
  }
`;
export const DIVUPLOAD = styled.div`
margin:70px;
display:block;
text-align:center;
`;
export const TextArea = styled.textarea`
  font-size: 16px;
  display:block;
margin:10px auto;
  width: 700px;
  height:200px;
  padding: 0.375rem 5px;
  border: 1px solid grey;
  outline: none;
  border-radius: 3px;
  &:hover {
    border: 1px solid darkgrey;
  }
  &:focus {
    border: 1px solid #66ba6a;
  }
`;
