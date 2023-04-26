import React from 'react'

function TodoList({items}) {
  return (
    <div>
        <ul>
            {items.map((item) => {
                return(
                    <li key={item.id}>
                        {item.task}
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default TodoList