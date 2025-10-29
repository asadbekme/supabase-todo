import { getTodos } from "@/app/actions/todos";
import { logout } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { TodoList } from "@/components/todo-list";
import { AddTodoForm } from "@/components/add-todo-form";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: todos } = await getTodos();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-4 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pt-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Mening vazifalarim
            </h1>
            <p className="text-gray-600 mt-1">{user?.email}</p>
          </div>
          <form action={logout}>
            <Button variant="outline" type="submit">
              Chiqish
            </Button>
          </form>
        </div>

        {/* Add Todo Form */}
        <div className="mb-6">
          <AddTodoForm />
        </div>

        {/* Todo List */}
        <TodoList todos={todos || []} />
      </div>
    </div>
  );
}
