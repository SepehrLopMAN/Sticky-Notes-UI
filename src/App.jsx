import React, { useReducer } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import shortid from 'shortid';
import './App.css'
import Draggable from 'react-draggable';
import pinImage from './assets/image-pin.png'

const TextBox = styled.textarea`
  &
  {
    padding: 0.5rem;
    resize: none;
    outline: -webkit-focus-ring-color auto 1px;
    font-size:inherit;
  }

  &::placeholder {
    color:limegreen;
  }
`

const Button = styled.button`
  & {
    background-color : black;
    color: limegreen;
    border-radius: unset;
    padding: 0.375rem;
    border:none;
    cursor: pointer;
    transition: all 0.3s;
    font-size:inherit;
  }
  &:hover {
    color:lime;
  }
`



const StickyNoteComponent = ({data:{note, id}, deleteHandler}) => {
  return <Draggable handle='.stickyNote--pin'>
    <div className='stickyNote-textarea-container'>
      <span className='stickyNote-textarea-container__close-btn' onClick={() => {deleteHandler({type: 'delete', id: id})}}>&times;</span>
      <textarea className='stickyNote-textarea' defaultValue={note}>
      </textarea>
      <img className='stickyNote--pin' src={pinImage} alt="StickyNote's Pin" draggable={false} width="30px" height="30px"/>
    </div>
  </Draggable>
}


function App() {
  const [text, setText] = useState("");
  const [notes, notesDispatch] =useReducer(
    (notes,action) => {
      switch (action.type) {
        case 'add':
          return [...notes, {
            note: action.note,
            id: shortid.generate(),
          }];
          case 'delete':
            return notes.filter(({id}) => id !== action.id);
            default:
          throw Error("Unknown Action!");
        }
      },
      []);
  return (
    <>
      <div className='textbox-container'>
        <TextBox value={text} onChange={({target: {value}}) => {setText(value)}} rows={15} cols={60} placeholder='Add a note ...' />
        <Button onClick={() => {
          notesDispatch({type:'add', note:text});
          setText('');
        }}> 
        Add
        </Button>
      </div>
      {notes.map((value) => 
      <React.Fragment key={value.id}>
        <StickyNoteComponent data={value} deleteHandler={notesDispatch}/>
      </React.Fragment>
      )}
    </>
  )
}

export default App
