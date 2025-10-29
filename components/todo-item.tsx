"use client";

import { useState } from "react";
import { toggleTodo, deleteTodo, updateTodo } from "@/app/actions/todos";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2, Check, X } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  description: string | null;
  is_completed: boolean;
  created_at: string;
}

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleToggle() {
    await toggleTodo(todo.id, !todo.is_completed);
  }

  async function handleDelete() {
    setIsDeleting(true);
    await deleteTodo(todo.id);
  }

  async function handleUpdate(formData: FormData) {
    await updateTodo(todo.id, formData);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <Card className="p-4">
        <form action={handleUpdate} className="space-y-3">
          <Input
            name="title"
            defaultValue={todo.title}
            placeholder="Sarlavha"
            required
          />
          <Input
            name="description"
            defaultValue={todo.description || ""}
            placeholder="Tavsif"
          />
          <div className="flex gap-2">
            <Button type="submit" size="sm" className="flex-1">
              <Check className="h-4 w-4 mr-1" />
              Saqlash
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="flex-1"
            >
              <X className="h-4 w-4 mr-1" />
              Bekor qilish
            </Button>
          </div>
        </form>
      </Card>
    );
  }

  return (
    <Card className={`p-4 transition-all ${isDeleting ? "opacity-50" : ""}`}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={todo.is_completed}
          onCheckedChange={handleToggle}
          disabled={isDeleting}
          className="mt-1"
        />
        <div className="flex-1">
          <h3
            className={`font-medium ${
              todo.is_completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={`text-sm mt-1 ${
                todo.is_completed
                  ? "line-through text-muted-foreground"
                  : "text-gray-600"
              }`}
            >
              {todo.description}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            {new Date(todo.created_at).toLocaleDateString("uz-UZ", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            disabled={isDeleting || todo.is_completed}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
