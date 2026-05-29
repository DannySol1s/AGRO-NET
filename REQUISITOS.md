# AGRO-NET — Formulario de Definición de Requisitos

> Completa este formulario para que el desarrollo quede 100% definido sin ambigüedades.
> Opciones marcadas con `[ ]` son de selección múltiple. Espacios en blanco `___` son respuesta abierta.

---

## SECCIÓN 1 — Proyecto y Contexto

**1.1 ¿Cuál es el nombre definitivo de la app?**
- [ ] AGRO-NET (actual)
- [ ] Otro: `_______________`

**1.2 ¿Cuál es el eslogan / tagline oficial?**
- [ ] CREA, CONSERVA Y EMPRENDE (actual)
- [ ] CONECTA, TRANSFORMA Y CRECE (diseño nuevo)
- [ ] Otro: `_______________`

**1.3 ¿Cuál es el objetivo principal de la app en una oración?**
`_______________________________________________________________`

**1.4 ¿Quién o quiénes son los dueños/responsables del proyecto?**
`_______________________________________________________________`

**1.5 ¿Existe un cliente final (institución, gobierno, empresa) que financie o reciba el producto?**
- [ ] No, es un proyecto personal/propio
- [ ] Sí, institución de gobierno: `_______________`
- [ ] Sí, empresa privada: `_______________`
- [ ] Sí, ONG / organización: `_______________`

---

## SECCIÓN 2 — Usuarios Objetivo

**2.1 ¿A quiénes va dirigida la app? (selecciona todos los que apliquen)**
- [ ] Productores rurales que nunca han procesado alimentos
- [ ] Productores con experiencia básica en procesamiento
- [ ] Técnicos agrícolas / extensionistas
- [ ] Emprendedores de alimentos artesanales
- [ ] Estudiantes de agronomía o afines
- [ ] Otro: `_______________`

**2.2 ¿Cuál es el rango de edad promedio del usuario?**
- [ ] 15 – 25 años
- [ ] 26 – 40 años
- [ ] 41 – 60 años
- [ ] 60+ años
- [ ] Mixto (todas las edades)

**2.3 ¿Cuál es el nivel de alfabetización digital esperado del usuario?**
- [ ] Bajo (usa WhatsApp, pocas apps más)
- [ ] Medio (usa varias apps, redes sociales)
- [ ] Alto (familiarizado con tecnología)

**2.4 ¿En qué región o estado(s) de México se usará principalmente?**
`_______________________________________________________________`

**2.5 ¿Los usuarios tendrán acceso a internet regularmente?**
- [ ] Casi nunca (zonas rurales sin señal)
- [ ] A veces (señal intermitente)
- [ ] Sí, tienen acceso habitual

**2.6 ¿Qué tipo de dispositivos usarán principalmente?**
- [ ] Android económico (menos de $3,000 MXN)
- [ ] Android gama media ($3,000–$7,000 MXN)
- [ ] iPhone
- [ ] Tablet
- [ ] No lo sé con certeza

**2.7 ¿La app necesita soportar múltiples idiomas?**
- [ ] Solo español
- [ ] Español + idiomas indígenas (especificar): `_______________`
- [ ] Otro: `_______________`

---

## SECCIÓN 3 — Funcionalidades

**3.1 ¿Cuáles de estas funciones son OBLIGATORIAS para el MVP?** *(selecciona todas)*
- [ ] Catálogo de materias primas con información nutricional
- [ ] Recetas / procesos de elaboración paso a paso
- [ ] Calculadora de costos y precios
- [ ] Perfil del productor (herramientas, nivel, kg disponibles)
- [ ] Lector de voz TTS (accesibilidad)
- [ ] Ajustador de escala (ScaleAdjuster)
- [ ] Guías de calidad e inocuidad
- [ ] Normas NOM/CODEX por producto
- [ ] Asistente de voz con IA
- [ ] Red de productores / comunidad
- [ ] Modo noche
- [ ] Capacitación con videos
- [ ] Notificaciones

**3.2 ¿Cuál es el número de productos que debe tener la app al lanzarse?**
- [ ] Solo los 100 actuales (10 por materia prima)
- [ ] Más de 100, ¿cuántos? `_______________`
- [ ] El número no importa, prioridad es calidad

**3.3 ¿Habrá imágenes/fotos reales de los productos?**
- [ ] No, solo emojis e íconos (actual)
- [ ] Sí, fotos reales de cada producto terminado
- [ ] Sí, fotos del proceso de elaboración
- [ ] No lo sé todavía

**3.4 ¿El usuario puede guardar productos favoritos o listas personalizadas?**
- [ ] No es necesario
- [ ] Sí, favoritos simples
- [ ] Sí, listas personalizadas con notas

**3.5 ¿El usuario puede registrar su propio historial de producción?**
- [ ] No
- [ ] Sí, registrar lotes producidos
- [ ] Sí, con seguimiento de costos reales vs estimados

