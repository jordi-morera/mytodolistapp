package com.jordimorera.mytodolistapp.mapper;

public interface IMapper<I, O> {
    O map(I in);
}
