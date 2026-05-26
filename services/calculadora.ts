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

const MARGEN_DEFAULT = 0.4;

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

export function formatMXN(valor: number): string {
  return `$${valor.toFixed(2)}`;
}
