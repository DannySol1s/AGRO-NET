import { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChevronLeft, Trash2, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react-native';
import { db } from '@/db/client';
import { calculos } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { calcularRango, formatMXN } from '@/services/calculadora';

type Campos = {
  productoNombre: string;
  materiaPrima:   string;
  empaque:        string;
  manoObra:       string;
  gasAgua:        string;
  transporte:     string;
  merma:          string;
  otrosGastos:    string;
  unidades:       string;
  tamanoUnidad:   string; // g o ml por unidad
  margen:         string; // porcentaje elegido por el productor
};

type Calculo = typeof calculos.$inferSelect;

const MARGENES = ['20', '30', '40', '50', '60', '80'];

const CAMPOS_COSTO: { campo: keyof Omit<Campos, 'productoNombre' | 'unidades' | 'tamanoUnidad' | 'margen'>; label: string; placeholder: string }[] = [
  { campo: 'materiaPrima', label: 'Materia prima e ingredientes ($)',  placeholder: '0' },
  { campo: 'empaque',      label: 'Empaque y etiquetas ($)',           placeholder: '0' },
  { campo: 'manoObra',     label: 'Mano de obra ($)',                  placeholder: '0' },
  { campo: 'gasAgua',      label: 'Gas / leña / agua ($)',             placeholder: '0' },
  { campo: 'transporte',   label: 'Transporte para vender ($)',        placeholder: '0' },
  { campo: 'merma',        label: 'Pérdidas por merma ($)',            placeholder: '0' },
  { campo: 'otrosGastos',  label: 'Otros gastos fijos ($)',            placeholder: '0' },
];

function parse(v: string): number { return parseFloat(v) || 0; }

const CAMPOS_VACIO: Campos = {
  productoNombre: '',
  materiaPrima: '', empaque: '', manoObra: '',
  gasAgua: '', transporte: '', merma: '', otrosGastos: '',
  unidades: '', tamanoUnidad: '', margen: '50',
};

export default function Costos() {
  const [campos, setCampos] = useState<Campos>(CAMPOS_VACIO);
  const [historial, setHistorial] = useState<Calculo[]>([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  const cargarHistorial = useCallback(async () => {
    const rows = await db.select().from(calculos).orderBy(desc(calculos.fecha)).limit(20);
    setHistorial(rows);
  }, []);

  useEffect(() => { cargarHistorial(); }, [cargarHistorial]);

  function set(campo: keyof Campos) {
    return (v: string) => setCampos((prev) => ({ ...prev, [campo]: v }));
  }

  const costoTotal =
    parse(campos.materiaPrima) + parse(campos.empaque) + parse(campos.manoObra) +
    parse(campos.gasAgua) + parse(campos.transporte) + parse(campos.merma) + parse(campos.otrosGastos);

  const unidades = parse(campos.unidades);
  const tamano   = parse(campos.tamanoUnidad);
  const margen   = parse(campos.margen);

  const resultado = costoTotal > 0 && unidades > 0
    ? calcularRango(costoTotal, unidades, margen, tamano)
    : null;

  async function guardar() {
    if (!resultado) return;
    if (!campos.productoNombre.trim()) {
      Alert.alert('Falta el nombre', 'Escribe el nombre del producto antes de guardar.');
      return;
    }
    await db.insert(calculos).values({
      fecha:             new Date().toISOString(),
      productoNombre:    campos.productoNombre.trim(),
      costoTotal:        resultado.costoTotal,
      unidades:          resultado.unidadesPorLote,
      margenPct:         margen,
      precioMinimo:      resultado.precioMinimo,
      precioRecomendado: resultado.precioRecomendado,
      precioMaximo:      resultado.precioMaximo,
      tamanoUnidadG:     tamano > 0 ? tamano : null,
    });
    await cargarHistorial();
    Alert.alert('Guardado', 'El cálculo quedó en el historial.');
  }

  async function compartir() {
    if (!resultado) return;
    const nombre = campos.productoNombre.trim() || 'Mi producto';
    const texto =
      `📊 Cálculo AGRO-NET\n` +
      `Producto: ${nombre}\n` +
      `Costo total: ${formatMXN(resultado.costoTotal)}\n` +
      `Unidades: ${resultado.unidadesPorLote}\n\n` +
      `💰 Rango de precios por unidad:\n` +
      `  Mínimo:       ${formatMXN(resultado.precioMinimo)}\n` +
      `  Recomendado:  ${formatMXN(resultado.precioRecomendado)}  ✅\n` +
      `  Máximo:       ${formatMXN(resultado.precioMaximo)}\n\n` +
      `Ganancia estimada: ${formatMXN(resultado.gananciaNeta)}`;
    await Share.share({ message: texto });
  }

  async function eliminarCalculo(id: number) {
    await db.delete(calculos).where(eq(calculos.id, id));
    await cargarHistorial();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D0CAC0' }} edges={['top']}>
      {/* Header */}
      <View className="bg-verde-800 px-6 pt-4 pb-5">
        <Pressable onPress={() => router.back()} className="mb-3 self-start">
          <ChevronLeft size={24} stroke="#d6e2d4" />
        </Pressable>
        <View className="flex-row items-center gap-3">
          <View className="bg-verde-700 rounded-xl p-2">
            <Text className="text-xl">💰</Text>
          </View>
          <View>
            <Text className="text-white text-lg font-bold" style={{ fontFamily: 'Poppins_600SemiBold' }}>
              Calculadora de Costos
            </Text>
            <Text className="text-verde-300 text-xs">Costos, rendimientos y rentabilidad</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-5" showsVerticalScrollIndicator={false}>

        {/* Nombre del producto */}
        <View className="mb-4">
          <Text className="text-carbon text-sm font-bold mb-2" style={{ fontFamily: 'Poppins_600SemiBold' }}>
            Nombre del producto
          </Text>
          <TextInput
            className="bg-white border border-tierra-200 rounded-xl px-4 py-3 text-carbon text-sm"
            placeholder="Ej: Mermelada de Carambola"
            placeholderTextColor="#a8a098"
            value={campos.productoNombre}
            onChangeText={set('productoNombre')}
          />
        </View>

        {/* Costos */}
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-carbon text-sm font-bold" style={{ fontFamily: 'Poppins_600SemiBold' }}>
            Costos de producción
          </Text>
          <Pressable
            onPress={() => setCampos(CAMPOS_VACIO)}
            className="flex-row items-center gap-1.5 bg-tierra-100 px-3 py-1.5 rounded-xl active:opacity-70"
          >
            <RotateCcw size={13} stroke="#5c5248" />
            <Text className="text-tierra-700 text-xs font-semibold">Limpiar todo</Text>
          </Pressable>
        </View>
        <View className="gap-3 mb-4">
          {CAMPOS_COSTO.map(({ campo, label, placeholder }) => (
            <View key={campo}>
              <Text className="text-tierra-700 text-xs mb-1.5">{label}</Text>
              <TextInput
                className="bg-white border border-tierra-200 rounded-xl px-4 py-3 text-carbon text-sm"
                placeholder={placeholder}
                placeholderTextColor="#a8a098"
                keyboardType="numeric"
                value={campos[campo]}
                onChangeText={set(campo)}
              />
            </View>
          ))}
        </View>

        {/* Costo total banner */}
        {costoTotal > 0 && (
          <View className="bg-verde-800 rounded-xl px-4 py-3 mb-4 flex-row justify-between items-center">
            <Text className="text-verde-200 text-sm">Costo total acumulado:</Text>
            <Text className="text-white font-bold text-base">{formatMXN(costoTotal)}</Text>
          </View>
        )}

        {/* Unidades y empaque */}
        <Text className="text-carbon text-sm font-bold mb-3" style={{ fontFamily: 'Poppins_600SemiBold' }}>
          Producción y empaque
        </Text>
        <View className="gap-3 mb-4">
          <View>
            <Text className="text-tierra-700 text-xs mb-1.5">Unidades totales a producir</Text>
            <TextInput
              className="bg-white border border-tierra-200 rounded-xl px-4 py-3 text-carbon text-sm"
              placeholder="Ej: 40"
              placeholderTextColor="#a8a098"
              keyboardType="numeric"
              value={campos.unidades}
              onChangeText={set('unidades')}
            />
          </View>
          <View>
            <Text className="text-tierra-700 text-xs mb-1.5">
              Tamaño por unidad en gramos o ml <Text className="text-tierra-500">(opcional)</Text>
            </Text>
            <TextInput
              className="bg-white border border-tierra-200 rounded-xl px-4 py-3 text-carbon text-sm"
              placeholder="Ej: 250 (para frascos de 250 g)"
              placeholderTextColor="#a8a098"
              keyboardType="numeric"
              value={campos.tamanoUnidad}
              onChangeText={set('tamanoUnidad')}
            />
            {tamano > 0 && unidades > 0 && (
              <Text className="text-verde-700 text-xs mt-1">
                → {Math.floor((unidades * 1000) / tamano)} unidades de {tamano}g por lote
              </Text>
            )}
          </View>
        </View>

        {/* Margen */}
        <Text className="text-carbon text-sm font-bold mb-3" style={{ fontFamily: 'Poppins_600SemiBold' }}>
          ¿Cuánto quieres ganar? (% sobre el costo)
        </Text>
        <View className="flex-row flex-wrap gap-2 mb-5">
          {MARGENES.map((m) => (
            <Pressable
              key={m}
              onPress={() => setCampos((p) => ({ ...p, margen: m }))}
              className={`px-4 py-2.5 rounded-xl border-2 items-center ${
                campos.margen === m
                  ? 'bg-verde-800 border-verde-800'
                  : 'bg-white border-tierra-200'
              }`}
            >
              <Text className={`font-bold text-sm ${campos.margen === m ? 'text-white' : 'text-carbon'}`}>
                {m}%
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Resultado — Rango de precios */}
        {resultado && (
          <View className="bg-white rounded-2xl border border-tierra-200 mb-4 overflow-hidden">
            <View className="bg-verde-800 px-4 py-3">
              <Text className="text-verde-200 text-xs font-semibold text-center">
                RANGO DE PRECIOS POR UNIDAD
              </Text>
            </View>

            <View className="p-4 gap-3">
              {/* Mínimo */}
              <View className="flex-row justify-between items-center bg-tierra-50 rounded-xl px-4 py-3">
                <View>
                  <Text className="text-tierra-700 text-xs">Precio mínimo</Text>
                  <Text className="text-tierra-500 text-xs">Margen 20% — punto de equilibrio</Text>
                </View>
                <Text className="text-tierra-800 font-bold text-base">{formatMXN(resultado.precioMinimo)}</Text>
              </View>

              {/* Recomendado */}
              <View className="flex-row justify-between items-center bg-verde-100 rounded-xl px-4 py-3 border-2 border-verde-500">
                <View>
                  <Text className="text-verde-800 text-xs font-bold">✅ Precio recomendado</Text>
                  <Text className="text-verde-600 text-xs">Margen {margen}% — tu elección</Text>
                </View>
                <Text className="text-verde-800 font-bold text-lg">{formatMXN(resultado.precioRecomendado)}</Text>
              </View>

              {/* Máximo */}
              <View className="flex-row justify-between items-center bg-cosecha-400 bg-opacity-10 rounded-xl px-4 py-3">
                <View>
                  <Text className="text-cosecha-500 text-xs font-bold">Precio máximo</Text>
                  <Text className="text-cosecha-400 text-xs">Margen 100% — techo de mercado</Text>
                </View>
                <Text className="text-cosecha-500 font-bold text-base">{formatMXN(resultado.precioMaximo)}</Text>
              </View>

              <View className="h-px bg-tierra-100" />

              <View className="flex-row justify-between">
                <Text className="text-tierra-600 text-sm">Ganancia estimada (con precio rec.):</Text>
                <Text className="text-verde-700 font-bold text-sm">{formatMXN(resultado.gananciaNeta)}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-tierra-600 text-sm">Unidades del lote:</Text>
                <Text className="text-carbon font-semibold text-sm">{resultado.unidadesPorLote}</Text>
              </View>
            </View>

            {/* Acciones */}
            <View className="flex-row border-t border-tierra-100">
              <Pressable
                onPress={guardar}
                className="flex-1 py-3.5 items-center border-r border-tierra-100 active:bg-tierra-50"
              >
                <Text className="text-verde-700 font-semibold text-sm">💾 Guardar</Text>
              </Pressable>
              <Pressable
                onPress={compartir}
                className="flex-1 py-3.5 items-center active:bg-tierra-50"
              >
                <Text className="text-cosecha-500 font-semibold text-sm">📤 Compartir</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Historial */}
        {historial.length > 0 && (
          <View className="mb-6">
            <Pressable
              onPress={() => setMostrarHistorial((v) => !v)}
              className="flex-row items-center justify-between py-3"
            >
              <Text className="text-carbon font-bold text-sm" style={{ fontFamily: 'Poppins_600SemiBold' }}>
                Cálculos anteriores ({historial.length})
              </Text>
              {mostrarHistorial
                ? <ChevronUp size={18} stroke="#5c5248" />
                : <ChevronDown size={18} stroke="#5c5248" />
              }
            </Pressable>

            {mostrarHistorial && historial.map((c) => (
              <View key={c.id} className="bg-white rounded-xl p-4 mb-2 border border-tierra-200">
                <View className="flex-row justify-between items-start mb-2">
                  <View className="flex-1">
                    <Text className="text-carbon font-semibold text-sm">{c.productoNombre}</Text>
                    <Text className="text-tierra-500 text-xs">{new Date(c.fecha).toLocaleDateString('es-MX')}</Text>
                  </View>
                  <Pressable onPress={() => eliminarCalculo(c.id)} className="p-1 active:opacity-60">
                    <Trash2 size={16} stroke="#a8a098" />
                  </Pressable>
                </View>
                <View className="flex-row gap-3">
                  <View className="flex-1 bg-tierra-50 rounded-lg p-2 items-center">
                    <Text className="text-tierra-500 text-xs">Mínimo</Text>
                    <Text className="text-tierra-800 font-bold text-xs">{formatMXN(c.precioMinimo)}</Text>
                  </View>
                  <View className="flex-1 bg-verde-100 rounded-lg p-2 items-center">
                    <Text className="text-verde-700 text-xs">Recomendado</Text>
                    <Text className="text-verde-800 font-bold text-xs">{formatMXN(c.precioRecomendado)}</Text>
                  </View>
                  <View className="flex-1 bg-tierra-50 rounded-lg p-2 items-center">
                    <Text className="text-tierra-500 text-xs">Máximo</Text>
                    <Text className="text-tierra-800 font-bold text-xs">{formatMXN(c.precioMaximo)}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
