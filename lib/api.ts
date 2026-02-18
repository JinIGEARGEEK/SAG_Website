export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: string,
  ) {
    super(`${status} ${statusText}`)
    this.name = "ApiError"
  }
}

export interface ApiClientOptions {
  /** Base URL prepended to every path, e.g. "https://api.example.com" */
  baseUrl: string
  /**
   * Returns the Bearer token (or null/undefined when unauthenticated).
   * May be async (e.g. to refresh a token before the request).
   * Omit entirely for unauthenticated clients.
   */
  getToken?: () => string | null | undefined | Promise<string | null | undefined>
  /** Headers merged into every request (lowest priority). */
  defaultHeaders?: Record<string, string>
}

export interface RequestOptions {
  headers?: Record<string, string>
  // Next.js fetch extensions — only relevant in Server Components
  cache?: RequestCache
  next?: { revalidate?: number | false; tags?: string[] }
}

export function createApiClient(options: ApiClientOptions) {
  const { baseUrl, getToken, defaultHeaders } = options

  async function request<T>(
    method: string,
    path: string,
    body?: unknown,
    requestOptions?: RequestOptions,
  ): Promise<T> {
    const token = await getToken?.()

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...defaultHeaders,
      ...requestOptions?.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }

    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: requestOptions?.cache,
      next: requestOptions?.next,
    })

    if (!res.ok) {
      const text = await res.text()
      throw new ApiError(res.status, res.statusText, text)
    }

    if (res.status === 204) {
      return undefined as T
    }

    return res.json() as Promise<T>
  }

  return {
    get<T>(path: string, options?: RequestOptions): Promise<T> {
      return request<T>("GET", path, undefined, options)
    },
    post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
      return request<T>("POST", path, body, options)
    },
    put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
      return request<T>("PUT", path, body, options)
    },
    delete<T>(path: string, options?: RequestOptions): Promise<T> {
      return request<T>("DELETE", path, undefined, options)
    },
  }
}
