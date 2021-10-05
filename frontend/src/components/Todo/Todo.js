import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteTodo} from '../../apiService';
import {getApiData} from "../TodoList/TodoListSlicer";
import {useAppDispatch} from "../../app/hooks";

export default function Todo({id, text, status}) {
    const dispatch = useAppDispatch();
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{display:"inline", float:"left"}} variant="h5" component="div">
                    {text}
                </Typography>
                <IconButton sx={{display:"inline", float:"right", }} onClick={() => deleteTodo(id).then(()=>dispatch(getApiData()))}>
                    <DeleteIcon />
                </IconButton>
            </CardContent>
        </Card>
    );
}
