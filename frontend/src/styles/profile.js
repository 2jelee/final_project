import styled from 'styled-components';

const Title = styled.p`
    font-size: 1.6rem;
    width: 30%;
    border-bottom: 5px solid #bcbcbc;
`;

const Table = styled.table`
    border: 3px solid #bcbcbc;
    width: 70%;
    font-weight: bold;
`;

const Input = styled.input`
    position: relative;
    margin-top: 7%;
    width: 80%;
    height: 5vh;
    font-size: 1.1em;
    font-weight: bold;
    border: none;
    background: lightgray;
    border-radius: 4px;
    padding-left: 20px;
    &::placeholder{
        color: white;
    }
`;

const Button = styled.button`
    position: relative;
    margin-top: 7%;
    margin-bottom: 7%;
    width: 8%;
    height: 3.5vh;
    background-color: #00AAFF;
    border: none;
    border-radius: 3px;
    font-weight: bold;
    color: white;
    font-size: 1.1em;
    &:hover {
        cursor: pointer;
    }
`;
const Button2 = styled.button`
    position: relative;
    margin-top: 7%;
    margin-bottom: 7%;
    width: 8%;
    height: 3.5vh; 
    background-color: red;
    border: none;
    border-radius: 3px;
    font-weight: bold;
    color: white;
    font-size: 1.1em;
    &:hover {
        cursor: pointer;
    }
`;

export {Title, Table, Input, Button, Button2};