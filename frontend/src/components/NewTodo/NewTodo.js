import React, {useImperativeHandle, forwardRef} from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import {IconButton, TextField} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

function NewTodo(props, ref) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [text, setText] = React.useState('');
    useImperativeHandle(ref, () =>({
        handleClick:(f) =>{handleClick(f)}
        })
    )

    const handleClick = (anchor) => {
        setAnchorEl(anchorEl ? null : anchor.current);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleSubmit = event =>{
        event.preventDefault();
        setAnchorEl(null)
        setText('')
    }
    const handleChange = (event) =>{
        setText(event.target.value)
    }

    return (
<div>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }} component="form" onSubmit={handleSubmit}>
                <TextField required id="todo-content" label="todo-description" value={text} onChange={(e) => handleChange(e)} />
                    <IconButton onClick={handleSubmit}>
                        <CheckIcon />
                    </IconButton>
                </Box>
            </Popper></div>
    );
}
export default forwardRef(NewTodo)
