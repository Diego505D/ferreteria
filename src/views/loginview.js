document.addEventListener("DOMContentLoaded", function () {
  console.log(" Página de Login cargada");

  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("loginPassword");


 togglePassword.addEventListener("click", () => {


    const tipoActual = passwordInput.getAttribute("type");

    if (tipoActual === "password") {
        passwordInput.setAttribute("type", "text");
        togglePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordInput.setAttribute("type", "password");
        togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
    }

});

  document.getElementById("formLogin").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const rememberMe = document.getElementById("rememberMe").checked;
    const messageDiv = document.getElementById("loginMessage");
    const btnLogin = document.getElementById("btnLogin");

    messageDiv.style.display = "none";
    limpiarErrores();

    if (!email) {
      mostrarError("emailError", "El correo electrónico es obligatorio");
      return;
    } else if (!validarEmail(email)) {
      mostrarError("emailError", "Ingresa un correo electrónico válido");
      return;
    } else if (!password) {
      mostrarError("passwordError", "La contraseña es obligatoria");
      return;
    } else if (password.length < 6) {
      mostrarError(
        "passwordError",
        "La contraseña debe tener al menos 6 caracteres",
      );
      return;
    }

    btnLogin.disabled = true;
    btnLogin.innerHTML = '<span class="spinner"></span> Validando...';

    const controller = new UsuarioController();
    const result = controller.login(email, password);

    setTimeout(() => {
      if (result.exito) {
        if (rememberMe) {
          localStorage.setItem(
            "usuarioRecordado",
            JSON.stringify(result.usuario),
          );
        }

        localStorage.setItem("sesionActiva", "true");
        localStorage.setItem("usuarioActual", JSON.stringify(result.usuario));

        mostrarMensaje(
          " ¡Bienvenido " + result.usuario.nombre + "! Redirigiendo...",
          "success",
        );

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      } else {
        mostrarMensaje(result.mensaje, "error");

        btnLogin.disabled = false;
        btnLogin.innerHTML = '<i class="fas fa-sign-in-alt"></i> Ingresar';

        const loginBox = document.querySelector(".login-box");
        loginBox.style.animation = "shake 0.5s ease";
        setTimeout(() => {
          loginBox.style.animation = "";
        }, 500);
      }
    }, 800);
  });


  document.getElementById("loginEmail").addEventListener("input", function () {
    const value = this.value.trim();
    if (value && !validarEmail(value)) {
      mostrarError("emailError", "Formato de correo inválido");
    } else {
      limpiarError("emailError");
    }
  });

  document
    .getElementById("loginPassword")
    .addEventListener("input", function () {
      const value = this.value.trim();
      if (value && value.length < 6) {
        mostrarError("passwordError", "Mínimo 6 caracteres");
      } else {
        limpiarError("passwordError");
      }
    });

  document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const form = document.getElementById("formLogin");
      if (document.activeElement.closest(".login-form")) {
        form.dispatchEvent(new Event("submit"));
      }
    }
  });
});

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function mostrarError(id, mensaje) {
  const elemento = document.getElementById(id);
  if (elemento) {
    elemento.textContent = mensaje;
    elemento.style.display = "block";
    const input = elemento.closest(".form-group").querySelector("input");
    if (input) input.classList.add("input-error");
  }
}

function limpiarError(id) {
  const elemento = document.getElementById(id);
  if (elemento) {
    elemento.textContent = "";
    elemento.style.display = "none";
    const input = elemento.closest(".form-group").querySelector("input");
    if (input) input.classList.remove("input-error");
  }
}

function limpiarErrores() {
  limpiarError("emailError");
  limpiarError("passwordError");
}

function mostrarMensaje(mensaje, tipo) {
  const messageDiv = document.getElementById("loginMessage");
  messageDiv.textContent = mensaje;
  messageDiv.className = "login-message " + tipo;
  messageDiv.style.display = "block";
}

window.cargarCredenciales = function (email, password) {
  document.getElementById("loginEmail").value = email;
  document.getElementById("loginPassword").value = password;

  limpiarErrores();

  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  emailInput.style.borderColor = "#27ae60";
  passwordInput.style.borderColor = "#27ae60";

  setTimeout(() => {
    emailInput.style.borderColor = "";
    passwordInput.style.borderColor = "";
  }, 1500);
};

const styleShake = document.createElement("style");
styleShake.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
        20%, 40%, 60%, 80% { transform: translateX(8px); }
    }
`;
document.head.appendChild(styleShake);
