import React, { useEffect, useState } from 'react';
import { PageHeader } from 'antd';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import { Layout, Spin } from 'antd';
import axios from 'axios';

const { Content } = Layout;

interface LoadingState {
    loadingComplete: boolean;
}

interface Todo {
    _source: {
        todoId: string;
        name: string;
        description: string;
    };
}

const HomePage = () => {
    const [todos, setTodos] = useState([]);
    const [loadingComplete, setLoadingComplete] = useState<LoadingState>({ loadingComplete: false });

    useEffect(() => {
        fetchTodos();
    }, []);

    async function fetchTodos() {
        try {
            const res = await axios.get('/todos');
            setTodos(res.data.hits.hits);
            setLoadingComplete({ loadingComplete: true });
        } catch (err) {
            console.log(err);
            console.log('error fetching todos');
        }
    }

    return (
        <div>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <PageHeader
                        className="site-page-header"
                        title={'Welcome!'}
                        subTitle="To-do list powered by AWS serverless architecture"
                        style={styles.header}
                    />
                </div>
                {loadingComplete ? (
                    <div>
                        {todos.map((todo: Todo, i) => (
                            <Card key={todo._source.todoId} title={todo._source.name} style={{ width: 300 }}>
                                <p>{todo._source.description}</p>
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
