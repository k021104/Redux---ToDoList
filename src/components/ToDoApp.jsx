import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "../redux/todoSlice";

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
        <div style={{ padding: 30 }}>

            {/* Add Todo */}
            <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Enter todo"
            />

            <button onClick={handleAdd}>Add</button>

            <hr />

            {/* Todo List */}
            {todos.map(todo => (
                <div key={todo.id} style={{ marginBottom: 10 }}>

                    {editingId === todo.id ? (
                        <>
                            <input
                                value={editingText}
                                onChange={e => setEditingText(e.target.value)}
                            />

                            <button onClick={() => handleSave(todo.id)}>Save</button>

                            <button onClick={() => setEditingId(null)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <span>{todo.text}</span>

                            <button onClick={() => {
                                setEditingId(todo.id);
                                setEditingText(todo.text);
                            }}>
                                Edit
                            </button>

                            <button onClick={() => dispatch(deleteTodo(todo.id))}>
                                Delete
                            </button>
                        </>
                    )}

                </div>
            ))}

        </div>
    );
}
