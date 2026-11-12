/* Progreso: protección de la partida guardada, logros de los nuevos destinos y reto del mercado.
   Se carga después de discovery.js y antes de app.js. No añade solicitudes externas. */

/* 1 · Partida guardada: repara tipos dañados antes de que app.js la lea y guarda una copia. */
const progressRecovery=(function(){
  const KEY='viaje-espana-v1';let raw=null;
  try{raw=localStorage.getItem(KEY)}catch{return null}
  if(!raw)return null;
  const backup=()=>{try{localStorage.setItem(KEY+'-copia',raw)}catch{}};
  let d;try{d=JSON.parse(raw)}catch{backup();return 'copia'}
  if(!d||typeof d!=='object'||Array.isArray(d)){backup();return 'copia'}
  if(![1,2,3].includes(d.version)){backup();return 'copia'}
  let fixed=false;const isObj=v=>v&&typeof v==='object'&&!Array.isArray(v);
  for(const k of ['bag','purchases','photos','souvenirs','ledger','visited','history','paid','missions','meals'])if(k in d&&!Array.isArray(d[k])){d[k]=[];fixed=true}
  for(const k of ['marketBasket','notes','menu'])if(k in d&&!isObj(d[k])){d[k]={};fixed=true}
  for(const k of ['eur','usd','time','day'])if(k in d&&!(typeof d[k]==='number'&&isFinite(d[k]))){delete d[k];fixed=true}
  for(const k of ['scene','player','size','reflection'])if(k in d&&typeof d[k]!=='string'){delete d[k];fixed=true}
  if('marketReceipt' in d&&d.marketReceipt!==null&&!(isObj(d.marketReceipt)&&Array.isArray(d.marketReceipt.items))){d.marketReceipt=null;fixed=true}
  const keep=(k,test,fix)=>{if(!Array.isArray(d[k]))return;const before=JSON.stringify(d[k]);d[k]=d[k].map(x=>fix?fix(x):x).filter(test);if(JSON.stringify(d[k])!==before)fixed=true};
  keep('photos',p=>isObj(p)&&typeof p.image==='string');
  keep('souvenirs',s=>isObj(s)&&typeof s.name==='string',s=>typeof s==='string'?{name:s,recipient:null}:s);
  keep('ledger',l=>isObj(l)&&typeof l.amount==='number'&&isFinite(l.amount));
  keep('history',h=>isObj(h)&&typeof h.choice==='string');
  keep('meals',m=>isObj(m)&&typeof m.city==='string');
  for(const k of ['missions','paid','visited'])keep(k,x=>typeof x==='string');
  if(!fixed)return null;
  backup();try{localStorage.setItem(KEY,JSON.stringify(d))}catch{}
  return 'reparada';
})();
window.addEventListener('load',()=>{if(!progressRecovery||typeof toast!=='function')return;setTimeout(()=>toast(progressRecovery==='reparada'?'Hemos reparado tu partida guardada. Tus fotos y decisiones siguen aquí.':'Tu partida anterior no se podía abrir. Hay una copia de seguridad en este navegador.'),600)});

/* 2 · Reto del mercado: la cuenta «dos kilos» vuelve a estar accesible desde el Mercado Central. */
function applyProgreso(s){
  if(s.mercado&&s.mercado_reto&&!s.mercado.options.some(o=>o[3]==='mercado_reto')){
    s.mercado.options.splice(Math.max(0,s.mercado.options.length-1),0,opt('Hago una cuenta en un puesto.','Leo un cartel de precios y calculo.',0,'mercado_reto'));
    s.mercado_reto.options.forEach(o=>{if(o[3]==='valencia')o[3]='mercado'});
  }
}

/* 2b · Revisión de imágenes para secundaria (10/11/2026).
   - Ses Illetes: la foto de playa con bañistas se sustituye por la vista aérea, sin personas reconocibles.
   - NH: el archivo de Commons «Nh group logo.svg» corresponde a otra empresa; se usa un identificador de texto. */
