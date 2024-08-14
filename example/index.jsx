import { createRoot } from 'react-dom/client';

import '@minutemailer/ui/design-system/scss/theme.scss';
import '@minutemailer/ui/design-system/scss/style.scss';

import {
    Layout,
    Header as LayoutHeader,
    Content,
    Main,
    Sidebar,
    AppBar,
    Navigation,
    Nav,
    MinutemailerUI,
    Box,
} from '@minutemailer/ui';
import { CheckFilled, PlusBold } from '@minutemailer/ui/ui/icons';
import Stack from '@minutemailer/ui/ui/components/Stack';
import Checkbox from '@minutemailer/ui/ui/components/Checkbox';
import Typography, { Text } from '@minutemailer/ui/ui/components/Typography';
import Input from '@minutemailer/ui/ui/components/Input';
import store from './store';

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

function Status() {
    const total = store.useSelector((state) => state.total);
    const completed = store.useSelector((state) => state.completed);

    return `${completed} / ${total} todos completed`;
}

function Form() {
    const currentTodo = store.useSelector((state) => state.currentTodo);

    function onSubmit(e) {
        e.preventDefault();
        store.dispatch({ type: 'ADD_TODO', value: currentTodo });
    }

    return (
        <form onSubmit={onSubmit}>
            <Input
                placeholder="Add a new todo"
                value={currentTodo}
                icon={<PlusBold />}
                variant="rounded"
                onChange={(value) => {
                    store.dispatch({ type: 'SET_CURRENT_TODO', value });
                }}
            />
        </form>
    );
}

function App() {
    return (
        <MinutemailerUI t={(key) => key}>
            <Layout>
                <LayoutHeader>
                    <AppBar logo={<CheckFilled />}>
                        <Box expand>
                            <Status />
                        </Box>
                    </AppBar>
                </LayoutHeader>
                <Content>
                    <Main>
                        <Stack
                            spaceBetween
                            valign="bottom"
                            gap
                            marginBottom="xs"
                        >
                            <Typography variant="title">Todo</Typography>
                            <Form />
                        </Stack>
                        <Box background padding>
                            <Todos />
                        </Box>
                    </Main>
                </Content>
            </Layout>
        </MinutemailerUI>
    );
}

const root = createRoot(document.getElementById('app'));

root.render(<App />);
