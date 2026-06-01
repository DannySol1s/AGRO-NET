import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useUsuarioStore, type HerramientaDisponible, type NivelExperiencia } from '@/store/usuario';

const HERRAMIENTAS: { id: HerramientaDisponible; label: string; emoji: string }[] = [
  { id: 'olla_grande',         label: 'Olla grande',              emoji: '🫕' },
  { id: 'estufa',              label: 'Estufa',                   emoji: '🔥' },
  { id: 'licuadora',           label: 'Licuadora',                emoji: '🥤' },
  { id: 'cuchillos',           label: 'Cuchillos',                emoji: '🔪' },
  { id: 'tabla_cortar',        label: 'Tabla de cortar',          emoji: '🪵' },
  { id: 'bascula',             label: 'Báscula',                  emoji: '⚖️' },
  { id: 'termometro',          label: 'Termómetro',               emoji: '🌡️' },
  { id: 'envases_frascos',     label: 'Envases / Frascos',        emoji: '🫙' },
  { id: 'refrigerador',        label: 'Refrigerador',             emoji: '🧊' },
  { id: 'recipientes_plasticos', label: 'Recipientes plásticos',  emoji: '🪣' },
  { id: 'cucharas_acero',      label: 'Cucharas de acero',        emoji: '🥄' },
  { id: 'pelador',             label: 'Pelador',                  emoji: '🫛' },
  { id: 'rallador',            label: 'Rallador',                 emoji: '🧀' },
  { id: 'molino_mano',         label: 'Molino de mano',           emoji: '⚙️' },
  { id: 'exprimidor',          label: 'Exprimidor',               emoji: '🍋' },
  { id: 'colador',             label: 'Colador',                  emoji: '🫧' },
  { id: 'vasos_medidores',     label: 'Vasos medidores',          emoji: '🥛' },
  { id: 'pinzas_cocina',       label: 'Pinzas de cocina',         emoji: '🦾' },
  { id: 'embudo',              label: 'Embudo',                   emoji: '🔻' },
];

const NIVELES: { id: NivelExperiencia; label: string; desc: string; emoji: string }[] = [
  { id: 'principiante', label: 'Principiante', desc: 'Primera vez transformando', emoji: '🌱' },
  { id: 'medio',        label: 'Intermedio',   desc: 'He hecho algunos productos', emoji: '🌿' },
  { id: 'avanzado',     label: 'Avanzado',     desc: 'Tengo experiencia',          emoji: '🌳' },
];

