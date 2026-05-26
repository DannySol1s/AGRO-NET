export type MateriaPrimaSeed = {
  id: string;
  nombre: string;
  emoji: string;
  categoria: string;
  descripcion: string;
};

export const MATERIAS_PRIMAS_SEED: MateriaPrimaSeed[] = [
  { id: 'carambola', nombre: 'Carambola', emoji: '⭐', categoria: 'fruta', descripcion: 'Fruta tropical en forma de estrella, rica en vitamina C.' },
  { id: 'yuca',      nombre: 'Yuca',      emoji: '🟤', categoria: 'tuberculo', descripcion: 'Tubérculo rico en almidón, base de muchos productos.' },
  { id: 'chaya',     nombre: 'Chaya',     emoji: '🌿', categoria: 'hierba', descripcion: 'Planta con alto valor nutritivo, similar a la espinaca.' },
  { id: 'zapote',    nombre: 'Zapote',    emoji: '🟠', categoria: 'fruta', descripcion: 'Fruta dulce y cremosa de regiones tropicales.' },
  { id: 'aguacate',  nombre: 'Aguacate',  emoji: '🥑', categoria: 'fruta', descripcion: 'Fruta grasa con alto valor nutritivo y comercial.' },
  { id: 'guaya',     nombre: 'Guaya',     emoji: '🍇', categoria: 'fruta', descripcion: 'Fruta tropical de pulpa dulce y jugosa.' },
  { id: 'caimito',   nombre: 'Caimito',   emoji: '🔵', categoria: 'fruta', descripcion: 'Fruta de color morado con pulpa cremosa y dulce.' },
  { id: 'ramon',     nombre: 'Ramón',     emoji: '🌰', categoria: 'semilla', descripcion: 'Semilla nutritiva del árbol de ramón, fuente de proteína.' },
  { id: 'pina',      nombre: 'Piña',      emoji: '🍍', categoria: 'fruta', descripcion: 'Fruta tropical jugosa, ideal para jugos y conservas.' },
  { id: 'cacahuate', nombre: 'Cacahuate', emoji: '🥜', categoria: 'legumbre', descripcion: 'Legumbre rica en proteínas y grasas saludables.' },
];

export type ProductoSeed = {
  id: string;
  materiaPrimaId: string;
  numero: number;
  nombre: string;
  nivelDificultad: 'principiante' | 'medio' | 'avanzado';
  rendimientoKg?: number;
  rendimientoL?: number;
  vidaUtilDesc: string;
  vidaUtilMeses?: number;
  insumos: { nombre: string; cantidad: number; unidad: string; opcional?: boolean }[];
  pasos: { numero: number; titulo: string; descripcion: string; tiempoMinutos?: number }[];
  parametros: { parametro: string; valorEsperado: string; metodoVerificacion?: string }[];
  normas: { codigo: string; descripcion?: string }[];
};

