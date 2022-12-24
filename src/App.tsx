import React, {useState} from 'react';
import {CreateTodo} from "./components/createTodo/CreateTodo";
import {TodoList} from "./components/todoList/TodoList";
import {copyObjectHelper} from "./helpers/copyHelper";
import {searchIndexById} from "./helpers/searchHelper";
import {createUniqueId} from "./helpers/createUniqueIdHelper";
import {TodoItemEntity} from "./types/TodoItemEntity";
import {Action, TodoListAction} from "./types/TodoListAction";
import './app.scss';

function App() {
  const [todoList, setTodoList] = useState<TodoItemEntity[]>([]);

  const handleUpdateTodoList =({ id, action, text}: TodoListAction) => {
    let copyTodoList = copyObjectHelper(todoList);

    switch (action) {
      case Action.CREATE: {
        copyTodoList = [ { text, id: createUniqueId(), verified: false} , ...todoList];
        break;
      }
      case Action.VERIFY: {
        const itemIndex = searchIndexById(copyTodoList, id as string);
        copyTodoList[itemIndex].verified = true;
        break;
      }
      case Action.DELETE: {
        const itemIndex = searchIndexById(copyTodoList, id as string);
        copyTodoList.splice(itemIndex, 1);
        break;
      }
    }
    setTodoList(copyTodoList);
  }

  return (
    <main className="main">
      <div className="content">
        <CreateTodo onUpdateList={handleUpdateTodoList} />
        <TodoList todoList={todoList} onUpdateList={handleUpdateTodoList} />
      </div>
    </main>
  );
}

export default App;
