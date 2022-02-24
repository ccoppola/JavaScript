/*Declaro las variables*/
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

/*Funcion para solicitar la Marca del vehiculo*/
function SolicitarMarca(){
    const listaMarcas = ["ford","chevrolet"];
    let msjPrompt = "Ingrese la marca de su vehiculo. (";
    for (const marcas of listaMarcas) {
        msjPrompt += marcas + " ";     
    }
    msjPrompt += ")";

    let marcaIngresada = prompt (msjPrompt);
    while(listaMarcas.find(x => marcaIngresada == x) == undefined){
        marcaIngresada = prompt ("Dato incorrecto." + msjPrompt);
    }
    return marcaIngresada;
}

/*Funcion para solicitar el producto que dea comprar*/
function SolicitarProducto(){
    //aca declaro el array y lo inicializo con los elementos.
    const listaProductos = ["paragolpes","opticas"];

    //declaro la variable, donde alojo el mensaje, que le muestro al usuario.
    let msjPrompt = "Ingrese el producto que desea comprar. (";
    //Recorro el array (la lista de productos), y por cada elemento del array, voy agregando ese elemento a mi mensaje.
    for (const producto of listaProductos) {
        msjPrompt += producto + " ";
    }
    msjPrompt += ")";

    //Guardo en una variable, el producto que ingreso el usuario.
    let productoIngresado = prompt(msjPrompt);
    //Tomo el producto que ingreso el usuario y luego realizo una validacion, para ver si esta dentro de mi array (lista productos)
    while(listaProductos.find( x => productoIngresado == x) == undefined){
        //Si el producto que ingreso no esta dentro de mi array (lista productos), le doy un mensaje de error al usuario, y le vuelvo a solicitar un producto.
        productoIngresado = prompt("Dato incorrecto." + msjPrompt);
    }
    //Devuelvo el producto que ingreso el usuario. 
    return productoIngresado;
}
/*Funcion para ingresar la cantidad del producto que desea*/
function IngresarCantidadProducto(){
   let cantidadProductoIngresado = parseInt(prompt("Ingrese la cantidad que desea comprar."));
   return cantidadProductoIngresado;
}

/*Funcion poder validar el stock del producto*/
function ValidarStockProductos(cantidadProductosIngresados, stockProducto){
    while(cantidadProductosIngresados > stockProducto){
        cantidadProductosIngresados = parseInt(prompt("No tenemos stock suficiente de ese producto, puede comprar hasta " + stockProducto + " unidades. Ingrese una cantidad valida"));
    }
    return cantidadProductosIngresados;
}
/*Funcion donde se calcula el precio final*/
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

