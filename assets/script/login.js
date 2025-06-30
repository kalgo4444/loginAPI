document.addEventListener("DOMContentLoaded", () => {

    const api_url = 'https://dummyjson.com'
    const formEl = document.querySelector('.form')
    const usernameEl = document.querySelector('.username')
    const passwordEl = document.querySelector('.password')

    formEl.addEventListener('submit', (e) => {
        e.preventDefault()

        let obj = {
            username: usernameEl.value,
            password: passwordEl.value
        }
        fetch(`${api_url}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
            .then(res => {
                if (!res.ok) throw new Error("Login or password is wrong")
                return res.json()
            })
            .then(data => {
                localStorage.setItem("accessToken", data.accessToken)
                open('../pages/profile.html', '_self')
            })
            .catch(err => {
                console.error(err)
            })
    })

})