import { View, Text, SafeAreaView } from 'react-native';
import { Users } from 'lucide-react-native';

export default function Comunidad() {
  return (
    <SafeAreaView className="flex-1 bg-verde-50">
      <View className="bg-verde-800 px-6 pt-12 pb-6">
        <Text className="text-verde-200 text-sm mb-1">Conecta con otros productores</Text>
        <Text className="text-white text-2xl font-bold">Comunidad</Text>
      </View>

      <View className="flex-1 items-center justify-center px-8">
        <View className="bg-verde-100 rounded-full p-8 mb-6">
          <Users size={56} color="#166534" />
        </View>
        <Text className="text-verde-900 text-xl font-bold text-center mb-3">
          Próximamente
        </Text>
        <Text className="text-tierra-600 text-sm text-center leading-6">
          Pronto podrás compartir tus experiencias, fotos de productos y conectar con otros productores de tu región.
        </Text>
        <View className="bg-cosecha-400 rounded-xl px-5 py-3 mt-8">
          <Text className="text-verde-900 font-bold text-sm text-center">
            🚀 Fase 2 — En desarrollo
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
