const saludo = document.querySelector('#name');
const modal = document.querySelector('#modal')
const titleModal = document.querySelector('#titleModal');
const bodyModal = document.querySelector('#bodyModal');

//Construcción de formulario
const form = document.createElement('form');
const div = document.createElement('div');
const error = document.createElement('div');
const label = document.createElement('label');
const input = document.createElement('input');
const submit = document.createElement('button');
div.className = "inputForm";
error.className = "errorForm hidden";
label.textContent = "Monto";
input.className = "inputModal";
input.type = "number";
input.name = "mount";
submit.className = "btn";
form.className = "formModal";
div.appendChild(label);
div.appendChild(input);
form.appendChild(div);
form.appendChild(submit);


document.addEventListener('DOMContentLoaded', function(){ 
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { nombre } = user;   
    saludo.innerText = nombre;
})

//Ver movimientos
document.querySelector('#transactions').addEventListener('click', () => {
    openModal();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { log } = user;  
    titleModal.textContent = 'Movimientos'
    const buildingBody = document.createDocumentFragment();
    const titleTab = document.createElement('div');
    titleTab.className = "showMovimiento titleMovimiento";
    titleTab.innerHTML = `<span>Fecha Mov</span><span>Monto</span><span>Tipo</span>`;
    buildingBody.appendChild(titleTab);
    for(let movimiento of log)
    {
        const dateFormat = new Intl.DateTimeFormat('es-Es',{ dateStyle: 'short', timeStyle: 'short'}).format(new Date(movimiento.fecha))
        const div = document.createElement('div');
        div.className = "showMovimiento";
        div.innerHTML = `<span>${dateFormat}</span><span>${movimiento.monto}</span><span>${movimiento.type}</span>`
        buildingBody.appendChild(div);    
    }
    bodyModal.appendChild(buildingBody);    
});

//Modal retiros
document.querySelector('#withdrawals').addEventListener('click', () => {
    openModal();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { saldo, log } = user;  
    titleModal.textContent = 'Retirar Saldo';
    const buildingBody = document.createDocumentFragment();
    
    submit.textContent = 'Retirar';
    submit.id = "withdrawalSubmit";
    form.id = "formWithdrawal";
    input.value = "";

    buildingBody.appendChild(form);
    bodyModal.appendChild(buildingBody);

    form.addEventListener('submit', e => {
        e.preventDefault();

        const data = new FormData(form);

        const values = Object.fromEntries(data);

        const newBalance = saldo - values.mount;

        if(newBalance < 10)
        {
            form.appendChild(error);
            error.textContent = 'El monto de tu retiro supera el saldo mínimo de tu cuenta.';
            error.classList.remove('hidden');
        }
        else
        {
            log.unshift({fecha: new Date().toISOString(), monto: Number(values.mount), type: 'retiro'});
            const userUpdate = {
                ...user,
                saldo: newBalance,
                log: log,

            }
            window.sessionStorage.setItem('user', JSON.stringify(userUpdate)); 
            closeModal();
        }
    });
});

//Modal depósitos
document.querySelector('#deposits').addEventListener('click', () => {
    openModal();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { saldo, log } = user; 
    titleModal.textContent = 'Depositar Saldo';
    const buildingBody = document.createDocumentFragment();
    
    submit.textContent = 'Depósitar';
    submit.id = "depositSubmit";
    form.id = "formDeposit";
    input.value = "";

    buildingBody.appendChild(form);
    bodyModal.appendChild(buildingBody);

    form.addEventListener('submit', e => {
        e.preventDefault();

        const data = new FormData(form);

        const values = Object.fromEntries(data);

        const newBalance = Number(saldo) + Number(values.mount);

        if(newBalance > 990)
        {
            form.appendChild(error);
            error.textContent = 'El monto de tu depósito supera el saldo máximo de tu cuenta.';
            error.classList.remove('hidden');
        }
        else
        {
            log.unshift({fecha: new Date().toISOString(), monto: Number(values.mount), type: 'depósito'});
            const userUpdate = {
                ...user,
                saldo: newBalance,
                log: log,

            }
            window.sessionStorage.setItem('user', JSON.stringify(userUpdate)); 
            closeModal();
        }
    });
});

//Modal saldo
document.querySelector('#balance').addEventListener('click', () => {
    openModal();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { saldo } = user;  
    titleModal.textContent = 'Tu Saldo';
    const h1Saldo = document.createElement('h1');
    h1Saldo.textContent = `$ ${saldo}`;

    bodyModal.appendChild(h1Saldo);

})











//MODAL
//Abre Modal
const openModal = () => {
    modal.classList.remove('hidden');
}

//Cierra Modal
const closeModal = () => {
    modal.classList.add('hidden');
    if(bodyModal.children.length > 0)
    {
        for(let i = bodyModal.children.length - 1; i >= 0; i--)
        {
            bodyModal.children[i].remove();
        }
    }
    error.classList.add('hidden');
}

//Cierra Modal al hacer click fuera del contenedor modal
modal.addEventListener('click', () => {
    closeModal();
})

//Evita el cierre al hacer click dentro del modal
const contentModal = document.querySelector('#contentModal').addEventListener('click', (event) => {
    event.stopPropagation();
})

//Cierra Modal desde botón
const buttonClose = document.querySelector('#close').addEventListener('click', () => {
    closeModal();
})

