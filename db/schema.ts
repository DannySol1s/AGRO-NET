import { sqliteTable, text, integer, real, index, check } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const materiasPrimas = sqliteTable('materias_primas', {
  id:          text('id').primaryKey(),
  nombre:      text('nombre').notNull(),
  emoji:       text('emoji').notNull(),
  categoria:   text('categoria').notNull(),
  descripcion: text('descripcion').notNull(),
});

export const productos = sqliteTable('productos', {
  id:              text('id').primaryKey(),
  materiaPrimaId:  text('materia_prima_id').notNull().references(() => materiasPrimas.id, { onDelete: 'cascade' }),
  numero:          integer('numero').notNull(),
  nombre:          text('nombre').notNull(),
  nivelDificultad: text('nivel_dificultad').notNull(),
  rendimientoKg:   real('rendimiento_kg'),
  rendimientoL:    real('rendimiento_l'),
  vidaUtilDesc:    text('vida_util_desc').notNull(),
  vidaUtilMeses:   integer('vida_util_meses'),
}, (t) => ({
  materiaIdx:       index('productos_materia_idx').on(t.materiaPrimaId),
  nivelCheck:       check('nivel_dificultad_check', sql`${t.nivelDificultad} IN ('principiante','medio','avanzado')`),
}));

export const insumos = sqliteTable('insumos', {
  id:         integer('id').primaryKey({ autoIncrement: true }),
  productoId: text('producto_id').notNull().references(() => productos.id, { onDelete: 'cascade' }),
  nombre:     text('nombre').notNull(),
  cantidad:   real('cantidad').notNull(),
  unidad:     text('unidad').notNull(),
  opcional:   integer('opcional', { mode: 'boolean' }).default(false),
}, (t) => ({
  productoIdx: index('insumos_producto_idx').on(t.productoId),
}));

export const pasos = sqliteTable('pasos', {
  id:            integer('id').primaryKey({ autoIncrement: true }),
  productoId:    text('producto_id').notNull().references(() => productos.id, { onDelete: 'cascade' }),
  numero:        integer('numero').notNull(),
  titulo:        text('titulo').notNull(),
  descripcion:   text('descripcion').notNull(),
  tiempoMinutos: integer('tiempo_minutos'),
}, (t) => ({
  productoIdx: index('pasos_producto_idx').on(t.productoId),
}));

export const parametrosCalidad = sqliteTable('parametros_calidad', {
  id:                  integer('id').primaryKey({ autoIncrement: true }),
  productoId:          text('producto_id').notNull().references(() => productos.id, { onDelete: 'cascade' }),
  parametro:           text('parametro').notNull(),
  valorEsperado:       text('valor_esperado').notNull(),
  metodoVerificacion:  text('metodo_verificacion'),
}, (t) => ({
  productoIdx: index('parametros_calidad_producto_idx').on(t.productoId),
}));

export const normas = sqliteTable('normas', {
  id:          integer('id').primaryKey({ autoIncrement: true }),
  productoId:  text('producto_id').notNull().references(() => productos.id, { onDelete: 'cascade' }),
  codigo:      text('codigo').notNull(),
  descripcion: text('descripcion'),
}, (t) => ({
  productoIdx: index('normas_producto_idx').on(t.productoId),
}));

// Historial de cálculos de costos del productor
export const calculos = sqliteTable('calculos', {
  id:               integer('id').primaryKey({ autoIncrement: true }),
  fecha:            text('fecha').notNull(),           // ISO timestamp
  productoNombre:   text('producto_nombre').notNull(), // nombre libre
  costoTotal:       real('costo_total').notNull(),
  unidades:         real('unidades').notNull(),
  margenPct:        real('margen_pct').notNull(),
  precioMinimo:     real('precio_minimo').notNull(),
  precioRecomendado: real('precio_recomendado').notNull(),
  precioMaximo:     real('precio_maximo').notNull(),
  tamanoUnidadG:    real('tamano_unidad_g'),           // null = no se usó
});
