"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Todo {
  id: string;
  title: string;
  is_done: boolean;
  inserted_at?: string;
}

export function TodoList() {
  const supabase = createSupabaseBrowserClient();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("inserted_at", { ascending: false });

    if (error) console.error(error);
    else setTodos(data || []);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    setLoading(true);

    const { error } = await supabase.from("todos").insert([{ title: newTodo }]);

    if (error) console.error(error);
    else setNewTodo("");

    setLoading(false);
  };

  const toggleTodo = async (id: string, done: boolean) => {
    const { error } = await supabase
      .from("todos")
      .update({ is_done: !done })
      .eq("id", id);

    if (error) console.error(error);
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) console.error(error);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTodos();
    };
    fetchData();

    const channel = supabase
      .channel("todos-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todos" },
        () => fetchTodos()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-5 max-w-md mx-auto">
      <div className="flex gap-2">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
        />
        <Button onClick={addTodo} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </Button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border rounded-lg p-2"
          >
            <span
              onClick={() => toggleTodo(todo.id, todo.is_done)}
              className={`cursor-pointer ${
                todo.is_done ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.title}
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
