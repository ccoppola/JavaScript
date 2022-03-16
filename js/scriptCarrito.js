// Variables
const listaProductos = [
    {
        id: 1,
        nombre: 'Optica Chevrolet Cruze 2016 en adelante -Original-',
        precio: 15500,
        imagen: 'assets/opticaCruze.jpg'
    },
    {
        id: 2,
        nombre: 'Faro trasero color blanco Peugeot 208 -Original-',
        precio: 10200,
        imagen: 'assets/faro208.jpeg'
    },
    {
        id: 3,
        nombre: 'Optica delantera Honda Fit 2012/2016 -Original-',
        precio: 10900,
        imagen: 'assets/opticaHonda.jpeg'
    },
    {
        id: 4,
        nombre: 'Optica izquierda Focus 2015/2020 -Original-',
        precio: 20100,
        imagen: 'assets/opticaFocus.jpeg'
    },
    {
        id: 5,
        nombre: 'Optica Alma delantera Ford Ka 2008/2013 -Original-',
        precio: 14500,
        imagen: 'assets/almaKa.jpeg'
    },
    {
        id: 6,
        nombre: 'Optica derecha Palio F.II F/Cromado A/cromado -Original-',
        precio: 11690,
        imagen: 'assets/opticaPalio.jpeg'
    },
    {
        id: 7,
        nombre: 'Optica Panel trasero interior Renault Logan -Original-',
        precio: 9900,
        imagen: 'assets/panelLogan.jpeg'
    },
    {
        id: 8,
        nombre: 'Panel cola trasera Honda Civic Linea 2006/2011 -Original-',
        precio: 25600,
        imagen: 'assets/colaHonda.jpeg'
    }
   

];

let carrito = [];
const moneda = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones

/**
 * Crea todos los productos, apartir de la lista de productos. 
 */
function renderizarProductos() {
     listaProductos.forEach((info) => {
        // Se creo la Estructura - "Card"
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body - "El cuerpo de la card"
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
        miNodoPrecio.textContent = `${moneda}${info.precio}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = 'Comprar';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', aniadirProductoAlCarrito);
        // Implementacion
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * Evento para poder añadir un producto al carrito de la compra
 */
function aniadirProductoAlCarrito(evento) {
    // Aniadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito 
    renderizarCarrito();

}

/**
 * Muestra los productos guardados en el carrito
 */
function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los productos duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = listaProductos.filter((itemListaProductos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemListaProductos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${moneda}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-primary', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = listaProductos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();