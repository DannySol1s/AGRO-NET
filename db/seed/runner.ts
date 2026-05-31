import { db } from '@/db/client';
import { materiasPrimas, productos, insumos, pasos, parametrosCalidad, normas } from '@/db/schema';
import { MATERIAS_PRIMAS_SEED, PRODUCTOS_SEED } from './materias';
import { sql } from 'drizzle-orm';

export async function seedDatabase() {
  // Verifica ambas tablas para evitar dejar la BD en estado inconsistente
  // si un crash previo pobló productos pero no materias_primas
  const [{ pCount }] = await db.select({ pCount: sql<number>`count(*)` }).from(productos);
  const [{ mCount }] = await db.select({ mCount: sql<number>`count(*)` }).from(materiasPrimas);

  if (
    Number(pCount) >= PRODUCTOS_SEED.length &&
    Number(mCount) >= MATERIAS_PRIMAS_SEED.length
  ) return;

  for (const m of MATERIAS_PRIMAS_SEED) {
    await db.insert(materiasPrimas).values(m).onConflictDoNothing();
  }

  for (const p of PRODUCTOS_SEED) {
    await db.insert(productos).values({
      id:             p.id,
      materiaPrimaId: p.materiaPrimaId,
      numero:         p.numero,
      nombre:         p.nombre,
      nivelDificultad: p.nivelDificultad,
      rendimientoKg:  p.rendimientoKg ?? null,
      rendimientoL:   p.rendimientoL ?? null,
      vidaUtilDesc:   p.vidaUtilDesc,
      vidaUtilMeses:  p.vidaUtilMeses ?? null,
    }).onConflictDoNothing();

    for (const ins of p.insumos) {
      await db.insert(insumos).values({ productoId: p.id, ...ins }).onConflictDoNothing();
    }
    for (const paso of p.pasos) {
      await db.insert(pasos).values({ productoId: p.id, ...paso }).onConflictDoNothing();
    }
    for (const par of p.parametros) {
      await db.insert(parametrosCalidad).values({ productoId: p.id, ...par }).onConflictDoNothing();
    }
    for (const n of p.normas) {
      await db.insert(normas).values({ productoId: p.id, ...n }).onConflictDoNothing();
    }
  }
}
