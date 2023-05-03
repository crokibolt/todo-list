import { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './App.css'
import TodoList from './components/TodoList'
import ItemForm from './components/ItemForm';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';

import { auth, db, googleProvider } from './config/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';

dayjs.extend(customParseFormat);

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  const [user ,setUser] = useState();
  const [items, setItems] = useState([]);
  const [todosRef, setRef] = useState();
  
  auth.onAuthStateChanged((user) => {
    setUser(user);
    setRef(collection(db, `users/${user.uid}/todos`));
    if(todosRef) getTodos();
  })
  
  const getTodos = async () => {
    try {
      const data = await getDocs(todosRef);
      const filtered = data.docs.map(x => ({...x.data(), id: x.id}))
      setItems(filtered);
      
    } catch (e) {
      console.error(e);
    }
  };

  
  const addItem = async (item) => {
    try {
      await addDoc(todosRef, item);
    } catch (e) {
      console.error(e);
    }
  }

  const removeItem = async (id) => {
    const todoRef = doc(db, `users/${auth.currentUser.uid}/todos`, id);
    await deleteDoc(todoRef);
  }

  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setUser(auth.currentUser);
      setRef(collection(`users/${auth.currentUser.uid}/todos`));
      getTodos();
    } catch (err) {
      console.error(err);
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  }
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{mt: '4vh'}}>

        <Typography sx={{textAlign: 'center'}} variant="h2">TodoList</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {
            user ? 
            <>
              <Button
                sx={{position: 'absolute', top: '3%', right: '5%'}}
                onClick={logout}>
                  Log Out
                </Button>
              <TodoList items={items} handleRemove={removeItem} />
              <ItemForm handleAdd={addItem} />
            </>
            :
            <>
              <Button 
                sx={{position: 'absolute', top: '3%', right:'5%'}} 
                onClick={signIn}>
                Sign in with Google
              </Button>
              <Typography 
                sx={{textAlign: 'center', color: 'lightblue', mx: 'auto', mt: '5rem'}} 
                variant="h5">
                You need to sign in to add todos
              </Typography>
            </>          
          }
        </LocalizationProvider>

      </Container>
    </ThemeProvider>
  )
}

export default App
