import React, {useImperativeHandle, forwardRef} from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import {IconButton, TextField} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import {createTodo} from "../../apiService";
import {useAppDispatch} from '../../app/hooks'
import {getApiData} from "../TodoList/TodoListSlicer";

function NewTodo(props, ref) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [text, setText] = React.useState('');
    const dispatch = useAppDispatch();
    useImperativeHandle(ref, () =>({
        handleClick: handleClick
        })
    )

    const handleClick = (anchor) => {
        setAnchorEl(anchorEl ? null : anchor.current);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleSubmit = event =>{
        event.preventDefault();
        createTodo({description: text, status:"todo"})
        dispatch(getApiData());
        setAnchorEl(null)
        setText('')

    }
    const handleChange = (event) =>{
        setText(event.target.value)
    }

    return (
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }} component="form" onSubmit={handleSubmit}>
                <TextField required id="todo-content" label="todo-description" value={text}
                           onChange={handleChange} />
                    <IconButton onClick={handleSubmit}>
                        <CheckIcon />
                    </IconButton>
                </Box>
            </Popper>
    );
}
export default forwardRef(NewTodo)
