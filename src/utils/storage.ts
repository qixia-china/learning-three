export function setLocalStorage(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getLocalStorage<T = unknown>(key: string): T | null {
  const value = localStorage.getItem(key)
  if (value) {
    return JSON.parse(value) as T
  }
  return null
}
