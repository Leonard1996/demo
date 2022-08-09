import { TOKEN, USER } from './global.constants'

export const setLogin = (remember, token, user) => {
  if (remember) {
    localStorage.setItem(USER, JSON.stringify(user))
    localStorage.setItem(TOKEN, token)
  } else {
    sessionStorage.setItem(USER, JSON.stringify(user))
    sessionStorage.setItem(TOKEN, token)
  }
}

export const logout = () => {
  localStorage.removeItem(TOKEN)
  localStorage.removeItem(USER)
  sessionStorage.removeItem(TOKEN)
  sessionStorage.removeItem(USER)
}

export const isLoggedIn = () => {
  return !!(localStorage.getItem(TOKEN) || sessionStorage.getItem(TOKEN))
}

export const getToken = () => {
  return localStorage.getItem(TOKEN) || sessionStorage.getItem(TOKEN)
}

export const getUser = () => {
  let user
  try {
    const _u = localStorage.getItem(USER) || sessionStorage.getItem(USER)
    user = JSON.parse(_u)
  } catch (e) {
    console.log(e.message)
  }
  return user
}
