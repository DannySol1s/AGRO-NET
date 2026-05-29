import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { db } from '@/db/client';
import { materiasPrimas, productos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { useUsuarioStore, type NivelExperiencia } from '@/store/usuario';

type Producto = typeof productos.$inferSelect;

const DIFICULTAD_CONFIG = {
  principiante: { label: 'Principiante', color: '#166534', bg: '#dcfce7', emoji: '🌱' },
  medio:        { label: 'Intermedio',   color: '#a85c12', bg: '#fae8cc', emoji: '🌿' },
  avanzado:     { label: 'Avanzado',     color: '#7c3aed', bg: '#ede9fe', emoji: '🌳' },
};

const FILTROS = ['Todos', 'Principiante', 'Intermedio', 'Avanzado'] as const;

export default function MateriasProductos() {
  const { materia } = useLocalSearchParams<{ materia: string }>();
  const { nivelExperiencia } = useUsuarioStore();

  const NIVEL_A_FILTRO: Record<NivelExperiencia, typeof FILTROS[number]> = {
    principiante: 'Principiante',
    medio:        'Intermedio',
    avanzado:     'Todos',
  };

  const [nombreMateria, setNombreMateria] = useState('');
  const [emojiMateria, setEmojiMateria] = useState('');
  const [todosProductos, setTodosProductos] = useState<Producto[]>([]);
  const [filtro, setFiltro] = useState<typeof FILTROS[number]>(NIVEL_A_FILTRO[nivelExperiencia] ?? 'Todos');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      const [mp] = await db.select().from(materiasPrimas).where(eq(materiasPrimas.id, materia));
      if (mp) { setNombreMateria(mp.nombre); setEmojiMateria(mp.emoji); }

      const lista = await db.select().from(productos)
        .where(eq(productos.materiaPrimaId, materia))
        .orderBy(productos.numero);
      setTodosProductos(lista);
      setCargando(false);
    }
    cargar();
  }, [materia]);

  const MAPA_FILTRO: Record<typeof FILTROS[number], string | null> = {
    Todos: null, Principiante: 'principiante', Intermedio: 'medio', Avanzado: 'avanzado',
  };

  const productosFiltrados = todosProductos.filter((p) => {
    const nivel = MAPA_FILTRO[filtro];
    return nivel === null || p.nivelDificultad === nivel;
  });

  return (
    <SafeAreaView className="flex-1 bg-verde-50" edges={['top']}>
      {/* Header */}
      <View className="bg-verde-800 px-6 pt-4 pb-4">
        <Pressable onPress={() => router.back()} className="mb-3">
          <ChevronLeft size={24} stroke="#bbf7d0" />
        </Pressable>
        <Text className="text-4xl mb-1">{emojiMateria}</Text>
        <Text className="text-white text-2xl font-bold">{nombreMateria}</Text>
        <Text className="text-verde-200 text-sm mt-1">
          {todosProductos.length} productos disponibles
        </Text>
      </View>

      {/* Filtros */}
      <View className="flex-row px-4 py-3 gap-2">
        {FILTROS.map((f) => (
          <Pressable
            key={f}
            onPress={() => setFiltro(f)}
            className={`px-3 py-1.5 rounded-full border ${
              filtro === f ? 'bg-verde-700 border-verde-700' : 'bg-white border-verde-200'
            }`}
          >
            <Text className={`text-xs font-semibold ${filtro === f ? 'text-white' : 'text-verde-700'}`}>
              {f}
            </Text>
          </Pressable>
        ))}
      </View>

      {cargando ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-verde-700">Cargando productos...</Text>
        </View>
      ) : (
        <FlatList
          data={productosFiltrados}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          ListEmptyComponent={
            <View className="items-center py-12">
              <Text className="text-4xl mb-3">🔍</Text>
              <Text className="text-verde-700 text-base font-semibold">Sin resultados</Text>
            </View>
          }
          renderItem={({ item }) => {
            const dif = DIFICULTAD_CONFIG[item.nivelDificultad as keyof typeof DIFICULTAD_CONFIG];
            return (
              <Pressable
                onPress={() => router.push(`/(tabs)/materias/producto/${item.id}`)}
                className="bg-white rounded-2xl p-5 border border-verde-100 active:opacity-75"
              >
                <View className="flex-row items-start justify-between mb-2">
                  <Text className="text-verde-900 text-base font-bold flex-1 pr-3">
                    {item.numero}. {item.nombre}
                  </Text>
                  <View className="px-2.5 py-1 rounded-full" style={{ backgroundColor: dif.bg }}>
                    <Text className="text-xs font-bold" style={{ color: dif.color }}>
                      {dif.emoji} {dif.label}
                    </Text>
                  </View>
                </View>
                <Text className="text-tierra-600 text-sm">
                  📦 Rend. {item.rendimientoKg ? `${item.rendimientoKg} kg` : `${item.rendimientoL} L`}
                  {'  '}
                  🕐 {item.vidaUtilDesc}
                </Text>
              </Pressable>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}
