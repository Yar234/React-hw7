import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';

import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addChat, deleteChat } from '../../../store/messages/actions';
import { selectChat } from '../../../store/messages/selectors'

import styles from './ChatList.module.css'

export function ChatList() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch()
  const chats = useSelector(selectChat,
    (prev, next) => prev.length === next.length)

  console.log('update chats', chats);

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addChat(value))
    setValue('')
  }

  return (
    <>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            <Link to={`/chats/${chat.name}`}>
              {chat.name}
            </Link>
            <IconButton
              type='submit'
              onClick={() => dispatch(deleteChat(chat.name))}
              size="small"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </li>
        ))}
      </ul>

      <h1>ChatList</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.wrapper}>
          <TextField fullWidth id="fullWidth"
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputRef={input => input?.focus()}
            noValidate
            autoComplete="off"
            placeholder='input chat'
            size="small"
          />
          <Button className={styles.button} type='submit' size="medium"
            variant="contained">
            Create Chat
          </Button>
        </div>
      </form>
    </>
  )
}