import React from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete, MdEdit } from "react-icons/md";
import { useTodoDispatch } from "../TodoContext";
import { useState } from "react";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;
const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
    display:flex;
    align-items=center;
    padding-top:12px;
    padding-bottom:12px;
    &:hover{
        ${Edit}{
          display:initial;
        }
        ${Remove}{
            display:initial;
        }

    }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

function TodoItem({ id, done, text }) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const dispatch = useTodoDispatch();
  const onToggle = () => dispatch({ type: "TOGGLE", id });
  const onRemove = () => dispatch({ type: "REMOVE", id });
  const onEdit = () => {
    if (editing) {
      dispatch({ type: "SAVE", id, text: newText });
    }
    setEditing(!editing);
  };
  const onChange = (e) => {
    setNewText(e.target.value);
  };

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      {editing ? (
        <input type="text" value={newText} onChange={onChange} />
      ) : (
        <Text done={done}>{text}</Text>
      )}
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
      <Edit onClick={onEdit}>
        <MdEdit />
      </Edit>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
