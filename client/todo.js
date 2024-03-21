function Todo({todo, index, removeTodo, completeTodo, undoTodo}) {
    const handleDelete = () => {
        removeTodo(index);
    }

    const handleComplete = () => {
        completeTodo(index);
    }

    const handleUndo = () => {
        undoTodo(index);
    }

    return (
        <>
            <div className="todo-text" key={index} id={index} >{todo.title}</div>
            <div className="todo-actions">
                {todo.completed === false && <button className="todo-action">Edit</button>}
                {todo.completed === false && <button className="todo-action" onClick={handleComplete}>Complete</button>}
                {todo.completed === true && <button className="todo-action" onClick={handleUndo}>Undo</button>}
                <button className="todo-action"  onClick={handleDelete}>Delete</button>
            </div>
        </>
    )
}