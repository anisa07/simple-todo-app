import {ChangeEvent, useState, KeyboardEvent} from "react";
import {Action, TodoListAction} from "../../types/TodoListAction";
import './style.scss';

interface CreateTodoProps {
    onUpdateList: (action: TodoListAction) => void;
}
export const CreateTodo = ({ onUpdateList }: CreateTodoProps) => {
    const [todo, setTodo] = useState('');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value || '')
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            handleAddTodoItem();
        }
    }

    const handleAddTodoItem = () => {
        if (todo) {
            onUpdateList({text: todo, action: Action.CREATE})
            setTodo('');
        }
    }

    return (
        <div className="newTodoContainer" data-testid="create-todo">
            <input
                placeholder="new todo"
                type="text"
                className="newTodoField"
                value={todo}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
            />
            <button onClick={handleAddTodoItem} data-testid="create-todo-btn">Add Todo Item</button>
        </div>
    )
}
