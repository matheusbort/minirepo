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
            <div className="todo-text" key={index} id={index} >{todo.text}</div>
            <div className="todo-actions">
                {todo.isCompleted === false && <button className="todo-action">Edit</button>}
                {todo.isCompleted === false && <button className="todo-action" onClick={handleComplete}>Complete</button>}
                {todo.isCompleted === true && <button className="todo-action" onClick={handleUndo}>Undo</button>}
                <button className="todo-action"  onClick={handleDelete}>Delete</button>
            </div>
        </>
    )
}