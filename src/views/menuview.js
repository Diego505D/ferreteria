class MenuView {
    static render(usuarioActual) {
        const main = document.getElementById('mainContent');
        main.innerHTML = `
            <div class="dashboard">
                <h2> Bienvenido al Sistema de Ferretería</h2>
                <p style="margin-bottom:30px; color:white;">
                    ${usuarioActual ? 
                        `Hola ${usuarioActual.nombre} (${usuarioActual.rol})` : 
                        'Inicia sesión para acceder a todas las funciones'
                    }
                </p>
                <div class="grid-cards">
                    <div class="card" onclick="navegar('inventario')">
                        
                        <h3>Inventario</h3>
                        <p>Gestiona productos y stock</p>
                    </div>
                    <div class="card" onclick="navegar('ventas')">
                        
                        <h3>Ventas</h3>
                        <p>Registra ventas y consulta</p>
                    </div>
                    <div class="card" onclick="navegar('proveedores')">
                    
                        <h3>Proveedores</h3>
                        <p>Administra proveedores</p>
                    </div>
                    <div class="card" onclick="navegar('usuarios')">
                        
                        <h3>Usuarios</h3>
                        <p>Gestiona usuarios y roles</p>
                    </div>
                </div>
            </div>
        `;
    }
}