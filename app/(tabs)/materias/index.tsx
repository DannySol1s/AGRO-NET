import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { db } from '@/db/client';
import { materiasPrimas } from '@/db/schema';
import { useSeleccionStore } from '@/store/seleccion';

type MateriaPrima = typeof materiasPrimas.$inferSelect;

const CATEGORIA_LABEL: Record<string, string> = {
  fruta: 'Fruta',
  tuberculo: 'Tubérculo',
  hierba: 'Hierba',
  semilla: 'Semilla',
  legumbre: 'Legumbre',
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
    <SafeAreaView className="flex-1 bg-verde-50">
      {/* Header */}
      <View className="bg-verde-800 px-6 pt-12 pb-6">
        <Text className="text-verde-200 text-sm mb-1">¿Qué tienes disponible?</Text>
        <Text className="text-white text-2xl font-bold">Mis Materias Primas</Text>
      </View>

      {cargando ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-verde-700 text-base">Cargando...</Text>
        </View>
      ) : materias.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-4xl mb-4">🌾</Text>
          <Text className="text-verde-800 text-lg font-semibold text-center">
            Aún no hay materias primas cargadas
          </Text>
        </View>
      ) : (
        <FlatList
          data={materias}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          columnWrapperStyle={{ gap: 12 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => seleccionar(item.id)}
              className="flex-1 bg-white rounded-2xl p-5 border border-verde-100 active:opacity-75"
              style={{ minHeight: 130 }}
            >
              <Text className="text-4xl mb-3">{item.emoji}</Text>
              <Text className="text-verde-900 text-base font-bold">{item.nombre}</Text>
              <Text className="text-tierra-600 text-xs mt-1">
                {CATEGORIA_LABEL[item.categoria] ?? item.categoria}
              </Text>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}
