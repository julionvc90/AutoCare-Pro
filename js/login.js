function logeo() {
    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);

    if (usuario === "admin" && contrasena === "root") {
        window.location.href = "index.html";
    } else if (usuario === "vendedor" && contrasena === "1234") {
        window.location.href = "index.html";
    } else if  (usuarioEncontrado) {
        window.location.href = "pagCompra.html";
    }
}

function registrar() {
    window.location.href = "Register.html";
    
    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value;

    if (usuario !== "" && contrasena !== "") {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push({ usuario: usuario, contrasena: contrasena });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        console.log("Usuario registrado correctamente");
    }
}