**3.6 ¿La calculadora de costos debe poder guardar cálculos anteriores?**
- [ ] No, solo uso en el momento
- [ ] Sí, historial de cálculos
- [ ] Sí, con posibilidad de exportar (PDF, Excel)

**3.7 ¿El módulo de Capacitación qué debe contener?**
- [ ] Solo texto y guías escritas (ya existe como "Calidad")
- [ ] Videos embebidos (YouTube u otro)
- [ ] PDFs descargables
- [ ] Quizzes / evaluaciones
- [ ] No es prioritario por ahora

**3.8 ¿El asistente de voz debe responder preguntas con IA real?**
- [ ] No, solo leer el contenido en voz alta (TTS actual)
- [ ] Sí, responder preguntas en lenguaje natural con IA
- [ ] Sí, pero solo preguntas predefinidas (FAQ offline)
- [ ] Es para fases futuras

**3.9 ¿La Red de Productores / Comunidad debe permitir?** *(selecciona todos)*
- [ ] Ver publicaciones de otros productores
- [ ] Publicar fotos de sus productos
- [ ] Comentar y dar "me gusta"
- [ ] Chat directo entre productores
- [ ] Publicar y consultar precios de mercado locales
- [ ] Reportar contenido inapropiado
- [ ] Moderación por administrador

**3.10 ¿Se necesita sistema de notificaciones push?**
- [ ] No
- [ ] Sí, para novedades de la app
- [ ] Sí, para recordatorios del productor
- [ ] Sí, para actividad en la comunidad

---

## SECCIÓN 4 — Datos y Contenido

**4.1 ¿Quién será responsable de actualizar el contenido (recetas, normas, etc.)?**
- [ ] El equipo de desarrollo (con código)
- [ ] Un administrador con panel web
- [ ] Expertos externos (nutriólogos, técnicos)
- [ ] No se actualizará después del lanzamiento

**4.2 ¿Con qué frecuencia se actualizará el contenido?**
- [ ] Solo al lanzar una versión nueva de la app
- [ ] Mensualmente
- [ ] Cuando sea necesario sin calendario fijo
- [ ] En tiempo real desde un servidor

**4.3 ¿Se agregarán nuevas materias primas al catálogo después del lanzamiento?**
- [ ] No, las 10 actuales son suficientes
- [ ] Sí, ¿cuántas más aproximadamente? `_______________`
- [ ] Sí, el catálogo debe ser abierto y creciente

**4.4 ¿Dónde vivirán los datos del usuario (perfil, favoritos, historial)?**
- [ ] Solo en el teléfono (sin cuenta, sin servidor)
- [ ] En la nube con cuenta de usuario (Supabase Fase 2)
- [ ] Ambas (local + sincronización opcional)

**4.5 ¿Se necesita que el usuario cree una cuenta?**
- [ ] No, la app funciona sin cuenta
- [ ] Opcional (funciones básicas sin cuenta, avanzadas con cuenta)
- [ ] Sí, requerido desde el inicio

**4.6 ¿Con qué puede registrarse el usuario si hay cuentas?** *(selecciona todos)*
- [ ] Correo electrónico + contraseña
- [ ] Google
- [ ] Facebook
- [ ] Número de teléfono (SMS)
- [ ] No aplica (sin cuentas)

---

## SECCIÓN 5 — Diseño y Experiencia de Usuario

**5.1 ¿El diseño presentado en el mockup es el definitivo?**
- [ ] Sí, implementar tal cual
- [ ] Es una referencia, puede haber cambios menores
- [ ] Es solo una idea, hay libertad de diseño

**5.2 ¿El Modo Noche es obligatorio?**
- [ ] No, no es prioritario
- [ ] Sí, debe estar en el MVP
- [ ] Sí, pero puede ir en una versión posterior

**5.3 ¿Hay guía de marca (logo, colores) aprobada oficialmente?**
- [ ] Sí, el diseño del mockup es la guía oficial
- [ ] No todavía, está en proceso
- [ ] Sí, existe un archivo de branding: `_______________`

**5.4 ¿Qué tan importante es la accesibilidad para usuarios mayores o con baja visión?**
- [ ] Muy importante, es parte del público objetivo
- [ ] Deseable pero no crítico
- [ ] No es una prioridad actual

**5.5 ¿Debe haber un onboarding (tutorial) al usar la app por primera vez?**
- [ ] El diagnóstico actual (herramientas + nivel) es suficiente
- [ ] Sí, tutorial interactivo que muestre cómo usar la app
- [ ] Sí, video de bienvenida

**5.6 ¿Las pantallas deben tener animaciones / transiciones?**
- [ ] No, prioridad en fluidez y rendimiento
- [ ] Sí, animaciones sutiles
- [ ] Sí, animaciones elaboradas

---

## SECCIÓN 6 — Requisitos Técnicos

**6.1 ¿En qué plataformas debe funcionar la app?**
- [ ] Solo Android
- [ ] Solo iOS
- [ ] Ambas (Android + iOS)
- [ ] También web (navegador)

