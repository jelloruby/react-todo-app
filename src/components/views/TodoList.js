import React from 'react'
import styled from 'styled-components';
import TodoItem from './TodoItem'
import { useTodoState } from './TodoContext';


const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
    background: gray;
`

function TodoList() {
    const todos = useTodoState();    // context 로부터 state 를 받아옴

    return (
        <TodoListBlock>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    done={todo.done}
                />
            ))}   
        </TodoListBlock>
    )
}

export default TodoList
