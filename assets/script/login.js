document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const api_url = 'https://dummyjson.com';
  const formEl = document.querySelector('.form');
  const messageErrorEL = document.querySelector('.messageError');

  formEl.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(formEl);
    const obj = new Object();
    formData.forEach((value, key) => (obj[key] = value));
    console.log(obj);
    fetch(`${api_url}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    })
      .then(res => {
        if (!res.ok) throw new Error('Login or password is wrong');
        return res.json();
      })
      .then(data => {
        localStorage.setItem('accessToken', data.accessToken);
        open('../pages/profile.html', '_self');
      })
      .catch(() => {
        messageErrorEL.textContent = 'Username or password is wrong!';
        setTimeout(() => {
          messageErrorEL.textContent = null;
        }, 1500);
      });
  });
});
