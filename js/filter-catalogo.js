var checkboxesCategorias = document.querySelectorAll('input[name="check-categorias"]');
var checkboxesRegiones = document.querySelectorAll('input[name="check-regiones"]');
var productos = document.querySelectorAll('.product');
var ordenarPorRadios = document.querySelectorAll('input[name="radio-ordenar-por"]');

ordenarPorRadios.forEach(function(radio) {
    radio.addEventListener('change', filtrarProductos);
});

checkboxesCategorias.forEach(function(checkbox) {
    checkbox.addEventListener('change', filtrarProductos);
});

checkboxesRegiones.forEach(function(checkbox) {
    checkbox.addEventListener('change', filtrarProductos);
});

var ordenSeleccionado = "";

function filtrarProductos() {
    var categoriasSeleccionadas = Array.from(checkboxesCategorias)
        .filter(function(checkbox) {
            return checkbox.checked;
        })
        .map(function(checkbox) {
            return checkbox.value;
        });

    var regionesSeleccionadas = Array.from(checkboxesRegiones)
        .filter(function(checkbox) {
            return checkbox.checked;
        })
        .map(function(checkbox) {
            return checkbox.value;
        });

    // Obtener la opción de orden seleccionada
    ordenSeleccionado = document.querySelector('input[name="radio-ordenar-por"]:checked');

    // Filtrar los productos por categoría y región
    var productosFiltrados = Array.from(productos).filter(function(producto) {
        var categoria = producto.getAttribute('data-category');
        var region = producto.getAttribute('data-region');

        if (
            (categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(categoria)) &&
            (regionesSeleccionadas.length === 0 || regionesSeleccionadas.includes(region))
        ) {
            return true;
        }

        return false;
    });

    // Ordenar los productos según la opción seleccionada
    if (ordenSeleccionado != null) {
        if (ordenSeleccionado.value === "precio-mayor-menor") {
            productosFiltrados.sort(function(a, b) {
                var precioA = parseFloat(a.querySelector('.precio_product').textContent.replace('s/.', ''));
                var precioB = parseFloat(b.querySelector('.precio_product').textContent.replace('s/.', ''));
                return precioB - precioA;
            });
        } else if (ordenSeleccionado.value === "precio-menor-mayor") {
            productosFiltrados.sort(function(a, b) {
                var precioA = parseFloat(a.querySelector('.precio_product').textContent.replace('s/.', ''));
                var precioB = parseFloat(b.querySelector('.precio_product').textContent.replace('s/.', ''));
                return precioA - precioB;
            });
        } else if (ordenSeleccionado.value === "mejor-calificados") {
            productosFiltrados.sort(function(a, b) {
                var ratingA = parseFloat(a.querySelector('.rating-value').textContent);
                var ratingB = parseFloat(b.querySelector('.rating-value').textContent);
                return ratingB - ratingA;
            });
        }
    }

    // Mostrar los productos filtrados
    mostrarProductosFiltrados(productosFiltrados);
}

function mostrarProductosFiltrados(productosFiltrados) {
    productos.forEach(function(producto) {
        producto.style.order = ""; // Restablecer el orden de todos los productos
        producto.style.display = 'none';
    });

    productosFiltrados.forEach(function(producto, index) {
        producto.style.order = index; // Establecer el nuevo orden de los productos filtrados
        producto.style.display = 'flex';
    });
}

function mostrarTodosLosProductos() {
    productos.forEach(function(producto) {
        producto.style.order = ""; // Restablecer el orden de todos los productos
        producto.style.display = 'flex';
    });
}
