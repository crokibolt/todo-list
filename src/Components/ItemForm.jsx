import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { DateTimePicker } from '@mui/x-date-pickers';
import { TextField, Button } from '@mui/material';
import * as dayjs from 'dayjs';


function ItemForm({handleAdd}) {
  const [visibleForm, setVisibleForm] = useState(false);
  const [todoTask, setTodoTask] = useState('');
  const [todoDateTime, setTodoDateTime] = useState(dayjs().add(8, 'hour'));

  const toggleVisibleForm = () => {
    setVisibleForm((prevVisible) => !prevVisible)
  }

  const resetTodoTask = () => {
    setTodoTask('');
  }

  const resetDateTime = () => {
    setTodoDateTime(dayjs().add(8, 'hour'));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = {
      id: uuidv4(),
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
            variant="contained" 
            color="success"
            type="button" 
            onClick={toggleVisibleForm}
            >
                Add ToDo
            </Button>
        :
          <form onSubmit={handleSubmit}>
            <TextField 
                label="Todo" 
                value={todoTask}
                required
                onChange={handleTaskChange}/>
            <DateTimePicker 
              value={todoDateTime} 
              onChange={(newValue) => setTodoDateTime(newValue)}
              required />
            <Button variant="contained" type="submit">Add</Button>
          </form>
      }
    </>
  )
}

export default ItemForm