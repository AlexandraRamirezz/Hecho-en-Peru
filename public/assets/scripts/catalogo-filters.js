var checkboxesCategorias = document.querySelectorAll('input[name="check-categorias"]');
var checkboxesRegiones = document.querySelectorAll('input[name="check-regiones"]');
var productos = document.querySelectorAll('.product');
var ordenarPorRadios = document.querySelectorAll('input[name="radio-ordenar-por"]');
var rangeMin = document.querySelector('.range-min');
var rangeMax = document.querySelector('.range-max');
var precioMinimoInput = document.querySelector('.precio_minimo');
var precioMaximoInput = document.querySelector('.precio_maximo');

ordenarPorRadios.forEach(function(radio) {
    radio.addEventListener('change', filtrarProductos);
});

checkboxesCategorias.forEach(function(checkbox) {
    checkbox.addEventListener('change', filtrarProductos);
});

checkboxesRegiones.forEach(function(checkbox) {
    checkbox.addEventListener('change', filtrarProductos);
});

rangeMin.addEventListener('input', filtrarProductos);
rangeMax.addEventListener('input', filtrarProductos);
precioMinimoInput.addEventListener('input', filtrarProductos);
precioMaximoInput.addEventListener('input', filtrarProductos);

var ordenSeleccionado = [];

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

    ordenSeleccionado = document.querySelector('input[name="radio-ordenar-por"]:checked');

    var precioMinimo = parseFloat(precioMinimoInput.value);
    var precioMaximo = parseFloat(precioMaximoInput.value);

    var productosFiltrados = Array.from(productos).filter(function(producto) {
        var categoria = producto.getAttribute('data-category');
        var region = producto.getAttribute('data-region');
        var precio = parseFloat(producto.querySelector('.precio-product').textContent.replace('s/.', ''));
        
        var categoriaCumple = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(categoria);
        var regionCumple = regionesSeleccionadas.length === 0 || regionesSeleccionadas.includes(region);
        var precioCumple = precio >= precioMinimo && precio <= precioMaximo;
        
        return categoriaCumple && regionCumple && precioCumple;
    });

    if (ordenSeleccionado != null){
        switch (ordenSeleccionado.value) {
            case 'precio-menor-mayor':
            productosFiltrados.sort(function(a, b) {
                var precioA = parseFloat(a.querySelector('.precio-product').textContent.replace('s/.', ''));
                var precioB = parseFloat(b.querySelector('.precio-product').textContent.replace('s/.', ''));
                return precioA - precioB;
            });
            break;
            case 'precio-mayor-menor':
            productosFiltrados.sort(function(a, b) {
                var precioA = parseFloat(a.querySelector('.precio-product').textContent.replace('s/.', ''));
                var precioB = parseFloat(b.querySelector('.precio-product').textContent.replace('s/.', ''));
                return precioB - precioA;
            });
            break;
            case 'mejor-calificados':
            productosFiltrados.sort(function(a, b) {
                var ratingA = parseFloat(a.querySelector('.rating-value').textContent);
                var ratingB = parseFloat(b.querySelector('.rating-value').textContent);
                return ratingB - ratingA;
            });
            break;
        }
        }

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

