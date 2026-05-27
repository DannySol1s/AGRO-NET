import { View, Text, Pressable, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { Sprout } from 'lucide-react-native';

export default function Bienvenida() {
  return (
    <View className="flex-1 bg-verde-800">
      <StatusBar barStyle="light-content" backgroundColor="#166534" />

      <View className="flex-1 items-center justify-center px-8">
        <View className="bg-verde-700 rounded-full p-8 mb-6">
          <Sprout size={72} stroke="#bbf7d0" />
        </View>

        <Text className="text-white text-4xl font-bold text-center mb-2">
          AGRO-NET
        </Text>

        <Text className="text-verde-200 text-base text-center mb-2">
          Productos Agroindustriales
        </Text>

        <View className="w-16 h-1 bg-cosecha-400 rounded-full my-6" />

        <Text className="text-white text-xl font-semibold text-center leading-8 px-4">
          "Transforma tu cosecha,{'\n'}transforma tu futuro"
        </Text>

        <Text className="text-verde-200 text-sm text-center mt-4 leading-5">
          Aprende a elaborar más de 100 productos{'\n'}
          directamente de tu parcela, sin equipos avanzados.
        </Text>
      </View>

      <View className="px-8 pb-12">
        <Pressable
          onPress={() => router.push('/diagnostico')}
          className="bg-cosecha-500 rounded-2xl py-5 items-center active:opacity-80"
        >
          <Text className="text-verde-900 text-xl font-bold">Comenzar</Text>
        </Pressable>
      </View>
    </View>
  );
}
