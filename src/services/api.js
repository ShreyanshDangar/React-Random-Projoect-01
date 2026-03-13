import { API_USERS_URL, API_USERS_LIMIT } from '@/utils/constants'

export const USERS_QUERY_KEY = ['users']

export async function fetchUsers() {
  const response = await fetch(API_USERS_URL)
  if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`)
  const data = await response.json()
  return data.slice(0, API_USERS_LIMIT)
}
