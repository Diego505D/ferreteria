 class ProveedoresView {
    static render() {
        const main = document.getElementById('mainContent');
        const controller = new ProveedorController();
        const proveedores = controller.obtenerTodos();

        let tablaProveedores = '';
        if (proveedores.length > 0) {
            for (let i = 0; i < proveedores.length; i++) {
                const p = proveedores[i];
                tablaProveedores += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.nombre}</td>
                        <td>${p.email}</td>
                        <td>${p.telefono}</td>
                        <td>${p.direccion}</td>
                        <td>${p.fechaRegistro}</td>
                        <td>
                            <button onclick="eliminarProveedor(${p.id})" 
                                    class="btn btn-danger" 
                                    style="padding:5px 10px; font-size:12px;">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `;
            }
        } else {
            tablaProveedores = `
                <tr><td colspan="7">No hay proveedores registrados</td></tr>
            `;
        }

        main.innerHTML = `
            <div class="view-container">
                <h2>Gestión de Proveedores</h2>
                
                <div class="form-section">
                    <h3>Registrar Proveedor</h3>
                    <form id="formProveedor">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Nombre:</label>
                                <input type="text" id="provNombre" required>
                            </div>
                            <div class="form-group">
                                <label>Email:</label>
                                <input type="email" id="provEmail" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Teléfono:</label>
                                <input type="text" id="provTelefono" required>
                            </div>
                            <div class="form-group">
                                <label>Dirección:</label>
                                <input type="text" id="provDireccion" required>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-success">Registrar Proveedor</button>
                    </form>
                </div>

                <div class="table-section">
                    <h3>Lista de Proveedores</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Dirección</th>
                                <th>Fecha Registro</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tablaProveedores}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        document.getElementById('formProveedor').addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('provNombre').value;
            const email = document.getElementById('provEmail').value;
            const telefono = document.getElementById('provTelefono').value;
            const direccion = document.getElementById('provDireccion').value;

            const controller = new ProveedorController();
            const result = controller.registrar(nombre, email, telefono, direccion);
            Swal.fire({
                title: result.exito ? '✅ Éxito' : '❌ Error',
                text: result.mensaje,
                icon: result.exito ? 'success' : 'error'
            });
            if (result.exito) {
                ProveedoresView.render();
            }
        });
    }
}


window.eliminarProveedor = function(id) {
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
            const controller = new ProveedorController();
            const resultado = controller.eliminar(id);
            Swal.fire({
                title: resultado.exito ? '✅ Eliminado' : '❌ Error',
                text: resultado.mensaje,
                icon: resultado.exito ? 'success' : 'error'
            });
            if (resultado.exito) {
                ProveedoresView.render();
            }
        }
    });
}; 


