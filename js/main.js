const saludo = document.querySelector('#name');
const modal = document.querySelector('#modal')
const titleModal = document.querySelector('#titleModal');
const bodyModal = document.querySelector('#bodyModal')
const user = JSON.parse(sessionStorage.getItem('user'));
const { nombre, log } = user;


document.addEventListener('DOMContentLoaded', function(){    
    saludo.innerText = nombre;
})

//Ver movimientos
document.querySelector('#transactions').addEventListener('click', () => {
    openModal();
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
    
    console.log(bodyModal.children.length)
    
    if(bodyModal.children.length > 0)
    {
        /* for(let i = 0; bodyModal.children.length > 0; i++)
        {
            console.log(bodyModal.children[i])
            //child.remove();
        } */
    }
})

    

/*  */














//MODAL
//Abre Modal
const openModal = () => {
    modal.classList.remove('hidden');
}

//Cierra Modal
const closeModal = () => {
    modal.classList.add('hidden');
}

//Cierra Modal al hacer click fuera del contenedor modal
modal.addEventListener('click', () => {
    modal.classList.toggle('hidden');
})

//Evita el cierre al hacer click dentro del modal
const contentModal = document.querySelector('#contentModal').addEventListener('click', (event) => {
    event.stopPropagation();
})

//Cierra Modal desde botón
const buttonClose = document.querySelector('#close').addEventListener('click', () => {
    modal.classList.toggle('hidden');
})

