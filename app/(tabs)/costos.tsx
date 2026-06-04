import { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Trash2, ChevronDown, ChevronUp, RotateCcw, Sprout, Package, HandCoins, Flame, Truck, TrendingDown, Ellipsis, Receipt, Save, Share2, History, CheckCircle2, Calculator } from 'lucide-react-native';
import { db } from '@/db/client';
import { calculos } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { calcularRango, formatMXN } from '@/services/calculadora';

type Campos = {
  productoNombre: string;
  materiaPrima: string; empaque: string; manoObra: string;
  gasAgua: string; transporte: string; merma: string; otrosGastos: string;
  unidades: string; tamanoUnidad: string; margen: string;
};

type Calculo = typeof calculos.$inferSelect;

const CAMPOS_VACIO: Campos = {
  productoNombre: '',
  materiaPrima: '', empaque: '', manoObra: '',
  gasAgua: '', transporte: '', merma: '', otrosGastos: '',
  unidades: '', tamanoUnidad: '', margen: '40',
};

const CAMPOS_COSTO: { campo: keyof Omit<Campos, 'productoNombre'|'unidades'|'tamanoUnidad'|'margen'>; label: string; Icon: any }[] = [
  { campo: 'materiaPrima', label: 'Materia prima',  Icon: Sprout      },
  { campo: 'empaque',      label: 'Empaque',         Icon: Package     },
  { campo: 'manoObra',     label: 'Mano de obra',    Icon: HandCoins   },
  { campo: 'gasAgua',      label: 'Gas / agua / luz', Icon: Flame      },
  { campo: 'transporte',   label: 'Transporte',      Icon: Truck       },
  { campo: 'merma',        label: 'Merma',            Icon: TrendingDown},
  { campo: 'otrosGastos',  label: 'Otros gastos',    Icon: Ellipsis    },
];

const MARGENES = ['20', '30', '40', '50', '60', '80'];

