import Container from "@mui/material/Container";
import TodoList from "../TodoList/TodoList";
import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewTodo from "../NewTodo/NewTodo";
import * as React from "react";


export default function Kanban(){
<Container maxWidth={false}>
    <TodoList/>
</Container>
<IconButton color="primary" onClick={handleNewTodo}>
    <AddIcon />
</IconButton>
<NewTodo ref={newTodoRef} />}
