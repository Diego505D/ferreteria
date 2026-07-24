class Proveedor {
    constructor(nombre, email, telefono, direccion) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.direccion = direccion;
        this.fechaRegistro = new Date().toLocaleDateString('es-CO');
    }
}