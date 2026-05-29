// Generado con: npx drizzle-kit generate
// Actualizar este archivo cada vez que cambie db/schema.ts ejecutando
// npx drizzle-kit generate y copiando el nuevo SQL aquí.

export const migrations = {
  journal: {
    entries: [
      {
        idx: 0,
        when: 1779849525486,
        tag: '0000_cool_mother_askani',
        breakpoints: true,
      },
    ],
  },
  migrations: {
    m0000: `CREATE TABLE \`insumos\` (
\t\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
\t\`producto_id\` text NOT NULL,
\t\`nombre\` text NOT NULL,
\t\`cantidad\` real NOT NULL,
\t\`unidad\` text NOT NULL,
\t\`opcional\` integer DEFAULT false,
\tFOREIGN KEY (\`producto_id\`) REFERENCES \`productos\`(\`id\`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE \`materias_primas\` (
\t\`id\` text PRIMARY KEY NOT NULL,
\t\`nombre\` text NOT NULL,
\t\`emoji\` text NOT NULL,
\t\`categoria\` text NOT NULL,
\t\`descripcion\` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE \`normas\` (
\t\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
\t\`producto_id\` text NOT NULL,
\t\`codigo\` text NOT NULL,
\t\`descripcion\` text,
\tFOREIGN KEY (\`producto_id\`) REFERENCES \`productos\`(\`id\`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE \`parametros_calidad\` (
\t\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
\t\`producto_id\` text NOT NULL,
\t\`parametro\` text NOT NULL,
\t\`valor_esperado\` text NOT NULL,
\t\`metodo_verificacion\` text,
\tFOREIGN KEY (\`producto_id\`) REFERENCES \`productos\`(\`id\`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE \`pasos\` (
\t\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
\t\`producto_id\` text NOT NULL,
\t\`numero\` integer NOT NULL,
\t\`titulo\` text NOT NULL,
\t\`descripcion\` text NOT NULL,
\t\`tiempo_minutos\` integer,
\tFOREIGN KEY (\`producto_id\`) REFERENCES \`productos\`(\`id\`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE \`productos\` (
\t\`id\` text PRIMARY KEY NOT NULL,
\t\`materia_prima_id\` text NOT NULL,
\t\`numero\` integer NOT NULL,
\t\`nombre\` text NOT NULL,
\t\`nivel_dificultad\` text NOT NULL,
\t\`rendimiento_kg\` real,
\t\`rendimiento_l\` real,
\t\`vida_util_desc\` text NOT NULL,
\t\`vida_util_meses\` integer,
\tFOREIGN KEY (\`materia_prima_id\`) REFERENCES \`materias_primas\`(\`id\`) ON UPDATE no action ON DELETE no action
);`,
  },
};
