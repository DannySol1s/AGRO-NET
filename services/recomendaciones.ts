import { db } from '@/db/client';
import { productos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import type { NivelExperiencia } from '@/store/usuario';

const ORDEN_DIFICULTAD: Record<NivelExperiencia, number> = {
  principiante: 0,
  medio: 1,
  avanzado: 2,
};

const NIVELES_VALIDOS = new Set<string>(['principiante', 'medio', 'avanzado']);

function esNivelValido(nivel: string): nivel is NivelExperiencia {
  return NIVELES_VALIDOS.has(nivel);
}

export async function getProductosPorMateria(
  materiaPrimaId: string,
  nivelMaximo: NivelExperiencia = 'avanzado'
) {
  const todos = await db
    .select()
    .from(productos)
    .where(eq(productos.materiaPrimaId, materiaPrimaId))
    .orderBy(productos.numero);

  return todos.filter((p) => {
    if (!esNivelValido(p.nivelDificultad)) return false;
    return ORDEN_DIFICULTAD[p.nivelDificultad] <= ORDEN_DIFICULTAD[nivelMaximo];
  });
}

export async function getProductoPorId(id: string) {
  const resultado = await db
    .select()
    .from(productos)
    .where(eq(productos.id, id))
    .limit(1);

  return resultado[0] ?? null;
}
