"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TodoItem } from "./todo-item";

interface Todo {
  id: string;
  title: string;
  description: string | null;
  is_completed: boolean;
  created_at: string;
}

interface TodoListProps {
  todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.is_completed;
    if (filter === "completed") return todo.is_completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.is_completed).length;
  const completedCount = todos.filter((t) => t.is_completed).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Vazifalar ro&apos;yxati</CardTitle>
          <div className="flex gap-2 text-sm">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-md ${
                filter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              Barchasi ({todos.length})
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-3 py-1 rounded-md ${
                filter === "active"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              Faol ({activeCount})
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 rounded-md ${
                filter === "completed"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              Bajarilgan ({completedCount})
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredTodos.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            {filter === "active" && "Faol vazifalar yo'q"}
            {filter === "completed" && "Bajarilgan vazifalar yo'q"}
            {filter === "all" && "Hali vazifa qo'shilmagan"}
          </p>
        ) : (
          <div className="space-y-2">
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
