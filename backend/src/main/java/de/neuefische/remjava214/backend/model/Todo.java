package de.neuefische.remjava214.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Todo {
    String id;
    String description;
    String status;


}
