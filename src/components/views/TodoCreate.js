import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { MdAdd } from 'react-icons/md'
import { useTodoDispatch, useTodoNextId } from './TodoContext';

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function TodoCreate() {
    // 초기화
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')

    // context 불러오기
    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    // 함수 설정
    const onToggle = () => setOpen(!open);
    const onChange = e => setValue(e.target.value);
    const onSubmit = e => {
      e.preventDefault();
      dispatch({
        type: 'CREATE',
        todo: {
          id: nextId.current,
          text: value,
          done: false
        }
      })
      setValue('')
      setOpen(false)
      nextId.current += 1;
    }

    // open 이 true 일때만 태그를 반환한다.
    // 클릭했을 때 open의 상태가 바뀐다.
    return (
        <>
            { open && (
                <InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                        <Input
                          autoFocus
                          placeholder="할 일을 입력 후, 엔터를 누르세요."
                          onChange={onChange}
                          value={value}
                        />
                    </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd />
            </CircleButton>
        </>
    )
}

// TodoContext 에서 관리하고 있는 state 가 바뀔 때 때 TodoCreate 의 불필요한 리렌더링을 방지 할 수 있습니다.
// 만약 Context 를 하나만 만들었다면 이런 최적화를 하지 못하게 됩니다.
export default React.memo(TodoCreate);
