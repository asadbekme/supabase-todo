import { AuthForm } from "@/components/auth-form";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-sm w-full space-y-5 p-6 shadow-lg rounded-2xl border bg-white">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}
