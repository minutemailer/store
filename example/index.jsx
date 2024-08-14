import { createRoot } from 'react-dom/client';

import '@minutemailer/facade/styles/theme.scss';
import '@minutemailer/facade/styles/foundation.css';
import Button from '@minutemailer/facade/components/Button';
import Stack from '@minutemailer/facade/components/Stack';
import Checkbox from '@minutemailer/facade/components/Checkbox';
import store from './store';
import { Title, Text } from '@minutemailer/facade/components/Typography';
import Input from '@minutemailer/facade/components/Input';
import { useState } from 'react';

function Todos() {
    const todos = store.useSelector((state) => state.todos);

    return (
        <Stack direction="vertical" gap="xs">
            {todos.map((todo) => (
                <Stack key={todo.id} valign="middle" gap="xs">
                    <Checkbox
                        variant="switch"
                        checked={todo.completed}
                        onChange={(checked) =>
                            store.dispatch({
                                type: checked
                                    ? 'COMPLETE_TODO'
                                    : 'UNCOMPLETE_TODO',
                                value: todo.id,
                            })
                        }
                    >
                        <span
                            style={{
                                textDecoration:
                                    todo.completed && 'line-through',
                            }}
                        >
                            {todo.text}
                        </span>
                    </Checkbox>
                </Stack>
            ))}
        </Stack>
    );
}

function Header() {
    const total = store.useSelector((state) => state.total);
    const completed = store.useSelector((state) => state.completed);

    return (
        <Stack direction="vertical" align="center">
            <Title>Todo</Title>
            <Text>
                {completed} / {total} todos completed
            </Text>
        </Stack>
    );
}

function Form() {
    const currentTodo = store.useSelector((state) => state.currentTodo);

    function onSubmit(e) {
        e.preventDefault();
        store.dispatch({ type: 'ADD_TODO', value: currentTodo });
    }

    return (
        <Stack valign="middle" component="form" gap="xs" onSubmit={onSubmit}>
            <Input
                placeholder="Add a new todo"
                value={currentTodo}
                onChange={(value) => {
                    store.dispatch({ type: 'SET_CURRENT_TODO', value });
                }}
            />
            <Button type="submit">Add</Button>
        </Stack>
    );
}

function App() {
    return (
        <Stack
            align="center"
            direction="vertical"
            valign="middle"
            height="screen"
            gap
        >
            <Header />
            <Form />
            <Todos />
        </Stack>
    );
}

const root = createRoot(document.getElementById('app'));

root.render(<App />);
