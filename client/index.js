// http-server -c-1
function App () {
    const todos = [];

    React.useEffect(() => {
        const getTodos = async () => {
            const todosFromServer = await fetch('http://localhost:8090/todos');
            todos = todosFromServer.json();
        }
        getTodos();
        console.log(todos);
    }, [])
    
    const addTodo = text => {
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
    
        postTodo();
    };

    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    const completeTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;
        setTodos(newTodos);
    }

    const undoTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = false;
        setTodos(newTodos);
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
                    {todos.map((todo, i) => 
                        <div className="todo-item">
                            <Todo key={i} todo={todo} index={i} removeTodo={removeTodo} completeTodo={completeTodo} undoTodo={undoTodo} />
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