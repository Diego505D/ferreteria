class VentaController {
    constructor() {
        this.db = new DataManager();
    }

    realizarVenta(productoId, cantidad, usuarioId) {
        const producto = this.db.obtenerPorId('productos', productoId);
        
        if (!producto) {
            return { 
                exito: false, 
                mensaje: 'Producto no encontrado' 
            };
        }

        if (producto.stock < cantidad) {
            return { 
                exito: false, 
                mensaje: `Stock insuficiente. Disponible: ${producto.stock}` 
            };
        }

        const precioTotal = producto.precio * cantidad;
        const nuevoId = this.db.obtenerSiguienteId('venta');
        
        const venta = new Venta(productoId, cantidad, precioTotal, usuarioId);
        this.db.agregar('ventas', {
            id: nuevoId,
            productoId: venta.productoId,
            cantidad: venta.cantidad,
            precioTotal: venta.precioTotal,
            usuarioId: venta.usuarioId,
            fecha: venta.fecha
        });

        const nuevoStock = producto.stock - cantidad;
        this.db.actualizar('productos', productoId, {
            stock: nuevoStock
        });

        const usuario = this.db.obtenerPorId('usuarios', usuarioId);
        if (usuario) {
            const historial = usuario.historialCompras || [];
            historial.push(nuevoId);
            this.db.actualizar('usuarios', usuarioId, {
                historialCompras: historial
            });
        }

        return { 
            exito: true, 
            mensaje: 'Venta realizada exitosamente',
            total: precioTotal,
            ventaId: nuevoId
        };
    }

    obtenerTodas() {
        const ventas = this.db.obtenerTodos('ventas');
        const productos = this.db.obtenerTodos('productos');
        const usuarios = this.db.obtenerTodos('usuarios');
        
        const resultado = [];
        for (let i = 0; i < ventas.length; i++) {
            let nombreProducto = 'Eliminado';
            let nombreUsuario = 'Eliminado';
            
            for (let j = 0; j < productos.length; j++) {
                if (productos[j].id === ventas[i].productoId) {
                    nombreProducto = productos[j].nombre;
                    break;
                }
            }
            
            for (let k = 0; k < usuarios.length; k++) {
                if (usuarios[k].id === parseInt(ventas[i].usuarioId)) {
                     nombreUsuario = usuarios[k].nombre;
                     break;
                 }
            }
            
            resultado.push({
                ...ventas[i],
                nombreProducto: nombreProducto,
                nombreUsuario: nombreUsuario
            });
        }
        return resultado;
    }

    obtenerPorUsuario(usuarioId) {
        return this.db.obtenerVentasPorUsuario(usuarioId);
    }

    
    eliminarVenta(ventaId) {
        // Buscar la venta
        const venta = this.db.obtenerPorId('ventas', ventaId);
        if (!venta) {
            return { 
                exito: false, 
                mensaje: 'Venta no encontrada' 
            };
        }

        // Restaurar el stock del producto
        const producto = this.db.obtenerPorId('productos', venta.productoId);
        if (producto) {
            const nuevoStock = producto.stock + venta.cantidad;
            this.db.actualizar('productos', venta.productoId, {
                stock: nuevoStock
            });
        }

        // Eliminar la venta
        const eliminado = this.db.eliminar('ventas', ventaId);
        
        if (eliminado) {
            // Eliminar del historial del usuario
            const usuario = this.db.obtenerPorId('usuarios', venta.usuarioId);
            if (usuario) {
                const historial = usuario.historialCompras || [];
                const index = historial.indexOf(ventaId);
                if (index !== -1) {
                    historial.splice(index, 1);
                    this.db.actualizar('usuarios', venta.usuarioId, {
                        historialCompras: historial
                    });
                }
            }
            
            return { 
                exito: true, 
                mensaje: 'Venta eliminada exitosamente. Stock restaurado.' 
            };
        }
        
        return { 
            exito: false, 
            mensaje: 'Error al eliminar la venta' 
        };
    }
}