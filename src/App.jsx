import { useState } from 'react'
import './App.css'
import TodoList from './Components/TodoList'

const mockItems = [
  {
    id: '1',
    task: 'Study'
  },
  {
    id: '2',
    task: 'Cook'
  },
  {
    id: '3',
    task: 'Clean'
  },
]

function App() {
  const [items, setItems] = useState(mockItems);
  const [visibleForm, setVisibleForm] = useState(false);

  const toggleVisibleForm = () => {
    setVisibleForm((prevVisible) => !prevVisible)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleVisibleForm();
  };
 
  return (
    <>
      <h3>TodoList</h3>
      <TodoList items={items} />
      { !visibleForm ? 
          <button type="button" onClick={toggleVisibleForm}>Add ToDo</button>
        :
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Random todo"/>
            <button type="submit">Add</button>
          </form>
      }
      
    </>
  )
}

export default App