function applyImageReview(s){
  for(const sc of Object.values(s)){
    if(sc.image==='for-illetes')sc.image='for-aerea';
    if(Array.isArray(sc.gallery)&&sc.gallery.includes('for-illetes')){sc.gallery=sc.gallery.filter(g=>g!=='for-illetes');if(!sc.gallery.includes('for-aerea'))sc.gallery.unshift('for-aerea')}
  }
  delete photoLibrary['for-illetes'];delete pictures['for-illetes'];
  const nhMark='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 240"><rect width="600" height="240" fill="#fff"/><text x="300" y="118" text-anchor="middle" font-family="Georgia,serif" font-size="64" fill="#1f2a44">NH Collection</text><text x="300" y="170" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" letter-spacing="6" fill="#1f2a44">HOTELS · A CORUÑA</text></svg>');
  if(pictures.logo_nh!==undefined||photoLibrary.logo_nh){pictures.logo_nh=nhMark;if(photoLibrary.logo_nh)Object.assign(photoLibrary.logo_nh,{url:nhMark,title:'NH Collection · identificador de texto',text:'Identificador de texto creado para el juego; no es el logotipo oficial.',generated:true})}
}
document.addEventListener('DOMContentLoaded',()=>{try{applyImageReview(scenes)}catch{}});
const _applyPradoBase=applyPradoGaleria;
applyPradoGaleria=function(s,p){_applyPradoBase(s,p);applyProgreso(s);applyImageReview(s)};

/* 3 · Logros de los nuevos destinos: se calculan con misiones y fotos comentadas, nunca a mano. */
const _baseAchievements=allAchievements;
allAchievements=function(){
  const m=id=>state.missions.includes(id),any=(...ids)=>ids.some(m);
  const pradoSeen=['hilanderas','breda','3mayo','carlosiv','quitasol','caballero','descendimiento','anunciacion','muhlberg'].filter(id=>m('prado_'+id)).length;
  const extra=[
  {id:'santiago',name:'Al final del Camino',city:'Santiago',image:'stg-obradoiro',checks:[['Descubrir la plaza del Obradoiro',m('stg_obradoiro')],['Conocer a los peregrinos y su símbolo',m('stg_peregrinos')],['Entender el botafumeiro',m('stg_botafumeiro')],['Guardar una foto con una frase',photosFor(['stg-catedral','stg-obradoiro','stg-peregrinos','stg-botafumeiro','stg-vieira'],['santiago','stg_obradoiro','stg_peregrinos','stg_botafumeiro'])>=1]]},
  {id:'santiago_vida',name:'Compostela cotidiana',city:'Santiago',image:'stg-abastos',checks:[['Pasear por la Rúa do Franco',m('stg_rua')],['Visitar el Mercado de Abastos',m('stg_abastos')],['Probar la tarta de Santiago',m('stg_tarta')]]},
  {id:'bilbao',name:'Una ciudad que cambia',city:'Bilbao',image:'bio-guggenheim',checks:[['Observar el Guggenheim',m('bio_guggenheim')],['Seguir la ría y sus puentes',m('bio_ria')],['Recorrer el Casco Viejo',m('bio_casco')],['Guardar una foto con una frase',photosFor(['bio-guggenheim','bio-guggenheim-ria','bio-puppy','bio-maman','bio-zubizuri','bio-casco','bio-plazanueva','bio-ribera'],['bilbao','bio_guggenheim','bio_ria','bio_casco','bio_puppy','bio_maman','bio_ribera'])>=1]]},
  {id:'pintxos',name:'Cocina vasca',city:'Euskadi',image:'euskadi-pintxos',checks:[['Pedir pintxos en Bilbao',m('bio_pintxos')],['Conocer el Basque Culinary Center',m('dss_bcc')],['Pasear por La Concha',m('dss_concha')]]},
  {id:'formentera',name:'Cuidar el Mediterráneo',city:'Formentera',image:'for-aerea',checks:[['Descubrir Ses Illetes',m('for_illetes')],['Entender la posidonia',m('for_posidonia')],['Conocer Ses Salines',m('for_salines')],['Guardar una foto con una frase',photosFor(['for-aerea','for-illetes','for-illetes-barcos','for-posidonia','for-salines','for-mola','for-barbaria','for-santfrancesc','for-escalo','for-varaderos'],['formentera','for_illetes','for_posidonia','for_salines','for_faros','for_santfrancesc','for_escalo'])>=1]]},
  {id:'toledo',name:'Tres culturas, una ciudad',city:'Toledo',image:'tol-vista',checks:[['Comprender la convivencia',m('tol_convivencia')],['Visitar una sinagoga',any('tol_transito','tol_blanca')],['Visitar la mezquita del Cristo de la Luz',m('tol_cristo')],['Visitar la catedral',m('tol_catedral')],['Guardar una foto con una frase',photosFor(['tol-vista','tol-tajo','tol-catedral','tol-transito','tol-blanca','tol-cristo','tol-alcazar','tol-sanmartin','tol-bisagra','tol-mazapan','tol-damasquinado'],['toledo','tol_convivencia','tol_catedral','tol_transito','tol_blanca','tol_cristo','tol_puertas','tol_alcazar','tol_artesania'])>=1]]},
  {id:'greco',name:'Mirar como El Greco',city:'Toledo',image:'greco-orgaz',checks:[['Observar El entierro del señor de Orgaz',m('greco_orgaz')],['Reconocer su estilo',m('greco_estilo')],['Explorar otra obra del museo',any('greco_vistaplano','greco_apostolado','greco_met')],['Guardar una foto de una obra con una frase',photosFor(['greco-orgaz','greco-salvador','greco-vistaplano','greco-vista-met','greco-apostolado-sala','greco-santotome','greco-patio','greco-entrada'],['tol_greco','tol_greco_orgaz','tol_greco_estilo','tol_greco_vistaplano','tol_greco_apostolado','tol_greco_met'])>=1]]},
  {id:'prado_galeria',name:'Grandes obras del Prado',city:'Madrid',image:'prado-3mayo',checks:[['Observar tres obras de la galería ('+Math.min(pradoSeen,3)+'/3)',pradoSeen>=3],['Guardar una obra con una frase',photosFor(['prado-hilanderas','prado-breda','prado-3mayo','prado-carlosiv','prado-quitasol','prado-caballero','prado-descendimiento','prado-anunciacion','prado-muhlberg'],['prado_galeria'])>=1]]}
  ].map(a=>({...a,done:a.checks.length>0&&a.checks.every(c=>c[1])}));
  return [..._baseAchievements(),...extra];
};

