/*let nombre;
let apellido;
let dni;
let datos;
let nombreEmpresa;
let numeroCuit;
let usuario;
let contrasenia;


datos = prompt("Primero ingrese los datos. (Empresa o Persona Fisica)");
if(datos == "Empresa"){
    nombreEmpresa = prompt("Ingrese el nombre de la empresa");
    numeroCuit = parseInt(prompt("Ingrese el numero de cuit"));
    alert("Bienvenido" + " " + nombreEmpresa + " " + "Ahora falta crear su usario y contraseña.");
}
    
else if(datos == "Persona Fisica"){
    nombre = prompt("Ingrese su nombre");
    apellido = prompt("Ingrese su apellido");
    dni = parseInt(prompt("Ingrese su dni"));
    alert("Bienvenido" + nombre + apellido, + "Ahora falta crear su usario y contraseña");    
}

    usuario = prompt("Ingrese su nombre de usuario");
    contrasenia = prompt("Ingrese la contraseña");

alert("Su solicitud fue realizada con exito." + " " + "Su usuario es: " + " " + usuario + " " + "y su contraseña es: " + " " + contrasenia);*/
 

let productoParagolpes;
let productoOpticas;
let stockParagolpesFord = 2000;
let stockParagolpesChevrolet = 2000;
let stockProductoParagolpes = stockParagolpesFord + stockParagolpesChevrolet;
let stockOpticasFord = 500;
let stockOpticasChevrolet = 500;
let stockProductoOpticas = stockOpticasChevrolet + stockOpticasFord;
let marca;
let vehiculo;
let producto;
let cantidadProducto = 0;
let respuesta;
let precioFinal = 0;
let precioOpticaChevrolet = 4000;
let precioOpticaFord = 3000;
let precioParagolpeChevrolet = 1500;
let precioParagolpeFord = 2000;
let cantFordParagolpe = 0;
let cantFordOpticas = 0;
let cantChevroletParagolpe = 0;
let cantChevroletOpticas = 0;


function SolicitarMarca(){
    let marcaIngresada = prompt("Ingrese la marca de su vehiculo. ford/chevrolet");
    while(marcaIngresada != "ford" && marcaIngresada != "chevrolet"){
        marcaIngresada = prompt("Dato incorrecto. Ingrese la marca nuevamente");
    }
    return marcaIngresada;
}

function SolicitarProducto(){
    let productoSeleccionado = prompt("Ingrese el producto que desea comprar. paragolpes/opticas");
    while(productoSeleccionado != "paragolpes" && productoSeleccionado != "opticas"){
        productoSeleccionado = prompt("Dato incorrecto. Ingrese nuevamente el producto que desea comprar.");
    }
    return productoSeleccionado;
}

function IngresarCantidadProducto(){
   let cantidadProductoIngresado = parseInt(prompt("Ingrese la cantidad que desea comprar."));
   return cantidadProductoIngresado;
}

function ValidarStockProductos(cantidadProductosIngresados, stockProducto){
    while(cantidadProductosIngresados > stockProducto){
        cantidadProductosIngresados = parseInt(prompt("No tenemos stock suficiente de ese producto, puede comprar hasta " + stockProducto + " unidades. Ingrese una cantidad valida"));
    }
    return cantidadProductosIngresados;
}

function CalcularPrecioFinal(cantChevroletOpticas, precioOpticaChevrolet, cantChevroletParagolpe, precioParagolpeChevrolet, cantFordParagolpe, precioParagolpeFord, cantFordOpticas, precioOpticaFord ){
    let precioFinalCalculado = cantChevroletOpticas * precioOpticaChevrolet + cantChevroletParagolpe * precioParagolpeChevrolet + cantFordParagolpe * precioParagolpeFord + cantFordOpticas * precioOpticaFord;
    return precioFinalCalculado;
}


do{
    marca = SolicitarMarca();
    producto = SolicitarProducto();
    cantidadProducto = IngresarCantidadProducto();
      
    if(marca == "ford" && producto =="paragolpes")
    {   
        cantidadProducto = ValidarStockProductos(cantidadProducto, stockParagolpesFord);
        cantFordParagolpe += cantidadProducto;
    }
    else if( marca == "ford" && producto == "opticas")
    {
        cantidadProducto = ValidarStockProductos(cantidadProducto, stockOpticasFord);
        cantFordOpticas += cantidadProducto;
    }
    else if(marca == "chevrolet" && producto =="paragolpes")
    {    
        cantidadProducto = ValidarStockProductos(cantidadProducto, stockParagolpesChevrolet);
        cantChevroletParagolpe += cantidadProducto;
    }
    else
    {   
        cantidadProducto = ValidarStockProductos(cantidadProducto, stockOpticasChevrolet);
        cantChevroletOpticas += cantidadProducto;
    }

    precioFinal = CalcularPrecioFinal(cantChevroletOpticas, precioOpticaChevrolet, cantChevroletParagolpe, precioParagolpeChevrolet, cantFordParagolpe, precioParagolpeFord, cantFordOpticas, precioOpticaFord );
    respuesta = prompt("¿Desea seguir comprando repuestos? si/no");

}while (respuesta == "si")

alert("El detalle de su compra es el siguiente: \n" +
cantChevroletOpticas  + " opticas chevrolet y su total es $" + cantChevroletOpticas * precioOpticaChevrolet + "\n" +
cantFordOpticas + " opticas ford y su total es $" + cantFordOpticas * precioOpticaFord + "\n" +
cantChevroletParagolpe + " paragolpes chevrolet y su total es $" + cantChevroletParagolpe * precioParagolpeChevrolet + "\n" +
cantFordParagolpe + " paragolpes ford y su total es $" + cantFordParagolpe * precioParagolpeFord + 
"\n\n El total de la compra es de: $" + precioFinal);

