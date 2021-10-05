import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Todo from "../../Todo/Todo";
import * as React from "react";

export default function TodoListItem({todo, handleToggle, checked}) {

    const labelId = `transfer-list-item-${todo.id}-label`;

    return (
        <ListItem
            key={todo.id}
            role="listitem"
            button
            onClick={handleToggle(todo)}
        >
            <ListItemIcon>
                <Checkbox
                    checked={checked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                        'aria-labelledby': labelId,
                    }}
                />
            </ListItemIcon>
            <Todo id={todo.id} text={todo.description}/>
        </ListItem>
    );

}
