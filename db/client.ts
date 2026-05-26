import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './schema';

const expo = openDatabaseSync('agronet.db', { enableChangeListener: true });
export const db = drizzle(expo, { schema });

export async function initDatabase() {
  await expo.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS materias_primas (
      id TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      emoji TEXT NOT NULL,
      categoria TEXT NOT NULL,
      descripcion TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS productos (
      id TEXT PRIMARY KEY,
      materia_prima_id TEXT NOT NULL REFERENCES materias_primas(id),
      numero INTEGER NOT NULL,
      nombre TEXT NOT NULL,
      nivel_dificultad TEXT NOT NULL,
      rendimiento_kg REAL,
      rendimiento_l REAL,
      vida_util_desc TEXT NOT NULL,
      vida_util_meses INTEGER
    );

    CREATE TABLE IF NOT EXISTS insumos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      producto_id TEXT NOT NULL REFERENCES productos(id),
      nombre TEXT NOT NULL,
      cantidad REAL NOT NULL,
      unidad TEXT NOT NULL,
      opcional INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS pasos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      producto_id TEXT NOT NULL REFERENCES productos(id),
      numero INTEGER NOT NULL,
      titulo TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      tiempo_minutos INTEGER
    );

    CREATE TABLE IF NOT EXISTS parametros_calidad (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      producto_id TEXT NOT NULL REFERENCES productos(id),
      parametro TEXT NOT NULL,
      valor_esperado TEXT NOT NULL,
      metodo_verificacion TEXT
    );

    CREATE TABLE IF NOT EXISTS normas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      producto_id TEXT NOT NULL REFERENCES productos(id),
      codigo TEXT NOT NULL,
      descripcion TEXT
    );
  `);
}
