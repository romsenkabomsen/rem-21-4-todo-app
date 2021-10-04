import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteTodo} from '../../apiService';
import {getApiData} from "../TodoList/TodoListSlicer";
import {useAppDispatch} from "../../app/hooks";

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function Todo({id, text, status}) {
    const dispatch = useAppDispatch();
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                {/*<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>*/}
                {/*    {title}*/}
                {/*</Typography>*/}
                <Typography sx={{display:"inline", float:"left"}} variant="h5" component="div">
                    {text}
                </Typography>
        {/*<CardActions>*/}
                <IconButton sx={{display:"inline", float:"right", }} onClick={() => deleteTodo(id).then(()=>dispatch(getApiData()))}>
                    <DeleteIcon />
                </IconButton>
            {/*</CardActions>*/}
            </CardContent>
        </Card>
    );
}