/* 4 · Movimiento reducido: sin desplazamiento animado si el sistema lo pide. */
try{if(matchMedia('(prefers-reduced-motion: reduce)').matches){const nativeScroll=window.scrollTo.bind(window);window.scrollTo=function(a,b){return typeof a==='object'&&a?nativeScroll({...a,behavior:'auto'}):nativeScroll(a,b)}}}catch{}

/* 5 · Revisión final (12/11/2026): comparación con la comunidad en todas las paradas nuevas. */
function applyComparisons(s){
  const c={
  stg_tarta:'¿Hay un dulce típico en tu comunidad? ¿Cuándo se come? NM: «En mi comunidad comemos __».',
  bio_maman:'¿Hay una escultura o un mural en un espacio público de tu ciudad? ¿Qué representa? NM: «En mi ciudad hay __».',
  bio_ria:'¿Hay un río o un puente importante en tu ciudad? ¿Para qué lo usan las personas?',
  bio_pintxos_fin:'¿Dónde comes con tus amigos en tu comunidad? ¿Coméis de pie o sentados? NM: «Con mis amigos como en __».',
  dss_bcc:'¿Dónde se aprende a cocinar en tu comunidad: en casa, en la escuela, en un restaurante? ¿Quién cocina en tu familia?',
  tol_transito:'¿Hay un edificio de tu ciudad que antes tenía otro uso? NM: «Antes era __. Ahora es __».',
  tol_blanca:'¿Qué edificios religiosos hay en tu comunidad? ¿En qué se parecen a este y en qué son diferentes?',
  tol_alcazar:'¿Qué edificio se ve desde lejos en tu ciudad? ¿Qué hay dentro hoy?',
  prado_galeria:'¿Hay un museo en tu ciudad o en tu estado? ¿Qué puedes ver allí? NM: «En el museo de __ hay __».',
  prado_hilanderas:'¿Qué trabajos hechos a mano conoces en tu comunidad? ¿Quién los hace?',
  prado_breda:'En el cuadro, el vencedor trata con respeto al vencido. ¿Cómo muestras respeto después de un partido o una competición?',
  prado_3mayo:'¿Cómo recuerda tu comunidad los momentos difíciles de su historia: con un monumento, un día especial, una obra de arte?',
  prado_caballero:'¿Cómo es un retrato hoy: una foto, un selfi? ¿Qué quieres mostrar de ti en una foto?',
  prado_descendimiento:'Los personajes muestran tristeza con la cara y las manos. ¿Cómo muestran las emociones las personas en las fotos o películas que tú ves?',
  prado_anunciacion:'El cuadro cuenta una historia en varias escenas, como un cómic. ¿Qué historias con imágenes lees o ves tú?',
  prado_muhlberg:'¿Cómo aparecen hoy los líderes en las fotos oficiales? ¿Qué quieren comunicar?'};
  for(const [id,t] of Object.entries(c)){const sc=s[id];if(!sc)continue;sc.explore=sc.explore||[];if(!sc.explore.some(e=>/^Comparaci/.test(e[0])))sc.explore.push(['Comparación',t])}
}
const _applyPradoRev=applyPradoGaleria;
applyPradoGaleria=function(s,p){_applyPradoRev(s,p);applyComparisons(s)};

