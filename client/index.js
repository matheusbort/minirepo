// http-server -c-1
function App () {
    const {useState, useEffect} = React;
    const [todos, setTodos] = useState();
    const [loading, setLoading] = useState(true);

    const getTodos = async () => {
        setLoading(true);
        await fetch("http://localhost:8090/todos")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data) {
                setTodos(data);
            }
        })
        .catch(error => console.error('Error fetching todos:', error))
        .finally(() => setLoading(false));
    }

    useEffect(() => {
        getTodos()
    }, []);
    
    const addTodo = async text => {
        const newTodo = { title: text, isCompleted: false };
        const postTodo = async () => {
            try {
                const response = await fetch('http://localhost:8090/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTodo),
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const responseData = await response.json();
                console.log('Todo created:', responseData);
            } catch (error) {
                console.error('Error creating todo:', error);
            }
        };
    
        await postTodo();
        await getTodos();
    };

    const removeTodo = index => {
        console.log('Removing todo:', index);
        fetch(`http://localhost:8090/todos/${index}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Todo deleted:', data);
            getTodos();
        })
        .catch(error => console.error('Error deleting todo:', error));
    }

    const completeTodo = index => {
        fetch(`http://localhost:8090/todos/${index}/complete`, {
            method: 'PUT',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Todo completed:', data);
            getTodos();
        })
        .catch(error => console.error('Error completing todo:', error));
    }

    const undoTodo = index => {
        fetch(`http://localhost:8090/todos/${index}/incomplete`, {
            method: 'PUT',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Todo completed:', data);
            getTodos();
        })
        .catch(error => console.error('Error completing todo:', error));
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="app">
            <header className="header">
                <h1>To Do List</h1>
            </header>
            <main>
                <div className="todo-add">
                    <TodoForm addTodo={addTodo} />
                </div>
                <div className="todo-list">
                    {todos && todos.map((todo, i) => 
                        <div key={i} className="todo-item">
                            <Todo key={i} todo={todo} index={i} removeTodo={() => removeTodo(todo.ID)} completeTodo={() => completeTodo(todo.ID)} undoTodo={() => undoTodo(todo.ID)} />
                        </div>
                    )}
                </div>
            </main>
            <footer className="footer">
                <p>Experimental - go + next.js</p>
            </footer>
        </div>
        )
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />);