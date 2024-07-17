import { useState } from "react";
import { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from "../api/apiSlice";
const Todo = () => {
    const [newTodo, setNewTodo] = useState("");

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery({});

    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newId = Date.now(); // Generate a numeric id based on timestamp
        console.log(newTodo);
        const newTodoItem = {
            id: newId.toString(), // Convert id to string if needed
            userId: 1,
            title: newTodo,
            completed: false,
        };
       // addTodo({userId: 1, title: newTodo, completed: false});
       addTodo(newTodoItem); // Dispatch addTodo mutation with new todo
        setNewTodo("");
    };

    const newItems =
        <form onSubmit={handleSubmit} className="flex flex-col w-1/2">
            <label htmlFor="new-todo">Add New Todo</label>
            <input
                type="text"
                id="new-todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="border border-black rounded-md px-2 py-2"
                placeholder="Enter new Todo"
                name="text"
            />
            <button type="submit"
                className="p-2 my-2 bg-slate-500 border border-black">
                Add Todo</button>
        </form>

    let todosContent;

    if (isLoading) {
        todosContent = <p>Loading...</p>;
    } else if (isSuccess) {
        todosContent = (
            <ul className="flex gap-4 flex-col w-full  items-center justify-center text-md">
                {todos.map((todo: any) => (
                    <li key={todo.id} className="w-1/2 border border-violet-400 rounded-md p-2 flex flex-row justify-between items-center ">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                            className="p-4"
                        />
                        <span className="px-2 w-full">{todo.title}</span>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="p-1 bg-slate-500 border border-black"
                        >
                            Delete
                        </button>
                        </li>
                ))}
            </ul>
        );
    } else if (isError) {
        todosContent = <p>{(error as any).data}</p>;
    }

    return (
        <div className="flex flex-col w-full items-center justify-center p-4">
            <h1 className="text-5xl font-semibold">Todo List</h1>
            {newItems}
            {todosContent}
        </div>
    );
};
export default Todo;