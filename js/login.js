import { users } from "./dataUsers.js";

const form = document.querySelector('#auth');
const error = document.querySelector('#error');
//Crea el tag span para el mensaje de error
const span = document.createElement('span');

form.addEventListener('submit', (e) => {
    //No me refresca toda la página al hacer submit con el form
    e.preventDefault();

    const data = new FormData(form);

    const values = Object.fromEntries(data);

    /* 
    values{
      email: 'correo@correo.com',
      password: 'sdfgsdf'
    }

    formEmail = 'correo@correo.com'
     */

    const { email: formEmail, password: formPassword } = values;

    if(formEmail.length === 0)
    {
      span.textContent = 'Debes ingresar un email';
      error.appendChild(span);
      error.classList.remove('hidden');
      console.log(error)
      return
    }

    if(formPassword.length === 0)
    {
      span.textContent = 'Debes ingresar tu pin';
      error.appendChild(span);
      error.classList.remove('hidden');
      console.log(error)
      return
    }

    const user = users.find( user => user.email === formEmail && user.password === formPassword) ?? false;

    if(!user)
    {
      span.textContent = 'Error en tus credenciales';
      error.appendChild(span);
      error.classList.remove('hidden');
      console.log(error)
      return
    }
    else
    {
        window.sessionStorage.setItem('user', JSON.stringify(user));
        window,location.href = '../pages/index.html';
    }

})

/* console.log(form); */

