import { createStore } from '../src/index';

const initialState = {
    currentTodo: '',
    todos: [],
    completed: 0,
    total: 0,
};

const reducer = (state, action) => {
    if (action.type === 'SET_CURRENT_TODO') {
        return {
            ...state,
            currentTodo: action.value,
        };
    }

    if (action.type === 'ADD_TODO') {
        return {
            ...state,
            currentTodo: '',
            todos: [
                ...state.todos,
                { id: action.value, text: action.value, completed: false },
            ],
            total: state.total + 1,
        };
    }

    if (action.type === 'COMPLETE_TODO') {
        return {
            ...state,
            todos: state.todos.map((todo) =>
                todo.id === action.value ? { ...todo, completed: true } : todo,
            ),
            completed: state.completed + 1,
        };
    }

    if (action.type === 'UNCOMPLETE_TODO') {
        return {
            ...state,
            todos: state.todos.map((todo) =>
                todo.id === action.value ? { ...todo, completed: false } : todo,
            ),
            completed: state.completed - 1,
        };
    }

    return state;
};

export default createStore(
    'todos',
    initialState,
    reducer,
    () => true,
    () => {},
    'todos',
);
