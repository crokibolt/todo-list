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
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

dayjs.extend(customParseFormat);

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

theme.typography.h3 = {
  fontSize: '2.5rem'
}

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">

        <Typography sx={{textAlign: 'center'}} variant="h3">TodoList</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TodoList items={items} handleRemove={removeItem} />
          <ItemForm handleAdd={addItem} />          
        </LocalizationProvider>

      </Container>
    </ThemeProvider>
  )
}

export default App
