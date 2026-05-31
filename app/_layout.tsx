import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontError, setFontError] = useState<string | null>(null);

  const [loaded, error] = useFonts({
    Poppins_400Regular:  require('../assets/fonts/Poppins_400Regular.ttf'),
    Poppins_500Medium:   require('../assets/fonts/Poppins_500Medium.ttf'),
    Poppins_600SemiBold: require('../assets/fonts/Poppins_600SemiBold.ttf'),
  });

  // useEffect no puede lanzar hacia un ErrorBoundary externo —
  // capturamos el error de fuentes aquí y renderizamos UI de recuperación
  useEffect(() => {
    if (error) setFontError(error.message);
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (fontError) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <Text style={{ fontSize: 36, marginBottom: 16 }}>⚠️</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, color: '#1F3D36' }}>
          Error al cargar fuentes
        </Text>
        <Text style={{ fontSize: 13, color: '#5c5248', textAlign: 'center', marginBottom: 24 }}>
          {fontError}
        </Text>
        <Pressable
          onPress={() => setFontError(null)}
          style={{ backgroundColor: '#1F3D36', borderRadius: 16, paddingHorizontal: 32, paddingVertical: 14 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  if (!loaded) return null;

  return (
    <ErrorBoundary>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="bienvenida" />
        <Stack.Screen name="diagnostico" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ErrorBoundary>
  );
}
