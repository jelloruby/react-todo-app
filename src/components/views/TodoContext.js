import React, { createContext, useContext, useReducer, useRef } from 'react'

// action 은 업데이트를 위한 정보를 가지고 있습니다.
const initialTodos = [
    {
      id: 1,
      text: '프로젝트 생성하기',
      done: true
    },
    {
      id: 2,
      text: '컴포넌트 스타일링하기',
      done: true
    },
    {
      id: 3,
      text: 'Context 만들기',
      done: false
    },
    {
      id: 4,
      text: '기능 구현하기',
      done: false
    }
  ];

// reducer 는 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수입니다.
// reducer 에서 반환하는 상태는 곧 컴포넌트가 지닐 새로운 상태가 됩니다.
function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo)
    
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? {...todo, done: !todo.done } : todo
            )

        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id)

        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

// Context 를 만든다.
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

// 여기서 state 는 우리가 앞으로 컴포넌트에서 사용 할 수 있는 상태를 가르키게 되고, dispatch 는 액션을 발생시키는 함수라고 이해하시면 됩니다. 
// 그리고 useReducer 에 넣는 첫번째 파라미터는 reducer 함수이고, 두번째 파라미터는 초기 상태입니다.
// 자식 컴포넌트들을 받아서 reducer를 시켜주고 context 를 통해 return 한다.
export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos)
    const nextId = useRef(5)

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    )
}

// 커스텀 Hook 만들기
// Context 를 사용하기 위해 useContext 로 내보낸다.
// 만약 TodoProvider 로 감싸져있지 않다면 에러를 발생시키도록 커스텀 Hook을 만든다.
export function useTodoState() {
    const context = useContext(TodoStateContext)
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext)
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext)
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}