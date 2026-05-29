import { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search, ChevronRight, Clock, TrendingUp } from 'lucide-react-native';
import { db } from '@/db/client';
import { productos, materiasPrimas } from '@/db/schema';

type ProductoConMateria = typeof productos.$inferSelect & { nombreMateria: string };

const DIFICULTAD_CONFIG = {
  principiante: { label: 'Fácil',       color: '#166534', bg: '#dcfce7' },
  medio:        { label: 'Intermedio',   color: '#a85c12', bg: '#fae8cc' },
  avanzado:     { label: 'Avanzado',     color: '#7c3aed', bg: '#ede9fe' },
};

const TENDENCIA_COLOR = {
  principiante: '#166534',
  medio:        '#a85c12',
  avanzado:     '#7c3aed',
};

const FILTROS = ['Todos', 'Fácil', 'Intermedio', 'Avanzado'] as const;
type Filtro = typeof FILTROS[number];

const FILTRO_A_NIVEL: Record<Filtro, string | null> = {
  Todos: null, Fácil: 'principiante', Intermedio: 'medio', Avanzado: 'avanzado',
};

export default function Productos() {
  const [todos, setTodos] = useState<ProductoConMateria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState<Filtro>('Todos');

  useEffect(() => {
    async function cargar() {
      const [prods, materias] = await Promise.all([
        db.select().from(productos).orderBy(productos.numero),
        db.select().from(materiasPrimas),
      ]);
      const materiaMap = Object.fromEntries(materias.map((m) => [m.id, m.nombre]));
      setTodos(prods.map((p) => ({ ...p, nombreMateria: materiaMap[p.materiaPrimaId] ?? '' })));
      setCargando(false);
    }
    cargar();
  }, []);

  const filtrados = useMemo(() => {
    const nivel = FILTRO_A_NIVEL[filtro];
    return todos.filter((p) => {
      const coincideNivel = nivel === null || p.nivelDificultad === nivel;
      const coincideBusqueda =
        busqueda.trim() === '' ||
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.nombreMateria.toLowerCase().includes(busqueda.toLowerCase());
      return coincideNivel && coincideBusqueda;
    });
  }, [todos, filtro, busqueda]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="bg-verde-800 px-6 pt-4 pb-5">
        <View className="flex-row items-center gap-3">
          <View className="bg-verde-700 rounded-xl p-2">
            <Text className="text-xl">⚗️</Text>
          </View>
          <View>
            <Text className="text-white text-lg font-bold">Formulaciones</Text>
            <Text className="text-verde-300 text-xs">Procesos agroindustriales</Text>
          </View>
        </View>
      </View>

      {/* Buscador */}
      <View className="px-4 pt-4 pb-2">
        <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2.5 gap-2">
          <Search size={16} stroke="#9ca3af" />
          <TextInput
            className="flex-1 text-sm text-gray-800"
            placeholder="Buscar formulación..."
            placeholderTextColor="#9ca3af"
            value={busqueda}
            onChangeText={setBusqueda}
          />
        </View>
      </View>

      {/* Filtros */}
      <View className="px-4 pb-3">
        <Text className="text-gray-500 text-xs mb-2">Categorías</Text>
        <View className="flex-row gap-2">
          {FILTROS.map((f) => (
            <Pressable
              key={f}
              onPress={() => setFiltro(f)}
              className={`px-4 py-1.5 rounded-full border ${
                filtro === f
                  ? 'bg-verde-700 border-verde-700'
                  : 'bg-white border-gray-200'
              }`}
            >
              <Text className={`text-xs font-semibold ${filtro === f ? 'text-white' : 'text-gray-600'}`}>
                {f}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {cargando ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-verde-700 text-sm">Cargando formulaciones...</Text>
        </View>
      ) : (
        <FlatList
          data={filtrados}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View className="bg-verde-50 rounded-xl mx-4 mb-3 py-2 items-center">
              <Text className="text-verde-700 text-xs font-semibold">
                {filtrados.length} formulaciones
              </Text>
            </View>
          }
          ListEmptyComponent={
            <View className="items-center py-16">
              <Text className="text-4xl mb-3">🔍</Text>
              <Text className="text-gray-600 font-semibold">Sin resultados</Text>
            </View>
          }
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, gap: 10 }}
          renderItem={({ item }) => {
            const dif = DIFICULTAD_CONFIG[item.nivelDificultad as keyof typeof DIFICULTAD_CONFIG]
              ?? DIFICULTAD_CONFIG.principiante;
            const tendColor = TENDENCIA_COLOR[item.nivelDificultad as keyof typeof TENDENCIA_COLOR]
              ?? '#166534';
            return (
              <Pressable
                onPress={() => router.push(`/(tabs)/materias/producto/${item.id}`)}
                className="flex-row items-center bg-white rounded-2xl p-4 border border-gray-100 active:opacity-75"
                style={{ shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 1 }}
              >
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: dif.bg }}
                >
                  <Text className="text-xl">🧪</Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center gap-2 mb-0.5">
                    <View className="px-2 py-0.5 rounded-full" style={{ backgroundColor: dif.bg }}>
                      <Text className="text-xs font-semibold" style={{ color: dif.color }}>{dif.label}</Text>
                    </View>
                    <Text className="text-gray-400 text-xs">{item.nombreMateria}</Text>
                  </View>
                  <Text className="text-gray-900 font-semibold text-sm" numberOfLines={1}>
                    {item.nombre}
                  </Text>
                  <Text className="text-gray-500 text-xs mt-0.5" numberOfLines={1}>
                    Rend. {item.rendimientoKg ? `${item.rendimientoKg} kg` : `${item.rendimientoL} L`} · {item.vidaUtilDesc}
                  </Text>
                  <View className="flex-row items-center gap-3 mt-1.5">
                    <View className="flex-row items-center gap-1">
                      <Clock size={11} stroke="#9ca3af" />
                      <Text className="text-gray-400 text-xs">{item.vidaUtilDesc}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <TrendingUp size={11} stroke={tendColor} />
                      <Text className="text-xs font-medium" style={{ color: tendColor }}>{dif.label}</Text>
                    </View>
                  </View>
                </View>
                <ChevronRight size={16} stroke="#9ca3af" />
              </Pressable>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}
