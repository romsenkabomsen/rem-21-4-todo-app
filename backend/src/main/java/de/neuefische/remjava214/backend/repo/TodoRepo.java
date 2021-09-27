package de.neuefische.remjava214.backend.repo;

import de.neuefische.remjava214.backend.model.Todo;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import static java.lang.Integer.parseInt;

@Repository
public class TodoRepo {
    private final List<Todo> todoList= new ArrayList<>();

    public List<Todo> getTodos() {
        return todoList;
    }

    public Todo addTodo(Todo todo){
        todo.setId(generateId());
        todoList.add(todo);
        return todo;
    }

    private String generateId(){

        if(todoList.isEmpty()){ return "1";}

           int maxId = todoList.stream()
                   .map(Todo::getId)
                   .mapToInt(Integer::parseInt)
                   .max()
                   .getAsInt();

           maxId++;

        return String.valueOf(maxId);
    }
}
