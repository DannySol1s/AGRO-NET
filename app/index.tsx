import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useUsuarioStore } from '@/store/usuario';
import { initDatabase } from '@/db/client';
import { seedDatabase } from '@/db/seed/runner';

export default function Splash() {
  const onboardingCompleto = useUsuarioStore((s) => s.onboardingCompleto);

  useEffect(() => {
    async function init() {
      await initDatabase();
      await seedDatabase();
      if (onboardingCompleto) {
        router.replace('/(tabs)/inicio');
      } else {
        router.replace('/bienvenida');
      }
    }
    init();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-verde-800">
      <Text className="text-5xl mb-2">🌱</Text>
      <Text className="text-white text-2xl font-bold tracking-widest">AGRO-NET</Text>
    </View>
  );
}
