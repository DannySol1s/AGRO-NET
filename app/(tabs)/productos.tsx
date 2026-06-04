import { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search, ArrowLeft, ChevronRight, Gauge, Archive, X } from 'lucide-react-native';
import { db } from '@/db/client';
import { productos, materiasPrimas } from '@/db/schema';
import { useUsuarioStore, type NivelExperiencia } from '@/store/usuario';

type ProductoConMateria = typeof productos.$inferSelect & { nombreMateria: string };

const NIVEL_META: Record<string, { label: string; color: string }> = {
  principiante: { label: 'Principiante', color: '#465D43' },
  medio:        { label: 'Intermedio',   color: '#9E5A38' },
  avanzado:     { label: 'Avanzado',     color: '#7A3A28' },
};

const FILTROS = ['todos', 'principiante', 'medio', 'avanzado'] as const;
const FILTRO_LABEL: Record<string, string> = {
  todos: 'Todos', principiante: 'Principiante', medio: 'Intermedio', avanzado: 'Avanzado',
};
const NIVEL_A_FILTRO: Record<NivelExperiencia, string> = {
  principiante: 'principiante', medio: 'medio', avanzado: 'todos',
};

export default function Productos() {
  const { nivelExperiencia } = useUsuarioStore();
  const [todos, setTodos]     = useState<ProductoConMateria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro]   = useState<string>(NIVEL_A_FILTRO[nivelExperiencia] ?? 'todos');

  useEffect(() => {
    async function cargar() {
      const [prods, materias] = await Promise.all([
        db.select().from(productos).orderBy(productos.numero),
        db.select().from(materiasPrimas),
      ]);
      const mMap = Object.fromEntries(materias.map((m) => [m.id, m.nombre]));
      setTodos(prods.map((p) => ({ ...p, nombreMateria: mMap[p.materiaPrimaId] ?? '' })));
      setCargando(false);
    }
    cargar();
  }, []);

  const filtrados = useMemo(() => {
    return todos.filter((p) => {
      const coincideNivel = filtro === 'todos' || p.nivelDificultad === filtro;
      const q = busqueda.trim().toLowerCase();
      const coincideBusqueda = !q ||
        p.nombre.toLowerCase().includes(q) ||
        p.nombreMateria.toLowerCase().includes(q);
      return coincideNivel && coincideBusqueda;
    });
  }, [todos, filtro, busqueda]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D0CAC0' }} edges={['top']}>

      {/* Header */}
      <View style={{ backgroundColor: '#1F3D36', paddingHorizontal: 16, paddingTop: 4, paddingBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={() => router.back()} style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={21} color="#F4F1EA" strokeWidth={1.9} />
          </Pressable>
          <View style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(147,179,111,0.16)', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 22 }}>⚗️</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#F4F1EA', fontSize: 18, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>Formulaciones</Text>
            <Text style={{ color: '#A7C49A', fontSize: 12, fontWeight: '300' }}>Procesos agroindustriales</Text>
          </View>
        </View>
      </View>

      {/* Buscador */}
      <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#C1BAAE', borderRadius: 16, paddingHorizontal: 14, height: 50, borderWidth: 1, borderColor: '#B0A897', gap: 8 }}>
          <Search size={18} color="#4A4A4A" strokeWidth={1.8} />
          <TextInput
            value={busqueda}
            onChangeText={setBusqueda}
            placeholder="Buscar formulación..."
            placeholderTextColor="#9A917F"
            style={{ flex: 1, fontSize: 14, color: '#1A1A1A', fontFamily: 'Poppins_400Regular' }}
          />
          {busqueda.length > 0 && (
            <Pressable onPress={() => setBusqueda('')}>
              <X size={17} color="#4A4A4A" strokeWidth={2} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Filtros */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {FILTROS.map((f) => {
            const on = filtro === f;
            return (
              <Pressable key={f} onPress={() => setFiltro(f)}
                style={{ backgroundColor: on ? '#465D43' : '#C1BAAE', borderWidth: 1, borderColor: on ? '#465D43' : '#B0A897', borderRadius: 99, paddingHorizontal: 14, paddingVertical: 8 }}>
                <Text style={{ color: on ? '#F4F1EA' : '#1A1A1A', fontSize: 12.5, fontWeight: '500', fontFamily: 'Poppins_500Medium' }}>
                  {FILTRO_LABEL[f]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {cargando ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#4A4A4A', fontSize: 14 }}>Cargando formulaciones...</Text>
        </View>
      ) : (
        <FlatList
          data={filtrados}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={{ backgroundColor: '#C1BAAE', borderRadius: 12, marginBottom: 12, paddingVertical: 8, alignItems: 'center', borderWidth: 1, borderColor: '#B0A897' }}>
              <Text style={{ color: '#4A4A4A', fontSize: 12.5, fontWeight: '500', fontFamily: 'Poppins_500Medium' }}>
                {filtrados.length} formulación{filtrados.length !== 1 ? 'es' : ''}
              </Text>
            </View>
          }
          ListEmptyComponent={
            <View style={{ backgroundColor: '#C1BAAE', borderRadius: 16, padding: 24, alignItems: 'center' }}>
              <Text style={{ fontSize: 28, marginBottom: 8 }}>🔍</Text>
              <Text style={{ color: '#4A4A4A', fontSize: 13, fontWeight: '300' }}>Sin formulaciones para tu búsqueda.</Text>
            </View>
          }
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24, gap: 10 }}
          renderItem={({ item }) => {
            const meta = NIVEL_META[item.nivelDificultad] ?? NIVEL_META.principiante;
            return (
              <Pressable onPress={() => router.push(`/(tabs)/materias/producto/${item.id}` as any)}
                style={{ backgroundColor: '#C1BAAE', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ width: 50, height: 50, borderRadius: 14, backgroundColor: '#D8D2C8', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Text style={{ fontSize: 24 }}>🧪</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <Text style={{ color: '#465D43', fontSize: 11.5, fontWeight: '300' }}>{item.nombreMateria}</Text>
                    </View>
                    <Text style={{ color: '#1A1A1A', fontSize: 15, fontWeight: '600', lineHeight: 20, fontFamily: 'Poppins_600SemiBold' }} numberOfLines={1}>
                      {item.nombre}
                    </Text>
                  </View>
                  <View style={{ backgroundColor: 'rgba(0,0,0,0.06)', borderWidth: 1, borderColor: meta.color, borderRadius: 99, paddingHorizontal: 10, paddingVertical: 4 }}>
                    <Text style={{ color: meta.color, fontSize: 11, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>{meta.label}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#B0A897' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Gauge size={13} color="#4A4A4A" strokeWidth={1.8} />
                    <Text style={{ color: '#4A4A4A', fontSize: 12, fontWeight: '300' }}>
                      Rinde {item.rendimientoKg ? `${item.rendimientoKg} kg` : `${item.rendimientoL} L`}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <Archive size={13} color="#4A4A4A" strokeWidth={1.8} />
                    <Text style={{ color: '#4A4A4A', fontSize: 12, fontWeight: '300' }}>{item.vidaUtilDesc}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <ChevronRight size={18} color="#9E5A38" strokeWidth={2} />
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}
