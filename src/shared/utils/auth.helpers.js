import { TOKEN, USER } from "./global.constants"

export const login = () => {
    localStorage.setItem(USER, 'user')
}

export const logout = () => {
    localStorage.removeItem(USER)
}

export const isLoggedIn =() => {
    if (localStorage.getItem(TOKEN)) {
        return true
    }
    return false
}

export const getToken = () => {
    return localStorage.getItem(TOKEN)
}