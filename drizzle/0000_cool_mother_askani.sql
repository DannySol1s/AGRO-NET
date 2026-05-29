CREATE TABLE `insumos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`producto_id` text NOT NULL,
	`nombre` text NOT NULL,
	`cantidad` real NOT NULL,
	`unidad` text NOT NULL,
	`opcional` integer DEFAULT false,
	FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `materias_primas` (
	`id` text PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL,
	`emoji` text NOT NULL,
	`categoria` text NOT NULL,
	`descripcion` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `normas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`producto_id` text NOT NULL,
	`codigo` text NOT NULL,
	`descripcion` text,
	FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `parametros_calidad` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`producto_id` text NOT NULL,
	`parametro` text NOT NULL,
	`valor_esperado` text NOT NULL,
	`metodo_verificacion` text,
	FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pasos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`producto_id` text NOT NULL,
	`numero` integer NOT NULL,
	`titulo` text NOT NULL,
	`descripcion` text NOT NULL,
	`tiempo_minutos` integer,
	FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `productos` (
	`id` text PRIMARY KEY NOT NULL,
	`materia_prima_id` text NOT NULL,
	`numero` integer NOT NULL,
	`nombre` text NOT NULL,
	`nivel_dificultad` text NOT NULL,
	`rendimiento_kg` real,
	`rendimiento_l` real,
	`vida_util_desc` text NOT NULL,
	`vida_util_meses` integer,
	FOREIGN KEY (`materia_prima_id`) REFERENCES `materias_primas`(`id`) ON UPDATE no action ON DELETE no action
);
