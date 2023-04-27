import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

function TodoList({items}) {
  return (
    <>
        <List>
            {items.map((item) => {
                return(
                    <ListItem key={item.id}>
                        <ListItemText 
                          primary={item.task}
                          secondary={item.dateTime}
                        />
                    </ListItem>
                )
            })}
        </List>
    </>
  )
}

export default TodoList