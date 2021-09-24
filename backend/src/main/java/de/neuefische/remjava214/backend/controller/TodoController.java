package de.neuefische.remjava214.backend.controller;

import de.neuefische.remjava214.backend.model.Todo;
import de.neuefische.remjava214.backend.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/todo")
public class TodoController {

    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService){
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> getTodos(){
        return todoService.getTodos();
    }

    @PostMapping
    public Todo addTodo(@RequestBody Todo todo){
        todoService.addTodo(todo);
        return todo;
    }

    @PutMapping("{id}")
    public Todo updateTodo(@PathVariable String id, @RequestBody Todo todo){
        todoService.updateTodo(id, todo);
        return todo;
    }

    @DeleteMapping("{id}")
    public void deleteTodo(@PathVariable String id){
        todoService.deleteTodo(id);
    }
}
