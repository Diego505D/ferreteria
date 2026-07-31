###PATH:src\app.js\index.js
import { MenuView } from "../views/menuview";
import { UsuariosView } from "../views/usuarioview";
import { navegar } from "../app.js/app";

const usuarioData = localStorage.getItem('usuarioActual');

function navegar(vista) {
    const menu = document.getElementById('menu');
    const content = document.getElementById('content');
    menu.innerHTML = '';
    content.innerHTML = '';
    switch (vista) {
        case 'menu':
            MenuView.render(usuarioData);
            break;
        case 'usuarios':
            UsuariosView.render();
            break;
        default:
