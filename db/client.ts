import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import * as schema from './schema';
import { migrations } from './migrations';

const expo = openDatabaseSync('agronet.db', { enableChangeListener: true });
export const db = drizzle(expo, { schema });

export async function initDatabase() {
  // foreign_keys es una configuración de sesión; debe activarse en cada apertura.
  await expo.execAsync('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
  await migrate(db, migrations);
}
