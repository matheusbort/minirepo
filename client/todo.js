function Todo({ todo, index, removeTodo, completeTodo, undoTodo }) {
  const [updateMode, setUpdateMode] = React.useState(false);
  const [text, setText] = React.useState(todo.title);
  
  const handleDelete = () => {
    removeTodo(index);
  };

  const handleComplete = () => {
    completeTodo(index);
  };

  const handleUndo = () => {
    undoTodo(index);
  };

  const toogleUpdate = () => {
    setUpdateMode(!updateMode);
  }

  const handleUpdate = async (event) => {
    console.log(text)
  }

  const extraClass = todo.completed ? "todo-completed" : "";

  return (
    <>
      <div className={extraClass} key={index} id={index}>
        {todo.title}
      </div>
      <div className="todo-actions">
        {todo.completed === false && (
          <>
            {!updateMode && <button className="todo-action" onClick={toogleUpdate}>Edit</button>}
            {updateMode && <button className="todo-action" onClick={toogleUpdate}>Cancel</button>}
            {updateMode && <button action="submit" className="todo-action" onClick={handleUpdate}>Confirm</button>}
            {updateMode && <textarea className="todo-update" value={text} onChange={(e) => {setText(e.target.value)}}/>}
          </>
        )}
        {todo.completed === false && !updateMode && (
          <button className="todo-action" onClick={handleComplete}>
            Complete
          </button>
        )}
        {todo.completed === true && !updateMode && (
          <button className="todo-action" onClick={handleUndo}>
            Undo
          </button>
        )}
        {todo.completed === false && !updateMode && (
          <button className="todo-action" onClick={handleDelete}>
            Delete
        </button>
        )}
      </div>
    </>
  );
}
