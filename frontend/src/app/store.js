import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todoListReducer from '../components/TodoList/TodoListSlicer'


export const store = configureStore({
    reducer: {
        todoList: todoListReducer
    },
});