export default function Perfil() {
  const {
    nombre, setNombre,
    municipio, setMunicipio,
    herramientas, toggleHerramienta,
    nivelExperiencia, setNivelExperiencia,
    cantidadKg, setCantidadKg,
    resetDiagnostico,
  } = useUsuarioStore();

  return (
    <SafeAreaView className="flex-1 bg-tierra-50" edges={['top']}>
      {/* Header */}
      <View className="bg-verde-800 px-6 pt-4 pb-5">
        <Pressable onPress={() => router.back()} className="mb-3 self-start">
          <ChevronLeft size={24} stroke="#d6e2d4" />
        </Pressable>
        <View className="flex-row items-center gap-3">
          <View className="bg-verde-700 rounded-xl p-2">
            <Text className="text-xl">👤</Text>
          </View>
          <View>
            <Text className="text-white text-lg font-bold" style={{ fontFamily: 'Poppins_600SemiBold' }}>
              Mi Perfil
            </Text>
            <Text className="text-verde-300 text-xs">Recursos técnicos y nivel de producción</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-5" showsVerticalScrollIndicator={false}>

        {/* Datos personales */}
        <View className="bg-white rounded-2xl p-4 mb-4 border border-tierra-200">
          <Text className="text-carbon font-bold text-sm mb-3" style={{ fontFamily: 'Poppins_600SemiBold' }}>
            👤 Datos del productor
          </Text>
          <View className="gap-3">
            <View>
              <Text className="text-tierra-700 text-xs mb-1.5">Nombre</Text>
              <TextInput
                className="bg-tierra-50 border border-tierra-200 rounded-xl px-4 py-3 text-carbon text-sm"
                placeholder="Tu nombre"
                placeholderTextColor="#a8a098"
                value={nombre}
                onChangeText={setNombre}
              />
            </View>
            <View>
              <Text className="text-tierra-700 text-xs mb-1.5">Municipio o comunidad</Text>
              <TextInput
                className="bg-tierra-50 border border-tierra-200 rounded-xl px-4 py-3 text-carbon text-sm"
                placeholder="Ej: Escárcega, Campeche"
                placeholderTextColor="#a8a098"
                value={municipio}
                onChangeText={setMunicipio}
              />
            </View>
          </View>
        </View>

        {/* Cantidad disponible */}
        <View className="bg-white rounded-2xl p-4 mb-4 border border-tierra-200">
          <Text className="text-carbon font-bold text-sm mb-3" style={{ fontFamily: 'Poppins_600SemiBold' }}>
            ⚖️ Cantidad disponible (kg)
          </Text>
          <TextInput
            className="bg-tierra-50 border border-tierra-200 rounded-xl px-4 py-3 text-carbon text-sm"
            placeholder="Ej: 50"
            placeholderTextColor="#a8a098"
            keyboardType="numeric"
            value={cantidadKg}
            onChangeText={setCantidadKg}
          />
        </View>

        {/* Herramientas */}
        <View className="bg-white rounded-2xl p-4 mb-4 border border-tierra-200">
          <Text className="text-carbon font-bold text-sm mb-3" style={{ fontFamily: 'Poppins_600SemiBold' }}>
            🔧 Herramientas disponibles
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {HERRAMIENTAS.map((h) => {
              const activa = herramientas.includes(h.id);
              return (
                <Pressable
                  key={h.id}
                  onPress={() => toggleHerramienta(h.id)}
                  className={`flex-row items-center gap-1.5 px-3 py-2 rounded-xl border ${
                    activa ? 'bg-verde-100 border-verde-500' : 'bg-tierra-50 border-tierra-200'
                  }`}
                >
                  <Text className="text-sm">{h.emoji}</Text>
                  <Text className={`text-xs font-medium ${activa ? 'text-verde-800' : 'text-tierra-700'}`}>
                    {h.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Text className="text-tierra-500 text-xs mt-3">
            {herramientas.length} de {HERRAMIENTAS.length} herramientas seleccionadas
          </Text>
        </View>

        {/* Nivel de experiencia */}
        <View className="bg-white rounded-2xl p-4 mb-4 border border-tierra-200">
          <Text className="text-carbon font-bold text-sm mb-3" style={{ fontFamily: 'Poppins_600SemiBold' }}>
            🏅 Nivel de experiencia
          </Text>
          <View className="gap-2">
            {NIVELES.map((n) => {
              const activo = nivelExperiencia === n.id;
              return (
                <Pressable
                  key={n.id}
                  onPress={() => setNivelExperiencia(n.id)}
                  className={`flex-row items-center p-4 rounded-xl border-2 ${
                    activo ? 'bg-verde-50 border-verde-500' : 'bg-tierra-50 border-tierra-100'
                  }`}
                >
                  <Text className="text-2xl mr-3">{n.emoji}</Text>
                  <View className="flex-1">
                    <Text className={`font-semibold text-sm ${activo ? 'text-verde-800' : 'text-carbon'}`}>
                      {n.label}
                    </Text>
                    <Text className={`text-xs mt-0.5 ${activo ? 'text-verde-600' : 'text-tierra-500'}`}>
                      {n.desc}
                    </Text>
                  </View>
                  <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                    activo ? 'border-verde-600 bg-verde-600' : 'border-tierra-300 bg-white'
                  }`}>
                    {activo && <View className="w-2 h-2 rounded-full bg-white" />}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Reconfigurar */}
        <Pressable
          onPress={() => { resetDiagnostico(); router.replace('/diagnostico'); }}
          className="mb-6 py-4 rounded-2xl border-2 border-red-200 bg-red-50 items-center active:opacity-70"
        >
          <Text className="text-red-600 font-semibold text-sm">Reconfigurar perfil</Text>
          <Text className="text-red-400 text-xs mt-0.5">Reinicia herramientas y nivel de experiencia</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}
