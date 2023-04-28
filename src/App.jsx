import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './App.css'
import TodoList from './Components/TodoList'
import ItemForm from './Components/ItemForm';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

dayjs.extend(customParseFormat);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const mockItems = [
  {
    id: 1,
    task: 'Study',
    dateTime: dayjs('05/24/2023 09:00 AM').format('MM/DD/YYYY hh:mm A')
  },
  {
    id: 2,
    task: 'Cook',
    dateTime: dayjs('05/25/2023 09:00 AM').format('MM/DD/YYYY hh:mm A')
  },
  {
    id: 3,
    task: 'Clean',
    dateTime: dayjs('05/26/2023 09:00 AM').format('MM/DD/YYYY hh:mm A')
  },
]


function App() {
  const [items, setItems] = useState(mockItems);
  
  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  }

  const removeItem = (id) => {
    setItems((prevItems) => {
      let newItems = prevItems.filter((x) => (x.id != id));
      return newItems;
    })
  }
 
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h3>TodoList</h3>
        <TodoList items={items} handleRemove={removeItem} />
        <ItemForm handleAdd={addItem} />
        
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
