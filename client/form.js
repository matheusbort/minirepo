function TodoForm({addTodo}) {
    const [value, setValue] = React.useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue(''); 
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                placeholder="Add your to do ..."
                onChange={e => setValue(e.target.value)}
            />
            <button className="add-button" type="submit">Add</button>
        </form>
    )
}