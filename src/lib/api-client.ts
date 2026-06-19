const API_URL = (import.meta.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init?.headers },
    })
  } catch {
    throw new ApiError('Tidak dapat terhubung ke server. Pastikan backend FastAPI sudah berjalan.', 0)
  }

  if (!response.ok) {
    let message = 'Terjadi kesalahan saat memproses permintaan.'
    try {
      const body = (await response.json()) as { detail?: string | Array<{ msg?: string }> }
      if (typeof body.detail === 'string') message = body.detail
      else if (Array.isArray(body.detail)) message = body.detail[0]?.msg ?? message
    } catch {
      // Keep the friendly fallback for non-JSON error responses.
    }
    throw new ApiError(message, response.status)
  }

  return response.json() as Promise<T>
}
