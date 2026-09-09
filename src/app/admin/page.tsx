'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Admin panel — authentication is fully server-side now.
 * The login form posts to /api/admin/login which checks credentials in
 * server env vars and sets an HttpOnly signed cookie. The employers data
 * is only served by /api/admin/employers when that cookie is valid.
 */

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        onLogin();
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.message || 'خطا در ورود، دوباره تلاش کنید');
      }
    } catch {
      setError('خطا در برقراری ارتباط با سرور');
    } finally {
      setLoading(false);
    }
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
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500/50"
          autoComplete="current-password"
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
  const [unauthorized, setUnauthorized] = useState(false);

  const fetchEmployers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/admin/employers', { cache: 'no-store' });
      if (res.status === 401) {
        setUnauthorized(true);
        return;
      }
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
    // Initial load: all state updates happen after the async boundary,
    // so no cascading render on mount.
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/admin/employers', { cache: 'no-store' });
        if (cancelled) return;
        if (res.status === 401) {
          setUnauthorized(true);
          return;
        }
        if (!res.ok) throw new Error('خطا در دریافت اطلاعات');
        const data: Employer[] = await res.json();
        setEmployers(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'خطای ناشناخته');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      window.location.reload();
    }
  };

  if (unauthorized) {
    return <LoginForm onLogin={() => { setUnauthorized(false); fetchEmployers(); }} />;
  }

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
  // The server decides via cookie whether /api/admin/employers returns data.
  // We optimistically render the table; a 401 swaps in the login form.
  return <EmployersTable />;
}
