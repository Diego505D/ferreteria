class UsuariosView {
    static render() {
        const main = document.getElementById('mainContent');
        const controller = new UsuarioController();
        const usuarios = controller.obtenerTodos();

        let tablaUsuarios = '';
        for (let i = 0; i < usuarios.length; i++) {
            const u = usuarios[i];
            const compras = u.historialCompras ? u.historialCompras.length : 0;
            
            
            const esAdmin = i + 1 === 1;
            
            tablaUsuarios += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${u.nombre}</td>
                  
                    <td><span style="
                        background: ${u.rol === 'Jefe' ? '#ff6b6b' : 
                                     u.rol === 'Empleado' ? '#4ecdc4' : '#45b7d1'};
                        color: white;
                        padding: 3px 10px;
                        border-radius: 12px;
                        font-size: 12px;
                    ">${u.rol}</span></td>
                    <td>${compras}</td>
                    <td>
                        ${esAdmin ? 
                             `<span style="color: #888; font-weight: bold;">Protegido</span>`:
                             `<button onclick="eliminarUsuario(${u.id})"
                                    class="btn btn-danger" 
                                    style="padding:5px 10px; font-size:12px;">
                                Eliminar
                            </button>`
                        }
                    </td>
                </tr>
            `;
        }

        main.innerHTML = `
            <div class="view-container">
                <h2>Gestión de Usuarios</h2>
                
                <div class="form-section">
                    <h3>Registrar Usuario</h3>
                    <form id="formUsuario">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Nombre:</label>
                                <input type="text" id="userNombre" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Rol:</label>
                                <select id="userRol" required>
                                    <option value="Cliente">Cliente</option>
                                    <option value="Empleado">Empleado</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-success">Registrar Usuario</button>
                    </form>
                </div>

                <div class="table-section">
                    <h3>Lista de Usuarios</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Rol</th>
                                <th>Compras</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tablaUsuarios}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        document.getElementById('formUsuario').addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('userNombre').value;
            const rol = document.getElementById('userRol').value;
            
            const controller = new UsuarioController();
            const result = controller.registrar(nombre, rol,);
            Swal.fire({
                title: result.exito ? ' Éxito' : ' Error',
                text: result.mensaje,
                icon: result.exito ? 'success' : 'error'
            });
            if (result.exito) {
                UsuariosView.render();
            }
        });
    }
}


window.eliminarUsuario = function(id) {
    
    if (id === 1) {
        Swal.fire({
            title: 'Acción denegada',
            text: 'No se puede eliminar',
            icon: 'error'
        });
        return;
    }

    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const controller = new UsuarioController();
           const resultado = controller.eliminarUsuario(id);
            Swal.fire({
                title: resultado.exito ? '✅ Eliminado' : '❌ Error',
                text: resultado.mensaje,
                icon: resultado.exito ? 'success' : 'error'
            });
            if (resultado.exito) {
                UsuariosView.render();
            }
        }
    });
};