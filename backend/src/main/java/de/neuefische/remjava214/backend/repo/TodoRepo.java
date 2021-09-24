package de.neuefische.remjava214.backend.repo;

import de.neuefische.remjava214.backend.model.Todo;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.lang.Integer.parseInt;

@Repository
public class TodoRepo {
    List<Todo> todoList= new ArrayList<>();


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
                   .map((currentTodo)->currentTodo.getId())
                   .mapToInt(id -> parseInt(id))
                   .max()
                   .getAsInt();

           maxId++;

        return String.valueOf(maxId);
    }

    public Optional<Todo> getById(String id){

           return todoList.stream()
                    .filter(todo -> todo.getId().equals(id))
                   .findFirst()
                   ;

    }

    public Todo updateTodo(String id, Todo todo) throws NullPointerException, IllegalArgumentException {
        if(getById(id).isEmpty()) {
            throw new NullPointerException();
        };

        if(!id.equals(todo.getId())) {
            throw new IllegalArgumentException();
        };
        //todoList.set(id, tod getById(id).get() = todo;
        Collections.replaceAll(todoList, getById(id).get(), todo);
        return todo;
    };

    public void deleteTodo(String id) throws NullPointerException{
        if(getById(id).isEmpty()) {
            throw new NullPointerException();
        }
        Optional<Todo> todo = getById(id);
        todoList.remove(todo.get());

    }
}
