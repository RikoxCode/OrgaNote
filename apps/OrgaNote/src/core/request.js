import { useToken } from './auth'

const { token, user } = useToken()

export async function getUserClubs() {
    return await request(`/clubs/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.value,
        },
    })
}

export async function login(email, password) {
    return await request(`/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })
}

export async function checkAuth() {
    try {
        const response = await request(`/auth/me`, {
            method: 'GET',
        })

        return response.data
    } catch (error) {
        return false
    }
}

export async function request(url, options) {
    const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }

    if (token.value) {
        headers['Authorization'] = 'Bearer ' + token.value
    }

    console.log(import.meta.env.VITE_BACKEND_URL + url)

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + url, {
        headers,
        ...options,
    })

    console.log(response)

    if (response.ok) {
        return response.json()
    } else if (response.status === 422) {
        const data = await response.json()

        throw new ValidationError('validation failed', data.errors)
    } else {
        throw new Error(`Server error: ${await response.text()}`)
    }
}

export class ValidationError {
    message
    errors

    constructor(message, errors) {
        this.message = message
        this.errors = errors
    }
}
