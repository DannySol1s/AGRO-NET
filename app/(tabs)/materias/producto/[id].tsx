import { useEffect, useState, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, Pressable, TextInput,
  Modal, FlatList, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Volume2, VolumeX, MessageCircle, X, ChevronDown, ChevronUp } from 'lucide-react-native';
import * as Speech from 'expo-speech';
import { db } from '@/db/client';
import { productos, insumos, pasos, parametrosCalidad, normas } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { useUsuarioStore } from '@/store/usuario';

// ─── Tipos ───────────────────────────────────────────────────────────────────

type Tab = 'formulacion' | 'proceso' | 'calidad' | 'normativa' | 'costos' | 'comercial';

const TABS: { id: Tab; label: string; emoji: string }[] = [
  { id: 'formulacion', label: 'Formulación', emoji: '🧺' },
  { id: 'proceso',     label: 'Proceso',     emoji: '📋' },
  { id: 'calidad',     label: 'Calidad',     emoji: '✅' },
  { id: 'normativa',   label: 'NOM/CODEX',   emoji: '📜' },
  { id: 'costos',      label: 'Costos',      emoji: '💰' },
  { id: 'comercial',   label: 'Comercial',   emoji: '📦' },
];

const FAQ: Record<Tab, { q: string; a: string }[]> = {
  formulacion: [
    { q: '¿Puedo sustituir algún ingrediente?', a: 'Algunos ingredientes opcionales pueden omitirse sin afectar el resultado final. Los marcados como obligatorios son críticos para la estructura o conservación del producto.' },
    { q: '¿Cómo escalar la receta?', a: 'Usa el ajustador de escala para ingresar la cantidad que deseas producir. Todos los ingredientes se recalculan automáticamente de forma proporcional.' },
    { q: '¿En qué unidades debo medir?', a: 'Respeta siempre las unidades indicadas (kg, L, g, ml). Las conversiones incorrectas son la principal causa de fallas en el proceso.' },
  ],
  proceso: [
    { q: '¿Qué pasa si no tengo termómetro?', a: 'Puedes usar la prueba de plato frío para mermeladas, o la prueba de hebra para almíbares. Sin embargo, para productos de alta inocuidad (jugos, conservas) el termómetro es indispensable.' },
    { q: '¿Puedo combinar pasos para ahorrar tiempo?', a: 'No se recomienda. Cada paso tiene una función técnica específica. Omitir o combinar pasos puede afectar la inocuidad y el rendimiento final.' },
    { q: '¿Por qué es importante el tiempo exacto?', a: 'El tiempo de proceso está calculado para garantizar la eliminación de microorganismos y la correcta gelificación o concentración del producto.' },
  ],
  calidad: [
    { q: '¿Cómo verifico el punto de gel sin refractómetro?', a: 'Usa la prueba del plato frío: coloca una gota en un plato frío, espera 30 segundos y empuja con el dedo. Si se arruga, el producto está listo.' },
    { q: '¿Qué hago si el color no es el esperado?', a: 'El color oscuro indica oxidación o exceso de calor. Revisa la temperatura y el tiempo de cocción. Considera añadir ácido ascórbico (vitamina C) como antioxidante natural.' },
    { q: '¿Cada cuánto debo revisar los parámetros?', a: 'En cada lote de producción. Los registros por lote son obligatorios para la trazabilidad del producto y requeridos por NOM-251.' },
  ],
  normativa: [
    { q: '¿Qué es la NOM-051 y me aplica?', a: 'La NOM-051 regula el etiquetado de alimentos y bebidas. Si vendes tu producto con etiqueta, debes cumplirla. Incluye tabla nutricional, sellos de advertencia y declaraciones.' },
    { q: '¿Necesito registro sanitario para vender en mercados locales?', a: 'Para mercados locales informales generalmente no. Para tiendas, ferias o comercio en línea sí se requiere Aviso Sanitario ante COFEPRIS. Consulta con tu delegación municipal.' },
    { q: '¿Qué es el CODEX Alimentarius?', a: 'Es el estándar internacional de seguridad alimentaria de la FAO/OMS. Define límites máximos de contaminantes, aditivos permitidos y criterios de identidad para cada producto.' },
  ],
  costos: [
    { q: '¿Qué costos no debo olvidar incluir?', a: 'Además de ingredientes: empaque, etiquetas, gas/electricidad, agua, mano de obra (incluida la tuya), transporte y merma estimada (10-15% promedio).' },
    { q: '¿Qué margen de ganancia es razonable?', a: 'Para productores rurales, un margen del 40-60% sobre el costo total es común. Márgenes mayores al 100% son posibles en productos diferenciados o de nicho.' },
    { q: '¿Cómo calculo el precio si vendo por pieza?', a: 'Costo total ÷ unidades producidas = costo por pieza. Multiplica por tu margen (ej. ×1.5 para 50% de margen). Compara siempre con precios de referencia de tu mercado local.' },
  ],
  comercial: [
    { q: '¿Dónde puedo vender mis productos?', a: 'Mercados locales y tianguis, tiendas de abarrotes, restaurantes locales, ferias regionales, grupos de WhatsApp comunitarios, y a largo plazo: marketplaces como Mercado Libre o Rappi.' },
    { q: '¿Cómo diferencio mi producto de la competencia?', a: 'Resalta el origen artesanal, los ingredientes locales y el proceso tradicional. Un empaque limpio y una etiqueta con tu historia personal generan conexión con el comprador.' },
    { q: '¿Vale la pena certificarme como productor orgánico?', a: 'La certificación tiene costo y proceso burocrático, pero puede triplicar el precio de venta. Evalúa si tus volúmenes y mercado objetivo lo justifican antes de invertir.' },
  ],
};

