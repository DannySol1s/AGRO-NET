import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function NotFound() {
  return (
    <View className="flex-1 items-center justify-center bg-verde-50 px-8">
      <Text className="text-5xl mb-4">🌾</Text>
      <Text className="text-verde-900 text-xl font-bold text-center mb-2">
        Pantalla no encontrada
      </Text>
      <Text className="text-tierra-600 text-sm text-center mb-8">
        La ruta que buscas no existe en AGRO-NET.
      </Text>
      <Pressable
        onPress={() => router.replace('/(tabs)/inicio')}
        className="bg-verde-700 px-8 py-4 rounded-2xl"
      >
        <Text className="text-white font-bold">Volver al inicio</Text>
      </Pressable>
    </View>
  );
}
