import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Leaf, Calculator, ShieldCheck, Lightbulb } from 'lucide-react-native';
import { useUsuarioStore } from '@/store/usuario';

const ACCESOS = [
  { icon: Leaf,        label: 'Mis Materias',     color: '#166534', bg: '#dcfce7', ruta: '/(tabs)/materias' },
  { icon: Calculator,  label: 'Calculadora',       color: '#a85c12', bg: '#fae8cc', ruta: '/(tabs)/materias' },
  { icon: ShieldCheck, label: 'Calidad',           color: '#1d4ed8', bg: '#dbeafe', ruta: '/(tabs)/calidad' },
  { icon: Lightbulb,   label: 'Innovación',        color: '#7c3aed', bg: '#ede9fe', ruta: '/(tabs)/calidad' },
];

const NIVEL_LABELS = {
  principiante: 'Principiante 🌱',
  medio: 'Intermedio 🌿',
  avanzado: 'Avanzado 🌳',
};

export default function Inicio() {
  const { nivelExperiencia, herramientas } = useUsuarioStore();

  return (
    <SafeAreaView className="flex-1 bg-verde-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-verde-800 px-6 pt-12 pb-8">
          <Text className="text-verde-200 text-sm mb-1">Bienvenido a</Text>
          <Text className="text-white text-3xl font-bold">AGRO-NET</Text>
          <Text className="text-verde-200 text-sm mt-1">
            {NIVEL_LABELS[nivelExperiencia]} · {herramientas.length} herramientas
          </Text>
        </View>

        {/* Banner principal */}
        <View className="mx-6 mt-6 bg-cosecha-400 rounded-2xl p-5">
          <Text className="text-verde-900 text-base font-bold mb-1">
            100 productos agroalimentarios
          </Text>
          <Text className="text-verde-800 text-sm leading-5">
            Selecciona tu materia prima y descubre todo lo que puedes elaborar con ella.
          </Text>
          <Pressable
            onPress={() => router.push('/(tabs)/materias')}
            className="bg-verde-800 rounded-xl py-3 px-5 mt-4 self-start"
          >
            <Text className="text-white font-bold text-sm">Explorar →</Text>
          </Pressable>
        </View>

        {/* Accesos rápidos */}
        <View className="px-6 mt-6">
          <Text className="text-verde-900 text-lg font-bold mb-4">Accesos rápidos</Text>
          <View className="flex-row flex-wrap gap-3">
            {ACCESOS.map((a) => {
              const Icon = a.icon;
              return (
                <Pressable
                  key={a.label}
                  onPress={() => router.push(a.ruta as any)}
                  className="flex-1 min-w-[44%] rounded-2xl p-4 active:opacity-80"
                  style={{ backgroundColor: a.bg }}
                >
                  <Icon size={28} stroke={a.color} />
                  <Text className="text-sm font-semibold mt-3" style={{ color: a.color }}>
                    {a.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Info offline */}
        <View className="mx-6 mt-6 mb-8 bg-verde-100 rounded-2xl p-4 flex-row items-center gap-3">
          <Text className="text-2xl">📶</Text>
          <View className="flex-1">
            <Text className="text-verde-800 font-semibold text-sm">Funciona sin internet</Text>
            <Text className="text-verde-700 text-xs mt-0.5">
              Todas las recetas y procesos están disponibles offline.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
