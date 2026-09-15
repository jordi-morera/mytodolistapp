package com.jordimorera.mytodolistapp.exceptions;

import org.springframework.http.HttpStatus;

public class ToDoExceptions extends RuntimeException {

    private final HttpStatus httpStatus;

    public ToDoExceptions(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
