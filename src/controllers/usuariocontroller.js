class UsuarioController {
    constructor() {
        this.db = new DataManager();
    }

    registrar(nombre, rol) {
    

       

        const nuevoId = this.db.obtenerSiguienteId('usuario');
        


        
        this.db.agregar('usuarios', {
            id: nuevoId,
            nombre: nombre,
            rol: rol,
            historialCompras: []
        });

        return { 
            exito: true, 
            mensaje: 'Usuario registrado exitosamente' 
        };
    }

    login(email, contraseña) {
        const usuario = this.db.obtenerUsuarioPorEmail(email);
        
        if (usuario && usuario.contraseña === contraseña) {
            return { 
                exito: true, 
                usuario: usuario 
            };
        }
        return { 
            exito: false, 
            mensaje: 'Credenciales incorrectas' 
        };
    }

    obtenerTodos() {
        return this.db.obtenerTodos('usuarios');
    }

    obtenerHistorial(usuarioId) {
        return this.db.obtenerVentasPorUsuario(usuarioId);
    }
    
    eliminarUsuario(id) {
    
    const usuarios = this.db.obtenerTodos('usuarios');

    
    const indice = usuarios.findIndex(usuario => usuario.id === id);

    if (indice === -1) {
        return {
            exito: false,
            mensaje: 'Usuario no encontrado'
        };
    }

    const eliminado = this.db.eliminar('usuarios', id);

    if (!eliminado) {
        return {
            exito: false,
            mensaje: 'Usuario no encontrado'
        };
    }

    return {
        exito: true,
        mensaje: 'Usuario eliminado correctamente'
}
}}