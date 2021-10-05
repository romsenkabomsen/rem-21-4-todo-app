import axios from 'axios'

export const createTodo = (todo) => {
    return axios.post("/api/todo", todo)
        .then(response => response.data)
        .catch(err => alert(err))
}

export const readTodos = () => {
    return axios.get("/api/todo")
        .then(response =>  response.data)
        .catch(err => alert(err))
}

export const updateTodo = (id, todo) => {
    return axios.put(`/api/todo/${id}`, todo)
        .then(response => response.data)
        .catch(err => alert(err))
}

export const deleteTodo = (id) => {
    return axios.delete(`/api/todo/${id}`)
}
