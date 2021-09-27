package de.neuefische.remjava214.backend.repo;

import de.neuefische.remjava214.backend.model.Todo;
import net.bytebuddy.dynamic.DynamicType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.util.Assert;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class TodoRepoTest {

    @Test
    void getTodos() {
        // GIVEN
        TodoRepo todoRepo = new TodoRepo();
        todoRepo.addTodo(new Todo("1", "write unit tests", "doing"));
        todoRepo.addTodo(new Todo("2", "write integration tests", "todo"));
        todoRepo.addTodo(new Todo("3", "have a party", "todo"));


        // WHEN
        List<Todo> actual = todoRepo.getTodos();
        List<Todo> expectedTodos = List.of(
                new Todo("1", "write unit tests", "doing"),
                new Todo("2", "write integration tests", "todo"),
                new Todo("3", "have a party", "todo")
        );

        // THEN
        Assertions.assertEquals(expectedTodos, actual);

    }

    @Test
    void addTodo() {
        // GIVEN
        TodoRepo todoRepo = new TodoRepo();
        Todo todoToAdd = new Todo("2", "keep calm", "todo");

        // WHEN
        Todo actualState = todoRepo.addTodo(todoToAdd);

        Todo todo1 = new Todo("1", "keep calm", "todo");
        Todo todo2 = new Todo("2", "keep calm", "todo");

        // THEN
        Assertions.assertEquals(todo1, actualState);
        Assertions.assertNotEquals(todo2, actualState);
        Assertions.assertEquals(List.of(todoToAdd), todoRepo.getTodos());
    }

    @Test
    void getByIdHappy() {
        // GIVEN

        TodoRepo todoRepo = new TodoRepo();
        todoRepo.addTodo(new Todo("1", "write unit tests", "doing"));
        todoRepo.addTodo(new Todo("2", "write integration tests", "todo"));
        todoRepo.addTodo(new Todo("3", "have a party", "todo"));


        // WHEN
        Optional<Todo> actual = todoRepo.getById("2");
        Optional<Todo> expected = Optional.of(
                new Todo("2", "write integration tests", "todo")
        );

        // THEN
        Assertions.assertTrue(actual.isPresent());
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getByIdNegative() {
        // GIVEN

        TodoRepo todoRepo = new TodoRepo();
        todoRepo.addTodo(new Todo("1", "write unit tests", "doing"));
        todoRepo.addTodo(new Todo("2", "write integration tests", "todo"));
        todoRepo.addTodo(new Todo("3", "have a party", "todo"));


        // WHEN
        Optional<Todo> actual = todoRepo.getById("4");

        // THEN
        Assertions.assertFalse(actual.isPresent());
    }

    @Test
    void updateTodo() {
        // GIVEN
        TodoRepo todoRepo = new TodoRepo();
        todoRepo.addTodo(new Todo("1", "write unit tests", "doing"));
        todoRepo.addTodo(new Todo("2", "write integration tests", "todo"));
        todoRepo.addTodo(new Todo("3", "have a party", "todo"));

        // WHEN
        Todo updateTodo = new Todo("1", "write unit tests", "done");
        Todo actual = todoRepo.updateTodo("1", updateTodo);

        Optional<Todo> result = todoRepo.getById("1");
        Todo gotUpdate;

        if (result.isPresent()) {
            gotUpdate = result.get();
            Assertions.assertEquals(updateTodo, gotUpdate);
            Assertions.assertEquals(updateTodo, actual);
        } else fail();

    }

    @Test
    void deleteTodo() {
        // GIVEN

        // WHEN

        // THEN
    }
}