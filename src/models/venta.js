class Venta {
    constructor(productoId, cantidad, precioTotal, usuarioId) {
        this.productoId = productoId;
        this.cantidad = cantidad;
        this.precioTotal = precioTotal;
        this.usuarioId = usuarioId;
        this.fecha = new Date().toLocaleString('es-CO');
    }
}