const COMERCIAL_TIPS = [
  {
    titulo: 'Estrategia de precio',
    desc: 'Calcula tu costo total real (ingredientes + empaque + trabajo + merma) antes de fijar precio. Un producto subvaluado no es sostenible.',
    emoji: '💲',
  },
  {
    titulo: 'Canales de venta sugeridos',
    desc: 'Mercados locales → tiendas de abarrotes → restaurantes regionales → ferias estatales. Escala gradualmente conforme aumentas tu capacidad.',
    emoji: '🏪',
  },
  {
    titulo: 'Empaque y presentación',
    desc: 'Un envase limpio y una etiqueta con nombre del producto, fecha de elaboración y datos de contacto aumentan la percepción de valor del 30 al 50%.',
    emoji: '🏷️',
  },
  {
    titulo: 'Normativa de etiquetado',
    desc: 'La NOM-051 exige: nombre del producto, lista de ingredientes, declaración nutrimental, país de origen y datos del fabricante. Aplica a todo producto envasado.',
    emoji: '📋',
  },
  {
    titulo: 'Volumen mínimo rentable',
    desc: 'Antes de invertir en equipo, valida que puedes vender al menos 20 unidades por semana. La sobreproducción sin mercado asegurado es el error más común.',
    emoji: '📊',
  },
];

// ─── Componente principal ─────────────────────────────────────────────────────

