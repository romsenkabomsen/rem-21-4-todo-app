import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Todo from "../Todo/Todo";
import styled from 'styled-components'

import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getAllTodos,getApiData, selectGetAllTodos, selectGetAllDoing, selectGetAllDone} from './TodoListSlicer'
import {createTodo, readTodos, updateTodo, deleteTodo} from '../../apiService'

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TodoList() {
    const dispatch = useAppDispatch();
    const [checked, setChecked] = React.useState([]);
    // const [left, setLeft] = React.useState([0, 1, 2, 3]);
    // const [middle, setMiddle] = React.useState([4, 5, 6, 7]);
    // const [right, setRight] = React.useState([8, 9, 10, 11]);


    React.useEffect(() => {
        dispatch(getApiData())
    },[])
    const left = useAppSelector(selectGetAllTodos);
    const middle = useAppSelector(selectGetAllDoing);
    const right = useAppSelector(selectGetAllDone);

    const leftChecked = intersection(checked, left);
    const middleChecked = intersection(checked, middle);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    // const handleAllRight = () => {
    //     setMiddle(middle.concat(left));
    //     setLeft([]);
    // };

    const advanceTodo = (status) => {
        status === 'doing' ?
            leftChecked.forEach(todo => updateTodo(todo.id, {...todo, status:'doing'})) :
            middleChecked.forEach(todo => updateTodo(todo.id, {...todo, status:'done'}))
        dispatch(getApiData())
        // setMiddle(middle.concat(leftChecked));
        // setLeft(not(left, leftChecked));
        // setChecked(not(checked, leftChecked));
    };

    const revertTodo = (status) => {
        status === 'doing' ?
            middleChecked.forEach(todo => updateTodo(todo.id, {...todo, status:'todo'})) :
            rightChecked.forEach(todo => updateTodo(todo.id, {...todo, status:'doing'}))
        dispatch(getApiData())

        // setLeft(left.concat(middleChecked));
        // setMiddle(not(middle, middleChecked));
        // setChecked(not(checked, middleChecked));
    };

    // const handleAllLeft = () => {
    //     setLeft(left.concat(middle));
    //     setMiddle([]);
    // };

    const customList = (items) => (
        <Paper sx={{ width: 400, height: 400,maxHeight:400, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value.id}-label`;

                    return (
                        <ListItem
                            key={value.id}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <Todo text={value.description}/>
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={3}>
                {customList(left)}
            </Grid>
            <Grid item xs={1}>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{my: 0.5}}
                        variant="outlined"
                        size="small"
                        onClick={() => advanceTodo('doing')}
                        disabled={left.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{my: 0.5}}
                        variant="outlined"
                        size="small"
                        onClick={() => revertTodo('doing')}
                        disabled={middleChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    {/*<Button*/}
                    {/*    sx={{my: 0.5}}*/}
                    {/*    variant="outlined"*/}
                    {/*    size="small"*/}
                    {/*    onClick={handleAllLeft}*/}
                    {/*    disabled={middle.length === 0}*/}
                    {/*    aria-label="move all left"*/}
                    {/*>*/}
                    {/*    ≪*/}
                    {/*</Button>*/}
                </Grid>
            </Grid>
            <Grid item>
                {customList(middle)}
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    {/*<Button*/}
                    {/*    sx={{my: 0.5}}*/}
                    {/*    variant="outlined"*/}
                    {/*    size="small"*/}
                    {/*    // onClick={handleAllRight}*/}
                    {/*    disabled={left.length === 0}*/}
                    {/*    aria-label="move all right"*/}
                    {/*>*/}
                    {/*    ≫*/}
                    {/*</Button>*/}
                    <Button
                        sx={{my: 0.5}}
                        variant="outlined"
                        size="small"
                        onClick={() => advanceTodo('done')}
                        disabled={middleChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{my: 0.5}}
                        variant="outlined"
                        size="small"
                        onClick={() => revertTodo('done')}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    {/*<Button*/}
                    {/*    sx={{my: 0.5}}*/}
                    {/*    variant="outlined"*/}
                    {/*    size="small"*/}
                    {/*    onClick={handleAllLeft}*/}
                    {/*    disabled={middle.length === 0}*/}
                    {/*    aria-label="move all left"*/}
                    {/*>*/}
                    {/*    ≪*/}
                    {/*</Button>*/}
                </Grid>
            </Grid>
            <Grid item>
                {customList(right)}
            </Grid>
        </Grid>
    );
}

