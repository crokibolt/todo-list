import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

function TodoList({items, handleRemove}) {
  return (
    <>
        <List>
            {items.map((item) => {
                return(
                    <ListItem key={item.id}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" 
                          onClick={() => handleRemove(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                      disablePadding
                    >
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