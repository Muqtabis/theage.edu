document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'  // important for session
        });

        if (res.ok) {
            window.location.href = '/admin/dashboard';
        } else {
            document.getElementById('login-error').textContent = 'Invalid credentials';
        }
    } catch (err) {
        console.error(err);
        document.getElementById('login-error').textContent = 'Server error';
    }
});
