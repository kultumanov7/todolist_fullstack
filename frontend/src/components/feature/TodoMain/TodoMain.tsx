import { Button, Input } from '@components/common';
import './TodoMain.scss';
import { useEffect, useState } from 'react';
import { ModalWindow } from '../ModalWindow';

interface Todo {
    _id: string;
    name: string;
    status: string;
}

export const TodoMain = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [currentTab, setCurrentTab] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [chosenTodo, setChosenTodo] = useState<string>('');

    const TABS = [
        { name: 'Todo', value: 'todo' },
        { name: 'Done', value: 'done' },
        { name: 'Trash', value: 'trash' },
    ]

    const getTodos = async () => {
        const response = await fetch('http://localhost:3000/todos');
        const data = await response.json();
        setTodos(data);
        setCurrentTab('');
    }

    const deleteTodo = async (id: string) => {
        await fetch(`http://localhost:3000/todos/${id}`, {
            method: 'DELETE',
        });
        getTodos();
    }

    const updateTodo = async (id: string, status: string) => {
        await fetch(`http://localhost:3000/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        getTodos();
    }

    const addTodo = async () => {
        await fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newTodo }),
        });
        getTodos();
        setNewTodo('');
        setCurrentTab('');
    }

    const getTodosByStatus = async (status: string) => {
        const response = await fetch(`http://localhost:3000/todos/filter/${status}`);
        const data = await response.json();
        setTodos(data);
    }

    const handleSetCurrentTab = (tab: string) => {
        setCurrentTab(tab);
        getTodosByStatus(tab);
    }

    const handleGetAllTodos = () => {
        setCurrentTab('');
        getTodos();
    }

    const handleChoose = (id: string) => {
        setChosenTodo(id);
        setShowModal(true);
    }

    useEffect(() => {
        getTodos();
    }, [showModal]);

    useEffect(() => { // delete then
        console.log(newTodo);
    }, [newTodo]);

  return (
    <div className='todo-main'>
      <h1>Todo List</h1>
      {
        showModal ? <ModalWindow chosenTodo={chosenTodo} setShowModal={setShowModal}/>
        : <>
            <div className='todo-main__btns'>
                <Button text={"GET ALL TODOS"} className='primary' onClick={handleGetAllTodos}/>
                <div className='todo-main__filter'>
                    {TABS.map((tab) => (
                        <div key={tab.value} 
                            className={`filter-tab ${currentTab === tab.value ? 'active' : ''}`} 
                            onClick={() => handleSetCurrentTab(tab.value)}>{tab.name}</div>
                    ))}
                </div>
                <div className='todo-main__add'>
                    <Input type='text' value={newTodo} onChange={(e: any) => setNewTodo(e.target.value)}/>
                    <Button text={"Add Todo"} className='primary' onClick={addTodo}/>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '5%' }}></th>
                        <th style={{ width: '75%' }}>Todo</th>
                        <th style={{ width: '15%' }}>Status</th>
                        <th style={{ width: '5%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo._id}>
                            <td className='complete' onClick={() => updateTodo(todo._id, "done")}>+</td>
                            <td className='name' onClick={() => handleChoose(todo._id)}>{todo.name}</td>
                            <td>{todo.status}</td>
                            <td className='delete' onClick={() => deleteTodo(todo._id)}>X</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
        
      }
      
      
    </div>
  );
}
