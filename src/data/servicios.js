// Catálogo oficial de servicios MOGA. Orden, nombres, precios y funciones son
// los definitivos: no agregar, quitar ni reordenar servicios sin autorización.
//
// `color` referencia un tema visual (ver COLOR_THEMES en ServiciosCinematico /
// PreciosCarousel) construido únicamente con los tokens de marca ya definidos
// en src/index.css (--color-primary/secondary/cyan/accent). `duo` combina
// primary+secondary (mismo degradado que .bg-gradient-card).
//
// `imagen` apunta a los renders reales de Circuit en public/services/. Cuando
// aún no existe un render para el servicio, `imagenPendiente: true` activa un
// estado visual "pendiente" explícito en vez de usar una imagen genérica.

export const servicios = [
  {
    id: "pos",
    orden: 1,
    color: "primary",
    mockup: "pos",
    titulo: "MOGA POS",
    descripcion:
      "Un punto de venta moderno para agilizar las ventas y mejorar el control del negocio. Disponible como aplicación de escritorio para Windows y con acceso desde dispositivos móviles.",
    caracteristicas: [
      "Aplicación de escritorio para Windows",
      "Acceso desde dispositivos móviles",
      "Cobro de ventas",
      "Apertura y cierre de caja",
      "Gestión de productos y categorías",
      "Reportes de ventas",
      "Impresión de tickets",
      "Respaldos en la nube",
      "Actualizaciones continuas",
    ],
    precio: "$799",
    precioSufijo: "MXN/mes",
    cta: "Conocer MOGA POS",
    imagen: "/services/pos.webp",
    imagenAlt: "Circuit señalando la pantalla de una terminal de punto de venta junto a una impresora de tickets",
    sistemaUrl: "#", // TODO: reemplazar con la URL real del sistema MOGA POS
  },
  {
    id: "fichaje",
    orden: 2,
    color: "cyan",
    mockup: "fichaje",
    titulo: "MOGA Fichaje",
    descripcion:
      "Sistema para controlar la asistencia de los empleados mediante reconocimiento facial y consultar reportes desde cualquier lugar.",
    caracteristicas: [
      "Reconocimiento facial",
      "Registro de entradas y salidas",
      "Historial de asistencias",
      "Reportes automáticos",
      "Panel administrativo",
      "Respaldo seguro en la nube",
      "Acceso desde cualquier dispositivo",
    ],
    precio: "$899",
    precioSufijo: "MXN/mes",
    cta: "Conocer MOGA Fichaje",
    imagen: "/services/facial.webp",
    imagenAlt:
      "Trabajador frente a una cámara con un marco de reconocimiento facial y asistencia confirmada",
    sistemaUrl: "#", // TODO: reemplazar con la URL real del sistema MOGA Fichaje
  },
  {
    id: "citas",
    orden: 3,
    color: "secondary",
    mockup: "citas",
    titulo: "MOGA Citas IA",
    descripcion:
      "Asistente inteligente que atiende llamadas y WhatsApp, responde preguntas relacionadas con el negocio y agenda citas automáticamente las 24 horas del día.",
    caracteristicas: [
      "Atención por WhatsApp y llamadas",
      "Agenda automática las 24 horas del día, los 7 días de la semana",
      "Confirmaciones y recordatorios",
      "Gestión de múltiples prestadores",
      "Panel administrativo",
      "Historial de conversaciones",
      "Integración personalizada",
    ],
    precio: "$999",
    precioSufijo: "MXN/mes",
    cta: "Conocer MOGA Citas IA",
    imagen: "/services/citas.webp",
    imagenAlt:
      "Celular mostrando una conversación de WhatsApp con una cita confirmada mediante inteligencia artificial",
    sistemaUrl: "#", // TODO: reemplazar con la URL real del sistema MOGA Citas IA
  },
  {
    id: "delivery",
    orden: 4,
    color: "accent",
    mockup: "delivery",
    titulo: "MOGA Delivery IA",
    descripcion:
      "Sistema que automatiza la recepción de pedidos mediante inteligencia artificial y permite que los clientes ordenen en cualquier momento.",
    caracteristicas: [
      "Pedidos automáticos por WhatsApp",
      "Pedidos automáticos mediante llamadas",
      "Inteligencia artificial entrenada con el menú del negocio",
      "Gestión de pedidos",
      "Historial de clientes",
      "Panel administrativo",
      "Atención las 24 horas del día, los 7 días de la semana",
    ],
    precio: "$1,199",
    precioSufijo: "MXN/mes",
    cta: "Conocer MOGA Delivery IA",
    imagen: "/services/pedidos.webp",
    imagenAlt: "Repartidor gestionando un pedido en camino en tiempo real",
    sistemaUrl: "#", // TODO: reemplazar con la URL real del sistema MOGA Delivery IA
  },
  {
    id: "ecommerce",
    orden: 5,
    color: "duo",
    mockup: "ecommerce",
    titulo: "MOGA Ecommerce",
    descripcion:
      "Desarrollo de tiendas en línea completamente personalizadas para cada empresa, adaptadas a su identidad, productos, operación y necesidades.",
    caracteristicas: [
      "Diseño exclusivo",
      "Landing page profesional",
      "Catálogo de productos",
      "Carrito de compras",
      "Integración con métodos de pago",
      "Panel administrativo",
      "Gestión de inventario",
      "Gestión de pedidos",
      "Diseño adaptable a computadoras, tabletas y teléfonos",
      "Optimización SEO básica",
      "Certificado SSL",
      "Capacitación",
    ],
    precio: null,
    precioSufijo: null,
    precioTexto: "Cotización personalizada",
    cta: "Conocer MOGA Ecommerce",
    imagen: "/services/ecommerce.webp",
    imagenAlt: "Circuit sosteniendo un carrito de compras en línea y una bolsa de tienda",
    sistemaUrl: null,
  },
];
