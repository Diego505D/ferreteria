class ProveedorController {
    constructor() {
        this.db = new DataManager();
    }

    registrar(nombre, email, telefono, direccion) {
        const nuevoId = this.db.obtenerSiguienteId('proveedor');
        const proveedor = new Proveedor(nombre, email, telefono, direccion);
        
        this.db.agregar('proveedores', {
            id: nuevoId,
            nombre: proveedor.nombre,
            email: proveedor.email,
            telefono: proveedor.telefono,
            direccion: proveedor.direccion,
            fechaRegistro: proveedor.fechaRegistro
        });

        return { 
            exito: true, 
            mensaje: 'Proveedor registrado exitosamente' 
        };
    }

    obtenerTodos() {
        return this.db.obtenerTodos('proveedores');
    }

    obtenerPorId(id) {
        return this.db.obtenerPorId('proveedores', id);
    }


   
    eliminar(proveedorId) {
        const productos = this.db.obtenerTodos('productos');
        let tieneProductos = false;
        let nombreProducto = '';
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].proveedorId === proveedorId) {
                tieneProductos = true;
                nombreProducto = productos[i].nombre;
                break;
            }
        }

        if (tieneProductos) {
            return { 
                exito: false, 
                mensaje: ` No se puede eliminar: Tiene el producto "${nombreProducto}" asociado` 
            };
        }

        const eliminado = this.db.eliminar('proveedores', proveedorId);
        if (eliminado) {
            return { 
                exito: true, 
                mensaje: ' Proveedor eliminado exitosamente' 
            };
        }
        return { 
            exito: false, 
            mensaje: ' Proveedor no encontrado' 
        };
    }
}