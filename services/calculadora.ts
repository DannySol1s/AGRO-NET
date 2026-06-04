export type InsumoConPrecio = {
  nombre: string;
  cantidad: number;
  unidad: string;
  precioUnitario: number;
};

export type ResultadoCalculo = {
  inversionTotal: number;
  rendimientoKg: number;
  costoPorKg: number;
  precioSugeridoKg: number;
  gananciaEstimada: number;
  margenPorcentaje: number;
};

export type RangoPrecios = {
  costoTotal:       number;
  costoPorUnidad:   number;
  precioMinimo:     number;   // costo + 20% — punto de equilibrio rentable
  precioRecomendado: number;  // costo + margen elegido por el productor
  precioMaximo:     number;   // costo + 100% — techo de mercado sugerido
  gananciaNeta:     number;   // con precio recomendado
  unidadesPorLote:  number;   // cuántas unidades salen del lote
};

const MARGEN_DEFAULT = 0.4;

// Cálculo por kg — usado en la calculadora específica por producto
export function calcularCostos(
  insumos: InsumoConPrecio[],
  rendimientoKg: number,
  margen: number = MARGEN_DEFAULT
): ResultadoCalculo {
  const inversionTotal = insumos.reduce(
    (suma, i) => suma + i.cantidad * i.precioUnitario,
    0
  );
  const costoPorKg = rendimientoKg > 0 ? inversionTotal / rendimientoKg : 0;
  const precioSugeridoKg = costoPorKg * (1 + margen);
  const gananciaEstimada = (precioSugeridoKg - costoPorKg) * rendimientoKg;

  return {
    inversionTotal,
    rendimientoKg,
    costoPorKg,
    precioSugeridoKg,
    gananciaEstimada,
    margenPorcentaje: margen * 100,
  };
}

// Cálculo con rango de precios — usado en la calculadora general
export function calcularRango(
  costoTotal: number,
  unidades: number,
  margenElegido: number,      // porcentaje que elige el productor, ej. 50
  tamanoUnidadG: number = 0   // gramos/ml por unidad (0 = ignorar)
): RangoPrecios {
  const costoPorUnidad = unidades > 0 ? costoTotal / unidades : 0;
  const precioMinimo      = costoPorUnidad * 1.20;  // mínimo 20%
  const precioRecomendado = costoPorUnidad * (1 + margenElegido / 100);
  const precioMaximo      = costoPorUnidad * 2.00;  // máximo 100%
  const gananciaNeta = (precioRecomendado - costoPorUnidad) * unidades;

  // unidadesPorLote = las mismas unidades que el productor indicó
  // tamanoUnidadG es solo informativo (ej: "cada frasco pesa 250g")
  const unidadesPorLote = unidades;

  return {
    costoTotal,
    costoPorUnidad,
    precioMinimo,
    precioRecomendado,
    precioMaximo,
    gananciaNeta,
    unidadesPorLote,
  };
}

export function formatMXN(valor: number): string {
  return `$${valor.toFixed(2)}`;
}
