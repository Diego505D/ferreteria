
window.usuarioActual = null;


const usuarioData = localStorage.getItem('usuarioActual');
if (usuarioData) {
    try {
        window.usuarioActual = JSON.parse(usuarioData);
    } catch (e) {
        localStorage.removeItem('usuarioActual');
    }
}


function navegar(vista) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const btn = document.querySelector(`[data-view="${vista}"]`);
    if (btn) btn.classList.add('active');

    switch(vista) {

        case 'menu':
            MenuView.render(window.usuarioActual);
            break;
        case 'inventario':
            InventarioView.render();
            break;
        case 'ventas':
            VentasView.render();
            break;
        case 'proveedores':
            ProveedoresView.render();
            break;
        case 'usuarios':
            UsuariosView.render();
            break;
        default:
            MenuView.render(window.usuarioActual);
    }
}


document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('[data-view]').forEach(btn => {
        btn.addEventListener('click', () => {
            navegar(btn.dataset.view);
        });
    });


document.getElementById('btnLogout').addEventListener('click', () => {

    Swal.fire({
        title: '¿Cerrar sesión?',
        text: '¿Estás seguro de que deseas salir del sistema?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {

        if (result.isConfirmed) {

            localStorage.removeItem('sesionActiva');
            localStorage.removeItem('usuarioActual');
            localStorage.removeItem('usuarioRecordado');

            Swal.fire({
                title: '¡Sesión cerrada!',
                text: 'Hasta pronto.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });

            setTimeout(() => {
                window.location.href = 'login.html';
            });
        }

    });

});
    
    navegar('menu');
});

window.navegar = navegar;