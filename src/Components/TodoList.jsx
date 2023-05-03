import { IconButton, List, ListItem, ListItemButton, ListItemText , ListItemIcon} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import React, { useState } from 'react';

function TodoList({items, handleRemove}) {
  const [checked, setChecked] = useState([]);

  const handleToggle = (id) => {
    const indexOfId = checked.indexOf(id);
    const newChecked = [...checked];

    if(indexOfId === -1){
      newChecked.push(id);
    } else {
      newChecked.splice(indexOfId, 1);
    }

    setChecked(newChecked);
  }

  const removeSelected = () => {
    checked.map(x => handleRemove(x));
  }

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
                       <ListItemButton role={undefined} onClick={()=>(handleToggle(item.id))} dense>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': item.id}}
                          />
                        </ListItemIcon>
                          <ListItemText 
                            primary={item.task}
                            secondary={item.dateTime}
                            />
                       </ListItemButton>
                      
                    </ListItem>
                )
            })}
        </List>
        {items.length > 0 &&
          <Button sx={{mx: '0.6rem', fontWeight:'bold'}} onClick={removeSelected} variant='outlined'>Clear Selected</Button>
        }
    </>
  )
}

export default TodoList