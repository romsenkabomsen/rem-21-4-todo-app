import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TodoListItem from './TodoListItem/TodoListItem'

import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getApiData, selectGetAllTodos, selectGetAllDoing, selectGetAllDone} from './TodoListSlicer'
import { updateTodo,} from '../../apiService'


function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TodoList() {
    const dispatch = useAppDispatch();
    const [checked, setChecked] = React.useState([]);

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

    const advanceTodo = (status) => {
        status === 'doing' ?
            leftChecked.forEach(todo => updateTodo(todo.id, {...todo, status:'doing'})
                .then(()=>dispatch(getApiData()))) :
            middleChecked.forEach(todo => updateTodo(todo.id, {...todo, status:'done'})
                .then(()=>dispatch(getApiData())));
    };

    const revertTodo = (status) => {
        status === 'doing' ?
            middleChecked.forEach(todo => updateTodo(todo.id, {...todo, status:'todo'}).then(()=>dispatch(getApiData()))) :
            rightChecked.forEach(todo => updateTodo(todo.id, {...todo, status:'doing'}).then(()=>dispatch(getApiData())));
    };

    const customList = (items) => {
        const checkBoxChecked = (todo) => checked.indexOf(todo) !== -1
        return (

            <Paper sx={{ width: 400, height: 400,maxHeight:400, overflow: 'auto' }}>
                <List dense component="div" role="list">
                    {items.map((todo) => <TodoListItem todo={todo} handleToggle={handleToggle} checked={checkBoxChecked(todo)} key={todo.id}/>)}
                    <ListItem />
                </List>
            </Paper>
        );
    }

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
                                    </Grid>
            </Grid>
            <Grid item>
                {customList(middle)}
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
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
                                    </Grid>
            </Grid>
            <Grid item>
                {customList(right)}
            </Grid>
        </Grid>
    );
}

