import React from 'react';
import styled from 'styled-components';
import { useTodoState } from './TodoContext';

const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

function TodoHead() {
    const todos = useTodoState();                         // context 로부터 state 를 받아옴
    const undoneTasks = todos.filter(todo => !todo.done)  // false 인 것들만 filter 한다.

    const today = new Date();                              // 날짜를 받아옴
    const dataString = today.toLocaleDateString('ko-KR', { // toLocaleDateString 사용
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    const dayName = today.toLocaleDateString('ko-KR', {
        weekday: 'long'
    })

    return (
    <TodoHeadBlock>
        <h1>{dataString}</h1>
        <div className="day">{dayName}</div>
        <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
    </TodoHeadBlock>
    );
}

export default TodoHead;