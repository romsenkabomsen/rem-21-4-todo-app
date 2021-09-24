package de.neuefische.remjava214.backend.repo;

import de.neuefische.remjava214.backend.model.Todo;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TodoRepo {
    List<Todo> todoList;


    public List<Todo> getTodos() {
        return todoList;
    }
}