export const PRODUCTOS_SEED: ProductoSeed[] = [
  {
    id: 'carambola-mermelada',
    materiaPrimaId: 'carambola',
    numero: 1,
    nombre: 'Mermelada de Carambola con Jengibre',
    nivelDificultad: 'principiante',
    rendimientoKg: 10,
    vidaUtilDesc: '12 meses en lugar fresco y oscuro',
    vidaUtilMeses: 12,
    insumos: [
      { nombre: 'Carambolas maduras', cantidad: 12, unidad: 'kg' },
      { nombre: 'Azúcar estándar', cantidad: 9, unidad: 'kg' },
      { nombre: 'Jengibre fresco rallado', cantidad: 200, unidad: 'g' },
      { nombre: 'Limones grandes', cantidad: 15, unidad: 'piezas' },
      { nombre: 'Agua potable', cantidad: 3, unidad: 'L' },
    ],
    pasos: [
      { numero: 1, titulo: 'Selección y lavado', descripcion: 'Elija carambolas completamente amarillas con bordes dorados. Evite manchas negras o partes blandas. Lávelas bajo agua corriente frotando suavemente. Escurra sobre rejilla limpia 15 minutos.', tiempoMinutos: 30 },
      { numero: 2, titulo: 'Preparación de la fruta', descripcion: 'Retire las puntas con cuchillo. Corte en rodajas de 5 mm. Retire las semillas de cada rodaja. Pese para confirmar aproximadamente 10 kg de rodajas limpias.', tiempoMinutos: 45 },
      { numero: 3, titulo: 'Cocción inicial', descripcion: 'En olla de 30 litros, vierta 3 L de agua y el jugo de los 15 limones. Lleve a ebullición. Agregue las rodajas y cocine a fuego medio 20-25 minutos hasta que la fruta se ablande.', tiempoMinutos: 25 },
      { numero: 4, titulo: 'Incorporación del azúcar y jengibre', descripcion: 'Agregue los 9 kg de azúcar de una sola vez. Añada el jengibre rallado distribuido uniformemente. Revuelva enérgicamente 3-5 minutos hasta que el azúcar se disuelva completamente.', tiempoMinutos: 5 },
      { numero: 5, titulo: 'Cocción hasta punto de mermelada', descripcion: 'Mantenga fuego medio-bajo. Revuelva cada 5 minutos. Alrededor de los 40 minutos la mezcla se tornará amarillo dorado. Prueba del plato frío: coloque una cucharada en plato frío; si se arruga al empujar, está lista.', tiempoMinutos: 70 },
      { numero: 6, titulo: 'Envasado caliente', descripcion: 'Esterilice frascos en agua hirviendo 15 minutos. Vierta la mermelada hirviendo en frascos calientes, dejando 1 cm libre. Limpie bordes y cierre firmemente.', tiempoMinutos: 30 },
      { numero: 7, titulo: 'Pasteurización', descripcion: 'Coloque los frascos cerrados en olla con agua que los cubra completamente. Lleve a ebullición y mantenga 15-20 minutos. Retire con pinzas. Deje enfriar sobre superficie plana.', tiempoMinutos: 20 },
    ],
    parametros: [
      { parametro: 'pH', valorEsperado: '3.0 - 3.5', metodoVerificacion: 'Tiras reactivas de pH' },
      { parametro: '°Brix (azúcar)', valorEsperado: '65 - 70°', metodoVerificacion: 'Refractómetro manual' },
      { parametro: 'Textura', valorEsperado: 'Firme, gelificada, sin líquido separado', metodoVerificacion: 'Observación visual y táctil' },
      { parametro: 'Color', valorEsperado: 'Amarillo dorado translúcido', metodoVerificacion: 'Comparación con muestra patrón' },
    ],
    normas: [
      { codigo: 'NOM-247-SSA1-2008', descripcion: 'Frutas, verduras y alimentos preparados' },
      { codigo: 'NOM-051-SCFI/SSA1-2010', descripcion: 'Etiquetado para productos preenvasados' },
      { codigo: 'NOM-120-SSA1-1994', descripcion: 'Higiene y sanidad para proceso de alimentos' },
      { codigo: 'CODEX STAN 296-2009', descripcion: 'Norma del Codex para mermeladas y jaleas' },
    ],
  },
  {
    id: 'carambola-confitada',
    materiaPrimaId: 'carambola',
    numero: 2,
    nombre: 'Carambola Confitada Escarchada',
    nivelDificultad: 'medio',
    rendimientoKg: 10,
    vidaUtilDesc: '6-8 meses en lugar seco',
    vidaUtilMeses: 7,
    insumos: [
      { nombre: 'Carambolas firmes', cantidad: 12, unidad: 'kg' },
      { nombre: 'Azúcar estándar', cantidad: 15, unidad: 'kg' },
      { nombre: 'Agua potable', cantidad: 8, unidad: 'L' },
      { nombre: 'Azúcar para escarchado', cantidad: 2, unidad: 'kg' },
    ],
    pasos: [
      { numero: 1, titulo: 'Selección y preparación', descripcion: 'Elija carambolas firmes al tacto, amarillas sin manchas. Lávelas, retire puntas y corte en rodajas de 5 mm uniforme. Retire todas las semillas. Necesita 10 kg de fruta preparada.', tiempoMinutos: 45 },
      { numero: 2, titulo: 'Primer almíbar ligero', descripcion: 'Hierva 3 L de agua con 4 kg de azúcar hasta transparente. Agregue las rodajas, cocine 10 minutos desde que hierva. Apague y cubra con trapo limpio. Repose 12 horas.', tiempoMinutos: 15 },
      { numero: 3, titulo: 'Segundo almíbar medio', descripcion: 'Agregue 2 L de agua fría y 4 kg más de azúcar. Disuelva, lleve a ebullición y cocine 10 minutos. Repose otras 12 horas. Los bordes comenzarán a verse translúcidos.', tiempoMinutos: 15 },
      { numero: 4, titulo: 'Tercer almíbar fuerte', descripcion: 'Agregue 3 L de agua restantes y 7 kg de azúcar. Cocine a fuego medio-bajo 20-30 minutos. Las rodajas deben quedar completamente translúcidas y el almíbar espeso.', tiempoMinutos: 30 },
      { numero: 5, titulo: 'Escurrido', descripcion: 'Retire rodajas con espumadera. Coloque sobre rejilla limpia sin que se toquen entre sí. Escurra el exceso de almíbar durante 2 horas.', tiempoMinutos: 120 },
      { numero: 6, titulo: 'Secado al sol', descripcion: 'Extienda sobre mallas limpias bajo sol directo con buena ventilación. Voltee cada 4 horas. Recoja antes del atardecer. En climas cálidos: 2 días. En húmedos: 4-5 días.', tiempoMinutos: 2880 },
      { numero: 7, titulo: 'Escarchado', descripcion: 'Coloque los 2 kg de azúcar en bandeja. Agregue las rodajas secas de a poco. Agite suavemente para que el azúcar cubra uniformemente todas las superficies.', tiempoMinutos: 30 },
      { numero: 8, titulo: 'Acondicionamiento y empaque', descripcion: 'Guarde en recipiente cerrado 48 horas para que la humedad se distribuya. Empaque en bolsas de celofán, frascos de vidrio o recipientes herméticos.', tiempoMinutos: 2880 },
    ],
    parametros: [
      { parametro: 'Humedad', valorEsperado: '15 - 20%', metodoVerificacion: 'Pesar antes y después de secar a 105°C' },
      { parametro: '°Brix', valorEsperado: '75 - 80°', metodoVerificacion: 'Refractómetro' },
      { parametro: 'Textura', valorEsperado: 'Flexible, no pegajosa, cubierta de azúcar cristalina', metodoVerificacion: 'Táctil y visual' },
    ],
    normas: [
      { codigo: 'NOM-247-SSA1-2008', descripcion: 'Frutas deshidratadas y confitadas' },
      { codigo: 'CODEX STAN 67-1981', descripcion: 'Norma del Codex para frutas deshidratadas' },
    ],
  },
  {
    id: 'carambola-jalea',
    materiaPrimaId: 'carambola',
    numero: 3,
    nombre: 'Jalea de Carambola con Pectina Natural',
    nivelDificultad: 'principiante',
    rendimientoKg: 10,
    vidaUtilDesc: '12 meses en lugar fresco',
    vidaUtilMeses: 12,
    insumos: [
      { nombre: 'Carambolas maduras', cantidad: 14, unidad: 'kg' },
      { nombre: 'Azúcar estándar', cantidad: 10, unidad: 'kg' },
      { nombre: 'Limones grandes', cantidad: 5, unidad: 'piezas' },
      { nombre: 'Agua potable', cantidad: 2, unidad: 'L' },
    ],
    pasos: [
      { numero: 1, titulo: 'Preparación de la fruta', descripcion: 'Lave, retire puntas y corte las carambolas en trozos grandes (no es necesario retirar semillas, todo se colará). Pese aproximadamente 12 kg de fruta troceada.', tiempoMinutos: 40 },
      { numero: 2, titulo: 'Extracción del jugo', descripcion: 'En olla grande con los 2 L de agua y jugo de limón, cocine la fruta a fuego medio hasta que se deshaga completamente (30 minutos). Cuele con malla de nylon presionando bien. Debe obtener 8-9 L de jugo.', tiempoMinutos: 45 },
      { numero: 3, titulo: 'Cocción con azúcar', descripcion: 'Vierta el jugo colado en olla limpia. Agregue el azúcar. Cocine a fuego medio-bajo revolviendo ocasionalmente. Realice la prueba del plato frío cada 10 minutos. La gota debe formar película que se arrugue al empujar.', tiempoMinutos: 80 },
      { numero: 4, titulo: 'Envasado y sellado', descripcion: 'Vierta la jalea hirviendo en frascos esterilizados calientes. Deje 1 cm libre. Cierre herméticamente. Pasteurice en baño María por 15 minutos.', tiempoMinutos: 30 },
    ],
    parametros: [
      { parametro: 'pH', valorEsperado: '3.0 - 3.5', metodoVerificacion: 'Tiras reactivas' },
      { parametro: '°Brix', valorEsperado: '65 - 70°', metodoVerificacion: 'Refractómetro' },
      { parametro: 'Textura', valorEsperado: 'Gel firme, brillante, sin cristales', metodoVerificacion: 'Visual y táctil' },
    ],
    normas: [
      { codigo: 'NOM-247-SSA1-2008', descripcion: 'Frutas y productos preparados' },
      { codigo: 'CODEX STAN 296-2009', descripcion: 'Norma del Codex para mermeladas y jaleas' },
    ],
  },
];
