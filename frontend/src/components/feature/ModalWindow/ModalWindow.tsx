import { Button } from '@components/common';
import './ModalWindow.scss';
import { useEffect, useState } from 'react';

interface IModalWindowProps {
    chosenTodo: string;
    setShowModal: (value: boolean) => void;
}

interface Todo {
    _id: string;
    name: string;
    status: string;
}

export const ModalWindow: React.FC<IModalWindowProps> = ({chosenTodo, setShowModal}) => {
    const [currentTodo, setCurrentTodo] = useState<Todo>({} as Todo);

    const getTodo = async () => {
        const response = await fetch(`http://localhost:3000/todos/${chosenTodo}`);
        const data = await response.json();
        setCurrentTodo(data);
    }

    const updateTodo = async (id: string, status: string) => {
        await fetch(`http://localhost:3000/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        getTodo();
        setShowModal(false);
    }

    useEffect(() => {
        getTodo();
    }, [chosenTodo]);

    return (
        <div className='modal'>
            <div className='modal__content'>
                <h2 className='modal__title'>{currentTodo.name}</h2>
                <p className='modal__text'>{currentTodo.status}: {currentTodo.name}</p>
                <p className='modal__text'>{currentTodo._id}</p>
                <div className='buttons'>
                    <Button text="Close" className='primary' onClick={() => setShowModal(false)}/>
                    <Button text="Move back to TODO status" className='primary' onClick={() => updateTodo(currentTodo._id, "todo")}/>
                    <Button text="Change to DONE" className='primary' onClick={() => updateTodo(currentTodo._id, "done")}/>
                    <Button text="Move to TRASH" className='primary' onClick={() => updateTodo(currentTodo._id, "trash")}/>
                </div>
            </div>
        </div>
    );
};