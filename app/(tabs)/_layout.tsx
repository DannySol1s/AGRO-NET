import { Tabs } from 'expo-router';
import { Home, Leaf, ShieldCheck, Users } from 'lucide-react-native';

const VERDE = '#166534';
const VERDE_INACTIVO = '#86efac';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: VERDE,
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#dcfce7',
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
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
          title: 'Mis Materias',
          tabBarIcon: ({ color, size }) => <Leaf size={size} stroke={color} />,
        }}
      />
      <Tabs.Screen
        name="calidad"
        options={{
          title: 'Calidad',
          tabBarIcon: ({ color, size }) => <ShieldCheck size={size} stroke={color} />,
        }}
      />
      <Tabs.Screen
        name="comunidad"
        options={{
          title: 'Comunidad',
          tabBarIcon: ({ color, size }) => <Users size={size} stroke={color} />,
        }}
      />
    </Tabs>
  );
}
