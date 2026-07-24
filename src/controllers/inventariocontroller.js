class InventarioController {
    constructor() {
        this.db = new DataManager();
    }

    agregarProducto(nombre, precio, stock, proveedorId) {
        const nuevoId = this.db.obtenerSiguienteId('producto');
        const producto = new Producto(nombre, precio, stock, proveedorId);
        
        this.db.agregar('productos', {
            id: nuevoId,
            nombre: nombre,
            precio: precio,
            stock: stock,
            proveedorId: proveedorId
        });

        return { 
            exito: true, 
            mensaje: 'Producto agregado exitosamente' 
        };
    }

    obtenerTodos() {
        return this.db.obtenerProductosConProveedor();
    }

    obtenerPorId(id) {
        return this.db.obtenerPorId('productos', id);
    }

    actualizarStock(productoId, nuevoStock) {
        const actualizado = this.db.actualizar('productos', productoId, {
            stock: nuevoStock
        });
        
        if (actualizado) {
            return { 
                exito: true, 
                mensaje: 'Stock actualizado' 
            };
        }
        return { 
            exito: false, 
            mensaje: 'Producto no encontrado' 
        };
    }

    eliminarProducto(productoId) {
        const eliminado = this.db.eliminar('productos', productoId);
        if (eliminado) {
            return { 
                exito: true, 
                mensaje: 'Producto eliminado' 
            };
        }
        return { 
            exito: false, 
            mensaje: 'Producto no encontrado' 
        };
    }
}