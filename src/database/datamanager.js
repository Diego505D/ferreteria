class DataManager {
    constructor() {
        this.nombreDB = 'ferreteriaDB';
        this.datos = this.cargarDatos();
    }

    cargarDatos() {
        const guardado = localStorage.getItem(this.nombreDB);
        if (guardado) {
            return JSON.parse(guardado);
        }
        
     
        return {
            usuarios: [
               
                {
                    id: 1,
                    nombre: 'Diego',
                    email: 'admin@ferreteria.com',
                    rol: 'Jefe',
                    contraseña: 'admin123',
                },
                {
                   id: 2,
                 nombre: 'Marmol',
                   email: 'esclavo@ferreteria.com',
                   rol: 'Empleado',
                   contraseña: 'negro123',
                    historialCompras: []

                
        

                }
            ,
              
               
                
                
            ],
            productos: [
                {
                    id: 1,
                    nombre: 'Martillo',
                    precio: 25000,
                    stock: 50,
                    proveedorId: 1
                },
                {
                    id: 2,
                    nombre: 'Destornillador',
                    precio: 15000,
                    stock: 30,
                    proveedorId: 1
                },
                
            ],
            ventas: [],
            proveedores: [
                {
                    id: 1,
                    nombre: 'Herramientas SAS',
                    email: 'contacto@herramientas.com',
                    telefono: '3001234567',
                    direccion: 'Calle 123 #45-67',
                    fechaRegistro: '15/01/2026'
                }
            ],
            contadores: {
             usuario: 4,
             producto: 2,
             venta: 0,
              proveedor: 1
            }
        };
    }

    guardarDatos() {
        localStorage.setItem(this.nombreDB, JSON.stringify(this.datos));
    }

   
    obtenerTodos(entidad) {
        return this.datos[entidad] || [];
    }


    obtenerPorId(entidad, id) {
        const items = this.datos[entidad];
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                return items[i];
            }
        }
        return null;
    }


    agregar(entidad, item) {
        this.datos[entidad].push(item);
        this.guardarDatos();
    }

   
    actualizar(entidad, id, nuevosDatos) {
        const items = this.datos[entidad];
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
            
                for (let clave in nuevosDatos) {
                    items[i][clave] = nuevosDatos[clave];
                }
                this.guardarDatos();
                return true;
            }
        }
        return false;
    }

    
    eliminar(entidad, id) {
        const items = this.datos[entidad];
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                items.splice(i, 1);
                this.guardarDatos();
                return true;
            }
        }
        return false;
    }

   
    obtenerSiguienteId(entidad) {
        this.datos.contadores[entidad] += 1;
        this.guardarDatos();
        return this.datos.contadores[entidad];
    }

    
    
    obtenerUsuarioPorEmail(email) {
        const usuarios = this.datos.usuarios;
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].email === email) {
                return usuarios[i];
            }
        }
        return null;
    }

    obtenerVentasPorUsuario(usuarioId) {
        const ventas = this.datos.ventas;
        const resultado = [];
        for (let i = 0; i < ventas.length; i++) {
            if (ventas[i].usuarioId === usuarioId) {
                resultado.push(ventas[i]);
            }
        }
        return resultado;
    }

    obtenerProductosConProveedor() {
        const productos = this.datos.productos;
        const proveedores = this.datos.proveedores;
        const resultado = [];
        
        for (let i = 0; i < productos.length; i++) {
            let nombreProveedor = 'Sin proveedor';
            for (let j = 0; j < proveedores.length; j++) {
                if (proveedores[j].id === productos[i].proveedorId) {
                    nombreProveedor = proveedores[j].nombre;
                    break;
                }
            }
            resultado.push({
                ...productos[i],
                nombreProveedor: nombreProveedor
            });
        }
        return resultado;
    }
}