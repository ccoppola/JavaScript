/* 
==============================================
TODO LO REFERENTE A LA PÁGINA CARRITO.HTML
==============================================
*/

// Variables
let carrito = [];
const moneda = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonComprar = document.querySelector('#boton-comprar');
const miLocalStorage = window.localStorage


let listaProductos = [];
fetch('../data.json')
.then((resp) => resp.json())
.then((data) => renderizarProductos(data))

// Funciones

/**
 * Crea todos los productos, apartir de la lista de productos. 
 */
function renderizarProductos(productos) {
    console.log(productos)
      productos.forEach((info) => {
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
        miNodoBoton.addEventListener('click', function(){aniadirProductoAlCarrito(event,productos)});
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
function aniadirProductoAlCarrito(evento,productos) {
    Toastify({
        text: "Agregaste el producto al carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#B2AAFD",
          color: "#242424"
        },
        onClick: function(){} // Callback after click
      }).showToast();
    // Aniadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito 
    renderizarCarrito(productos);
    guardarCarritoEnLocalStorage(productos);

}

/**
 * Muestra los productos guardados en el carrito
 */
function renderizarCarrito(productos) {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los productos duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = productos.filter((itemListaProductos) => {
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
        miBoton.addEventListener('click', function(){borrarItemCarrito(event,productos)} );
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal(productos);
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento,productos) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    Toastify({
        text: "Eliminaste el producto de tu carrito",
        className: "info",
        style: {
            background: "#B2AAFD",
            color: "#242424"
        }
      }).showToast();

    renderizarCarrito(productos);
    guardarCarritoEnLocalStorage(productos);

}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal(productos) {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = productos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

/**
 * Vacia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: '¿Desea vaciar el carrito de compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, vaciar carrito.',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
          swalWithBootstrapButtons.fire(
            'Se ha borrado con exito!',
            'Los productos del carrito fueron eliminados.',
          )
          renderizarCarrito();
          localStorage.clear();

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Proceso cancelado',
            'Los productos de tu carrito no fueron eliminados',
          )
        }
      })
}
/*Evento para comprar elementos del carrito*/
function comprarCarrito() {
  carrito = [];
  renderizarCarrito();
  localStorage.clear();

  Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: '¡Compra realizada con exito!.',
      showConfirmButton: false,
      timer: 1500
  })
}

function guardarCarritoEnLocalStorage() {
  miLocalStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage() {
  if (miLocalStorage.getItem('carrito') !== null) {
      carrito = JSON.parse(miLocalStorage.getItem('carrito'));
  }
}

const domBotonVaciar = document.querySelector("#boton-vaciar");
const domBotonComprar = document.querySelector("#boton-comprar");

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);
DOMbotonComprar.addEventListener("click", comprarCarrito);

//Inicio
cargarCarritoDeLocalStorage();

