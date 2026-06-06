<div align="center">

# 🌱 AGRO-NET

### Transforma tu campo en negocio — sin internet

[![Expo](https://img.shields.io/badge/Expo_SDK_54-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native_0.81-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team)
[![NativeWind](https://img.shields.io/badge/NativeWind_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://nativewind.dev)
[![Zustand](https://img.shields.io/badge/Zustand-433E38?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs)

> *"Conecta, transforma y crece — donde otros no tienen señal."*

</div>

---

## ¿Qué es?

**AGRO-NET** es una aplicación móvil multiplataforma (Android/iOS) diseñada para productores rurales de Latinoamérica que carecen de acceso constante a internet. La app funciona como un asistente técnico de bolsillo: permite al productor seleccionar una materia prima disponible en su región y descubrir hasta 10 productos agroindustriales con valor comercial que puede elaborar a partir de ella, con guías detalladas paso a paso.

El catálogo cubre **100 productos** derivados de **10 materias primas tropicales** (Carambola, Yuca, Chaya, Zapote, Aguacate, Guaya, Caimito, Ramón, Piña y Cacahuate). Cada producto incluye formulación con insumos, proceso de elaboración cronometrado, parámetros de control de calidad (pH, °Brix, textura, color) y las normas oficiales mexicanas (NOM) y del Codex Alimentarius que aplican.

La motivación central del proyecto es la brecha entre el potencial productivo del campo latinoamericano y el acceso al conocimiento técnico agroindustrial. Un productor de carambola que antes solo vendía la fruta fresca puede, con AGRO-NET, elaborar mermeladas, jaleas, licores artesanales, vinagre, dulces y más — sin necesitar consultoría externa ni conexión a la red.

---

## Características Principales

| | Característica | Descripción |
|---|---|---|
| 📦 | **Catálogo offline** | 100 productos agroindustriales con datos completos, almacenados localmente en SQLite. Sin internet requerido. |
| 🔍 | **Búsqueda en tiempo real** | Busca materias primas y productos simultáneamente desde la pantalla de inicio con resultados instantáneos. |
| 📋 | **Guías paso a paso** | Cada producto cuenta con proceso cronometrado, lista de insumos con cantidades exactas y ajustador de escala de producción. |
| ✅ | **Control de calidad** | Parámetros técnicos por producto: pH, °Brix, humedad, textura y color, con método de verificación para campo. |
| 📜 | **Normas integradas** | NOM y estándares CODEX Alimentarius referenciados directamente en cada producto para cumplimiento regulatorio. |
| 💰 | **Calculadora de costos** | Calcula precio mínimo (punto de equilibrio), precio recomendado y precio máximo, con margen configurable y ganancia neta estimada. |
| 🔊 | **Asistente de voz** | Lectura en voz alta de guías mediante `expo-speech`, útil cuando las manos están ocupadas en producción. |
| 🗂️ | **Historial de cálculos** | Registra los cálculos de costos realizados para consulta y comparación posterior. |
| 👤 | **Perfil del productor** | Diagnóstico inicial con estado, municipio y datos del productor, persistidos localmente con Zustand + AsyncStorage. |
| 💬 | **FAQ contextual** | Preguntas frecuentes específicas por sección: formulación, proceso, calidad, normativa, costos y comercialización. |

---

## Catálogo de Materias Primas

| # | Materia Prima | Categoría | Descripción |
|---|---|---|---|
| 1 | ⭐ Carambola | Fruta tropical | Fruta en forma de estrella, rica en vitamina C. Genera jaleas, licores, vinagres y conservas. |
| 2 | 🟤 Yuca | Tubérculo | Base de harinas, chips, tapioca, almidón y fermentados. Alto potencial de transformación. |
| 3 | 🌿 Chaya | Hierba | Mayor contenido de hierro y calcio que la espinaca. Ideal para polvos, tortillas y extractos. |
| 4 | 🟠 Zapote | Fruta tropical | Pulpa dulce y cremosa rica en carotenoides, apta para cremas, ates y bebidas. |
| 5 | 🥑 Aguacate | Fruta grasa | Uno de los mayores potenciales comerciales. Aceites, cremas, guacamoles deshidratados y cosméticos. |
| 6 | 🍇 Guaya | Fruta tropical | Pulpa dulce y jugosa ideal para bebidas, jaleas y pulpas congeladas. |
| 7 | 🔵 Caimito | Fruta tropical | Pulpa cremosa y rica en calcio. Mermeladas, néctares y productos lácteos artesanales. |
| 8 | 🌰 Ramón | Semilla forestal | Fuente excepcional de proteína y calcio. Harinas, tortillas y sustitutos de café. |
| 9 | 🍍 Piña | Fruta tropical | Alto contenido de bromelina con valor funcional. Vinagre, cristalizado, jugo concentrado y mermeladas. |
| 10 | 🥜 Cacahuate | Legumbre | Rico en proteínas y grasas saludables. Cremas, botanas, aceites y harinas proteicas. |

---

## Arquitectura del Proyecto

### Stack Tecnológico

```
Framework móvil ─── Expo SDK 54 + React Native 0.81.5
Routing ─────────── Expo Router 6 (file-based, tipado)
Lenguaje ────────── TypeScript 5.8 (strict: true)
Base de datos ───── expo-sqlite + Drizzle ORM 0.45
Estado global ───── Zustand 5
Estilos ─────────── NativeWind 4 (TailwindCSS para RN)
Animaciones ─────── React Native Reanimated 4
Iconos ──────────── Lucide React Native
Tipografía ──────── Poppins (400, 500, 600) via @expo-google-fonts
Voz ─────────────── expo-speech
Persistencia extra ─ @react-native-async-storage/async-storage
```

### Estructura de Archivos

```
AGRO-NET/
├── app/                         # Capa UI — Expo Router (file-based routing)
│   ├── _layout.tsx              # Root layout, carga de fuentes y ErrorBoundary
│   ├── index.tsx                # Splash: initDatabase() + seedDatabase() → routing
│   ├── bienvenida.tsx           # Pantalla de bienvenida post-onboarding
│   ├── diagnostico.tsx          # Onboarding: estado, municipio y perfil inicial
│   └── (tabs)/                  # Tab navigator
│       ├── _layout.tsx          # Configuración de pestañas e íconos
│       ├── inicio.tsx           # Home: búsqueda global y grid de accesos
│       ├── productos.tsx        # Catálogo de todos los productos
│       ├── costos.tsx           # Calculadora general de precios
│       ├── calidad.tsx          # Guías de capacitación
│       ├── comunidad.tsx        # Comunidad (próximamente)
│       ├── perfil.tsx           # Perfil del productor
│       └── materias/            # Stack navigator para materias y productos
│           ├── index.tsx        # Grid de las 10 materias primas
│           ├── [materia].tsx    # Detalle de materia + sus 10 productos
│           └── producto/
│               ├── [id].tsx     # Detalle de producto (6 pestañas)
│               └── costos.tsx   # Calculadora específica del producto
│
├── components/
│   ├── ErrorBoundary.tsx        # Error Boundary global de la app
│   └── EstadoMunicipioSelect.tsx# Selector cascada Estado → Municipio
│
├── db/                          # Capa de datos
│   ├── schema.ts                # 6 tablas SQLite con FK y constraints
│   ├── client.ts                # Instancia Drizzle + expo-sqlite
│   ├── migrations.ts            # Migraciones generadas por drizzle-kit
│   └── seed/
│       ├── materias.ts          # 100 productos con insumos, pasos y normas
│       └── runner.ts            # Ejecuta el seed solo en primera instalación
│
├── services/                    # Capa de lógica de negocio
│   ├── calculadora.ts           # calcularCostos() y calcularRango()
│   ├── recomendaciones.ts       # Lógica de sugerencias por materia
│   ├── seleccion.ts             # Filtrado y ordenación del catálogo
│   └── usuario.ts               # Lectura/escritura del perfil
│
└── store/
    └── usuario.ts               # Zustand store: nombre, estado, municipio, onboarding
```

---

## Arquitectura Técnica — Flujo de Inicialización

```
┌─────────────────────────────────────────────────────────────┐
│                      app/index.tsx                          │
│                       (Splash Screen)                       │
└───────────────────────────┬─────────────────────────────────┘
                            │ useEffect on mount
                            ▼
              ┌─────────────────────────┐
              │     initDatabase()      │
              │  Aplica migraciones     │
              │  (Drizzle + SQLite)     │
              └────────────┬────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │     seedDatabase()      │
              │  ¿Primera ejecución?    │
              └────────┬────────┬───────┘
                    Sí │        │ No
                       ▼        ▼
           ┌───────────────┐  ┌───────────────┐
           │ Inserta 10    │  │ Datos ya       │
           │ materias +    │  │ existentes     │
           │ 100 productos │  │ en SQLite      │
           └───────┬───────┘  └───────┬────────┘
                   └──────────┬────────┘
                              ▼
              ┌─────────────────────────┐
              │  useUsuarioStore()      │
              │  ¿onboardingCompleto?   │
              └────────┬────────┬───────┘
                    No │        │ Sí
                       ▼        ▼
           ┌──────────────┐  ┌──────────────┐
           │ /bienvenida  │  │ /(tabs)/     │
           │ → diagnost.  │  │ inicio       │
           └──────────────┘  └──────────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    ▼               ▼                ▼
             [materias]        [costos]         [perfil]
            Drizzle SELECT    calcularRango()  Zustand store
            → SQLite local    → service layer  → AsyncStorage
```

---

## Cómo Ejecutar

### Prerrequisitos

- Node.js 20+
- npm 10+
- Expo Go app en tu dispositivo, o Android Studio / Xcode para emuladores

### Instalación

```bash
git clone https://github.com/DannySol1s/AGRO-NET.git
cd AGRO-NET
npm install
npx expo start
```

### Otros comandos

| Comando | Descripción |
|---|---|
| `npm run android` | Abre directamente en emulador Android |
| `npm run ios` | Abre directamente en simulador iOS |
| `npm run web` | Ejecuta versión web (Metro bundler) |
| `npx drizzle-kit generate` | Genera migraciones desde el schema |
| `npx drizzle-kit studio` | Inspecciona la base de datos en el navegador |

---

## Diseño Responsivo

| Rango | Dispositivo objetivo | Comportamiento |
|---|---|---|
| < 360 dp | Teléfonos compactos (Android) | Layout de una columna, tipografía reducida al mínimo |
| 360–414 dp | Teléfonos estándar (iPhone SE → Galaxy S) | Layout principal, grid 2×2 en Home |
| 414–768 dp | Teléfonos grandes / phablets | Grid con mayor padding, tarjetas más anchas |
| > 768 dp | Tablets (iPad, Android tablet) | Soporte habilitado en `app.json` (`supportsTablet: true`) |

El diseño usa `SafeAreaView` con detección de insets para compatibilidad con notch, dynamic island y gestos del sistema Android.

---

## Sistema de Diseño

```js
// Paleta de colores — tailwind.config.js
colors: {
  verde: {
    800: '#1F3D36',  // Verde bosque — header, íconos, fondos oscuros
    400: '#5c8858',  // Verde medio — estados interactivos
  },
  tierra: {
    400: '#C1BAAE',  // Tierra claro — tarjetas, inputs, fondos de sección
  },
  cosecha: {
    500: '#9E5A38',  // Terracota — CTAs, badges, acentos cálidos
  },
  fondo:   '#D0CAC0', // Fondo general de pantallas
  carbon:  '#1A1A1A', // Texto principal
}

// Tipografía
Poppins_400Regular  // Texto de cuerpo, labels secundarios
Poppins_500Medium   // Labels intermedios, nombres de producto
Poppins_600SemiBold // Títulos, encabezados, valores numéricos
```

Los tokens de color garantizan contraste WCAG AA entre combinaciones críticas: texto `carbon` sobre `tierra.400`, texto `#F4F1EA` sobre `verde.800`.

---

## Valor Formativo

> *"El mayor reto no fue escribir el código — fue diseñar una experiencia que funcione sin conexión para alguien que jamás ha usado una app de productividad."*

Conceptos técnicos aplicados y aprendizajes concretos del proyecto:

- **SQLite embebido en mobile** — uso de `expo-sqlite` con Drizzle ORM para queries tipadas, migraciones declarativas y relaciones con foreign keys y constraints (`CHECK`, `INDEX`)
- **Offline-first real** — arquitectura cliente puro sin ninguna dependencia de red en Fases 1-2, con seed automatizado al primer arranque
- **Expo Router 6 y rutas tipadas** — navegación file-based con rutas dinámicas (`[materia].tsx`, `[id].tsx`), grupos `(tabs)`, stacks anidados y `typedRoutes: true`
- **Zustand 5 para estado global** — stores de usuario con persistencia en AsyncStorage, separación clara entre estado efímero (UI) y estado durable (perfil)
- **NativeWind 4 sobre StyleSheet** — uso de TailwindCSS en React Native, trade-offs con inline styles para casos dinámicos y de performance
- **React Native Reanimated 4** — animaciones de alta frecuencia con worklets en el hilo UI, independientes del JS thread
- **expo-speech y detección de plataforma** — TTS con manejo de diferencias de comportamiento entre Android e iOS en selección de voz, velocidad y pausas
- **Error Boundaries en React Native** — infraestructura de aislamiento de fallos a nivel de árbol de componentes
- **Seed de datos declarativo a escala** — gestión de un dataset de 100 productos con relaciones, validaciones y tipado estricto

---

## Autor

**Ángel Solís**

[![GitHub](https://img.shields.io/badge/DannySol1s-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DannySol1s)

---

<div align="center">

© 2026 Ángel Solís · AGRO-NET

*Del surco al mercado, un proceso a la vez.*

</div>
