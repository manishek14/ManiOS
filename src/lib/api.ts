const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, body: unknown) {
    const msg = typeof body === 'object' && body !== null && 'message' in body
      ? String((body as Record<string, unknown>).message)
      : `API Error: ${status}`;
    super(msg);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = `${API_BASE}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }
    throw new ApiError(response.status, body);
  }

  return response.json() as Promise<T>;
}

export const api = {
  chat: {
    async sendMessage(message: string, history: { role: string; content: string }[]) {
      return apiRequest<{ reply: string }>('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message, history }),
      });
    },
  },
  contact: {
    async submit(data: { fullname: string; phone: string; description?: string }) {
      return apiRequest<{ success: boolean; id?: number }>('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  },
};
