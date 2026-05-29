import { db } from '@/db/client';
import { materiasPrimas, productos, insumos, pasos, parametrosCalidad, normas } from '@/db/schema';
import { MATERIAS_PRIMAS_SEED, PRODUCTOS_SEED } from './materias';
import { eq, sql } from 'drizzle-orm';

let seeded = false;

export async function seedDatabase() {
  if (seeded) return;
  seeded = true;

  const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(productos);
  if (Number(count) >= PRODUCTOS_SEED.length) return;

  for (const m of MATERIAS_PRIMAS_SEED) {
    await db.insert(materiasPrimas).values(m).onConflictDoNothing();
  }

  for (const p of PRODUCTOS_SEED) {
    await db.insert(productos).values({
      id:            p.id,
      materiaPrimaId: p.materiaPrimaId,
      numero:        p.numero,
      nombre:        p.nombre,
      nivelDificultad: p.nivelDificultad,
      rendimientoKg: p.rendimientoKg ?? null,
      rendimientoL:  p.rendimientoL ?? null,
      vidaUtilDesc:  p.vidaUtilDesc,
      vidaUtilMeses: p.vidaUtilMeses ?? null,
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
