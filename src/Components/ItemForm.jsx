import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { DateTimePicker } from '@mui/x-date-pickers';
import { TextField, Button } from '@mui/material';
import dayjs from 'dayjs';


function ItemForm({handleAdd}) {
  const [visibleForm, setVisibleForm] = useState(false);
  const [todoTask, setTodoTask] = useState('');
  const initDate = dayjs().add(8, 'hour');
  const [todoDateTime, setTodoDateTime] = useState(initDate);

  const toggleVisibleForm = () => {
    setVisibleForm((prevVisible) => !prevVisible)
  }

  const resetTodoTask = () => {
    setTodoTask('');
  }

  const resetDateTime = () => {
    const date = dayjs().add(8, 'hour');
    setTodoDateTime(date);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      task: todoTask,
      dateTime: dayjs(todoDateTime).format('MM/DD/YYYY hh:mm A')
    };

    handleAdd(item);
    resetTodoTask();
    resetDateTime();
    toggleVisibleForm();
  };

  const handleTaskChange = (e) => {
    setTodoTask(e.target.value);
  };

  const handleDateChange = (e) => {
    const formattedDate = dayjs(e.target.value).format('MM/DD/YYYY hh:mm aa');
    console.log(formattedDate);
    setTodoDateTime(formattedDate);
  };

  return (
    <>
      { !visibleForm ? 
          <Button 
            sx={{fontWeight: 'bold'}}
            variant="contained" 
            color="success"
            type="button" 
            onClick={toggleVisibleForm}
            >
                Add ToDo
            </Button>
        :
          <form style={{marginTop: '2rem'}} onSubmit={handleSubmit}>
            <TextField 
                sx={{mr: '1rem'}}
                label="Todo" 
                value={todoTask}
                required
                onChange={handleTaskChange}/>
            <DateTimePicker 
              value={todoDateTime} 
              onChange={(newValue) => setTodoDateTime(newValue)}
              required />
            <Button 
              sx={{display: 'block', width: '90%', mt: '0.5rem', fontWeight: 'bold'}} 
              variant="contained" 
              type="submit">Add</Button>
          </form>
      }
    </>
  )
}

export default ItemForm