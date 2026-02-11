import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todo",

    initialState: {
        list: [],
    },

    reducers: {
        addTodo: (state, action) => {
            state.list.push({
                id: Date.now(),
                text: action.payload,
                completed: false,
            });
        },

        deleteTodo: (state, action) => {
            state.list = state.list.filter(todo => todo.id !== action.payload);
        },

        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.list.find(t => t.id === id);
            if (todo) todo.text = text;
        },

    },
});

export const { addTodo, deleteTodo, updateTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
