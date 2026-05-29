import { useState } from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight, ChevronLeft } from 'lucide-react-native';
import { useUsuarioStore, type HerramientaDisponible, type NivelExperiencia } from '@/store/usuario';

const HERRAMIENTAS: { id: HerramientaDisponible; label: string; emoji: string }[] = [
  { id: 'olla_grande',    label: 'Olla grande',      emoji: '🫕' },
  { id: 'licuadora',      label: 'Licuadora',         emoji: '🥤' },
  { id: 'cuchillos',      label: 'Cuchillos',         emoji: '🔪' },
  { id: 'tabla_cortar',   label: 'Tabla de cortar',   emoji: '🪵' },
  { id: 'bascula',        label: 'Báscula',            emoji: '⚖️' },
  { id: 'termometro',     label: 'Termómetro',        emoji: '🌡️' },
  { id: 'envases_frascos',label: 'Envases / Frascos', emoji: '🫙' },
  { id: 'refrigerador',   label: 'Refrigerador',      emoji: '🧊' },
];

const NIVELES: { id: NivelExperiencia; label: string; desc: string; emoji: string }[] = [
  { id: 'principiante', label: 'Principiante', desc: 'Nunca he elaborado productos',          emoji: '🌱' },
  { id: 'medio',        label: 'Intermedio',   desc: 'He elaborado algunos productos básicos', emoji: '🌿' },
  { id: 'avanzado',     label: 'Avanzado',     desc: 'Tengo experiencia en procesamiento',    emoji: '🌳' },
];

const PASOS_TOTAL = 3;

export default function Diagnostico() {
  const [paso, setPaso] = useState(1);
  const {
    herramientas, toggleHerramienta,
    nivelExperiencia, setNivelExperiencia,
    setOnboardingCompleto,
  } = useUsuarioStore();

  function avanzar() {
    if (paso < PASOS_TOTAL) setPaso(paso + 1);
    else {
      setOnboardingCompleto(true);
      router.replace('/(tabs)/inicio');
    }
  }

  function retroceder() {
    if (paso > 1) setPaso(paso - 1);
    else router.back();
  }

  return (
    <SafeAreaView className="flex-1 bg-verde-50">
      {/* Header */}
      <View className="bg-verde-800 px-6 pt-12 pb-6">
        <Pressable onPress={retroceder} className="mb-4">
          <ChevronLeft size={24} stroke="#bbf7d0" />
        </Pressable>
        <Text className="text-verde-200 text-sm mb-1">Paso {paso} de {PASOS_TOTAL}</Text>
        <View className="flex-row gap-2">
          {Array.from({ length: PASOS_TOTAL }).map((_, i) => (
            <View
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i < paso ? 'bg-cosecha-400' : 'bg-verde-700'}`}
            />
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>

        {paso === 1 && (
          <View>
            <Text className="text-verde-900 text-2xl font-bold mb-1">¿Qué herramientas tienes?</Text>
            <Text className="text-tierra-600 text-sm mb-6">Selecciona todo lo que tienes disponible</Text>
            {HERRAMIENTAS.map((h) => {
              const activa = herramientas.includes(h.id);
              return (
                <Pressable
                  key={h.id}
                  onPress={() => toggleHerramienta(h.id)}
                  className={`flex-row items-center p-4 rounded-xl mb-3 border-2 ${
                    activa ? 'bg-verde-100 border-verde-600' : 'bg-white border-verde-100'
                  }`}
                >
                  <Text className="text-2xl mr-3">{h.emoji}</Text>
                  <Text className={`text-base flex-1 ${activa ? 'text-verde-800 font-semibold' : 'text-tierra-700'}`}>
                    {h.label}
                  </Text>
                  {activa && <View className="w-5 h-5 rounded-full bg-verde-600 items-center justify-center">
                    <Text className="text-white text-xs font-bold">✓</Text>
                  </View>}
                </Pressable>
              );
            })}
          </View>
        )}

        {paso === 2 && (
          <View>
            <Text className="text-verde-900 text-2xl font-bold mb-1">¿Cuál es tu experiencia?</Text>
            <Text className="text-tierra-600 text-sm mb-6">Esto nos ayuda a recomendarte los procesos más adecuados</Text>
            {NIVELES.map((n) => {
              const activo = nivelExperiencia === n.id;
              return (
                <Pressable
                  key={n.id}
                  onPress={() => setNivelExperiencia(n.id)}
                  className={`p-5 rounded-xl mb-4 border-2 ${
                    activo ? 'bg-verde-100 border-verde-600' : 'bg-white border-verde-100'
                  }`}
                >
                  <Text className="text-3xl mb-2">{n.emoji}</Text>
                  <Text className={`text-lg font-bold mb-1 ${activo ? 'text-verde-800' : 'text-tierra-800'}`}>
                    {n.label}
                  </Text>
                  <Text className={`text-sm ${activo ? 'text-verde-700' : 'text-tierra-600'}`}>
                    {n.desc}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        {paso === 3 && (
          <View className="items-center pt-8">
            <Text className="text-6xl mb-6">🎉</Text>
            <Text className="text-verde-900 text-2xl font-bold text-center mb-3">
              ¡Todo listo!
            </Text>
            <Text className="text-tierra-600 text-base text-center leading-6 mb-8 px-4">
              Tu perfil está configurado. Ahora verás las recomendaciones adaptadas a tus herramientas y experiencia.
            </Text>
            <View className="bg-verde-100 rounded-2xl p-5 w-full">
              <Text className="text-verde-800 font-semibold text-base mb-3">Tu perfil:</Text>
              <Text className="text-tierra-700 mb-1">
                🎯 Nivel: <Text className="font-bold capitalize">{nivelExperiencia}</Text>
              </Text>
              <Text className="text-tierra-700">
                🔧 Herramientas: <Text className="font-bold">{herramientas.length} seleccionadas</Text>
              </Text>
            </View>
          </View>
        )}

        <View className="h-32" />
      </ScrollView>

      {/* Botón fijo abajo */}
      <View className="px-6 pb-8 bg-verde-50">
        <Pressable
          onPress={avanzar}
          className="bg-verde-700 rounded-2xl py-5 flex-row items-center justify-center active:opacity-80"
        >
          <Text className="text-white text-lg font-bold mr-2">
            {paso === PASOS_TOTAL ? 'Empezar a explorar' : 'Continuar'}
          </Text>
          <ChevronRight size={20} stroke="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
