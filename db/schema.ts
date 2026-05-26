import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const materiasPrimas = sqliteTable('materias_primas', {
  id: text('id').primaryKey(),
  nombre: text('nombre').notNull(),
  emoji: text('emoji').notNull(),
  categoria: text('categoria').notNull(),
  descripcion: text('descripcion').notNull(),
});

export const productos = sqliteTable('productos', {
  id: text('id').primaryKey(),
  materiaPrimaId: text('materia_prima_id').notNull().references(() => materiasPrimas.id),
  numero: integer('numero').notNull(),
  nombre: text('nombre').notNull(),
  nivelDificultad: text('nivel_dificultad').notNull(), // 'principiante' | 'medio' | 'avanzado'
  rendimientoKg: real('rendimiento_kg'),
  rendimientoL: real('rendimiento_l'),
  vidaUtilDesc: text('vida_util_desc').notNull(),
  vidaUtilMeses: integer('vida_util_meses'),
});

export const insumos = sqliteTable('insumos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productoId: text('producto_id').notNull().references(() => productos.id),
  nombre: text('nombre').notNull(),
  cantidad: real('cantidad').notNull(),
  unidad: text('unidad').notNull(),
  opcional: integer('opcional', { mode: 'boolean' }).default(false),
});

export const pasos = sqliteTable('pasos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productoId: text('producto_id').notNull().references(() => productos.id),
  numero: integer('numero').notNull(),
  titulo: text('titulo').notNull(),
  descripcion: text('descripcion').notNull(),
  tiempoMinutos: integer('tiempo_minutos'),
});

export const parametrosCalidad = sqliteTable('parametros_calidad', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productoId: text('producto_id').notNull().references(() => productos.id),
  parametro: text('parametro').notNull(),
  valorEsperado: text('valor_esperado').notNull(),
  metodoVerificacion: text('metodo_verificacion'),
});

export const normas = sqliteTable('normas', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productoId: text('producto_id').notNull().references(() => productos.id),
  codigo: text('codigo').notNull(),
  descripcion: text('descripcion'),
});
