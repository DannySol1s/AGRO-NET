import { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { router } from 'expo-router';
import { useUsuarioStore } from '@/store/usuario';
import { initDatabase } from '@/db/client';
import { seedDatabase } from '@/db/seed/runner';

function LeafSVG() {
  return (
    <View style={{ width: 92, height: 92, alignItems: 'center', justifyContent: 'center' }}>
      {/* Representación del leaf mark con View shapes */}
      <Text style={{ fontSize: 56 }}>🌱</Text>
    </View>
  );
}

export default function Splash() {
  const onboardingCompleto = useUsuarioStore((s) => s.onboardingCompleto);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(14)).current;
  const dotAnim   = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
    ]).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(dotAnim, { toValue: 1,   duration: 600, useNativeDriver: true }),
        Animated.timing(dotAnim, { toValue: 0.3, duration: 600, useNativeDriver: true }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212', paddingHorizontal: 32 }}>
        <Text style={{ color: '#F4F1EA', fontSize: 20, fontWeight: '600', textAlign: 'center', marginBottom: 8 }}>
          No se pudo iniciar la app
        </Text>
        <Text style={{ color: '#6E7E66', fontSize: 13, textAlign: 'center', marginBottom: 32, lineHeight: 20 }}>{error}</Text>
        <Pressable
          onPress={() => setIntento((n) => n + 1)}
          style={{ backgroundColor: '#9E5A38', borderRadius: 20, paddingVertical: 14, paddingHorizontal: 40 }}
        >
          <Text style={{ color: '#F7F2EC', fontWeight: '600', fontSize: 15 }}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212' }}>
      <Animated.View style={{ alignItems: 'center', opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <LeafSVG />
        <Text style={{ color: '#F4F1EA', fontSize: 38, fontWeight: '600', letterSpacing: 1, marginTop: 20 }}>
          AGRO-NET
        </Text>
        <View style={{ width: 56, height: 1, backgroundColor: 'rgba(147,179,111,0.5)', marginVertical: 12 }} />
        <Text style={{ color: '#9BB585', fontSize: 12.5, fontWeight: '300', letterSpacing: 3 }}>
          CREA, CONSERVA Y EMPRENDE
        </Text>
      </Animated.View>

      <Animated.View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 64, opacity: fadeAnim }}>
        <Animated.View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#9E5A38', opacity: dotAnim }} />
        <Text style={{ color: '#6E7E66', fontSize: 11, fontWeight: '300' }}>Cargando plataforma…</Text>
      </Animated.View>
    </View>
  );
}
