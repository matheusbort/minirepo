// http-server -c-1
function App () {
    const [todos, setTodos] = React.useState([
        { id: 1, text: 'Learn React', isCompleted: false },
        { id: 2, text: 'Meet friend for lunch', isCompleted: false },
        { id: 3, text: 'Build really cool todo app', isCompleted: false }
    ]);
    
    const addTodo = text => {
        const newTodos = [{ text: text, isCompleted: false }, ...todos];
        setTodos(newTodos);
    }

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
                <p>@FernandoBDAF - MITxPRO Module 14 :D</p>
            </footer>
        </div>
        )
}


ReactDOM.render(<App />, document.getElementById('root'));