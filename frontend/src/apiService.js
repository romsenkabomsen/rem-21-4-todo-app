import axios from 'axios'

export const createTodo = (todo) => {
    return axios.post("http://localhost:8080/api/todo", todo)
        .then(response => response.data)
        .catch(err => alert(err))
}

export const readTodos = () => {
    return axios.get("http://localhost:8080/api/todo")
        .then(response =>  response.data)
        .catch(err => alert(err))
}

export const updateTodo = (id, todo) => {
    return axios.put(`http://localhost:8080/api/todo/${id}`, todo)
        .then(response => response.data)
        .catch(err => alert(err))
}

export const deleteTodo = (id) => {
    return axios.delete(`http://localhost:8080/api/todo/${id}`)
}
