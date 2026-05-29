import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { TrendingUp, Award, Calculator } from 'lucide-react-native';

const FEATURES = [
  { icon: TrendingUp, label: 'Formulaciones Técnicas', desc: 'Procesos profesionales con parámetros de calidad' },
  { icon: Award,      label: 'Normativas Oficiales',   desc: 'NOM, CODEX y certificaciones de calidad' },
  { icon: Calculator, label: 'Análisis Económico',     desc: 'Costos, rendimientos y estrategias de comercialización' },
];

export default function Bienvenida() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-8 items-center justify-center">
        {/* Logo */}
        <View className="w-24 h-24 bg-gray-100 rounded-3xl items-center justify-center mb-2 border border-gray-200">
          <Text className="text-4xl">🌱</Text>
        </View>

        {/* Título */}
        <Text className="text-verde-700 text-4xl font-bold tracking-widest mt-4 mb-1">
          AGRO-NET
        </Text>
        <Text className="text-verde-500 text-xs font-semibold tracking-widest mb-4">
          CREA, CONSERVA Y EMPRENDE
        </Text>

        <Text className="text-gray-800 text-lg font-semibold text-center mb-1">
          Plataforma Profesional de Transformación Agroalimentaria
        </Text>
        <Text className="text-gray-400 text-sm text-center mb-8">
          Tecnología al servicio del campo mexicano
        </Text>

        {/* Features */}
        <View className="w-full bg-gray-50 rounded-2xl p-4 gap-4 mb-8 border border-gray-100">
          {FEATURES.map(({ icon: Icon, label, desc }) => (
            <View key={label} className="flex-row items-start gap-3">
              <View className="w-8 h-8 bg-verde-100 rounded-lg items-center justify-center mt-0.5">
                <Icon size={16} stroke="#166534" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-800 font-semibold text-sm">{label}</Text>
                <Text className="text-gray-500 text-xs mt-0.5">{desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* CTA */}
      <View className="px-6 pb-8">
        <Pressable
          onPress={() => router.push('/diagnostico')}
          className="bg-verde-700 rounded-2xl py-4 items-center active:opacity-80"
        >
          <Text className="text-white text-base font-bold">Iniciar Plataforma ✨</Text>
        </Pressable>

        <View className="flex-row items-center justify-center gap-2 mt-4">
          <View className="w-2 h-2 rounded-full bg-verde-500" />
          <Text className="text-gray-500 text-xs">Funciona sin conexión</Text>
        </View>
        <Text className="text-gray-400 text-xs text-center mt-1">
          Desarrollado para productores rurales mexicanos
        </Text>
      </View>
    </SafeAreaView>
  );
}
