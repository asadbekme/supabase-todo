"use client";

import { useState } from "react";
import { createTodo } from "@/app/actions/todos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function AddTodoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    await createTodo(formData);
    setIsSubmitting(false);
    // Form reset
    const form = document.getElementById("add-todo-form") as HTMLFormElement;
    form?.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Yangi vazifa qo&apos;shish</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="add-todo-form" action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Sarlavha *</Label>
            <Input
              id="title"
              name="title"
              placeholder="Vazifa nomini kiriting..."
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Tavsif</Label>
            <Input
              id="description"
              name="description"
              placeholder="Qo'shimcha ma'lumot (ixtiyoriy)"
              disabled={isSubmitting}
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Qo'shilmoqda..." : "Qo'shish"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
