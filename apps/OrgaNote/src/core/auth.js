import { ref } from 'vue'

export const STORAGE_KEY = 'session_token'
export const USER_KEY = 'user'

const auth = ref(localStorage.getItem(STORAGE_KEY) || '')
const user = ref(JSON.parse(localStorage.getItem(USER_KEY)) || '')

export function useToken() {
    function setToken(newToken) {
        auth.value = newToken
        localStorage.setItem(STORAGE_KEY, newToken)
    }

    function clearToken() {
        auth.value = ''
        localStorage.removeItem(STORAGE_KEY)

        if (user.value) {
            clearUser()
        }
    }

    function setUser(newUser) {
        user.value = newUser
        localStorage.setItem(USER_KEY, JSON.stringify(newUser))
    }

    function clearUser() {
        user.value = ''
        localStorage.removeItem(USER_KEY)

        if (auth.value) {
            clearToken()
        }
    }

    return {
        token: auth,
        user,
        setToken,
        clearToken,
        setUser,
        clearUser,
    }
}