**6.2 ¿Cuál es la versión mínima de Android a soportar?**
- [ ] Android 8 (2017+)
- [ ] Android 10 (2019+)
- [ ] Android 12+ (solo recientes)
- [ ] No lo sé, que soporte lo más posible

**6.3 ¿La app debe funcionar completamente sin internet?**
- [ ] Sí, 100% offline (modelo actual)
- [ ] Sí, pero con sincronización opcional cuando hay internet
- [ ] No, requiere internet para funcionar

**6.4 ¿Se necesita integración con algún servicio externo?** *(selecciona todos)*
- [ ] Ninguno por ahora
- [ ] Supabase (base de datos en la nube)
- [ ] Firebase (notificaciones)
- [ ] Mercado Libre / precios de mercado
- [ ] COFEPRIS / normas oficiales
- [ ] YouTube (videos de capacitación)
- [ ] WhatsApp (compartir recetas)
- [ ] Otro: `_______________`

**6.5 ¿Se necesita panel de administración web para gestionar contenido?**
- [ ] No, el contenido se actualiza con código
- [ ] Sí, panel simple para agregar/editar productos
- [ ] Sí, panel completo con usuarios, contenido y estadísticas

**6.6 ¿Se necesitan analíticas de uso (qué hace el usuario en la app)?**
- [ ] No
- [ ] Sí, básicas (pantallas visitadas, productos más vistos)
- [ ] Sí, detalladas (embudos, retención, eventos)

---

## SECCIÓN 7 — Fases y Alcance

**7.1 ¿Cuál es la fecha límite para tener la Fase 1 (MVP offline) lista?**
`_______________________________________________________________`

**7.2 ¿Cuándo debe comenzar la Fase 2 (nube / cuentas de usuario)?**
`_______________________________________________________________`

**7.3 ¿La Fase 3 (comunidad) tiene fecha estimada?**
`_______________________________________________________________`

**7.4 ¿Qué define "terminado" para cada fase? ¿Cuáles son los criterios de aceptación?**

Fase 1: `_____________________________________________________________`

Fase 2: `_____________________________________________________________`

Fase 3: `_____________________________________________________________`

**7.5 ¿Hay funciones que explícitamente NO deben hacerse en este proyecto?**
`_______________________________________________________________`

---

## SECCIÓN 8 — Distribución y Mantenimiento

**8.1 ¿Cómo se distribuirá la app?**
- [ ] Google Play Store (Android)
- [ ] Apple App Store (iOS)
- [ ] APK directo (descarga desde link)
- [ ] Expo Go (pruebas únicamente)
- [ ] Distribución por institución / empresa

**8.2 ¿La app será gratuita o de pago?**
- [ ] Gratuita y sin publicidad
- [ ] Gratuita con publicidad
- [ ] Freemium (básico gratis, premium de pago)
- [ ] De pago
- [ ] Gratuita porque la paga una institución

**8.3 ¿Quién dará soporte a los usuarios con problemas?**
`_______________________________________________________________`

**8.4 ¿Con qué frecuencia se planean actualizaciones después del lanzamiento?**
- [ ] Solo correcciones de errores críticos
- [ ] Mensualmente
- [ ] Cada 3 meses
- [ ] Sin calendario definido

---

## SECCIÓN 9 — Negocio

**9.1 ¿Existe un presupuesto definido para el proyecto?**
- [ ] No hay presupuesto (proyecto propio / sin costo)
- [ ] Presupuesto limitado, solo herramientas gratuitas
- [ ] Sí, hay presupuesto: `_______________`

**9.2 ¿Cuál es el modelo de negocio de la app?**
- [ ] Impacto social / no lucrativo
- [ ] Venta de la app o licencia a instituciones
- [ ] Suscripción de productores
- [ ] Patrocinio de empresas agroindustriales
- [ ] Comisión por ventas en comunidad
- [ ] Aún no está definido

**9.3 ¿Existen competidores directos conocidos?**
`_______________________________________________________________`

**9.4 ¿Qué diferencia a AGRO-NET de esos competidores?**
`_______________________________________________________________`

---

## SECCIÓN 10 — Preguntas Abiertas Finales

**10.1 ¿Hay alguna función que tienes en mente y que no se ha mencionado en ningún punto?**
`_______________________________________________________________`
`_______________________________________________________________`

**10.2 ¿Qué es lo que más te preocupa del proyecto actualmente?**
`_______________________________________________________________`
`_______________________________________________________________`

**10.3 ¿Qué pantalla o módulo consideras el más importante de toda la app?**
`_______________________________________________________________`

**10.4 ¿Tienes referencia de alguna app que te guste como experiencia de uso? ¿Cuál y por qué?**
`_______________________________________________________________`

**10.5 ¿Hay alguna restricción legal, de privacidad o de datos que debamos considerar?**
`_______________________________________________________________`

**10.6 ¿Algo más que quieras agregar que no hayamos cubierto?**
`_______________________________________________________________`
`_______________________________________________________________`

---

*Formulario generado para el proyecto AGRO-NET · Versión 1.0*
