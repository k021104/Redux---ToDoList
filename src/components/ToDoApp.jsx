import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "../redux/todoSlice";
import "./ToDoApp.css";

export default function TodoApp() {

    const [text, setText] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const todos = useSelector(state => state.todo.list);
    const dispatch = useDispatch();

    const handleAdd = () => {
        if (!text.trim()) return;

        dispatch(addTodo(text));
        setText("");
    };

    const handleSave = (id) => {
        dispatch(updateTodo({ id, text: editingText }));
        setEditingId(null);
        setEditingText("");
    };

    return (
        <div className="todo-container">

            <h2>Redux Todo App</h2>

            <div className="add-row">
                <input
                    className="todo-input"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Enter todo"
                />

                <button className="add-btn" onClick={handleAdd}>Add</button>
            </div>

            {todos.map(todo => (
                <div key={todo.id} className="todo-item">

                    {editingId === todo.id ? (
                        <>
                            <input
                                className="todo-input"
                                value={editingText}
                                onChange={e => setEditingText(e.target.value)}
                            />

                            <div className="todo-actions">
                                <button className="save-btn" onClick={() => handleSave(todo.id)}>Save</button>
                                <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <span className="todo-text">{todo.text}</span>

                            <div className="todo-actions">
                                <button
                                    className="edit-btn"
                                    onClick={() => {
                                        setEditingId(todo.id);
                                        setEditingText(todo.text);
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => dispatch(deleteTodo(todo.id))}
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}

                </div>
            ))}

        </div>
    );
}
