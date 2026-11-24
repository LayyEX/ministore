/* MiniStore - Dark Mode Toggle */

(() => {
    "use strict";

    const NAVBAR_SELECTOR = "nav.navbar, .navbar, header nav, nav";
    const STORAGE_KEY = "ministore-theme";
    const DARK_CLASS = "ministore-dark-mode";

    const css = `
        html.${DARK_CLASS} body {
            background: #15171a !important;
            color: #e7e9ec !important;
        }

        html.${DARK_CLASS} body .container,
        html.${DARK_CLASS} body .container-fluid,
        html.${DARK_CLASS} body main,
        html.${DARK_CLASS} body section,
        html.${DARK_CLASS} body .card,
        html.${DARK_CLASS} body .modal-content,
        html.${DARK_CLASS} body .dropdown-menu,
        html.${DARK_CLASS} body .list-group-item,
        html.${DARK_CLASS} body .table,
        html.${DARK_CLASS} body form {
            background-color: #202328 !important;
            color: #e7e9ec !important;
            border-color: #3a3e45 !important;
        }

        html.${DARK_CLASS} body .table {
            --bs-table-bg: #202328;
            --bs-table-color: #e7e9ec;
            --bs-table-border-color: #3a3e45;
            --bs-table-striped-bg: #272a30;
            --bs-table-striped-color: #e7e9ec;
            --bs-table-hover-bg: #30343b;
            --bs-table-hover-color: #fff;
        }

        html.${DARK_CLASS} body input,
        html.${DARK_CLASS} body select,
        html.${DARK_CLASS} body textarea {
            background-color: #292d33 !important;
            color: #e7e9ec !important;
            border-color: #50555e !important;
        }

        html.${DARK_CLASS} body input::placeholder,
        html.${DARK_CLASS} body textarea::placeholder {
            color: #aeb4bd !important;
        }

        html.${DARK_CLASS} body a:not(.btn) {
            color: #8ab4f8;
        }

        html.${DARK_CLASS} body hr {
            border-color: #202328;
            opacity: 1;
        }

        html.${DARK_CLASS} body .text-dark,
        html.${DARK_CLASS} body .text-body {
            color: #e7e9ec !important;
        }

        #ministore-theme-toggle {
            margin-left: auto;
            white-space: nowrap;
            display: inline-flex;
            align-items: center;
            gap: .45rem;
            border: 1px solid currentColor;
            border-radius: .375rem;
            padding: .4rem .7rem;
            background: #8ab4f8;
            color: inherit;
            cursor: pointer;
            font: inherit;
        }

        #ministore-theme-toggle:hover {
            opacity: .82;
        }
    `;

    // Adiciona o CSS do modo escuro
    function installStyles() {
        if (document.getElementById("ministore-dark-mode-styles")) {
            return;
        }

        const style = document.createElement("style");
        style.id = "ministore-dark-mode-styles";
        style.textContent = css;

        document.head.appendChild(style);
    }

    // Aplica o tema escolhido
    function applyTheme(isDark) {
        document.documentElement.classList.toggle(DARK_CLASS, isDark);

        const button = document.getElementById("ministore-theme-toggle");

        if (button) {
            button.innerHTML = isDark
                ? '<span aria-hidden="true">●</span><span>Modo claro</span>'
                : '<span aria-hidden="true">○</span><span>Modo escuro</span>';

            /*button.setAttribute("aria-pressed", String(isDark));*/

            button.title = isDark
                ? "Alternar para modo claro"
                : "Alternar para modo escuro";
        }

        // Salva a preferência do usuário
        try {
            localStorage.setItem(
                STORAGE_KEY,
                isDark ? "dark" : "light"
            );
        } catch (error) {
            console.warn("Não foi possível salvar o tema.", error);
        }
    }

    // Cria o botão na navbar
    function addToggleButton() {
        const navbar = document.querySelector(NAVBAR_SELECTOR);

        if (!navbar || document.getElementById("ministore-theme-toggle")) {
            return;
        }

        const button = document.createElement("button");

        button.type = "button";
        button.id = "ministore-theme-toggle";
        button.setAttribute("aria-label", "Alternar modo escuro");

        // Evento de alternância
        button.addEventListener("click", () => {
            const isDark = document.documentElement.classList.contains(DARK_CLASS);

            applyTheme(!isDark);
        });

        // Ajusta a navbar para posicionar o botão à direita
        const display = getComputedStyle(navbar).display;

        if (display !== "flex" && display !== "inline-flex") {
            navbar.style.display = "flex";
            navbar.style.alignItems = "center";
            navbar.style.flexWrap = "wrap";
        }

        navbar.appendChild(button);

        // Recupera o tema salvo
        let savedTheme = "light";

        try {
            savedTheme = localStorage.getItem(STORAGE_KEY) || "light";
        } catch (error) {
            console.warn("Não foi possível recuperar o tema.", error);
        }

        applyTheme(savedTheme === "dark");
    }

    // Inicialização
    function init() {
        installStyles();
        addToggleButton();
    }

    // Espera o carregamento do HTML
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, {
            once: true
        });
    } else {
        init();
    }

})();
