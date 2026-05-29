import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import {
  Box, FlaskConical, Calculator, Users, BookOpen,
  Bell, Mic, ChevronRight,
} from 'lucide-react-native';

type MenuItem = {
  icon: React.ComponentType<{ size: number; stroke: string }>;
  label: string;
  desc: string;
  ruta: string | null;
  proximamente?: boolean;
};

const GRID: MenuItem[] = [
  {
    icon: Box,
    label: 'Materias Primas',
    desc: 'Conoce propiedades y beneficios',
    ruta: '/(tabs)/materias',
  },
  {
    icon: FlaskConical,
    label: 'Productos Agroindustriales',
    desc: 'Explora productos y procesos',
    ruta: '/(tabs)/productos',
  },
  {
    icon: Calculator,
    label: 'Calculadora',
    desc: 'Costos, rendimiento y ganancias',
    ruta: '/(tabs)/costos',
  },
  {
    icon: Users,
    label: 'Comunidad',
    desc: 'Comparte experiencias y aprende',
    ruta: '/(tabs)/comunidad',
    proximamente: true,
  },
];

function handleNav(item: MenuItem) {
  if (!item.ruta) return;
  if (item.proximamente) {
    Alert.alert('Próximamente', 'La Red de Productores estará disponible en la siguiente versión de AGRO-NET.');
    return;
  }
  router.push(item.ruta as any);
}

export default function Inicio() {
  return (
    <SafeAreaView className="flex-1 bg-tierra-50" edges={['top']}>
      {/* ── HEADER ─────────────────────────────── */}
      <View className="bg-verde-800 px-5 pt-3 pb-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 bg-verde-700 rounded-xl items-center justify-center">
              <Text className="text-xl">🌿</Text>
            </View>
            <View>
              <Text
                className="text-white text-xl font-bold tracking-widest"
                style={{ fontFamily: 'Poppins_600SemiBold' }}
              >
                AGRO-NET
              </Text>
              <Text className="text-verde-300 text-xs tracking-widest">
                CONECTA, TRANSFORMA Y CRECE
              </Text>
            </View>
          </View>
          <Pressable className="w-10 h-10 bg-verde-700 rounded-xl items-center justify-center active:opacity-70">
            <Bell size={18} stroke="#d6e2d4" />
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── BIENVENIDA ──────────────────────────── */}
        <View className="bg-verde-800 px-5 pt-2 pb-8">
          <Text
            className="text-white text-2xl"
            style={{ fontFamily: 'Poppins_600SemiBold' }}
          >
            ¡Bienvenido!
          </Text>
          <Text className="text-verde-300 text-sm mt-1">
            ¿Qué deseas hacer hoy?
          </Text>
        </View>

        {/* ── GRID PRINCIPAL ──────────────────────── */}
        <View className="px-4 -mt-4">
          <View className="flex-row flex-wrap gap-3">
            {GRID.map((item) => {
              const Icon = item.icon;
              return (
                <Pressable
                  key={item.label}
                  onPress={() => handleNav(item)}
                  className="active:opacity-75"
                  style={{ width: '47.5%' }}
                >
                  <View
                    className="bg-white rounded-2xl p-4 border border-tierra-200"
                    style={{
                      shadowColor: '#1F3D36',
                      shadowOpacity: 0.08,
                      shadowRadius: 8,
                      shadowOffset: { width: 0, height: 2 },
                      elevation: 2,
                    }}
                  >
                    <View className="w-10 h-10 bg-verde-100 rounded-xl items-center justify-center mb-3">
                      <Icon size={20} stroke="#1F3D36" />
                    </View>
                    <Text
                      className="text-carbon text-sm leading-5 mb-1"
                      style={{ fontFamily: 'Poppins_600SemiBold' }}
                      numberOfLines={2}
                    >
                      {item.label}
                    </Text>
                    <Text className="text-tierra-600 text-xs leading-4" numberOfLines={2}>
                      {item.desc}
                    </Text>
                    <View className="flex-row items-center justify-end mt-2">
                      {item.proximamente ? (
                        <View className="bg-tierra-100 rounded-full px-2 py-0.5">
                          <Text className="text-tierra-600 text-xs">Pronto</Text>
                        </View>
                      ) : (
                        <ChevronRight size={14} stroke="#9E5A38" />
                      )}
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* ── CAPACITACIÓN (full width) ──────────── */}
          <Pressable
            onPress={() => router.push('/(tabs)/calidad' as any)}
            className="mt-3 active:opacity-75"
          >
            <View
              className="bg-white rounded-2xl p-4 border border-tierra-200 flex-row items-center gap-4"
              style={{
                shadowColor: '#1F3D36',
                shadowOpacity: 0.08,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
              }}
            >
              <View className="w-12 h-12 bg-cosecha-400 rounded-xl items-center justify-center">
                <BookOpen size={22} stroke="#fff" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-carbon text-sm mb-0.5"
                  style={{ fontFamily: 'Poppins_600SemiBold' }}
                >
                  Capacitación
                </Text>
                <Text className="text-tierra-600 text-xs leading-4">
                  Aprende con guías, videos y manuales
                </Text>
              </View>
              <ChevronRight size={16} stroke="#9E5A38" />
            </View>
          </Pressable>
        </View>

        {/* ── NOTA NOM/CODEX ──────────────────────── */}
        <View className="mx-4 mt-5 mb-6 bg-verde-800 rounded-2xl p-4">
          <Text className="text-verde-200 text-xs text-center leading-5">
            Información basada en{' '}
            <Text className="font-bold text-verde-100">
              normas oficiales mexicanas (NOM, CODEX)
            </Text>
            {' '}integrada en cada producto.
          </Text>
        </View>
      </ScrollView>

      {/* ── FAB ASISTENTE DE VOZ ─────────────────── */}
      <View className="absolute bottom-8 right-5">
        <Pressable
          onPress={() => Alert.alert('Asistente de voz', 'Próximamente disponible.')}
          className="w-16 h-16 rounded-full bg-cosecha-500 items-center justify-center active:opacity-80"
          style={{
            shadowColor: '#9E5A38',
            shadowOpacity: 0.4,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
          }}
        >
          <Mic size={26} stroke="#fff" />
        </Pressable>
        <Text className="text-tierra-600 text-xs text-center mt-1.5">
          Asistente de voz
        </Text>
      </View>
    </SafeAreaView>
  );
}
