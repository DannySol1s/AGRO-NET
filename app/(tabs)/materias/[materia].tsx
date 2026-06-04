import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, ChevronRight, ChevronDown, ChevronUp, Scale, Archive, Sprout, Info, Check } from 'lucide-react-native';
import { db } from '@/db/client';
import { materiasPrimas, productos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { useUsuarioStore, type NivelExperiencia } from '@/store/usuario';
import { useSeleccionStore } from '@/store/seleccion';

type Producto = typeof productos.$inferSelect;

const NIVEL_META: Record<string, { label: string; color: string }> = {
  principiante: { label: 'Principiante', color: '#465D43' },
  medio:        { label: 'Intermedio',   color: '#9E5A38' },
  avanzado:     { label: 'Avanzado',     color: '#7A3A28' },
};

const FILTROS = ['todos', 'principiante', 'intermedio', 'avanzado'] as const;
const FILTRO_LABEL: Record<string, string> = { todos: 'Todos', principiante: 'Principiante', intermedio: 'Intermedio', avanzado: 'Avanzado' };

export default function MateriasProductos() {
  const { materia } = useLocalSearchParams<{ materia: string }>();
  const { nivelExperiencia } = useUsuarioStore();
  const { cantidadBaseKg, setCantidadBaseKg } = useSeleccionStore();

  const NIVEL_A_FILTRO: Record<NivelExperiencia, string> = {
    principiante: 'principiante', medio: 'intermedio', avanzado: 'todos',
  };

  const [nombreMateria, setNombreMateria] = useState('');
  const [emojiMateria,  setEmojiMateria]  = useState('');
  const [descripcion,   setDescripcion]   = useState('');
  const [todosProductos, setTodosProductos] = useState<Producto[]>([]);
  const [filtro, setFiltro] = useState<string>(NIVEL_A_FILTRO[nivelExperiencia] ?? 'todos');
  const [verAcerca, setVerAcerca] = useState(false);
  const [cargando, setCargando]   = useState(true);

  useEffect(() => {
    async function cargar() {
      const [mp] = await db.select().from(materiasPrimas).where(eq(materiasPrimas.id, materia));
      if (mp) { setNombreMateria(mp.nombre); setEmojiMateria(mp.emoji); setDescripcion(mp.descripcion); }
      const lista = await db.select().from(productos)
        .where(eq(productos.materiaPrimaId, materia))
        .orderBy(productos.numero);
      setTodosProductos(lista);
      setCargando(false);
    }
    cargar();
    setCantidadBaseKg('');
  }, [materia]);

  const productosFiltrados = filtro === 'todos'
    ? todosProductos
    : todosProductos.filter((p) => p.nivelDificultad === filtro);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D0CAC0' }} edges={['top']}>
      {/* Header */}
      <View style={{ backgroundColor: '#1F3D36', paddingHorizontal: 16, paddingTop: 4, paddingBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={() => router.back()} style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={21} color="#F4F1EA" strokeWidth={1.9} />
          </Pressable>
          <View style={{ width: 54, height: 54, borderRadius: 16, backgroundColor: 'rgba(147,179,111,0.16)', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>{emojiMateria}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#F4F1EA', fontSize: 20, fontWeight: '600', lineHeight: 26, fontFamily: 'Poppins_600SemiBold' }}>{nombreMateria}</Text>
            <Text style={{ color: '#A7C49A', fontSize: 12, fontWeight: '300' }}>
              {todosProductos.length} producto{todosProductos.length !== 1 ? 's' : ''} disponible{todosProductos.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        ListHeaderComponent={
          <View>
            {/* Kg disponibles */}
            <View style={{ backgroundColor: '#C1BAAE', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, marginTop: 16, marginBottom: 0 }}>
              <Text style={{ color: '#1A1A1A', fontSize: 13, fontWeight: '500', marginBottom: 8, fontFamily: 'Poppins_500Medium' }}>
                ¿Cuántos kg de {nombreMateria.toLowerCase()} tienes disponibles?
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#D8D2C8', borderRadius: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: '#B0A897', height: 46 }}>
                <Scale size={18} color="#465D43" strokeWidth={1.8} />
                <TextInput
                  value={cantidadBaseKg}
                  onChangeText={(v) => setCantidadBaseKg(v.replace(/[^\d.]/g, ''))}
                  keyboardType="decimal-pad"
                  placeholder="Opcional"
                  placeholderTextColor="#9A917F"
                  style={{ flex: 1, paddingHorizontal: 12, fontSize: 15, color: '#1A1A1A', fontFamily: 'Poppins_400Regular' }}
                />
                <Text style={{ color: '#4A4A4A', fontSize: 13, fontWeight: '500' }}>kg</Text>
              </View>
              {cantidadBaseKg && Number(cantidadBaseKg) > 0 && (
                <Text style={{ color: '#465D43', fontSize: 11.5, fontWeight: '300', marginTop: 8 }}>
                  Con {cantidadBaseKg} kg puedes calcular rendimientos al abrir cada formulación.
                </Text>
              )}
            </View>

            {/* Filtros */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
              {FILTROS.map((f) => {
                const on = filtro === f;
                return (
                  <Pressable key={f} onPress={() => setFiltro(f)}
                    style={{ backgroundColor: on ? '#465D43' : '#C1BAAE', borderWidth: 1, borderColor: on ? '#465D43' : '#B0A897', borderRadius: 99, paddingHorizontal: 14, paddingVertical: 8 }}>
                    <Text style={{ color: on ? '#F4F1EA' : '#1A1A1A', fontSize: 12.5, fontWeight: '500', fontFamily: 'Poppins_500Medium' }}>{FILTRO_LABEL[f]}</Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={{ color: '#4A4A4A', fontSize: 13, fontWeight: '500', marginTop: 16, marginBottom: 10, fontFamily: 'Poppins_500Medium' }}>
              Productos que puedes elaborar
            </Text>
          </View>
        }
        ListEmptyComponent={
          !cargando ? (
            <View style={{ backgroundColor: '#C1BAAE', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 20, alignItems: 'center' }}>
              <Text style={{ color: '#4A4A4A', fontSize: 13, fontWeight: '300', textAlign: 'center' }}>
                No hay formulaciones de este nivel para {nombreMateria.toLowerCase()}.
              </Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          <View style={{ marginTop: 24 }}>
            <Pressable onPress={() => setVerAcerca((v) => !v)}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Info size={17} color="#9E5A38" strokeWidth={1.9} />
              <Text style={{ color: '#1A1A1A', fontSize: 13, fontWeight: '600', flex: 1, letterSpacing: 0.5, textTransform: 'uppercase', fontFamily: 'Poppins_600SemiBold' }}>
                Acerca de la materia prima
              </Text>
              {verAcerca ? <ChevronUp size={18} color="#4A4A4A" strokeWidth={2} /> : <ChevronDown size={18} color="#4A4A4A" strokeWidth={2} />}
            </Pressable>

            {verAcerca && descripcion ? (
              <View style={{ marginTop: 12 }}>
                <Text style={{ color: '#4A4A4A', fontSize: 13.5, fontWeight: '300', lineHeight: 21 }}>{descripcion}</Text>
              </View>
            ) : null}
          </View>
        }
        renderItem={({ item, index }) => {
          const meta = NIVEL_META[item.nivelDificultad] ?? NIVEL_META.principiante;
          return (
            <Pressable onPress={() => router.push(`/(tabs)/materias/producto/${item.id}` as any)}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#C1BAAE', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 14, marginBottom: 10 }}>
              <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#1F3D36', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Text style={{ color: '#93B36F', fontSize: 14, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>{index + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#1A1A1A', fontSize: 15, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>{item.nombre}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 6 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Sprout size={13} color="#4A4A4A" strokeWidth={1.9} />
                    <Text style={{ color: '#4A4A4A', fontSize: 11.5, fontWeight: '300' }}>
                      {item.rendimientoKg ? `${item.rendimientoKg} kg` : `${item.rendimientoL} L`}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Archive size={13} color="#4A4A4A" strokeWidth={1.9} />
                    <Text style={{ color: '#4A4A4A', fontSize: 11.5, fontWeight: '300' }}>{item.vidaUtilDesc}</Text>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 8 }}>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.06)', borderWidth: 1, borderColor: meta.color, borderRadius: 99, paddingHorizontal: 10, paddingVertical: 4 }}>
                  <Text style={{ color: meta.color, fontSize: 11, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>{meta.label}</Text>
                </View>
                <ChevronRight size={18} color="#9E5A38" strokeWidth={2} />
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
