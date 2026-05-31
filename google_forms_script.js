/**
 * AGRO-NET — Script para crear el formulario de requisitos automáticamente
 *
 * INSTRUCCIONES (5 pasos):
 * 1. Ve a https://script.google.com  (entra con tu cuenta de Google)
 * 2. Haz clic en "Nuevo proyecto"
 * 3. Borra todo el texto que aparece y pega TODO este código
 * 4. Haz clic en el botón "▶ Ejecutar" (o presiona Ctrl+R)
 * 5. Acepta los permisos que pida Google
 * 6. Cuando termine, haz clic en "Registros de ejecución" para ver el enlace del formulario
 */

function crearFormularioAgroNet() {
  // ── Crear el formulario ──────────────────────────────────────────────
  var form = FormApp.create("AGRO-NET — Formulario de Definición del Producto");

  form.setDescription(
    "Este formulario nos ayuda a construir exactamente lo que necesitas.\n" +
      "No hay respuestas incorrectas — si no sabes algo, dilo, eso también es útil.\n\n" +
      "⏱ Tiempo estimado: 20–25 minutos",
  );

  form.setConfirmationMessage(
    "✅ ¡Gracias! Tus respuestas fueron registradas.\n" +
      "El equipo de AGRO-NET las revisará y se pondrá en contacto contigo.",
  );

  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setShowLinkToRespondAgain(false);

  // ════════════════════════════════════════════════════════════════════
  // BLOQUE 1 — Las secciones de la app
  // ════════════════════════════════════════════════════════════════════

  form
    .addPageBreakItem()
    .setTitle("BLOQUE 1 — Las secciones de la app")
    .setHelpText(
      "La app está dividida en secciones (módulos). " +
        "Necesitamos saber cuáles son las más importantes para ti.",
    );

  // Pregunta 1 — Grid de importancia de módulos
  form
    .addGridItem()
    .setTitle(
      "1. ¿Cuáles de estas secciones deben estar en la app desde el primer día?",
    )
    .setHelpText("Marca el nivel de importancia de cada sección")
    .setRows([
      "Inicio / Panel principal — La primera pantalla con acceso a todo",
      "Materias Primas — Información sobre frutas, semillas, tubérculos",
      "Productos y Procesos — Recetas y pasos para elaborar cada producto",
      "Calculadora de Costos — Calcular cuánto cuesta producir y a qué precio vender",
      "Mi Perfil — Herramientas disponibles y nivel de experiencia",
      "Calidad e Inocuidad — Guías de higiene y buenas prácticas",
      "Comunidad — Conectar con otros productores",
    ])
    .setColumns([
      "Esencial (sin esto no sirve)",
      "Deseable (sería bueno)",
      "No necesaria por ahora",
    ])
    .setRequired(true);

  // Pregunta 2
  form
    .addParagraphTextItem()
    .setTitle(
      "2. ¿Hay alguna sección que no está en la lista anterior y que debería estar?",
    )
    .setHelpText("Si tienes ideas de algo nuevo, escríbelo aquí")
    .setRequired(false);

  // ════════════════════════════════════════════════════════════════════
  // BLOQUE 2 — Catálogo de productos
  // ════════════════════════════════════════════════════════════════════

  form
    .addPageBreakItem()
    .setTitle("BLOQUE 2 — Catálogo de productos y recetas")
    .setHelpText(
      "Esta sección muestra las recetas y procesos de elaboración. " +
        "Es el corazón de la app.",
    );

  // Pregunta 3
  form
    .addCheckboxItem()
    .setTitle("3. ¿Qué información debe mostrar la ficha de cada producto?")
    .setHelpText("Marca todo lo que debe aparecer")
    .setChoices([
      form
        .addCheckboxItem()
        .createChoice("Nombre del producto (ej. Mermelada de Carambola)"),
      form
        .addCheckboxItem()
        .createChoice("Materia prima que se usa (ej. Carambola)"),
      form
        .addCheckboxItem()
        .createChoice("Lista de ingredientes con cantidades exactas"),
      form
        .addCheckboxItem()
        .createChoice("Pasos del proceso con tiempo estimado por paso"),
      form
        .addCheckboxItem()
        .createChoice(
          "Rendimiento: cuánto producto sale (ej. 10 kg de mermelada)",
        ),
      form
        .addCheckboxItem()
        .createChoice("Vida útil: cuánto tiempo dura sin echarse a perder"),
      form
        .addCheckboxItem()
        .createChoice("Parámetros de calidad (textura, color, pH esperado)"),
      form
        .addCheckboxItem()
        .createChoice("Normas oficiales que aplican (NOM, CODEX)"),
      form
        .addCheckboxItem()
        .createChoice("Consejos de comercialización (cómo y dónde venderlo)"),
      form
        .addCheckboxItem()
        .createChoice("Nivel de dificultad (fácil, intermedio, avanzado)"),
      form.addCheckboxItem().createChoice("Fotos del producto terminado"),
      form.addCheckboxItem().createChoice("Fotos de cada paso del proceso"),
    ])
    .setRequired(true);

  // Pregunta 4
  form
    .addMultipleChoiceItem()
    .setTitle("4. ¿El usuario debe poder ajustar las cantidades de la receta?")
    .setHelpText(
      "Ejemplo: la receta base produce 10 kg, pero el productor tiene 30 kg de fruta. " +
        "¿La app calcula automáticamente todos los ingredientes para esa nueva cantidad?",
    )
    .setChoices([
      form.addMultipleChoiceItem().createChoice("Sí, esto es muy importante"),
      form
        .addMultipleChoiceItem()
        .createChoice("Sería útil pero no indispensable"),
      form.addMultipleChoiceItem().createChoice("No es necesario"),
    ])
    .setRequired(true);

  // Pregunta 5
  form
    .addCheckboxItem()
    .setTitle("5. ¿El usuario debe poder buscar y filtrar productos?")
    .setHelpText("Marca todas las formas de búsqueda que necesitas")
    .setChoices([
      form
        .addCheckboxItem()
        .createChoice('Buscar por nombre del producto (ej. "mermelada")'),
      form
        .addCheckboxItem()
        .createChoice('Buscar por la materia prima (ej. "yuca")'),
      form
        .addCheckboxItem()
        .createChoice("Filtrar por dificultad (fácil, intermedio, avanzado)"),
      form
        .addCheckboxItem()
        .createChoice("Filtrar por tipo (conservas, harinas, bebidas, etc.)"),
      form
        .addCheckboxItem()
        .createChoice(
          "No es necesario, con ver la lista completa es suficiente",
        ),
    ])
    .setRequired(true);

  // Pregunta 6
  form
    .addMultipleChoiceItem()
    .setTitle("6. ¿Cuántos productos en total debe tener la app?")
    .setHelpText("Hoy tiene 100 (10 por cada una de las 10 materias primas)")
    .setChoices([
      form
        .addMultipleChoiceItem()
        .createChoice("Con 100 es suficiente para empezar"),
      form
        .addMultipleChoiceItem()
        .createChoice(
          "Necesitamos más desde el inicio (indica cuántos en el siguiente campo)",
        ),
      form
        .addMultipleChoiceItem()
        .createChoice("Irán aumentando con el tiempo"),
    ])
    .setRequired(true);

  form
    .addTextItem()
    .setTitle(
      "6b. Si respondiste que necesitas más, ¿cuántos aproximadamente? ¿Cada cuánto se agregarán?",
    )
    .setRequired(false);

  // Pregunta 7
  form
    .addMultipleChoiceItem()
    .setTitle(
      "7. ¿Se van a agregar más materias primas al catálogo en el futuro?",
    )
    .setHelpText(
      "Hoy tiene: Carambola, Yuca, Chaya, Zapote, Aguacate, Guaya, Caimito, Ramón, Piña, Cacahuate",
    )
    .setChoices([
      form
        .addMultipleChoiceItem()
        .createChoice("No, con estas 10 es suficiente"),
      form
        .addMultipleChoiceItem()
        .createChoice(
          "Sí, unas pocas más (indica cuáles en el siguiente campo)",
        ),
      form
        .addMultipleChoiceItem()
        .createChoice("Sí, muchas más — el catálogo debe seguir creciendo"),
    ])
    .setRequired(true);

  form
    .addTextItem()
    .setTitle(
      "7b. Si se agregarán más, ¿cuáles serían las siguientes materias primas?",
    )
    .setRequired(false);

  // Pregunta 8
  form
    .addMultipleChoiceItem()
    .setTitle("8. ¿Los procesos varían según la región del país?")
    .setHelpText(
      "Ejemplo: ¿una mermelada se hace diferente en Yucatán que en Oaxaca? " +
        "¿O los ingredientes cambian según lo que hay en cada zona?",
    )
    .setChoices([
      form
        .addMultipleChoiceItem()
        .createChoice("No, los procesos son iguales para toda la república"),
      form
        .addMultipleChoiceItem()
        .createChoice("Sí, hay variaciones importantes por región"),
      form
        .addMultipleChoiceItem()
        .createChoice("En algunos productos sí, en otros no"),
    ])
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle("8b. Si hay variaciones regionales, ¿puedes darnos un ejemplo?")
    .setRequired(false);

  // ════════════════════════════════════════════════════════════════════
  // BLOQUE 3 — Calculadora de Costos
  // ════════════════════════════════════════════════════════════════════

  form
    .addPageBreakItem()
    .setTitle("BLOQUE 3 — Calculadora de Costos")
    .setHelpText(
      "Este módulo es uno de los más importantes. " +
        "Necesitamos entender exactamente qué debe calcular para que sea útil y confiable.",
    );

  // Pregunta 9
  form
    .addCheckboxItem()
    .setTitle("9. ¿Qué costos debe incluir la calculadora?")
    .setHelpText("Marca todo lo que el productor debería poder registrar")
    .setChoices([
      form
        .addCheckboxItem()
        .createChoice("Costo de los ingredientes y materia prima"),
      form.addCheckboxItem().createChoice("Costo del empaque y etiquetas"),
      form
        .addCheckboxItem()
        .createChoice(
          "Costo de la mano de obra (el tiempo del productor o sus ayudantes)",
        ),
      form.addCheckboxItem().createChoice("Costo del gas o leña para cocinar"),
      form.addCheckboxItem().createChoice("Costo del agua"),
      form.addCheckboxItem().createChoice("Costo del transporte para vender"),
      form
        .addCheckboxItem()
        .createChoice(
          "Pérdidas por merma (lo que se desperdicia en el proceso)",
        ),
      form
        .addCheckboxItem()
        .createChoice("Otros gastos fijos (renta del espacio, electricidad)"),
    ])
    .setRequired(true);

  // Pregunta 10
  form
    .addMultipleChoiceItem()
    .setTitle("10. ¿Cómo debe calcular el precio de venta sugerido?")
    .setHelpText("Elige la fórmula que más se acerque a lo que necesitas")
    .setChoices([
      form
        .addMultipleChoiceItem()
        .createChoice(
          "Opción A: Precio = Costo total + un % de ganancia fijo (ej. costo + 50%)",
        ),
      form
        .addMultipleChoiceItem()
        .createChoice(
          "Opción B: El productor define cuánto quiere ganar y la app calcula el precio",
        ),
      form
        .addMultipleChoiceItem()
        .createChoice(
          "Opción C: La app sugiere un rango (precio mínimo, recomendado y máximo)",
        ),
      form
        .addMultipleChoiceItem()
        .createChoice(
          "Opción D: El productor compara su costo con el precio del mercado local",
        ),
      form
        .addMultipleChoiceItem()
        .createChoice("No lo sé, que el equipo recomiende la mejor opción"),
    ])
    .setRequired(true);

  // Pregunta 11
  form
    .addMultipleChoiceItem()
    .setTitle("11. Si se usa un porcentaje de ganancia fijo, ¿cuál debe ser?")
    .setChoices([
      form.addMultipleChoiceItem().createChoice("30% sobre el costo total"),
      form.addMultipleChoiceItem().createChoice("50% sobre el costo total"),
      form
        .addMultipleChoiceItem()
        .createChoice("100% (precio = el doble del costo)"),
      form.addMultipleChoiceItem().createChoice("150% sobre el costo total"),
      form
        .addMultipleChoiceItem()
        .createChoice("El productor lo decide cada vez que usa la calculadora"),
      form
        .addMultipleChoiceItem()
        .createChoice("No aplica, se usa otra fórmula"),
    ])
    .setRequired(true);

  // Pregunta 12
  form
    .addMultipleChoiceItem()
    .setTitle("12. ¿El cálculo debe hacerse por lote o por unidad?")
    .setHelpText(
      "Por lote: cuánto cuesta hacer todos los 10 kg de mermelada. " +
        "Por unidad: cuánto cuesta cada frasco de 250 g.",
    )
    .setChoices([
      form.addMultipleChoiceItem().createChoice("Por lote completo"),
      form
        .addMultipleChoiceItem()
        .createChoice("Por unidad (cada frasco, bolsa o pieza)"),
      form.addMultipleChoiceItem().createChoice("Ambos — que muestre los dos"),
    ])
    .setRequired(true);

  // Pregunta 13
  form
    .addMultipleChoiceItem()
    .setTitle(
      "13. ¿Debe considerar el tamaño del empaque para calcular unidades?",
    )
    .setHelpText(
      "Ejemplo: produzco 10 kg de mermelada y la envaso en frascos de 250 g. " +
        "¿La app calcula que salen 40 frascos y cuánto cuesta cada uno?",
    )
    .setChoices([
      form.addMultipleChoiceItem().createChoice("Sí, esto es muy importante"),
      form
        .addMultipleChoiceItem()
        .createChoice("Sería útil pero no indispensable"),
      form.addMultipleChoiceItem().createChoice("No es necesario"),
    ])
    .setRequired(true);

  // Pregunta 14
  form
    .addMultipleChoiceItem()
    .setTitle("14. ¿La calculadora debe guardar los cálculos anteriores?")
    .setChoices([
      form
        .addMultipleChoiceItem()
        .createChoice("No, cada vez se hace de nuevo"),
      form
        .addMultipleChoiceItem()
        .createChoice("Sí, guardar historial de cálculos"),
      form
        .addMultipleChoiceItem()
        .createChoice("Sí, y poder exportarlos (correo, WhatsApp o PDF)"),
    ])
    .setRequired(true);

  // Pregunta 15
  form
    .addMultipleChoiceItem()
    .setTitle(
      "15. ¿La calculadora debe estar conectada con la receta de cada producto?",
    )
    .setHelpText(
      "Ejemplo: cuando el productor está viendo la receta de mermelada, " +
        "¿puede tocar un botón para abrir la calculadora con esos ingredientes ya cargados?",
    )
    .setChoices([
      form.addMultipleChoiceItem().createChoice("Sí, que estén conectadas"),
      form
        .addMultipleChoiceItem()
        .createChoice("No, que sean herramientas separadas"),
      form.addMultipleChoiceItem().createChoice("Ambas formas disponibles"),
    ])
    .setRequired(true);

  // Pregunta 16
  form
    .addMultipleChoiceItem()
    .setTitle(
      "16. ¿El productor puede registrar el precio real al que compró cada ingrediente?",
    )
    .setHelpText(
      "Ejemplo: ingresar que compró 1 kg de azúcar a $18.50 en su comunidad, " +
        "en lugar de usar un precio de referencia general.",
    )
    .setChoices([
      form
        .addMultipleChoiceItem()
        .createChoice("Sí, debe poder ingresar sus precios locales"),
      form
        .addMultipleChoiceItem()
        .createChoice("No, se usarán precios de referencia generales"),
      form
        .addMultipleChoiceItem()
        .createChoice("Ambos: referencia general + posibilidad de ajustar"),
    ])
    .setRequired(true);

  // ════════════════════════════════════════════════════════════════════
  // BLOQUE 4 — Perfil del Productor
  // ════════════════════════════════════════════════════════════════════

  form
    .addPageBreakItem()
    .setTitle("BLOQUE 4 — Perfil del Productor")
    .setHelpText(
      "Este módulo guarda la información del productor " +
        "para personalizar lo que ve y lo que la app le recomienda.",
    );

  // Pregunta 17
  form
    .addCheckboxItem()
    .setTitle("17. ¿Qué información del productor debe guardar la app?")
    .setHelpText("Marca todo lo que consideras importante")
    .setChoices([
      form
        .addCheckboxItem()
        .createChoice(
          "Las herramientas que tiene disponibles (olla, licuadora, báscula, etc.)",
        ),
      form
        .addCheckboxItem()
        .createChoice(
          "Su nivel de experiencia (principiante, intermedio, avanzado)",
        ),
      form
        .addCheckboxItem()
        .createChoice("Cuántos kilos de materia prima tiene disponibles"),
      form.addCheckboxItem().createChoice("Su nombre"),
      form.addCheckboxItem().createChoice("Su comunidad o municipio"),
      form
        .addCheckboxItem()
        .createChoice("Qué productos ya ha elaborado antes"),
      form
        .addCheckboxItem()
        .createChoice(
          "Sus metas de producción (cuánto quiere producir por semana o mes)",
        ),
    ])
    .setRequired(true);

  // Pregunta 18
  form
    .addMultipleChoiceItem()
    .setTitle("18. ¿El perfil debe cambiar lo que el productor ve en la app?")
    .setHelpText(
      "Ejemplo: si el productor no tiene licuadora, " +
        "¿la app debe ocultarle los productos que la requieren, o mostrar una advertencia?",
    )
    .setChoices([
      form
        .addMultipleChoiceItem()
        .createChoice("Sí, adaptar automáticamente lo que ve según su perfil"),
      form
        .addMultipleChoiceItem()
        .createChoice("Sí, pero solo mostrar una advertencia, no ocultar nada"),
      form
        .addMultipleChoiceItem()
        .createChoice("No, que muestre todo y el productor decida"),
    ])
    .setRequired(true);

  // Pregunta 19
  form
    .addMultipleChoiceItem()
    .setTitle(
      "19. La lista actual de herramientas incluye: olla grande, licuadora, cuchillos, tabla de cortar, báscula, termómetro, envases/frascos, refrigerador. ¿Qué opinas?",
    )
    .setChoices([
      form.addMultipleChoiceItem().createChoice("Está completa, así está bien"),
      form
        .addMultipleChoiceItem()
        .createChoice(
          "Faltan herramientas importantes (indícalas en el siguiente campo)",
        ),
      form
        .addMultipleChoiceItem()
        .createChoice("Sobran algunas que pocos productores tienen"),
    ])
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle("19b. ¿Qué herramientas agregarías o quitarías?")
    .setRequired(false);

  // ════════════════════════════════════════════════════════════════════
  // BLOQUE 5 — Calidad, Inocuidad y Capacitación
  // ════════════════════════════════════════════════════════════════════

  form
    .addPageBreakItem()
    .setTitle("BLOQUE 5 — Calidad, Inocuidad y Capacitación")
    .setHelpText(
      "Este bloque define qué aprende el productor dentro de la app, " +
        "más allá de las recetas.",
    );

  // Pregunta 20
  form
    .addCheckboxItem()
    .setTitle("20. ¿Qué debe incluir la sección de Calidad e Inocuidad?")
    .setHelpText("Marca todo lo que debería enseñar esta sección")
    .setChoices([
      form
        .addCheckboxItem()
        .createChoice(
          "Reglas de higiene personal (lavado de manos, ropa limpia, etc.)",
        ),
      form
        .addCheckboxItem()
        .createChoice(
          "Cómo limpiar y desinfectar el área de trabajo y utensilios",
        ),
      form
        .addCheckboxItem()
        .createChoice("Temperaturas de cocción y pasteurización"),
      form
        .addCheckboxItem()
        .createChoice(
          "Cómo verificar que el producto salió bien (pruebas caseras)",
        ),
      form
        .addCheckboxItem()
        .createChoice("Cómo almacenar correctamente el producto terminado"),
      form
        .addCheckboxItem()
        .createChoice("Cómo etiquetar correctamente un producto alimenticio"),
      form
        .addCheckboxItem()
        .createChoice("Guía de las normas NOM que aplican a cada alimento"),
      form
        .addCheckboxItem()
        .createChoice("Qué hacer si el producto sale mal o se contamina"),
    ])
    .setRequired(true);

  // ════════════════════════════════════════════════════════════════════
  // BLOQUE 6 — Comunidad
  // ════════════════════════════════════════════════════════════════════

  form
    .addPageBreakItem()
    .setTitle("BLOQUE 6 — Comunidad y Red de Productores")
    .setHelpText(
      "Este módulo permitiría a los productores conectarse entre sí. " +
        "Cuéntanos qué tan importante es y qué debe permitir hacer.",
    );

  // Pregunta 21
  form
    .addCheckboxItem()
    .setTitle("23. ¿Qué debe poder hacer un productor dentro de la comunidad?")
    .setHelpText("Marca todo lo que consideras importante")
    .setChoices([
      form
        .addCheckboxItem()
        .createChoice(
          "Ver publicaciones de otros productores (fotos, experiencias)",
        ),
      form
        .addCheckboxItem()
        .createChoice("Publicar sus propias fotos y comentarios"),
      form.addCheckboxItem().createChoice('Dar "me gusta" a publicaciones'),
      form
        .addCheckboxItem()
        .createChoice("Comentar en las publicaciones de otros"),
      form
        .addCheckboxItem()
        .createChoice("Enviar mensajes directos a otro productor"),
      form
        .addCheckboxItem()
        .createChoice("Publicar el precio al que está vendiendo sus productos"),
      form
        .addCheckboxItem()
        .createChoice("Consultar precios de otros productores en su región"),
      form
        .addCheckboxItem()
        .createChoice("Pedir o dar consejos sobre problemas en el proceso"),
    ])
    .setRequired(true);

  // Pregunta 24
  form
    .addMultipleChoiceItem()
    .setTitle(
      "24. ¿Quién revisaría que el contenido publicado en la comunidad sea apropiado?",
    )
    .setChoices([
      form
        .addMultipleChoiceItem()
        .createChoice("Nadie, se confía en los usuarios"),
      form
        .addMultipleChoiceItem()
        .createChoice("Un administrador del proyecto revisa antes de publicar"),
      form
        .addMultipleChoiceItem()
        .createChoice(
          "Los mismos usuarios pueden reportar contenido inapropiado",
        ),
      form.addMultipleChoiceItem().createChoice("Aún no lo hemos definido"),
    ])
    .setRequired(true);

  // Pregunta 25
  form
    .addMultipleChoiceItem()
    .setTitle("25. ¿La comunidad debe organizarse por región o estado?")
    .setHelpText(
      "Para que el productor de Veracruz vea principalmente publicaciones " +
        "de otros productores de Veracruz.",
    )
    .setChoices([
      form.addMultipleChoiceItem().createChoice("Sí, por estado o municipio"),
      form
        .addMultipleChoiceItem()
        .createChoice("No, todos ven todo sin importar dónde están"),
      form.addMultipleChoiceItem().createChoice("Ambas opciones disponibles"),
    ])
    .setRequired(true);

  // ════════════════════════════════════════════════════════════════════
  // BLOQUE 7 — Crecimiento y Escalabilidad
  // ════════════════════════════════════════════════════════════════════

  form
    .addPageBreakItem()
    .setTitle("BLOQUE 7 — Crecimiento de la app")
    .setHelpText(
      "Esta sección define cómo va a crecer la app con el tiempo: " +
        "más contenido, más usuarios, más funciones.",
    );

  // Pregunta 26
  form
    .addParagraphTextItem()
    .setTitle("26. En 1 año, ¿cómo imaginas la app comparada con hoy?")
    .setHelpText(
      "Descríbela con tus propias palabras: más usuarios, más recetas, nuevas funciones, etc.",
    )
    .setRequired(true);

  // Pregunta 27
  form
    .addMultipleChoiceItem()
    .setTitle(
      "27. ¿Quién va a añadir nuevo contenido a la app? (nuevas recetas, materias primas, etc.)",
    )
    .setChoices([
      form
        .addMultipleChoiceItem()
        .createChoice("El equipo de desarrollo (requiere programadores)"),
      form
        .addMultipleChoiceItem()
        .createChoice(
          "Un administrador con un panel web sencillo (sin programadores)",
        ),
      form
        .addMultipleChoiceItem()
        .createChoice("Un equipo de expertos: nutriólogos, técnicos agrícolas"),
      form
        .addMultipleChoiceItem()
        .createChoice("Los mismos productores pueden proponer recetas"),
      form.addMultipleChoiceItem().createChoice("Aún no está definido"),
    ])
    .setRequired(true);

  // Pregunta 28
  form
    .addMultipleChoiceItem()
    .setTitle(
      "28. ¿La app debe funcionar para cualquier tipo de productor o solo de alimentos?",
    )
    .setChoices([
      form
        .addMultipleChoiceItem()
        .createChoice(
          "Solo productores de alimentos agroindustriales (conservas, harinas, etc.)",
        ),
      form
        .addMultipleChoiceItem()
        .createChoice("También artesanías o productos no alimenticios"),
      form
        .addMultipleChoiceItem()
        .createChoice("También plantas medicinales o herbolaria"),
      form
        .addMultipleChoiceItem()
        .createChoice(
          "Podría usarse en otros países de América Latina en el futuro",
        ),
    ])
    .setRequired(true);

  // Pregunta 29
  form
    .addMultipleChoiceItem()
    .setTitle(
      "29. ¿La información de la app podría usarse para tramitar algún registro oficial?",
    )
    .setHelpText(
      "Ejemplo: ayudar al productor a documentar su proceso para tramitar " +
        "su registro ante COFEPRIS o conseguir alguna certificación.",
    )
    .setChoices([
      form
        .addMultipleChoiceItem()
        .createChoice("No, la app es solo informativa"),
      form
        .addMultipleChoiceItem()
        .createChoice(
          "Sí, sería muy valioso (indica qué trámite en el siguiente campo)",
        ),
      form
        .addMultipleChoiceItem()
        .createChoice("Es una idea interesante para el futuro"),
    ])
    .setRequired(true);

  form
    .addTextItem()
    .setTitle("29b. Si sí, ¿para qué trámite o certificación serviría?")
    .setRequired(false);

  // ════════════════════════════════════════════════════════════════════
  // BLOQUE 8 — Experiencia de uso
  // ════════════════════════════════════════════════════════════════════

  form
    .addPageBreakItem()
    .setTitle("BLOQUE 8 — Cómo se usa la app")
    .setHelpText(
      "Estas preguntas definen cómo fluye la app: " +
        "qué ve el usuario primero, cómo se mueve entre secciones.",
    );

  // Pregunta 30
  form
    .addMultipleChoiceItem()
    .setTitle("30. ¿Qué debe pasar cuando alguien abre la app por primera vez?")
    .setChoices([
      form
        .addMultipleChoiceItem()
        .createChoice(
          "La app pregunta sus herramientas y nivel de experiencia",
        ),
      form
        .addMultipleChoiceItem()
        .createChoice("Muestra directamente el catálogo de productos"),
      form
        .addMultipleChoiceItem()
        .createChoice("Muestra una pantalla de bienvenida con explicación"),
      form.addMultipleChoiceItem().createChoice("Pide que cree una cuenta"),
    ])
    .setRequired(true);

  // Pregunta 31
  form
    .addMultipleChoiceItem()
    .setTitle(
      "31. ¿La app debe recomendar productos según el perfil del productor?",
    )
    .setHelpText(
      "Ejemplo: si el productor es principiante y tiene báscula y olla, " +
        "la app sugiere automáticamente los 3 mejores productos para comenzar.",
    )
    .setChoices([
      form
        .addMultipleChoiceItem()
        .createChoice(
          "Sí, las recomendaciones automáticas son muy importantes",
        ),
      form
        .addMultipleChoiceItem()
        .createChoice("Sería un plus, pero no es prioritario ahora"),
      form
        .addMultipleChoiceItem()
        .createChoice("No, el productor elige libremente sin recomendaciones"),
    ])
    .setRequired(true);

  // Pregunta 32
  form
    .addCheckboxItem()
    .setTitle(
      "32. Cuando el productor termina de ver un proceso, ¿qué debe poder hacer?",
    )
    .setChoices([
      form
        .addCheckboxItem()
        .createChoice("Ir a calcular sus costos directamente"),
      form.addCheckboxItem().createChoice("Guardar el proceso como favorito"),
      form.addCheckboxItem().createChoice("Compartirlo por WhatsApp"),
      form
        .addCheckboxItem()
        .createChoice("Calificar el proceso (útil / no útil)"),
      form
        .addCheckboxItem()
        .createChoice("Nada en especial, con verlo es suficiente"),
    ])
    .setRequired(true);

  // Pregunta 33
  form
    .addMultipleChoiceItem()
    .setTitle("33. ¿La app debe funcionar sin internet (modo avión)?")
    .setHelpText(
      "Ejemplo: el productor está en el campo sin señal y quiere ver una receta. " +
        "¿Debe funcionar igual?",
    )
    .setChoices([
      form
        .addMultipleChoiceItem()
        .createChoice("Sí, debe funcionar 100% sin internet"),
      form
        .addMultipleChoiceItem()
        .createChoice(
          "Sí, pero la comunidad y contenido nuevo necesitan internet",
        ),
      form
        .addMultipleChoiceItem()
        .createChoice("No importa, los usuarios siempre tienen internet"),
    ])
    .setRequired(true);

  // ════════════════════════════════════════════════════════════════════
  // BLOQUE 9 — Lo más importante
  // ════════════════════════════════════════════════════════════════════

  form
    .addPageBreakItem()
    .setTitle("BLOQUE 9 — Las preguntas más importantes")
    .setHelpText(
      "Estas respuestas nos ayudan a entender el propósito real del proyecto " +
        "y a priorizar correctamente el desarrollo.",
    );

  // Pregunta 34
  form
    .addParagraphTextItem()
    .setTitle(
      "34. ¿Cuál es el problema número uno que esta app resuelve para el productor?",
    )
    .setHelpText(
      'Sé específico. Ejemplo: "Los productores no saben a qué precio vender y pierden dinero"',
    )
    .setRequired(true);

  // Pregunta 35
  form
    .addParagraphTextItem()
    .setTitle(
      "35. ¿Qué pasaría si esta app no existiera? ¿Cómo resuelven hoy ese problema los productores?",
    )
    .setRequired(true);

  // Pregunta 36
  form
    .addParagraphTextItem()
    .setTitle(
      "36. ¿Cómo sabremos que la app está siendo útil? ¿Qué indicaría éxito?",
    )
    .setHelpText(
      'Ejemplos: "500 productores activos al mes", "el productor vende 30% más", ' +
        '"reduce pérdidas de cosecha", "más productores tramitan su registro"',
    )
    .setRequired(true);

  // Pregunta 37
  form
    .addCheckboxItem()
    .setTitle("37. ¿Cuáles son las 3 funciones más importantes de toda la app?")
    .setHelpText(
      "Las que si no están, la app no cumple su propósito. Elige máximo 3.",
    )
    .setChoices([
      form
        .addCheckboxItem()
        .createChoice("Consultar recetas y procesos paso a paso"),
      form.addCheckboxItem().createChoice("Calcular costos y precio de venta"),
      form.addCheckboxItem().createChoice("Catálogo de materias primas"),
      form.addCheckboxItem().createChoice("Ajustar cantidades de la receta"),
      form.addCheckboxItem().createChoice("Guías de calidad e higiene"),
      form.addCheckboxItem().createChoice("Comunidad de productores"),
      form.addCheckboxItem().createChoice("Capacitación y aprendizaje"),
      form.addCheckboxItem().createChoice("Funcionar sin internet"),
    ])
    .setRequired(true);

  // Pregunta 38
  form
    .addParagraphTextItem()
    .setTitle(
      "38. ¿Qué hace diferente a AGRO-NET de otras apps o recursos que ya existen?",
    )
    .setRequired(false);

  // ════════════════════════════════════════════════════════════════════
  // BLOQUE 10 — Cierre
  // ════════════════════════════════════════════════════════════════════

  form
    .addPageBreakItem()
    .setTitle("BLOQUE 10 — Para terminar")
    .setHelpText("Dos preguntas finales para no dejar nada al aire.");

  // Pregunta 39
  form
    .addParagraphTextItem()
    .setTitle(
      "39. ¿Hay alguna función o sección que crees que es importante y no se mencionó en ningún punto de este formulario?",
    )
    .setRequired(false);

  // Pregunta 40
  form
    .addParagraphTextItem()
    .setTitle(
      "40. ¿Qué es lo que más te preocupa o lo que sientes que está más en el aire del proyecto?",
    )
    .setRequired(false);

  // ── Registrar el enlace ──────────────────────────────────────────────
  Logger.log("════════════════════════════════════");
  Logger.log("✅ Formulario creado correctamente");
  Logger.log("════════════════════════════════════");
  Logger.log("🔗 Enlace para compartir:");
  Logger.log(form.getPublishedUrl());
  Logger.log("");
  Logger.log("✏️  Enlace para editar (solo tú):");
  Logger.log(form.getEditUrl());
  Logger.log("════════════════════════════════════");
}
