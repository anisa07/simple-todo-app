import {TodoListItem} from "./TodoListItem";
import React, {useState} from "react";
import {DeleteAlert} from "../deleteAlert/DeleteAlert";
import './style.scss';
import {TodoItemEntity} from "../../types/TodoItemEntity";
import {Action, TodoListAction} from "../../types/TodoListAction";

interface TodoListProps {
    todoList: TodoItemEntity[];
    onUpdateList: (action: TodoListAction) => void;
}
export const TodoList = ({ todoList, onUpdateList }: TodoListProps) => {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<TodoItemEntity>({} as TodoItemEntity);
    const onVerifyTodo = (id: string) => {
        onUpdateList({ id, action: Action.VERIFY})
    }
    const onDeleteTodo = (item: TodoItemEntity) => {
        setItemToDelete(item);
        setShowDeleteAlert(true);
    }

    const onApproveDelete = () => {
        onUpdateList({ id: itemToDelete.id, action: Action.DELETE})
        onCloseDelete();
    }

    const onCloseDelete = () => {
        setItemToDelete({} as TodoItemEntity);
        setShowDeleteAlert(false);
    }

    return (
        <>
            <ul className="todoList" data-testid="todo-list">
                {todoList.map((todoItem: TodoItemEntity) =>
                    <TodoListItem
                        key={todoItem.id}
                        todoItem={todoItem}
                        onVerifyTodo={onVerifyTodo}
                        onDeleteTodo={onDeleteTodo}
                    />
                )}
            </ul>
            {showDeleteAlert && <DeleteAlert todoItemText={itemToDelete.text} onDelete={onApproveDelete} onCancel={onCloseDelete} />}
        </>
    )
}
