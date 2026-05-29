import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Box, FlaskConical, Calculator, User, Users, ChevronRight } from 'lucide-react-native';

type MenuItem = {
  icon: React.ComponentType<{ size: number; stroke: string }>;
  label: string;
  desc: string;
  color: string;
  bg: string;
  ruta: string | null;
  proximamente?: boolean;
};

const MENU: MenuItem[] = [
  {
    icon: Box,
    label: 'Materias Primas',
    desc: 'Información nutricional y propiedades funcionales',
    color: '#166534',
    bg: '#dcfce7',
    ruta: '/(tabs)/materias',
  },
  {
    icon: FlaskConical,
    label: 'Productos Agroindustriales',
    desc: 'Procesos técnicos completos de transformación',
    color: '#166534',
    bg: '#dcfce7',
    ruta: '/(tabs)/productos',
  },
  {
    icon: Calculator,
    label: 'Calculadora de Costos',
    desc: 'Análisis económico y rentabilidad',
    color: '#1d4ed8',
    bg: '#dbeafe',
    ruta: '/(tabs)/costos',
  },
  {
    icon: User,
    label: 'Mi Perfil',
    desc: 'Configuración y datos del productor',
    color: '#7c3aed',
    bg: '#ede9fe',
    ruta: '/(tabs)/perfil',
  },
  {
    icon: Users,
    label: 'Red de Productores',
    desc: 'Comunidad y experiencias compartidas',
    color: '#0f766e',
    bg: '#ccfbf1',
    ruta: null,
    proximamente: true,
  },
];

export default function Inicio() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-verde-800 px-6 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-white text-2xl font-bold tracking-wide">AGRO-NET</Text>
            <View className="bg-verde-700 rounded-lg px-3 py-1">
              <Text className="text-verde-200 text-xs font-semibold">AGRO-NET</Text>
            </View>
          </View>
          <Text className="text-verde-300 text-xs font-semibold tracking-widest mb-3">
            CREA, CONSERVA Y EMPRENDE
          </Text>
          <Text className="text-verde-100 text-sm">Plataforma Agroindustrial Profesional</Text>
        </View>

        {/* Lista de menú */}
        <View className="px-4 pt-4 gap-3">
          {MENU.map((item) => {
            const Icon = item.icon;
            return (
              <Pressable
                key={item.label}
                onPress={() => item.ruta
                  ? router.push(item.ruta as any)
                  : Alert.alert('Próximamente', 'La Red de Productores estará disponible en la siguiente versión de AGRO-NET.')
                }
                className={`flex-row items-center bg-white rounded-2xl p-4 border border-gray-100 active:opacity-75 ${item.proximamente ? 'opacity-60' : ''}`}
                style={{ shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 1 }}
              >
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                  style={{ backgroundColor: item.bg }}
                >
                  <Icon size={24} stroke={item.color} />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-gray-900 font-semibold text-sm mb-0.5">{item.label}</Text>
                    {item.proximamente && (
                      <View className="bg-gray-100 rounded-full px-2 py-0.5">
                        <Text className="text-gray-500 text-xs font-medium">Próximamente</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-gray-500 text-xs leading-4">{item.desc}</Text>
                </View>
                <ChevronRight size={18} stroke="#9ca3af" />
              </Pressable>
            );
          })}
        </View>

        {/* Footer */}
        <View className="mx-4 mt-5 mb-6 bg-verde-50 rounded-xl p-4 border border-verde-100">
          <Text className="text-verde-700 text-xs text-center leading-5">
            Información basada en{' '}
            <Text className="font-semibold text-verde-800">parámetros clave y normas oficiales mexicanas (NOM, CODEX)</Text>
            {' '}integrada en cada producto agroindustrial.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
