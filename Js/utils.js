export function getURLParameter(name) {
    const params = new URLSearchParams(window.location.search)
    return params.get(name)
}

export function showError(elementId, message) {
    const el = document.getElementById(elementId)
    if (el) {
        el.textContent = message
        el.style.display = "block"
    }
}

export function checkAuth(user) {
    if (!user) {
        window.location.href = "login.html"
    }
}