package de.neuefische.remjava214.backend.service;

import de.neuefische.remjava214.backend.model.Todo;
import de.neuefische.remjava214.backend.repo.TodoRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    private final TodoRepo todoRepo;

    public TodoService(TodoRepo todoRepo){
        this.todoRepo = todoRepo;
    }

    public List<Todo> getTodos() {
        return todoRepo.getTodos();
    }

    public void deleteTodo(String id) {

    }

    public void updateTodo(String id, Todo todo) {

    }

    public Todo addTodo(Todo todo) {
        return todoRepo.addTodo(todo);
    }

}
