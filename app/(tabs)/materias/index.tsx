import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { db } from '@/db/client';
import { materiasPrimas } from '@/db/schema';
import { useSeleccionStore } from '@/store/seleccion';

type MateriaPrima = typeof materiasPrimas.$inferSelect;

const CATEGORIA_COLOR: Record<string, { color: string; bg: string }> = {
  fruta:     { color: '#dc2626', bg: '#fee2e2' },
  tuberculo: { color: '#c2410c', bg: '#ffedd5' },
  hierba:    { color: '#166534', bg: '#dcfce7' },
  semilla:   { color: '#92400e', bg: '#fef3c7' },
  legumbre:  { color: '#4d7c0f', bg: '#ecfccb' },
};

const CATEGORIA_LABEL: Record<string, string> = {
  fruta:     'Fruta',
  tuberculo: 'Tubérculo',
  hierba:    'Hierba',
  semilla:   'Semilla',
  legumbre:  'Legumbre',
};

export default function MateriasIndex() {
  const [materias, setMaterias] = useState<MateriaPrima[]>([]);
  const [cargando, setCargando] = useState(true);
  const setMateriaPrima = useSeleccionStore((s) => s.setMateriaPrima);

  useEffect(() => {
    db.select().from(materiasPrimas).then((data) => {
      setMaterias(data);
      setCargando(false);
    });
  }, []);

  function seleccionar(id: string) {
    setMateriaPrima(id);
    router.push(`/(tabs)/materias/${id}`);
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="bg-verde-800 px-6 pt-4 pb-5">
        <Pressable onPress={() => router.back()} className="mb-3 self-start">
          <ChevronLeft size={24} stroke="#bbf7d0" />
        </Pressable>
        <View className="flex-row items-center gap-3 mb-1">
          <View className="bg-verde-700 rounded-xl p-2">
            <Text className="text-xl">🌿</Text>
          </View>
          <View>
            <Text className="text-white text-lg font-bold">Materias Primas</Text>
            <Text className="text-verde-300 text-xs">Información nutricional y propiedades funcionales</Text>
          </View>
        </View>
      </View>

      {cargando ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-verde-700">Cargando...</Text>
        </View>
      ) : materias.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-4xl mb-4">🌾</Text>
          <Text className="text-verde-800 text-lg font-semibold text-center">
            Aún no hay materias primas cargadas
          </Text>
        </View>
      ) : (
        <>
          <View className="px-4 pt-3 pb-2">
            <Text className="text-gray-500 text-xs">Selecciona una o más categorías</Text>
          </View>
          <FlatList
            data={materias}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, gap: 10 }}
            renderItem={({ item }) => {
              const cat = CATEGORIA_COLOR[item.categoria] ?? { color: '#166534', bg: '#dcfce7' };
              return (
                <Pressable
                  onPress={() => seleccionar(item.id)}
                  className="flex-row items-center bg-white rounded-2xl p-4 border border-gray-100 active:opacity-75"
                  style={{ shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 1 }}
                >
                  <View
                    className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                    style={{ backgroundColor: cat.bg }}
                  >
                    <Text className="text-2xl">{item.emoji}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-900 font-semibold text-sm">{item.nombre}</Text>
                    <Text className="text-gray-500 text-xs mt-0.5" style={{ color: cat.color }}>
                      {CATEGORIA_LABEL[item.categoria] ?? item.categoria}
                    </Text>
                  </View>
                  <ChevronRight size={18} stroke="#9ca3af" />
                </Pressable>
              );
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
}
