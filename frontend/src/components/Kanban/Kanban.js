import Container from "@mui/material/Container";
import TodoList from "../TodoList/TodoList";
import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewTodo from "../NewTodo/NewTodo";
import * as React from "react";
import {useRef} from "react";


export default function Kanban() {
    const newTodoRef = useRef()
    const anchorRef = useRef(null)

    function handleNewTodo() {
        newTodoRef.current.handleClick(anchorRef)
    }

    return (
        <div>
            < Container maxWidth={false} ref={anchorRef}>
                <TodoList/>
            </Container>
            <IconButton color="primary" onClick={handleNewTodo}>
                <AddIcon/>
            </IconButton>
            <NewTodo ref={newTodoRef}/>
        </div>)
}
