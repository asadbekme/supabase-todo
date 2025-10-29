# Todo App - Next.js + Supabase

Modern todo management ilovasi Next.js 14 (App Router), Supabase, TypeScript, Tailwind CSS va Shadcn UI bilan qurilgan.

## ⚡ Features

- ✅ User authentication (Login/Signup)
- ✅ CRUD operations for todos
- ✅ Real-time updates
- ✅ Todo filtering (All, Active, Completed)
- ✅ Responsive design
- ✅ Server Actions for data mutations
- ✅ Row Level Security (RLS)

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Language:** TypeScript

## 📦 Installation

1. **Loyihani clone qiling:**

```bash
git clone <repository-url>
cd todo-app
```

2. **Dependencies o'rnating:**

```bash
npm install
```

3. **Environment variables sozlang:**

`.env.local` faylini yarating va Supabase credentials kiriting:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Supabase database sozlang:**

Supabase SQL Editor'da `database-schema.sql` faylini run qiling.

5. **Development server ishga tushiring:**

```bash
npm run dev
```

Brauzerda `http://localhost:3000` ochiladi.

## 📁 Folder Structure

```
todo-app/
├── app/                    # Next.js App Router
│   ├── actions/           # Server Actions
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   └── signup/           # Signup page
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   └── ...               # Custom components
├── lib/                   # Utility functions
│   └── supabase/         # Supabase clients
├── types/                 # TypeScript types
└── middleware.ts          # Auth middleware
```

## 🔐 Authentication Flow

1. User `/signup` sahifasida ro'yxatdan o'tadi
2. Supabase Auth user yaratadi
3. Middleware protected route'larni tekshiradi
4. Login bo'lgan user `/dashboard` ga yo'naltiriladi

## 🗃️ Database Schema

### Todos Table

- `id` - UUID (Primary Key)
- `user_id` - UUID (Foreign Key to auth.users)
- `title` - Text
- `description` - Text (nullable)
- `is_completed` - Boolean
- `created_at` - Timestamp
- `updated_at` - Timestamp

### RLS Policies

- Users faqat o'z todolarini ko'radi va boshqaradi

## 🚀 Deployment

### Vercel (Recommended)

1. GitHub'ga push qiling
2. Vercel'ga import qiling
3. Environment variables qo'shing
4. Deploy!

```bash
# Yoki Vercel CLI bilan
npm i -g vercel
vercel
```

## 📝 API Routes (Server Actions)

### Auth Actions (`app/actions/auth.ts`)

- `login()` - User login
- `signup()` - User registration
- `logout()` - User logout

### Todo Actions (`app/actions/todos.ts`)

- `getTodos()` - Fetch all todos
- `createTodo()` - Create new todo
- `updateTodo()` - Update existing todo
- `toggleTodo()` - Toggle completion status
- `deleteTodo()` - Delete todo

## 🎨 Customization

### Shadcn UI Components

Yangi component qo'shish:

```bash
npx shadcn-ui@latest add [component-name]
```

### Tailwind Configuration

`tailwind.config.ts` faylida ranglar va theme sozlanadi.

## 🤝 Contributing

Pull requests welcome! Katta o'zgarishlar uchun issue oching.

## 📄 License

MIT

## 👨‍💻 Author

Sizning ismingiz: Asadbek Rakhimov
