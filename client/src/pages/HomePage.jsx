import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from 'antd';
import { Card, Button, Input } from 'antd';
import 'antd/dist/antd.css';
import { Layout, Spin } from 'antd';

const { Content } = Layout;

const HomePage = () => {
    const [todos, setTodos] = useState([]);
    const [loadingComplete, setLoadingComplete] = useState(false);
    const [currnetUsername, setCurrnetUsername] = useState('');
    const initialFormState = { name: '', description: '' };
    const [formState, setFormState] = useState(initialFormState);

    useEffect(() => {
        fetchTodos();
    }, []);

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value });
    }

    async function fetchTodos() {
        try {
            const res = {
                Items: [
                    {
                        todoId: '1',
                        name: 'foo',
                        description: 'bar'
                    }
                ]
            };
            setTodos(res.Items);
            setLoadingComplete({ loadingComplete: true });
        } catch (err) {
            console.log(err);
            console.log('error fetching todos');
        }
    }

    async function addTodo() {
        try {
            if (!formState.name || !formState.description) return;
            const todo = { ...formState, username: currnetUsername };
            setTodos([...todos, todo]);
            setFormState(initialFormState);

            const config = {
                body: todo,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            // await API.post('todos', '/todos', config);
            fetchTodos();
        } catch (err) {
            console.log('error creating todo:', err);
        }
    }

    async function removeTodo(id) {
        try {
            setTodos(todos.filter((todo) => todo.todoId.S !== id));
            // await API.del('todos', `/todos/${id}`);
        } catch (err) {
            console.log('error removing todo:', err);
        }
    }

    return (
        <div>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <PageHeader
                        className="site-page-header"
                        title={`Welcome ${currnetUsername}`}
                        subTitle="To-do list powered by AWS serverless architecture"
                        style={styles.header}
                    />
                </div>
                {loadingComplete ? (
                    <div>
                        {todos.map((todo, index) => (
                            <Card key={todo.todoId ? todo.todoId : index} title={todo.name} style={{ width: 300 }}>
                                <p>{todo.description}</p>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Spin />
                )}
            </Content>
        </div>
    );
};

const styles = {
    input: {
        margin: '10px 0'
    },
    submit: {
        margin: '10px 0',
        marginBottom: '20px'
    },
    header: {
        paddingLeft: '0px'
    }
};

export default HomePage;