export default function ProductoDetalle() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cantidadKg } = useUsuarioStore();
  const [tab, setTab] = useState<Tab>('formulacion');
  const [producto, setProducto] = useState<typeof productos.$inferSelect | null>(null);
  const [listaInsumos, setListaInsumos] = useState<(typeof insumos.$inferSelect)[]>([]);
  const [listaPasos, setListaPasos] = useState<(typeof pasos.$inferSelect)[]>([]);
  const [listaParametros, setListaParametros] = useState<(typeof parametrosCalidad.$inferSelect)[]>([]);
  const [listaNormas, setListaNormas] = useState<(typeof normas.$inferSelect)[]>([]);

  // ScaleAdjuster — inicia con la cantidad configurada en el perfil si existe
  const [escalaAbierta, setEscalaAbierta] = useState(false);
  const [cantidadDeseada, setCantidadDeseada] = useState(cantidadKg ?? '');

  // AudioReader
  const [leyendo, setLeyendo] = useState(false);

  // FAQ modal
  const [faqVisible, setFaqVisible] = useState(false);

  // Animación ping del FAB
  const pingAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pingAnim, { toValue: 1.4, duration: 800, useNativeDriver: true }),
        Animated.timing(pingAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  useEffect(() => {
    async function cargar() {
      const [p] = await db.select().from(productos).where(eq(productos.id, id));
      if (!p) return;
      setProducto(p);
      const [ins, pas, par, nor] = await Promise.all([
        db.select().from(insumos).where(eq(insumos.productoId, id)),
        db.select().from(pasos).where(eq(pasos.productoId, id)).orderBy(pasos.numero),
        db.select().from(parametrosCalidad).where(eq(parametrosCalidad.productoId, id)),
        db.select().from(normas).where(eq(normas.productoId, id)),
      ]);
      setListaInsumos(ins);
      setListaPasos(pas);
      setListaParametros(par);
      setListaNormas(nor);
    }
    cargar();
  }, [id]);

  // Limpiar TTS al desmontar
  useEffect(() => () => { Speech.stop(); }, []);

  // Factor de escala basado en cantidad deseada
  const baseRendimiento = producto?.rendimientoKg ?? producto?.rendimientoL ?? 1;
  const factor = cantidadDeseada && !isNaN(parseFloat(cantidadDeseada)) && parseFloat(cantidadDeseada) > 0
    ? parseFloat(cantidadDeseada) / baseRendimiento
    : 1;
  const unidad = producto?.rendimientoKg ? 'kg' : 'L';
  const tiempoTotal = listaPasos.reduce((s, p) => s + (p.tiempoMinutos ?? 0), 0);

  // Texto para TTS por tab
  const buildTextoTTS = useCallback((): string => {
    if (!producto) return '';
    switch (tab) {
      case 'formulacion':
        return `Formulación de ${producto.nombre}. Ingredientes: ${listaInsumos.map((i) => `${(i.cantidad * factor).toFixed(2)} ${i.unidad} de ${i.nombre}`).join(', ')}.`;
      case 'proceso':
        return `Proceso para elaborar ${producto.nombre}. ${listaPasos.map((p) => `Paso ${p.numero}: ${p.titulo}. ${p.descripcion}`).join('. ')}.`;
      case 'calidad':
        return `Parámetros de calidad para ${producto.nombre}. ${listaParametros.map((p) => `${p.parametro}: valor esperado ${p.valorEsperado}.`).join(' ')}. Vida útil: ${producto.vidaUtilDesc}.`;
      case 'normativa':
        return listaNormas.length > 0
          ? `Normas aplicables: ${listaNormas.map((n) => `${n.codigo}: ${n.descripcion ?? ''}`).join('. ')}.`
          : 'No hay normativas registradas para este producto.';
      case 'costos':
        return `Para calcular costos de ${producto.nombre}, pasa a la calculadora y registra el precio de cada ingrediente.`;
      case 'comercial':
        return COMERCIAL_TIPS.map((t) => `${t.titulo}: ${t.desc}`).join('. ');
      default:
        return '';
    }
  }, [tab, producto, listaInsumos, listaPasos, listaParametros, listaNormas, factor]);

  async function toggleAudio() {
    const speaking = await Speech.isSpeakingAsync();
    if (speaking) {
      await Speech.stop();
      setLeyendo(false);
    } else {
      setLeyendo(true);
      Speech.speak(buildTextoTTS(), {
        language: 'es-MX',
        rate: 0.85,
        onDone: () => setLeyendo(false),
        onError: () => setLeyendo(false),
      });
    }
  }

  if (!producto) {
    return (
      <SafeAreaView className="flex-1 bg-verde-50 items-center justify-center" edges={['top']}>
        <Text className="text-verde-700">Cargando...</Text>
      </SafeAreaView>
    );
  }

  const DIFICULTAD_CONFIG = {
    principiante: { label: 'Fácil',       color: '#166534', bg: '#dcfce7' },
    medio:        { label: 'Intermedio',   color: '#a85c12', bg: '#fae8cc' },
    avanzado:     { label: 'Avanzado',     color: '#7c3aed', bg: '#ede9fe' },
  };
  const dif = DIFICULTAD_CONFIG[producto.nivelDificultad as keyof typeof DIFICULTAD_CONFIG]
    ?? DIFICULTAD_CONFIG.principiante;

  return (
    <SafeAreaView className="flex-1 bg-verde-50" edges={['top']}>

      {/* ── HERO ─────────────────────────────────── */}
      <View className="bg-verde-800 px-5 pt-3 pb-5">
        <View className="flex-row items-center justify-between mb-3">
          <Pressable onPress={() => { Speech.stop(); router.back(); }} className="p-1">
            <ChevronLeft size={24} stroke="#bbf7d0" />
          </Pressable>
          <Pressable
            onPress={toggleAudio}
            className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-full ${leyendo ? 'bg-cosecha-400' : 'bg-verde-700'}`}
          >
            {leyendo
              ? <VolumeX size={14} stroke="#166534" />
              : <Volume2 size={14} stroke="#bbf7d0" />
            }
            <Text className={`text-xs font-semibold ${leyendo ? 'text-verde-900' : 'text-verde-200'}`}>
              {leyendo ? 'Detener' : 'Escuchar'}
            </Text>
          </Pressable>
        </View>

        {/* Chips */}
        <View className="flex-row gap-2 mb-2 flex-wrap">
          <View className="px-2.5 py-1 rounded-full" style={{ backgroundColor: dif.bg }}>
            <Text className="text-xs font-bold" style={{ color: dif.color }}>{dif.label}</Text>
          </View>
          <View className="bg-verde-700 px-2.5 py-1 rounded-full">
            <Text className="text-verde-200 text-xs">
              {producto.rendimientoKg ? `${producto.rendimientoKg} kg` : `${producto.rendimientoL} L`}
            </Text>
          </View>
          <View className="bg-verde-700 px-2.5 py-1 rounded-full">
            <Text className="text-verde-200 text-xs">⏱ {tiempoTotal} min</Text>
          </View>
        </View>

        <Text className="text-white text-xl font-bold leading-6">{producto.nombre}</Text>
        <Text className="text-verde-300 text-xs mt-1">Vida útil: {producto.vidaUtilDesc}</Text>
      </View>

      {/* ── TABS (scroll horizontal) ──────────────── */}
      <View className="bg-white border-b border-verde-100">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
          {TABS.map((t) => (
            <Pressable
              key={t.id}
              onPress={() => setTab(t.id)}
              className={`px-3 py-3 mr-1 border-b-2 items-center ${tab === t.id ? 'border-verde-700' : 'border-transparent'}`}
            >
              <Text className={`text-xs font-semibold ${tab === t.id ? 'text-verde-800' : 'text-gray-400'}`}>
                {t.emoji} {t.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* ── CONTENIDO ────────────────────────────── */}
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>

        {/* FORMULACIÓN */}
        {tab === 'formulacion' && (
          <View>
            {/* ScaleAdjuster */}
            <Pressable
              onPress={() => setEscalaAbierta((v) => !v)}
              className="bg-cosecha-400 rounded-2xl px-4 py-3 flex-row items-center justify-between mb-4"
            >
              <View>
                <Text className="text-verde-900 font-bold text-sm">⚖️ Ajustar cantidad</Text>
                <Text className="text-verde-800 text-xs mt-0.5">
                  {cantidadDeseada
                    ? `Produciendo ${cantidadDeseada} ${unidad} (×${factor.toFixed(2)})`
                    : `Receta base: ${baseRendimiento} ${unidad}`}
                </Text>
              </View>
              {escalaAbierta ? <ChevronUp size={18} stroke="#166534" /> : <ChevronDown size={18} stroke="#166534" />}
            </Pressable>

            {escalaAbierta && (
              <View className="bg-white rounded-2xl p-4 mb-4 border border-cosecha-200">
                <Text className="text-gray-600 text-xs mb-2">Cantidad que quiero producir ({unidad})</Text>
                <TextInput
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm mb-3"
                  placeholder={`Ej: ${baseRendimiento}`}
                  placeholderTextColor="#d1d5db"
                  keyboardType="numeric"
                  value={cantidadDeseada}
                  onChangeText={setCantidadDeseada}
                />
                <View className="flex-row gap-3">
                  <View className="flex-1 bg-verde-50 rounded-xl p-3 items-center">
                    <Text className="text-verde-600 text-xs">Factor</Text>
                    <Text className="text-verde-800 font-bold text-base">×{factor.toFixed(2)}</Text>
                  </View>
                  <View className="flex-1 bg-verde-50 rounded-xl p-3 items-center">
                    <Text className="text-verde-600 text-xs">Tiempo estimado</Text>
                    <Text className="text-verde-800 font-bold text-base">
                      {Math.round(tiempoTotal * factor)} min
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <Text className="text-verde-900 font-bold text-sm mb-3">
              Ingredientes {factor !== 1 ? `(×${factor.toFixed(2)})` : ''}
            </Text>
            {listaInsumos.map((ins) => (
              <View key={ins.id} className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-2 border border-verde-100">
                <View className="w-2 h-2 rounded-full bg-verde-500 mr-3" />
                <Text className="text-tierra-700 flex-1 text-sm">{ins.nombre}</Text>
                <View className="items-end">
                  <Text className="text-verde-800 font-bold text-sm">
                    {(ins.cantidad * factor).toFixed(ins.cantidad * factor < 10 ? 2 : 1)} {ins.unidad}
                  </Text>
                  {factor !== 1 && (
                    <Text className="text-gray-400 text-xs">base: {ins.cantidad} {ins.unidad}</Text>
                  )}
                </View>
              </View>
            ))}
            {listaInsumos.length === 0 && (
              <View className="items-center py-8">
                <Text className="text-gray-400 text-sm">Sin ingredientes registrados</Text>
              </View>
            )}
          </View>
        )}

        {/* PROCESO */}
        {tab === 'proceso' && (
          <View>
            {listaPasos.map((paso) => (
              <View key={paso.id} className="bg-white rounded-2xl p-4 mb-3 border border-verde-100">
                <View className="flex-row items-center mb-2 gap-3">
                  <View className="w-8 h-8 rounded-full bg-verde-700 items-center justify-center">
                    <Text className="text-white text-sm font-bold">{paso.numero}</Text>
                  </View>
                  <Text className="text-verde-900 font-bold text-sm flex-1">{paso.titulo}</Text>
                  {paso.tiempoMinutos && (
                    <Text className="text-tierra-500 text-xs">
                      ⏱ {factor !== 1 ? Math.round(paso.tiempoMinutos * factor) : paso.tiempoMinutos} min
                    </Text>
                  )}
                </View>
                <Text className="text-tierra-700 text-sm leading-5 ml-11">{paso.descripcion}</Text>
              </View>
            ))}
            {listaPasos.length === 0 && (
              <View className="items-center py-8">
                <Text className="text-gray-400 text-sm">Sin pasos registrados</Text>
              </View>
            )}
          </View>
        )}

        {/* CALIDAD */}
        {tab === 'calidad' && (
          <View>
            <Text className="text-verde-900 font-bold text-sm mb-3">Parámetros de calidad</Text>
            {listaParametros.map((par) => (
              <View key={par.id} className="bg-white rounded-xl p-4 mb-2 border border-verde-100">
                <Text className="text-verde-800 font-semibold text-sm">{par.parametro}</Text>
                <Text className="text-tierra-700 text-sm mt-1">Esperado: {par.valorEsperado}</Text>
                {par.metodoVerificacion && (
                  <Text className="text-tierra-500 text-xs mt-1">🔍 {par.metodoVerificacion}</Text>
                )}
              </View>
            ))}
            {listaParametros.length === 0 && (
              <View className="items-center py-6">
                <Text className="text-gray-400 text-sm">Sin parámetros registrados</Text>
              </View>
            )}

            <View className="bg-verde-100 rounded-xl p-4 mt-3 mb-4">
              <Text className="text-verde-800 text-sm font-semibold">📅 Vida útil</Text>
              <Text className="text-verde-700 text-sm mt-1">{producto.vidaUtilDesc}</Text>
              {producto.vidaUtilMeses && (
                <Text className="text-verde-600 text-xs mt-0.5">{producto.vidaUtilMeses} meses en condiciones óptimas</Text>
              )}
            </View>
          </View>
        )}

        {/* NOM / CODEX */}
        {tab === 'normativa' && (
          <View>
            {listaNormas.length > 0 ? (
              <>
                <Text className="text-verde-900 font-bold text-sm mb-3">Normas aplicables</Text>
                {listaNormas.map((n) => (
                  <View key={n.id} className="bg-white rounded-2xl p-4 mb-3 border border-verde-100">
                    <View className="flex-row items-center gap-2 mb-1">
                      <View className="bg-tierra-100 px-2 py-0.5 rounded-lg">
                        <Text className="text-tierra-800 text-xs font-bold">{n.codigo}</Text>
                      </View>
                    </View>
                    {n.descripcion && (
                      <Text className="text-tierra-700 text-sm leading-5">{n.descripcion}</Text>
                    )}
                  </View>
                ))}
              </>
            ) : (
              <View className="items-center py-8">
                <Text className="text-4xl mb-3">📜</Text>
                <Text className="text-gray-500 text-sm text-center">
                  Sin normativas específicas registradas para este producto
                </Text>
              </View>
            )}

            <View className="bg-tierra-50 rounded-2xl p-4 mt-2 mb-4 border border-tierra-100">
              <Text className="text-tierra-800 font-bold text-sm mb-2">📌 Referencia general</Text>
              <Text className="text-tierra-700 text-xs leading-5">
                Todos los productos alimentarios en México están sujetos a la NOM-251-SSA1 (Buenas Prácticas de Higiene) y la NOM-051-SCFI (Etiquetado). Consulta con COFEPRIS para requisitos específicos según tu canal de venta.
              </Text>
            </View>
          </View>
        )}

        {/* COSTOS */}
        {tab === 'costos' && (
          <View>
            <View className="bg-verde-100 rounded-2xl p-4 mb-4">
              <Text className="text-verde-800 font-bold text-sm mb-1">💡 Cómo usar la calculadora</Text>
              <Text className="text-verde-700 text-xs leading-5">
                Ve a la pestaña Costos en el menú principal, ingresa el precio de cada ingrediente en tu comunidad y obtén tu inversión total, precio sugerido y ganancia estimada.
              </Text>
            </View>
            <Pressable
              onPress={() => router.push(`/(tabs)/materias/producto/costos?id=${id}`)}
              className="bg-tierra-600 rounded-2xl py-4 items-center active:opacity-80 mb-3"
            >
              <Text className="text-white font-bold">💰 Abrir calculadora de costos</Text>
            </Pressable>
            <View className="bg-white rounded-2xl p-4 border border-verde-100">
              <Text className="text-verde-900 font-bold text-sm mb-3">Resumen de insumos</Text>
              {listaInsumos.map((ins) => (
                <View key={ins.id} className="flex-row justify-between py-2 border-b border-gray-50">
                  <Text className="text-tierra-700 text-sm flex-1">{ins.nombre}</Text>
                  <Text className="text-verde-700 font-semibold text-sm">
                    {(ins.cantidad * factor).toFixed(2)} {ins.unidad}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* COMERCIAL */}
        {tab === 'comercial' && (
          <View>
            {COMERCIAL_TIPS.map((tip) => (
              <View key={tip.titulo} className="bg-white rounded-2xl p-4 mb-3 border border-verde-100">
                <View className="flex-row items-center gap-3 mb-2">
                  <View className="w-9 h-9 rounded-xl bg-verde-100 items-center justify-center">
                    <Text className="text-lg">{tip.emoji}</Text>
                  </View>
                  <Text className="text-verde-900 font-bold text-sm flex-1">{tip.titulo}</Text>
                </View>
                <Text className="text-tierra-700 text-sm leading-5">{tip.desc}</Text>
              </View>
            ))}
          </View>
        )}

        <View className="h-24" />
      </ScrollView>

      {/* ── FAB ASISTENTE ────────────────────────── */}
      <View className="absolute bottom-8 right-5" pointerEvents="box-none">
        <Animated.View
          style={{ transform: [{ scale: pingAnim }], opacity: 0.25 }}
          className="absolute inset-0 rounded-full bg-verde-500"
        />
        <Pressable
          onPress={() => setFaqVisible(true)}
          className="w-14 h-14 rounded-full bg-verde-700 items-center justify-center"
          style={{ shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 6 }}
        >
          <MessageCircle size={24} stroke="white" />
        </Pressable>
      </View>

      {/* ── MODAL FAQ ────────────────────────────── */}
      <Modal visible={faqVisible} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-3xl pt-5 pb-8 max-h-[70%]">
            <View className="flex-row items-center justify-between px-5 mb-4">
              <Text className="text-verde-900 font-bold text-base">
                Preguntas frecuentes — {TABS.find((t) => t.id === tab)?.label}
              </Text>
              <Pressable onPress={() => setFaqVisible(false)}>
                <X size={20} stroke="#6b7280" />
              </Pressable>
            </View>
            <FlatList
              data={FAQ[tab]}
              keyExtractor={(item) => item.q}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
              renderItem={({ item }) => (
                <View className="bg-verde-50 rounded-2xl p-4 border border-verde-100">
                  <Text className="text-verde-800 font-bold text-sm mb-2">❓ {item.q}</Text>
                  <Text className="text-tierra-700 text-sm leading-5">{item.a}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
