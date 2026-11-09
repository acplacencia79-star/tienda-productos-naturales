# Tienda Online — Productos Naturales & Orgánicos

Aplicación web frontend interactiva desarrollada con HTML5 semántico, CSS3 adaptable (Mobile-First) y JavaScript estándar (ES6+), diseñada para la gestión y comercialización de productos naturales.

## Características del Proyecto
- **Catálogo Dinámico:** Renderizado automático de productos a partir de arreglos de datos en JavaScript.
- **Buscador en Tiempo Real:** Filtrado predictivo por nombre, categoría o beneficios sin recargar la página.
- **Carrito de Compras Persistente:** Manejo de estado con almacenamiento local (`localStorage`), cálculo de subtotales y modal interactivo.
- **Carga de Nuevos Productos:** Módulo administrativo con formulario validado para incorporar nuevos ítems al catálogo en caliente.
- **Diseño Adaptable (Responsive):** Estructura fluida con CSS Grid y Flexbox optimizada para dispositivos móviles, tablets y pantallas de escritorio.

## Tecnología
- **HTML5:** Estructura semántica (`header`, `main`, `section`, `aside`, `footer`).
- **CSS3:** Variables nativas, Flexbox, CSS Grid y Media Queries.
- **JavaScript (Vanilla ES6+):** Manipulación del DOM, delegación de eventos, Array Methods (`filter`, `forEach`, `find`, `splice`) y API `localStorage`.

## Estructura del Repositorio
```text
tienda-fwp/
├── index.html       # Estructura del sitio y componentes
├── styles.css       # Reglas de estilo y adaptabilidad
├── script.js        # Lógica de negocio y manipulación del DOM
└── README.md        # Documentación técnica