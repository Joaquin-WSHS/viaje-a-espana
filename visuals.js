/* Cada recurso tiene una función narrativa explícita. Los actores y espacios
   generados son escenas ilustrativas; los lugares culturales conservan sus fotos reales. */
const sceneVisuals={
waiter:{title:'El camarero toma nota de mi pedido',alt:'Un camarero con delantal escribe el pedido en un bloc de notas, junto a la mesa.',text:'El camarero escucha tu pedido. Puedes decir: «De primero, quiero…».',focus:'47% 48%'},
hotel:{title:'En la recepción del hotel',alt:'Una recepcionista atiende al visitante desde el mostrador del hotel y le ofrece una tarjeta.',text:'La recepcionista te ayuda con tu reserva y tu equipaje.',focus:'50% 45%'},
shop:{title:'Elijo mi camiseta en la tienda',alt:'Un dependiente de una tienda deportiva muestra una camiseta blanca en una percha.',text:'Mira la camiseta y elige el nombre y la talla en las opciones del juego.',focus:'50% 44%'},
tickets:{title:'Pido mi entrada en la taquilla',alt:'Una empleada entrega unas entradas de papel desde la taquilla de un teatro.',text:'Antes de entrar, comprueba la obra, la hora y tu asiento en la entrada del juego.',focus:'50% 45%'},
packing:{title:'Preparo mi maleta',alt:'Unas manos colocan una chaqueta en una maleta abierta; al lado hay una botella y un cuaderno.',text:'Prepara tu equipaje y deja espacio para los recuerdos.',focus:'50% 50%'},
friend:{title:'Una conversación con Lucía',alt:'Una joven conversa con el visitante desde una mesa de una cafetería luminosa.',text:'Lucía es un personaje de nuestra aventura. Escucha sus recomendaciones y elige qué decir.',focus:'50% 42%'},
exchange:{title:'Cambio dólares por euros',alt:'Una persona atiende en un mostrador de cambio y entrega billetes de euro al viajero.',text:'Observa la operación y consulta el cambio fijo de la simulación.',focus:'50% 47%'},
train:{title:'Preparo mi viaje en tren',alt:'Un tren blanco de alta velocidad espera junto a un andén, con una maleta en primer plano.',text:'La próxima etapa conecta Madrid y Valencia. La imagen ilustra el viaje, no una estación concreta.',focus:'50% 50%'},
airport:{title:'Recojo la maleta y salgo del aeropuerto',alt:'Una maleta en una terminal luminosa de llegadas con viajeros al fondo.',text:'Has llegado. Ahora eliges cómo ir al centro de la ciudad.',focus:'50% 50%'},
souvenirs:{title:'Elijo un recuerdo en una tienda',alt:'Una dependienta presenta una postal; sobre el mostrador hay un abanico y pequeños recuerdos.',text:'Mira los objetos y piensa para quién quieres llevar un recuerdo.',focus:'50% 48%'},
ocean:{title:'Observo un animal marino',alt:'Una tortuga marina y pequeños peces nadan en un acuario de agua azul.',text:'Una imagen ilustrativa para observar y hacer preguntas sobre la naturaleza; no identifica un espacio real del Oceanogràfic.',focus:'50% 50%'},
science:{title:'Observo la luz en una actividad científica',alt:'Unas manos exploran la luz y un prisma en una actividad de ciencia acompañada por un educador.',text:'Una actividad ilustrativa para hacer preguntas. Consulta las propuestas reales en la web oficial del museo.',focus:'50% 50%'}
};
function applySceneVisuals(s,p){
for(const [key,v] of Object.entries(sceneVisuals)){
const id='scene_'+key;v.id=id;v.url='assets/'+key+'.png';v.author='SpainQuest · imagen generada';v.license='Escena ilustrativa';v.generated=true;v.source='';photoLibrary[id]=v;p[id]=v.url;
}
const assignments={
cambio:'exchange',maleta:'packing',llegada:'airport',hotel:'hotel',desayuno:'waiter',comida:'waiter',lucia:'friend',mensaje:'friend',tienda:'souvenirs',regalo:'souvenirs',camiseta:'shop',personalizar:'shop',talla:'shop',pedido:'shop',asiento:'tickets',entrada:'tickets',tren:'train',museu:'science',ocean:'ocean',recuerdo_valencia:'souvenirs',regreso:'packing',pedir_madrid:'waiter',pedir_valencia:'waiter',despues_menu_madrid:'waiter',despues_menu_valencia:'waiter'
};
for(const [scene,key] of Object.entries(assignments)){s[scene].image='scene_'+key;s[scene].imageAlt=sceneVisuals[key].alt;s[scene].imageFocus=sceneVisuals[key].focus;s[scene].illustrative=true;}
s.mensaje.imageLabel='Lucía, tu compañera de viaje';
s.orientacion_madrid.imageLabel='Tu destino: Plaza Mayor';
s.calle_senal.imageLabel='Tu destino: Plaza Mayor';
s.orientacion_valencia.imageLabel='Tu destino: Mercado Central';
s.museu.imageLabel='Una actividad de ciencia · imagen ilustrativa';
s.ocean.imageLabel='Un animal marino · imagen ilustrativa';
s.tren.imageLabel='El viaje a Valencia · imagen ilustrativa';
s.llegada.imageLabel='La llegada · imagen ilustrativa';
s.pedir_valencia.imageLabel='En la mesa · el camarero toma nota';
s.pedir_madrid.imageLabel='En la mesa · el camarero toma nota';
}
