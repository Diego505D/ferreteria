class InventarioView {
  static render() {
    const main = document.getElementById("mainContent");
    const controller = new InventarioController();
    const proveedorCtrl = new ProveedorController();

    const proveedores = proveedorCtrl.obtenerTodos();
    const productos = controller.db.obtenerProductosConProveedor();

    let tablaProductos = "";
    if (productos.length > 0) {
      for (let i = 0; i < productos.length; i++) {
        const p = productos[i];
        tablaProductos += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.nombre}</td>
                        <td>$${p.precio.toLocaleString()}</td>
                        <td>${p.stock}</td>
                        <td>${p.nombreProveedor}</td>
                        <td>
                            <button onclick="editarStock(${p.id})" 
                                    class="btn btn-primary" 
                                    style="padding:5px 10px; font-size:12px;">
                                Editar Stock
                            </button>
                            <button onclick="eliminarProducto(${p.id})" 
                                    class="btn btn-danger" 
                                    style="padding:5px 10px; font-size:12px;">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `;
      }
    } else {
      tablaProductos = `
                <tr><td colspan="6">No hay productos registrados</td></tr>
            `;
    }

    let opcionesProveedores = '<option value="">Seleccionar</option>';
    for (let i = 0; i < proveedores.length; i++) {
      opcionesProveedores += `
                <option value="${proveedores[i].id}">${proveedores[i].nombre}</option>
            `;
    }

    main.innerHTML = `
            <div class="view-container">
                <h2> Gestión de Inventario</h2>
                
                <div class="form-section">
                    <h3> Agregar Producto</h3>
                    <form id="formProducto">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Nombre:</label>
                                <input type="text" id="prodNombre" required>
                            </div>
                            <div class="form-group">
                                <label>Precio (COP):</label>
                                <input type="number" id="prodPrecio" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Stock:</label>
                                <input type="number" id="prodStock" required>
                            </div>
                            <div class="form-group">
                                <label>Proveedor:</label>
                                <select id="prodProveedor" required>
                                    ${opcionesProveedores}
                                </select>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-success">Agregar Producto</button>
                    </form>
                </div>

                <div class="table-section">
                    <h3> Productos en Inventario</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Proveedor</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tablaProductos}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

    document.getElementById("formProducto").addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("prodNombre").value;
      const precio = parseFloat(document.getElementById("prodPrecio").value);
      const stock = parseInt(document.getElementById("prodStock").value);
      const proveedorId = parseInt(document.getElementById("prodProveedor").value);

      const result = controller.agregarProducto(
        nombre,
        precio,
        stock,
        proveedorId,
      );
      Swal.fire({
        title: "Trabajo Hecho!",
        text: result.mensaje,
        icon: "success",
      });
      if (result.exito) {
        InventarioView.render();
      }
    });
  }
}


window.editarStock = function (id) {
    Swal.fire({
        title: 'Editar Stock',
        text: 'Ingrese el nuevo stock del producto',
        icon: 'question',
        input: 'number',
        inputLabel: 'Nuevo stock',
        inputPlaceholder: 'Ej: 100',
        inputValue: 0,
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (value === '' || value === null) {
                return '¡Debes ingresar un valor!';
            }
            if (isNaN(value) || parseInt(value) < 0) {
                return '¡Ingresa un número válido mayor o igual a 0!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const nuevoStock = parseInt(result.value);
            const controller = new InventarioController();
            const resultado = controller.actualizarStock(id, nuevoStock);
            Swal.fire({
                title: resultado.exito ? '✅ Actualizado' : '❌ Error',
                text: resultado.mensaje,
                icon: resultado.exito ? 'success' : 'error'
            });
            if (resultado.exito) {
                InventarioView.render();
            }
        }
    });
};

window.eliminarProducto = function (id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el producto permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {

        if (result.isConfirmed) {

            const controller = new InventarioController();
            const resultado = controller.eliminarProducto(id);

            Swal.fire({
                title: resultado.exito ? '✅ Eliminado' : '❌ Error',
                text: resultado.mensaje,
                icon: resultado.exito ? 'success' : 'error'
            });

            if (resultado.exito) {
                InventarioView.render();
            }
        }

    });
};
