/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import { signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Ro'yxatdan o'tish
          </CardTitle>
          <CardDescription>
            Yangi akkount yaratish uchun ma'lumotlarni kiriting
          </CardDescription>
        </CardHeader>
        <form action={signup} className="space-y-4">
          <CardContent className="space-y-4">
            {params.error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
                {decodeURIComponent(params.error)}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="sizning@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Ro'yxatdan o'tish
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Akkauntingiz bormi?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Kirish
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
