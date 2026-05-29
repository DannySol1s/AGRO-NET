import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_400Regular:  require('../assets/fonts/Poppins_400Regular.ttf'),
    Poppins_500Medium:   require('../assets/fonts/Poppins_500Medium.ttf'),
    Poppins_600SemiBold: require('../assets/fonts/Poppins_600SemiBold.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

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
