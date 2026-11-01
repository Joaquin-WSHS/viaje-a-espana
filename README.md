# Viaje a España · Prototipo 2

Aventura cultural independiente íntegramente en español A2. Madrid y Valencia, con decisiones, economía virtual, exploración visual y álbum personal.

## Jugar

Abrir `index.html` junto a `style.css`, `content.js` y `app.js`. En este repositorio GitHub los archivos se encuentran en la raíz; en el checkout de desarrollo y alojamiento están en `dist/`. No hay compilación ni dependencias obligatorias.

## Contenido

53 escenas, exploración libre de las dos ciudades, 1.800 USD iniciales y cambio fijo de simulación de 0,90 EUR por dólar. Los vuelos, regreso y cuatro noches de hotel están incluidos. Los precios, horarios, carteles y seis pizarras son ficticios y se identifican como tales.

- Prado: dos retratos de Velázquez, observación y dos imágenes con pies de foto; fichas y visita virtual oficiales, alternativa interna e importación local de capturas.
- Madrid: Retiro, Plaza Mayor, zona del Bernabéu, elección de jugador y talla de camiseta virtual, teatro familiar y lectura de entrada.
- Valencia: Ciudad de las Artes y las Ciencias, ciencia, Oceanogràfic, Mercado Central, Torres de Serranos, Malvarrosa, gastronomía y recuerdos.
- Pizarras: comparar platos, horarios y bebidas incluidas; elegir primero, segundo y postre; calcular el total y guardar el pedido.
- Orientación: mensajes, horas, señales y citas en Plaza Mayor y Mercado Central.
- Google Maps opcional, Street View y rutas a pie con enlaces. Sin clave API ni petición de geolocalización. El juego no comprueba posición ni desplazamiento real.
- Fotos con créditos, múltiples miradas de la misma imagen, recuerdos, notas, compras y álbum imprimible como PDF desde el navegador.
- Progreso y capturas en localStorage, sin cuenta. El navegador puede limitar el almacenamiento. Las capturas se reducen a 1000 px antes de guardar.
- Migración de la primera versión: conserva gastos/fotos y suma 1.200 USD. Una partida terminada vuelve al mapa de Madrid para explorar el contenido nuevo.

## Criterio cultural

España se presenta a través de patrimonio, cultura, ciencia, deporte, gastronomía y vida cotidiana. Fuentes oficiales, misiones A2 y obras de arte seleccionadas. Propuesta independiente; no atribuye patrocinio, alianza ni respaldo institucional. No utiliza logotipos institucionales.

## Fuentes y recursos

Créditos completos y enlaces de licencia en la interfaz: Sobre la experiencia y sus fuentes. Fotografías de Wikimedia Commons de vpogarcia, MottaW, DetFerMai, Gustavo86, Karman85, Veronika Bashak, Algrise y Dorieo, con sus licencias indicadas. Reproducciones de Velázquez: dominio público. Fotos de ambiente: Unsplash. Tipografía: Google Fonts. Las webs externas pueden cambiar o no cargar; no se venden entradas ni productos reales.

## Validación

Sintaxis JavaScript; 53 escenas y todos sus enlaces internos; recorrido Madrid–Valencia–regreso; bloqueo de misión del Prado sin dos obras; pagos de visita únicos; selección y compra de camiseta; lectura de entrada; menús y suplemento de agua; reintentos de orientación; conservación de cartera y reanudación sin repetir transacciones. Revisión visual de portada, galerías y menú de Madrid en Chrome.

Barcelona y Galicia siguen pendientes. El motor usa escenas y recursos declarativos en `content.js`; `app.js` gestiona estado e interacciones y `style.css` el diseño adaptable.

## Revisión visual de acciones

`visuals.js` asigna imágenes según la acción de cada escena: camarero con bloc al pedir, recepcionista al llegar al hotel, taquilla al comprar entradas, dependiente al elegir camiseta, equipaje al preparar la maleta, mostrador al cambiar dinero, conversación con Lucía y tren al viajar. Museo de ciencia y naturaleza tienen imágenes ilustrativas propias. Hay 12 imágenes nuevas para 26 escenas.

Los recursos generados en `assets/` se identifican como escenas ilustrativas con personas y espacios ficticios. Los monumentos y obras mantienen las fotografías reales con sus fuentes. En las misiones de orientación se distingue la fotografía del destino del punto de partida. Las fotografías grandes tienen texto alternativo descriptivo y encuadre específico para conservar los objetos relevantes.

## Descubrimiento cultural y logros · versión 3

- 700 euros iniciales disponibles y 1.800 dólares de reserva. La migración añade 700 euros una sola vez a las partidas de la versión 2.
- Botón Empezar viaje siempre visible, con aviso antes de sustituir la partida.
- Mercado Central: diez nuevas fotos de interior, productos y detalles; historia, arquitectura, vida cotidiana y proximidad. Misión de almuerzo para dos con cesta editable de máximo 20 euros; no se cobra hasta confirmar y no se cobra dos veces.
- Torres de Serranos: Valencia medieval y protección del patrimonio evacuado de Madrid durante la Guerra Civil; misiones con ayuda y foto comentada.
- Nueve logros con miniaturas, cuadros y marcas rojas de bolígrafo. Se calculan a partir de actividades, compras y fotos; no se pueden activar manualmente.
- Referencias en una vista propia del menú: fuentes culturales, autorías y licencias. Sin enlaces de atribución al pie de las imágenes de aprendizaje ni en el álbum.
- Fotos remotas solicitadas hasta 1920 px cuando la fuente lo permite; recursos generados locales de 1536 × 1024.

`culture.js` contiene los capítulos ampliados y las fuentes. `discovery.js` gestiona objetivos, referencias y cesta. Verificados los 63 destinos de escena, presupuesto, cesta, doble cobro, condiciones de logros y misiones históricas.
