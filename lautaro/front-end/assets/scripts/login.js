// Funcionalidad para el modal de login
      document.addEventListener("DOMContentLoaded", function () {
        const loginBtn = document.getElementById("loginBtn");
        const loginModal = document.getElementById("loginModal");
        const closeModal = document.getElementById("closeModal");
        const loginForm = document.getElementById("loginForm");

        // Abrir modal
        loginBtn.addEventListener("click", function () {
          loginModal.classList.remove("hidden");
          loginModal.classList.add("flex");
        });

        // Cerrar modal
        closeModal.addEventListener("click", function () {
          loginModal.classList.remove("flex");
          loginModal.classList.add("hidden");
        });

        // Cerrar modal al hacer clic fuera
        loginModal.addEventListener("click", function (e) {
          if (e.target === loginModal) {
            loginModal.classList.remove("flex");
            loginModal.classList.add("hidden");
          }
        });

        // Manejar envío del formulario
        loginForm.addEventListener("submit", function (e) {
          e.preventDefault();
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;

          // Aquí iría la lógica real de autenticación
          console.log("Email:", email);
          console.log("Password:", password);

          // Simulamos un inicio de sesión exitoso
          alert("Inicio de sesión simulado con éxito!");
          loginModal.classList.remove("flex");
          loginModal.classList.add("hidden");
        });
      });