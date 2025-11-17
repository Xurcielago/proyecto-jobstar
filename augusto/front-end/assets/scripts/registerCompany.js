const register = async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;
  const company_name = document.getElementById("company_name").value;
  const location = document.getElementById("location").value;
  const headquarters = document.getElementById("headquarters").value;
  const contact = document.getElementById("contact").value;

  const registerForm = document.getElementById('registerForm');

  const req = await fetch("http://localhost:3000/api/auth/registerCompany", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      role,
      company_name,
      location,
      headquarters,
      contact,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (registerForm) {
  // 3. Le decimos que cuando alguien intente "enviarlo" (submit),
  // ejecute tu función llamada "register"
  registerForm.addEventListener('submit', register);
} else {
  console.error('Error: No se pudo encontrar el formulario con id "loginForm"');
}

  const res = await req.json();

  if (req.ok) {
    alert(res.message);
    window.location.replace("index.html");
  } else {
    alert(res.message);
  }
};
