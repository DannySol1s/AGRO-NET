import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useUsuarioStore, type HerramientaDisponible, type NivelExperiencia } from '@/store/usuario';

const HERRAMIENTAS: { id: HerramientaDisponible; label: string }[] = [
  { id: 'olla_grande',    label: 'Olla grande' },
  { id: 'licuadora',      label: 'Licuadora' },
  { id: 'cuchillos',      label: 'Cuchillos' },
  { id: 'tabla_cortar',   label: 'Tabla de cortar' },
  { id: 'bascula',        label: 'Báscula' },
  { id: 'termometro',     label: 'Termómetro' },
  { id: 'envases_frascos',label: 'Envases/Frascos' },
  { id: 'refrigerador',   label: 'Refrigerador' },
];

const NIVELES: { id: NivelExperiencia; label: string; desc: string }[] = [
  { id: 'principiante', label: 'Principiante', desc: 'Primera vez transformando' },
  { id: 'medio',        label: 'Intermedio',   desc: 'He hecho algunos productos' },
  { id: 'avanzado',     label: 'Avanzado',     desc: 'Tengo experiencia' },
];

export default function Perfil() {
  const {
    herramientas, toggleHerramienta,
    nivelExperiencia, setNivelExperiencia,
    cantidadKg, setCantidadKg,
    resetDiagnostico,
  } = useUsuarioStore();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="bg-verde-800 px-6 pt-4 pb-5">
        <Pressable onPress={() => router.back()} className="mb-3 self-start">
          <ChevronLeft size={24} stroke="#bbf7d0" />
        </Pressable>
        <View className="flex-row items-center gap-3">
          <View className="bg-verde-700 rounded-xl p-2">
            <Text className="text-xl">⚖️</Text>
          </View>
          <View>
            <Text className="text-white text-lg font-bold">Evaluación de Capacidades</Text>
            <Text className="text-verde-300 text-xs">Recursos técnicos y nivel de producción</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-5" showsVerticalScrollIndicator={false}>

        {/* Cantidad disponible */}
        <View className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100">
          <View className="flex-row items-center gap-2 mb-3">
            <Text className="text-lg">⚖️</Text>
            <Text className="text-gray-700 font-semibold text-sm">Cantidad disponible (kg)</Text>
          </View>
          <TextInput
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm"
            placeholder="Ej: 50"
            placeholderTextColor="#d1d5db"
            keyboardType="numeric"
            value={cantidadKg}
            onChangeText={setCantidadKg}
          />
        </View>

        {/* Herramientas */}
        <View className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100">
          <View className="flex-row items-center gap-2 mb-3">
            <Text className="text-lg">🔧</Text>
            <Text className="text-gray-700 font-semibold text-sm">Herramientas disponibles</Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {HERRAMIENTAS.map((h) => {
              const activa = herramientas.includes(h.id);
              return (
                <Pressable
                  key={h.id}
                  onPress={() => toggleHerramienta(h.id)}
                  className={`px-3 py-2 rounded-xl border ${
                    activa ? 'bg-verde-100 border-verde-400' : 'bg-white border-gray-200'
                  }`}
                >
                  <Text className={`text-xs font-medium ${activa ? 'text-verde-800' : 'text-gray-600'}`}>
                    {h.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Nivel de experiencia */}
        <View className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
          <View className="flex-row items-center gap-2 mb-3">
            <Text className="text-lg">🏅</Text>
            <Text className="text-gray-700 font-semibold text-sm">Nivel de experiencia</Text>
          </View>
          <View className="gap-2">
            {NIVELES.map((n) => {
              const activo = nivelExperiencia === n.id;
              return (
                <Pressable
                  key={n.id}
                  onPress={() => setNivelExperiencia(n.id)}
                  className={`flex-row items-center p-4 rounded-xl border-2 ${
                    activo ? 'bg-verde-50 border-verde-500' : 'bg-white border-gray-100'
                  }`}
                >
                  <View className="flex-1">
                    <Text className={`font-semibold text-sm ${activo ? 'text-verde-800' : 'text-gray-700'}`}>
                      {n.label}
                    </Text>
                    <Text className={`text-xs mt-0.5 ${activo ? 'text-verde-600' : 'text-gray-400'}`}>
                      {n.desc}
                    </Text>
                  </View>
                  <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                    activo ? 'border-verde-600 bg-verde-600' : 'border-gray-300 bg-white'
                  }`}>
                    {activo && <View className="w-2 h-2 rounded-full bg-white" />}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Reconfigurar perfil */}
        <Pressable
          onPress={() => { resetDiagnostico(); router.replace('/diagnostico'); }}
          className="mx-0 mb-6 py-4 rounded-2xl border-2 border-red-200 bg-red-50 items-center active:opacity-70"
        >
          <Text className="text-red-600 font-semibold text-sm">Reconfigurar perfil</Text>
          <Text className="text-red-400 text-xs mt-0.5">Reinicia herramientas y nivel de experiencia</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}
