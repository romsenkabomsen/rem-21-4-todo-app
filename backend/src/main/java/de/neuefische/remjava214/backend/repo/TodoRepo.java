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
    private final List<Todo> todoList = new ArrayList<>();

    public List<Todo> getTodos() {
        return todoList;
    }

    public Todo addTodo(Todo todo) {
        todo.setId(generateId());
        todoList.add(todo);
        return todo;
    }

    private String generateId() {

        if (todoList.isEmpty()) {
            return "1";
        }

        int maxId = todoList.stream()
                .map(Todo::getId)
                .mapToInt(Integer::parseInt)
                .max()
                .getAsInt();

        maxId++;

        return String.valueOf(maxId);
    }

    public Optional<Todo> getById(String id) {

        return todoList.stream()
                .filter(todo -> todo.getId().equals(id))
                .findFirst()
                ;

    }

    public Todo updateTodo(String id, Todo todo) throws NullPointerException, IllegalArgumentException {
        if (getById(id).isEmpty()) {
            throw new NullPointerException();
        }

        if (!id.equals(todo.getId())) {
            throw new IllegalArgumentException();
        }

        Collections.replaceAll(todoList, getById(id).get(), todo);
        return todo;
    }

    public void deleteTodo(String id) throws NullPointerException {
        Optional<Todo> todo = getById(id);
        if (todo.isEmpty()) {
            throw new IllegalArgumentException("Can't delete todo with id " + id
                    + ". Because id is not found in the database");
        } else {
            todoList.remove(todo.get());
        }
    }
}
