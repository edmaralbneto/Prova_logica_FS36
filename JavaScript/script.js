function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (password.length < 9) {
        errorMessage.textContent = "A senha deve ter pelo menos 9 caracteres.";
        return false;
    }


    if (username === "admin" && password === "12345#123") {
        window.location.href = "pagina-interna.html";
        return false;
    } else {
        errorMessage.textContent = "Usuário ou senha inválidos!";
        return false;
    }
}
