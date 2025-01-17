import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {readTodos} from '../../apiService'


const initialState = {
    todos:[],
    doing:[],
    done:[],
}

export const getApiData = createAsyncThunk(
    'todoList/fetchTodos'
    ,async() =>{
        const response = await (readTodos());
        return response;
    }
)

export const todoListSlice = createSlice({
    name:'todoList',
    initialState,
      extraReducers:(builder) => {
        builder
            .addCase(getApiData.pending, (state) =>{

            })
            .addCase(getApiData.fulfilled, (state, action) => {
                state.todos = [...action.payload.filter(todo => todo.status === 'todo')]
                state.doing = [...action.payload.filter(todo => todo.status === 'doing')]
                state.done = [...action.payload.filter(todo => todo.status === 'done')]
            })
    }
})

export const {getAllTodos} = todoListSlice.actions;
export const selectGetAllTodos = (state) =>  state.todoList.todos;
export const selectGetAllDoing = (state) =>  state.todoList.doing;
export const selectGetAllDone = (state) =>  state.todoList.done;
export default todoListSlice.reducer;