/* 6 · Imágenes de marca que no cargan: se muestra el nombre de la marca en lugar de un hueco. */
document.addEventListener('error',e=>{
  const t=e.target;if(!(t instanceof HTMLImageElement)||t.dataset.fallback)return;
  try{
    const src=t.getAttribute('src'),key=Object.keys(photoLibrary).find(k=>photoLibrary[k]&&photoLibrary[k].url===src)||Object.keys(pictures).find(k=>pictures[k]===src);if(!key)return;
    const b=Object.values(brandLibrary).find(x=>x.logoId===key||x.image===key||(x.gallery||[]).includes(key));if(!b)return;
    const name=String(b.name).replace(/\s*\(.*\)\s*/,'').replace(/[&<>]/g,''),logo=b.logoId===key;
    t.dataset.fallback='1';
    t.src='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 '+(logo?240:400)+'"><rect width="600" height="'+(logo?240:400)+'" fill="'+(logo?'#fff':'#efe8d8')+'"/><text x="300" y="'+(logo?135:195)+'" text-anchor="middle" font-family="Georgia,serif" font-size="'+(name.length>14?40:56)+'" fill="#1f2a44">'+name+'</text>'+(logo?'':'<text x="300" y="240" text-anchor="middle" font-family="sans-serif" font-size="17" fill="#66625a">Foto no disponible ahora · consulta Referencias</text>')+'</svg>');
  }catch{}
},true);

/* 7 · Pantalla final: ya no habla solo de Madrid y Valencia; el sello muestra las ciudades visitadas. */
document.addEventListener('DOMContentLoaded',()=>{
  if(typeof renderFinish!=='function')return;
  const base=renderFinish;
  renderFinish=function(){
    base();
    try{
      const codes=[['MAD',/^(plan|prado|retiro|banco|bernabeu|tour|camiseta|personalizar|talla|pedido|teatro|asiento|entrada|funcion|atardecer|menus_madrid|orientacion_madrid|calle_senal|cita_madrid)/],['TOL',/^(toledo|tol_)/],['VLC',/^(valencia|mercado|ciencias|museu|ocean|serranos|playa|paella|sobremesa|recuerdo_valencia|menus_valencia|orientacion_valencia|cita_valencia)/],['FOR',/^(formentera|for_)/],['BCN',/^(barcelona|bcn_)/],['ALT',/^altamira/],['BIO',/^(bilbao|bio_|dss)/],['SCQ',/^(santiago|stg_)/],['LCG',/^coruna/]];
      const seen=codes.filter(([c,re])=>state.history.some(h=>re.test(h.scene||''))).map(x=>x[0]);
      const q=x=>document.querySelector('.finish '+x);
      if(q('.eyebrow'))q('.eyebrow').innerHTML='<span class="dot"></span> ESPAÑA · TU VIAJE';
      if(q('.stamp'))q('.stamp').innerHTML='ESPAÑA<br>MI ÁLBUM DE VIAJE<br>✳ '+(seen.length?seen.join(' · '):'ESPAÑA')+' ✳';
      if(q('label[for="reflection"]'))q('label[for="reflection"]').textContent='Mi historia de España';
      if(q('#reflection'))q('#reflection').placeholder='En Madrid descubrí… En otra ciudad vi… Me gustó… Comí… Mi recuerdo favorito es… Quiero volver porque…';
      if(q('#back-valencia'))q('#back-valencia').textContent='Seguir explorando';
    }catch{}
  };
  if(document.querySelector('.finish'))renderFinish();
});
