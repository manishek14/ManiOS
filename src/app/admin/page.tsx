'use client';

import { useState, useEffect, useCallback } from 'react';

const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || 'GHkR0lzRusIj4YdUUR1R';

interface Employer {
  id: number;
  fullname: string;
  phone: string;
  attempt: number;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        sessionStorage.setItem('admin_auth', '1');
        onLogin();
      } else {
        setError('نام کاربری یا رمز عبور اشتباه است');
      }
      setLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
      >
        <h1 className="text-center text-xl font-bold text-white">پنل مدیریت</h1>
        <p className="text-center text-sm text-slate-400">وارد شوید</p>

        {error && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-center text-sm text-red-400">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500/50"
          autoFocus
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500/50"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading ? '...' : 'ورود'}
        </button>
      </form>
    </div>
  );
}

function EmployersTable() {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEmployers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/admin/employers');
      if (!res.ok) throw new Error('خطا در دریافت اطلاعات');
      const data: Employer[] = await res.json();
      setEmployers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطای ناشناخته');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployers();
  }, [fetchEmployers]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#030712] px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">پنل مدیریت</h1>
            <p className="mt-1 text-sm text-slate-400">بخش کارفرماها</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5"
          >
            خروج
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-400">تعداد کل</p>
            <p className="mt-1 text-2xl font-bold text-white">{employers.length}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-400">با توضیحات</p>
            <p className="mt-1 text-2xl font-bold text-white">
              {employers.filter((e) => e.description).length}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-400">تلاش‌های تکراری</p>
            <p className="mt-1 text-2xl font-bold text-white">
              {employers.filter((e) => e.attempt > 1).length}
            </p>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            در حال بارگذاری...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-8 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchEmployers}
              className="mt-3 text-sm text-indigo-400 hover:underline"
            >
              تلاش مجدد
            </button>
          </div>
        ) : employers.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            هنوز کارفرمایی ثبت نشده است
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm text-right">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-4 py-3 font-medium text-slate-400">#</th>
                  <th className="px-4 py-3 font-medium text-slate-400">نام</th>
                  <th className="px-4 py-3 font-medium text-slate-400">تلفن</th>
                  <th className="px-4 py-3 font-medium text-slate-400">تلاش</th>
                  <th className="px-4 py-3 font-medium text-slate-400">توضیحات</th>
                  <th className="px-4 py-3 font-medium text-slate-400">تاریخ</th>
                </tr>
              </thead>
              <tbody>
                {employers.map((emp, i) => (
                  <tr
                    key={emp.id}
                    className="border-b border-white/5 transition-colors hover:bg-white/5"
                  >
                    <td className="px-4 py-3 text-slate-500">{i + 1}</td>
                    <td className="px-4 py-3 text-white">{emp.fullname}</td>
                    <td className="px-4 py-3 text-slate-300" dir="ltr">
                      {emp.phone}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          emp.attempt > 1
                            ? 'rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-400'
                            : 'text-slate-400'
                        }
                      >
                        {emp.attempt}
                      </span>
                    </td>
                    <td className="max-w-[200px] truncate px-4 py-3 text-slate-400">
                      {emp.description || '—'}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500" dir="ltr">
                      {new Date(emp.createdAt).toLocaleDateString('fa-IR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === '1') {
      setIsAuth(true);
    }
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <p className="text-slate-400">...</p>
      </div>
    );
  }

  if (!isAuth) {
    return <LoginForm onLogin={() => setIsAuth(true)} />;
  }

  return <EmployersTable />;
}
