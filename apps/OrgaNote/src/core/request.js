import { useToken } from './auth'

const { token, setToken } = useToken()

class Request {
    async checkAuth() {
        try {
            const response = await this.request(`/auth/me`, {
                method: 'GET',
            })

            return response.data
        } catch (error) {
            return false
        }
    }

    async request(url, options) {
        const headers = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        }

        if (token.value) {
            headers['Authorization'] = 'Bearer ' + token.value
        }

        const response = await fetch(process.env.BACKEND_URL + url, {
            headers,
            ...options,
        })

        if (response.ok) {
            return response.json()
        } else if (response.status === 422) {
            const data = await response.json()

            throw new ValidationError('validation failed', data.errors)
        } else {
            throw new Error(`Server error: ${await response.text()}`)
        }
    }
}

class ValidationError {
    message
    errors

    constructor(message, errors) {
        this.message = message
        this.errors = errors
    }
}