function parse(v: string) { return parseFloat(v) || 0; }

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
    return (v: string) => setCampos((p) => ({ ...p, [campo]: v }));
  }

  const costoTotal = CAMPOS_COSTO.reduce((s, { campo }) => s + parse(campos[campo]), 0);
  const unidades = parse(campos.unidades);
  const tamano   = parse(campos.tamanoUnidad);
  const margen   = parse(campos.margen);

  const resultado = costoTotal > 0 && unidades > 0
    ? calcularRango(costoTotal, unidades, margen, tamano)
    : null;

  const mxn = formatMXN;

  async function guardar() {
    if (!resultado) return;
    if (!campos.productoNombre.trim()) {
      Alert.alert('Falta el nombre', 'Escribe el nombre del producto antes de guardar.');
      return;
    }
    await db.insert(calculos).values({
      fecha: new Date().toISOString(),
      productoNombre: campos.productoNombre.trim(),
      costoTotal: resultado.costoTotal,
      unidades: resultado.unidadesPorLote,
      margenPct: margen,
      precioMinimo: resultado.precioMinimo,
      precioRecomendado: resultado.precioRecomendado,
      precioMaximo: resultado.precioMaximo,
      tamanoUnidadG: tamano > 0 ? tamano : null,
    });
    await cargarHistorial();
    Alert.alert('Guardado', 'El cálculo quedó en el historial.');
  }

  async function compartir() {
    if (!resultado) return;
    const nombre = campos.productoNombre.trim() || 'Producto';
    const texto =
      `📊 Cálculo AGRO-NET\nProducto: ${nombre}\nCosto total: ${mxn(resultado.costoTotal)}\nUnidades: ${resultado.unidadesPorLote}\n\n💰 Rango de precios:\n  Mínimo:      ${mxn(resultado.precioMinimo)}\n  Recomendado: ${mxn(resultado.precioRecomendado)} ✅\n  Máximo:      ${mxn(resultado.precioMaximo)}\nGanancia: ${mxn(resultado.gananciaNeta)}`;
    await Share.share({ message: texto });
  }

  async function eliminarCalculo(id: number) {
    await db.delete(calculos).where(eq(calculos.id, id));
    await cargarHistorial();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D0CAC0' }} edges={['top']}>

      {/* Header */}
      <View style={{ backgroundColor: '#1F3D36', paddingHorizontal: 16, paddingTop: 4, paddingBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={() => router.back()} style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={21} color="#F4F1EA" strokeWidth={1.9} />
          </Pressable>
          <View style={{ width: 46, height: 46, borderRadius: 14, backgroundColor: 'rgba(158,90,56,0.25)', borderWidth: 1, borderColor: 'rgba(194,122,90,0.35)', alignItems: 'center', justifyContent: 'center' }}>
            <Calculator size={24} color="#c27a5a" strokeWidth={1.6} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#F4F1EA', fontSize: 20, fontWeight: '600', fontFamily: 'Poppins_600SemiBold', lineHeight: 26 }}>Calculadora de Costos</Text>
            <Text style={{ color: '#A7C49A', fontSize: 12, fontWeight: '300', marginTop: 1 }}>Costos, rendimientos y rentabilidad</Text>
          </View>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* Nombre */}
        <View style={{ backgroundColor: '#C1BAAE', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 16 }}>
          <Text style={{ color: '#1A1A1A', fontSize: 13, fontWeight: '500', marginBottom: 8, fontFamily: 'Poppins_500Medium' }}>Nombre del producto</Text>
          <TextInput
            value={campos.productoNombre}
            onChangeText={set('productoNombre')}
            placeholder="Ej: Mermelada de carambola 250 g"
            placeholderTextColor="#9A917F"
            style={{ backgroundColor: '#D8D2C8', borderRadius: 12, paddingHorizontal: 14, height: 46, borderWidth: 1, borderColor: '#B0A897', fontSize: 15, color: '#1A1A1A', fontFamily: 'Poppins_400Regular' }}
          />
        </View>

        {/* Costos de producción */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={{ color: '#1A1A1A', fontSize: 13, fontWeight: '600', letterSpacing: 0.6, textTransform: 'uppercase', fontFamily: 'Poppins_600SemiBold' }}>Costos de producción</Text>
          <Pressable onPress={() => setCampos(CAMPOS_VACIO)} style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#C1BAAE', borderRadius: 99, paddingHorizontal: 10, paddingVertical: 6 }}>
            <RotateCcw size={13} color="#9E5A38" strokeWidth={2} />
            <Text style={{ color: '#9E5A38', fontSize: 11.5, fontWeight: '500', fontFamily: 'Poppins_500Medium' }}>Limpiar todo</Text>
          </Pressable>
        </View>

        <View style={{ gap: 8, marginBottom: 4 }}>
          {CAMPOS_COSTO.map(({ campo, label, Icon }) => (
            <View key={campo} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#C1BAAE', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10 }}>
              <Icon size={18} color="#465D43" strokeWidth={1.8} />
              <Text style={{ color: '#1A1A1A', fontSize: 13.5, fontWeight: '500', flex: 1, fontFamily: 'Poppins_500Medium' }}>{label}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#D8D2C8', borderRadius: 12, borderWidth: 1, borderColor: campos[campo] ? '#465D43' : '#B0A897', height: 44, paddingHorizontal: 12, minWidth: 110 }}>
                <Text style={{ color: '#4A4A4A', fontSize: 14, fontWeight: '500', marginRight: 4 }}>$</Text>
                <TextInput
                  value={campos[campo]}
                  onChangeText={set(campo)}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                  placeholderTextColor="#9A917F"
                  style={{ flex: 1, height: 44, padding: 0, margin: 0, fontSize: 15, fontWeight: '600', color: '#1A1A1A', textAlign: 'right', textAlignVertical: 'center', includeFontPadding: false, fontFamily: 'Poppins_600SemiBold' } as any}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Banner costo total */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#465D43', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, marginTop: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Receipt size={20} color="#EAF1E4" strokeWidth={1.8} />
            <Text style={{ color: '#EAF1E4', fontSize: 13.5, fontWeight: '500', fontFamily: 'Poppins_500Medium' }}>Costo total del lote</Text>
          </View>
          <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '700', fontFamily: 'Poppins_600SemiBold' }}>{mxn(costoTotal)}</Text>
        </View>

        {/* Producción */}
        <Text style={{ color: '#1A1A1A', fontSize: 13, fontWeight: '600', letterSpacing: 0.6, textTransform: 'uppercase', marginTop: 20, marginBottom: 10, fontFamily: 'Poppins_600SemiBold' }}>Producción</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1, backgroundColor: '#C1BAAE', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 12 }}>
            <Text style={{ color: '#4A4A4A', fontSize: 11.5, fontWeight: '300', marginBottom: 6 }}>Unidades por lote</Text>
            <TextInput
              value={campos.unidades}
              onChangeText={set('unidades')}
              keyboardType="number-pad"
              placeholder="10"
              placeholderTextColor="#9A917F"
              style={{ backgroundColor: '#D8D2C8', borderRadius: 12, paddingHorizontal: 12, height: 44, borderWidth: 1, borderColor: '#B0A897', fontSize: 16, fontWeight: '600', color: '#1A1A1A', fontFamily: 'Poppins_600SemiBold' }}
            />
          </View>
          <View style={{ flex: 1, backgroundColor: '#C1BAAE', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 12 }}>
            <Text style={{ color: '#4A4A4A', fontSize: 11.5, fontWeight: '300', marginBottom: 6 }}>Tamaño / unidad (opc.)</Text>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <TextInput
                value={campos.tamanoUnidad}
                onChangeText={set('tamanoUnidad')}
                keyboardType="decimal-pad"
                placeholder="250"
                placeholderTextColor="#9A917F"
                style={{ flex: 1, backgroundColor: '#D8D2C8', borderRadius: 12, paddingHorizontal: 12, height: 44, borderWidth: 1, borderColor: '#B0A897', fontSize: 16, fontWeight: '600', color: '#1A1A1A', fontFamily: 'Poppins_600SemiBold' }}
              />
            </View>
          </View>
        </View>
        {unidades > 0 && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8, paddingHorizontal: 4 }}>
            <Text style={{ color: '#465D43', fontSize: 12.5, fontWeight: '500' }}>→</Text>
            <Text style={{ color: '#465D43', fontSize: 12.5, fontWeight: '500', fontFamily: 'Poppins_500Medium' }}>
              {unidades} unidades{tamano ? ` de ${tamano} g` : ''} por lote
            </Text>
          </View>
        )}

        {/* Margen */}
        <Text style={{ color: '#1A1A1A', fontSize: 13, fontWeight: '600', letterSpacing: 0.6, textTransform: 'uppercase', marginTop: 20, marginBottom: 10, fontFamily: 'Poppins_600SemiBold' }}>Margen de ganancia</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {MARGENES.map((m) => {
            const on = campos.margen === m;
            return (
              <Pressable key={m} onPress={() => setCampos((p) => ({ ...p, margen: m }))}
                style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 12, paddingVertical: 10, width: 'calc(33.333% - 6px)' as any, backgroundColor: on ? '#9E5A38' : '#C1BAAE', borderWidth: 1, borderColor: on ? '#9E5A38' : '#B0A897', minWidth: 72 }}>
                <Text style={{ color: on ? '#F6EFE7' : '#1A1A1A', fontSize: 15, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>{m}%</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Resultado */}
        {resultado && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: '#1A1A1A', fontSize: 13, fontWeight: '600', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Poppins_600SemiBold' }}>Rango de precios por unidad</Text>
            <View style={{ backgroundColor: '#C1BAAE', borderRadius: 16, padding: 6, gap: 2 }}>
              {/* Mínimo */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 }}>
                <View>
                  <Text style={{ color: '#1A1A1A', fontSize: 13, fontWeight: '500', fontFamily: 'Poppins_500Medium' }}>Precio mínimo</Text>
                  <Text style={{ color: '#4A4A4A', fontSize: 11, fontWeight: '300' }}>Margen 20%</Text>
                </View>
                <Text style={{ color: '#4A4A4A', fontSize: 17, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>{mxn(resultado.precioMinimo)}</Text>
              </View>
              {/* Recomendado */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1F3D36', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={20} color="#93B36F" strokeWidth={1.9} />
                  <View>
                    <Text style={{ color: '#F4F1EA', fontSize: 14, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>Recomendado</Text>
                    <Text style={{ color: '#A7C49A', fontSize: 11, fontWeight: '300' }}>Margen {margen}%</Text>
                  </View>
                </View>
                <Text style={{ color: '#93B36F', fontSize: 24, fontWeight: '700', fontFamily: 'Poppins_600SemiBold' }}>{mxn(resultado.precioRecomendado)}</Text>
              </View>
              {/* Máximo */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 }}>
                <View>
                  <Text style={{ color: '#1A1A1A', fontSize: 13, fontWeight: '500', fontFamily: 'Poppins_500Medium' }}>Precio máximo</Text>
                  <Text style={{ color: '#4A4A4A', fontSize: 11, fontWeight: '300' }}>Margen 100%</Text>
                </View>
                <Text style={{ color: '#4A4A4A', fontSize: 17, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>{mxn(resultado.precioMaximo)}</Text>
              </View>
            </View>

            {/* Ganancia + unidades */}
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
              <View style={{ flex: 1, backgroundColor: '#465D43', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12 }}>
                <Text style={{ color: '#CFE0C5', fontSize: 11, fontWeight: '300' }}>Ganancia estimada</Text>
                <Text style={{ color: '#FFFFFF', fontSize: 19, fontWeight: '600', marginTop: 2, fontFamily: 'Poppins_600SemiBold' }}>{mxn(resultado.gananciaNeta)}</Text>
              </View>
              <View style={{ backgroundColor: '#C1BAAE', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#9E5A38', fontSize: 19, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>{resultado.unidadesPorLote}</Text>
                <Text style={{ color: '#4A4A4A', fontSize: 10.5, fontWeight: '300' }}>unidades</Text>
              </View>
            </View>

            {/* Acciones */}
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
              <Pressable onPress={guardar} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#9E5A38', borderRadius: 16, paddingVertical: 14 }}>
                <Save size={18} color="#F7F2EC" strokeWidth={1.9} />
                <Text style={{ color: '#F7F2EC', fontSize: 14, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>Guardar</Text>
              </Pressable>
              <Pressable onPress={compartir} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#1F3D36', borderRadius: 16, paddingVertical: 14 }}>
                <Share2 size={18} color="#93B36F" strokeWidth={1.9} />
                <Text style={{ color: '#F4F1EA', fontSize: 14, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>Compartir</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Historial */}
        <Pressable onPress={() => setMostrarHistorial((v) => !v)} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24, paddingVertical: 4 }}>
          <History size={17} color="#9E5A38" strokeWidth={1.9} />
          <Text style={{ color: '#1A1A1A', fontSize: 13, fontWeight: '600', flex: 1, letterSpacing: 0.5, textTransform: 'uppercase', fontFamily: 'Poppins_600SemiBold' }}>
            Historial ({historial.length})
          </Text>
          {mostrarHistorial
            ? <ChevronUp size={18} color="#4A4A4A" strokeWidth={2} />
            : <ChevronDown size={18} color="#4A4A4A" strokeWidth={2} />
          }
        </Pressable>

        {mostrarHistorial && (
          <View style={{ marginTop: 10, gap: 8 }}>
            {historial.length === 0 ? (
              <View style={{ backgroundColor: '#C1BAAE', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 16 }}>
                <Text style={{ color: '#4A4A4A', fontSize: 12.5, fontWeight: '300' }}>Aún no has guardado ningún cálculo.</Text>
              </View>
            ) : historial.map((c) => (
              <View key={c.id} style={{ backgroundColor: '#C1BAAE', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: '#1A1A1A', fontSize: 14, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>{c.productoNombre}</Text>
                    <Text style={{ color: '#4A4A4A', fontSize: 11, fontWeight: '300' }}>{new Date(c.fecha).toLocaleDateString('es-MX')} · mín {mxn(c.precioMinimo)} · rec {mxn(c.precioRecomendado)} · máx {mxn(c.precioMaximo)}</Text>
                  </View>
                  <Pressable onPress={() => eliminarCalculo(c.id)} style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: '#D8D2C8', alignItems: 'center', justifyContent: 'center' }}>
                    <Trash2 size={17} color="#9E5A38" strokeWidth={1.9} />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
