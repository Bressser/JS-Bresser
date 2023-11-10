document.addEventListener('DOMContentLoaded', () => {

    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Coca-Cola',
            precio: 1.5,
            imagen: 'imagen/coca-cola-regular.png',
        },
        {
            id: 2,
            nombre: 'Sprite',
            precio: 1.2,
            imagen: 'imagen/Sprite.png',
        },
        {
            id: 3,
            nombre: 'Fanta',
            precio: 0.6,
            imagen: 'imagen/Fanta.jpg',
        },
        {
            id: 4,
            nombre: 'Scheppes',
            precio: 2.2,
            imagen: 'imagen/Product-Shot-vodka.png',
        },
        {
            id: 5,
            nombre: 'Fernet-Branca',
            precio: 3.7,
            imagen: 'imagen/Fernet-Branca.jpg',
        },
        {
            id: 6,
            nombre: 'Hannava-Club',
            precio: 6.2,
            imagen: 'imagen/Havana.jpg',
        },
        {
            id: 7,
            nombre: 'Jagermeister',
            precio: 5,
            imagen: 'imagen/Jagermeister.jpg',
        },
        {
            id: 8,
            nombre: 'Baileys-Chocolate',
            precio: 8,
            imagen: 'imagen/baileys-chocolat-luxe.png',
        },
        {
            id: 9,
            nombre: 'Absolut',
            precio: 4,
            imagen: 'imagen/vodka-absolut.jpg',
        },
        {
            id: 10,
            nombre: 'Whisky Blue-Label',
            precio: 15,
            imagen: 'imagen/Blue-Label.jpg',
        },
        {
            id: 11,
            nombre: 'Whisky Black-Label',
            precio: 10,
            imagen: 'imagen/Black-Label.jpeg',
        },
        {
            id: 12,
            nombre: 'Jack Daniels',
            precio: 7,
            imagen: 'imagen/Jack-Daniels +.jpg',
        },
    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    // Funciones

    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertar
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    function anyadirProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }

    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        DOMtotal.textContent = calcularTotal();
    }

    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();
        guardarCarritoEnLocalStorage();

    }

    function calcularTotal() {

        return carrito.reduce((total, item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }


    function vaciarCarrito() {
        carrito = [];
        renderizarCarrito();
        localStorage.clear();

    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});