import checkError from '../utils/checkError'

const url = `http://localhost:4001/users`

export const updateUserRequest = async ({
  userId,
  email,
  username,
}: {
  userId: string
  email?: string
  username?: string
}) => {
  const body = JSON.stringify(
    Object.assign({}, email && { email }, username && { username })
  )
  return fetch(`${url}/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then((res) => res.json())
    .then(checkError)
}

export const changePasswordRequest = async ({
  userId,
  oldPassword,
  newPassword,
}: {
  userId: string
  oldPassword: string
  newPassword: string
}) => {
  const body = JSON.stringify({ oldPassword, newPassword })
  return fetch(`${url}/change-password/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then((res) => res.json())
    .then(checkError)
}
