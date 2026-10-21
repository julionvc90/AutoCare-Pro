
import { obtenerProductos, agregarProducto, eliminarProducto } from '../src/js/datos.js';

describe('Pruebas Unitarias del CRUD de Productos', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('Debe obtener la lista de productos iniciales', () => {
    const productos = obtenerProductos();
    expect(productos.length).toBeGreaterThan(0);
  });

  it('Debe agregar un nuevo producto correctamente', () => {
    const nuevo = { nombre: 'Filtro de Aceite', precio: 8000, categoria: 'Repuestos' };
    const productosActualizados = agregarProducto(nuevo);

    expect(productosActualizados.length).toBe(5);
    expect(productosActualizados[4].nombre).toBe('Filtro de Aceite');
  });

  it('Debe eliminar un producto por su ID', () => {
    const productos = obtenerProductos();
    const idAEliminar = productos[0].id;
    const productosTrasEliminar = eliminarProducto(idAEliminar);

    expect(productosTrasEliminar.length).toBe(3);
  });

});