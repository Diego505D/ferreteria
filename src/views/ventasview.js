class VentasView {
    static render() {
        const main = document.getElementById('mainContent');
        const ventaCtrl = new VentaController();
        const inventarioCtrl = new InventarioController();
        
        const productos = inventarioCtrl.obtenerTodos();
        const ventas = ventaCtrl.obtenerTodas();

        const usuarioCtrl = new UsuarioController();
        const usuarios = usuarioCtrl.obtenerTodos();

        let opcionesUsuarios = '<option value="">Seleccionar cliente</option>';

        for (let i = 0; i < usuarios.length; i++) {
            opcionesUsuarios += `
            <option value="${usuarios[i].id}">
                ${i + 1} - ${usuarios[i].nombre}
            </option>
    `;
}

        let opcionesProductos = '<option value="">Seleccionar</option>';
        for (let i = 0; i < productos.length; i++) {
            opcionesProductos += `
                <option value="${productos[i].id}" data-stock="${productos[i].stock}">
                    ${productos[i].nombre} - $${productos[i].precio.toLocaleString()} 
                    (Stock: ${productos[i].stock})
                </option>
            `;
        }

        let tablaVentas = '';
        if (ventas.length > 0) {
            for (let i = 0; i < ventas.length; i++) {
                const v = ventas[i];
                tablaVentas += `
                    <tr>
                        <td>${v.id}</td>
                        <td>${v.nombreProducto}</td>
                        <td>${v.cantidad}</td>
                        <td>$${v.precioTotal.toLocaleString()}</td>
                        <td>${v.nombreUsuario}</td>
                        <td>${v.fecha}</td>
                        <td>
                            <button onclick="eliminarVenta(${v.id})" 
                                    class="btn btn-danger" 
                                    style="padding:5px 10px; font-size:12px;">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `;
            }
        } else {
            tablaVentas = `
                <tr><td colspan="7">No hay ventas registradas</td></tr>
            `;
        }

        main.innerHTML = `
            <div class="view-container">
                <h2>Gestión de Ventas</h2>
                
                <div class="form-section">
                    <h3>Registrar Venta</h3>
                    <form id="formVenta">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Producto:</label>
                                <select id="ventaProducto" required>
                                    ${opcionesProductos}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Cantidad:</label>
                                <input type="number" id="ventaCantidad" min="1" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Cliente:</label>
                                <select id="ventaUsuario" required>
                                    ${opcionesUsuarios}
                                </select>
                        </div>
                        <button type="submit" class="btn btn-success">Registrar Venta</button>
                    </form>
                </div>

                <div class="table-section">
                    <h3>Historial de Ventas</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Total (COP)</th>
                                <th>Usuario</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tablaVentas}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        document.getElementById('formVenta').addEventListener('submit', (e) => {
            e.preventDefault();
            const productoId = parseInt(document.getElementById('ventaProducto').value);
            const cantidad = parseInt(document.getElementById('ventaCantidad').value);
            const usuarioId = parseInt(document.getElementById('ventaUsuario').value);

            if (!productoId || !cantidad || !usuarioId) {
                Swal.fire({
                    title: 'Error',
                    text: 'Por favor complete todos los campos',
                    icon: 'warning'
                });
                return;
            }

            const controller = new VentaController();
            const result = controller.realizarVenta(productoId, cantidad, usuarioId);
            Swal.fire({
                title: result.exito ? '✅ Éxito' : '❌ Error',
                text: result.mensaje,
                icon: result.exito ? 'success' : 'error'
            });
            if (result.exito) {
                VentasView.render();
            }
        });
    }
}


window.eliminarVenta = function(id) {
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
            const controller = new VentaController();
            const resultado = controller.eliminarVenta(id);
            Swal.fire({
                title: resultado.exito ? '✅ Eliminado' : '❌ Error',
                text: resultado.mensaje,
                icon: resultado.exito ? 'success' : 'error'
            });
            if (resultado.exito) {
                VentasView.render();
            }
        }
    });
};