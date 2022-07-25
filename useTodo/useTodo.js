import  { useEffect, useReducer } from 'react'
import { todoReducer } from '../08-useReducer/todoReducer';

const init = () =>{
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = (initialState = []) => {
    
    const [todos, dispatch] = useReducer( todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    const todosCount = (todos) =>{
        return todos.length
    }

    const pendingTodosCount = (todos) => {
        return todos.filter( (todo) =>  !todo.done  ).length
    }
    

    const handleNewTodo = ( newTodo ) =>{
        // console.log({newTodo});
        const action = {
            type: '[TODO] Add Todo',
            payload: newTodo,
        }

        dispatch(action);
    }

    const handleDeleteTodo = (id) => {

        dispatch({
            type: '[TODO] Delete Todo',
            payload: id,
        })
    }

    const handleToggleTodo = (id) =>{

        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        })

    }

    return{
        todos,
        handleDeleteTodo,
        handleToggleTodo,
        handleNewTodo,
        todosCount,
        pendingTodosCount
    }
}
