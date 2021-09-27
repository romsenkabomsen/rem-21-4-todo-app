package de.neuefische.remjava214.backend.model;

import lombok.Data;

@Data
public class Todo {
    private String id;
    private String description;
    private String status;
}
