export function register(data: any) {
    return fetch("/api/auth/register", { method: "POST", body: JSON.stringify(data) })
}

export function login(data: any) {
    return fetch("/api/auth/login", { method: "POST", body: JSON.stringify(data) })
}

export function logout() {
    return fetch("/api/auth/logout", { method: "POST" })
}
