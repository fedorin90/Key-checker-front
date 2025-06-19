import { api } from './axios'

const KEYS_API_URL = 'keys-checker/keys/'

export const fetchKeys = async () => {
  const response = await api.get(KEYS_API_URL)
  return response.data
}
export const fetchLastSessionKeys = async () => {
  const response = await api.get(`${KEYS_API_URL}last-session/`)
  return response.data
}

export const createKeys = async (keyObjects) => {
  const response = await api.post(KEYS_API_URL, keyObjects)

  return response.data
}

export const checkKeys = async (sessionId) => {
  const session_id = { session_id: sessionId }
  const response = await api.post('check-keys/', session_id)
  console.log(response)

  return response.data
}
// export const updateKeys = async (id, is_completed) => {
//   const response = await api.patch(`${KEYS_API_URL}${id}/`, {
//     is_completed: is_completed,
//   })
//   return response.data
// }

// export const deleteKeys = async (id) => {
//   await api.delete(`${KEYS_API_URL}${id}/`)
// }

// export const deleteAllKeys = async () => {
//   const response = await api.delete(`${KEYS_API_URL}delete_all/`)
//   return response.data
// }

// export const deleteCompletedKeys = async () => {
//   const response = await api.delete(`${KEYS_API_URL}delete_completed/`)
//   return response.data
// }
