import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useUsuarioStore } from '@/store/usuario';
import { initDatabase } from '@/db/client';
import { seedDatabase } from '@/db/seed/runner';

export default function Splash() {
  const onboardingCompleto = useUsuarioStore((s) => s.onboardingCompleto);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let activo = true;

    async function init() {
      setError(null);
      try {
        await initDatabase();
        await seedDatabase();
        if (!activo) return;
        router.replace(onboardingCompleto ? '/(tabs)/inicio' : '/bienvenida');
      } catch (e) {
        if (!activo) return;
        setError(e instanceof Error ? e.message : 'Error al inicializar la app');
      }
    }

    init();
    return () => { activo = false; };
  }, [intento]);

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-verde-800 px-8">
        <Text className="text-white text-xl font-bold text-center mb-3">
          No se pudo iniciar la app
        </Text>
        <Text className="text-verde-300 text-sm text-center mb-8 leading-5">{error}</Text>
        <Pressable
          onPress={() => setIntento((n) => n + 1)}
          className="bg-cosecha-500 rounded-2xl py-4 px-10 active:opacity-80"
        >
          <Text className="text-verde-900 font-bold text-base">Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-verde-800">
      <Text className="text-5xl mb-2">🌱</Text>
      <Text className="text-white text-2xl font-bold tracking-widest">AGRO-NET</Text>
    </View>
  );
}
