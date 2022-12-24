import {TodoItemEntity} from "../../types/TodoItemEntity";

interface TodoListItemProps {
    todoItem: TodoItemEntity;
    onVerifyTodo: (id: string) => void;
    onDeleteTodo: (item: TodoItemEntity) => void;
}
export const TodoListItem = ({ todoItem, onVerifyTodo, onDeleteTodo }: TodoListItemProps) => {
    const handleVerifyItem = () => {
        onVerifyTodo(todoItem.id);
    }
    const handleDeleteItem = () => {
        onDeleteTodo(todoItem);
    }

    const listItemClass = () => todoItem.verified ? 'listItem verified' : 'listItem';
    return (
        <li className={listItemClass()} data-testid="list-item">
            <span className="todoText">{todoItem.text}</span>
            <div>
                <button onClick={handleVerifyItem} disabled={todoItem.verified} data-testid="verify-todo-btn">Verify</button>
                <button onClick={handleDeleteItem} data-testid="delete-todo-btn">Delete</button>
            </div>
        </li>
    )
}
