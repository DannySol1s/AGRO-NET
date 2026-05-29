import { Tabs } from 'expo-router';
import { Home, Box, FlaskConical, Calculator, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const VERDE = '#166534';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: VERDE,
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#dcfce7',
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 4),
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="inicio"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Home size={size} stroke={color} />,
        }}
      />
      <Tabs.Screen
        name="materias"
        options={{
          title: 'Materias',
          tabBarIcon: ({ color, size }) => <Box size={size} stroke={color} />,
        }}
      />
      <Tabs.Screen
        name="productos"
        options={{
          title: 'Productos',
          tabBarIcon: ({ color, size }) => <FlaskConical size={size} stroke={color} />,
        }}
      />
      <Tabs.Screen
        name="costos"
        options={{
          title: 'Costos',
          tabBarIcon: ({ color, size }) => <Calculator size={size} stroke={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <User size={size} stroke={color} />,
        }}
      />
      {/* Rutas accesibles por código pero sin tab visible */}
      <Tabs.Screen name="calidad" options={{ href: null }} />
      <Tabs.Screen name="comunidad" options={{ href: null }} />
    </Tabs>
  );
}
