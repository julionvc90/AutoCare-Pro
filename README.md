# AutoCare-Pro

¡Hola! Les presentamos el proyecto de AutoCare-Pro. Este trabajo nace de la necesidad de crear una plataforma web completa para una tienda de repuestos automotrices y taller mecánico.
La idea principal fue construir una experiencia fluida tanto para el cliente que entra a comprar o informarse, como para el administrador que necesita gestionar el negocio por dentro.


Integrantes del Equipo
Julio Navarro
Claudio Carril
Vicente Zúñiga
Jose Ignacio Zuñiga 



Sobre el Proyecto y su Estructura
Para evitar tener un desorden de archivos y lograr que el código fuera fácil de mantener, organizamos todo el sitio dividiéndolo por módulos y carpetas:
Página Principal e Información: En la raíz del proyecto dejamos el archivo index.html que sirve como portada del sitio, presentando la marca, nuestros servicios y quiénes somos.
Módulo de Tienda (Carpeta store): Aquí agrupamos todo el flujo de compra. El cliente encuentra un catálogo completo con barra de búsqueda y filtros por categoría, la vista con el detalle de cada producto y el carrito de compras donde se calcula el resumen del pedido.
Módulo de Contenidos (Carpeta blog): Creamos una sección especial para publicar artículos y consejos de mantenimiento automotriz. Esto ayuda a atraer clientes y entregarles información útil.
Panel de Administración (Carpeta admin): Es la sección privada para la gestión interna del taller. Permite revisar las órdenes de compra entrantes, administrar los usuarios registrados y controlar el inventario de productos mediante formularios de creación y edición.
Recursos Estáticos (Carpeta assets): Guardamos de forma ordenada todas las imágenes del sitio y las hojas de estilo CSS.
Páginas Complementarias: Incluimos contacto.html para comunicación directa mediante formulario y datos de ubicación, junto con login.html para el acceso de usuarios.
Cómo Desarrollamos el Código
Estructura HTML5: Trabajamos con etiquetas semánticas como header, nav, main, section, article y footer en lugar de usar cajas genericas. Esto hace que la página sea ordenada, accesible y mejor posicionada.
Diseño Adaptable en CSS: Separamos los estilos en distintas hojas para no mezclar código. Usamos técnicas modernas como Flexbox, CSS Grid y Media Queries para garantizar que el sitio se adapte bien tanto a pantallas de computador como a celulares.
Formularios Seguros: Todos los formularios incluyen validaciones nativas para asegurar que los campos obligatorios se completen y que los datos ingresados sean correctos.
Cómo Probar la Página
Para ver la página en funcionamiento solo debes descargar o clonar este repositorio y abrir el archivo index.html en cualquier navegador web.
