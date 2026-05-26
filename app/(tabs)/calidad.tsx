import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';

const SECCIONES = [
  {
    emoji: '🧼', titulo: 'Higiene y buenas prácticas', color: '#166534', bg: '#dcfce7',
    items: [
      'Lávate las manos antes y durante el proceso',
      'Usa ropa limpia y cubre el cabello',
      'Limpia y desinfecta utensilios antes de usarlos',
      'No proceses si tienes enfermedad o heridas abiertas',
      'Mantén el área de trabajo libre de insectos y polvo',
    ],
  },
  {
    emoji: '🌡️', titulo: 'Inocuidad alimentaria', color: '#1d4ed8', bg: '#dbeafe',
    items: [
      'Respeta las temperaturas indicadas en cada proceso',
      'No mezcles utensilios de productos crudos con cocidos',
      'Esteriliza frascos antes de envasar',
      'Verifica el sellado hermético de tus productos',
      'Registra lotes con fecha de elaboración y vencimiento',
    ],
  },
  {
    emoji: '📦', titulo: 'Almacenamiento correcto', color: '#a85c12', bg: '#fae8cc',
    items: [
      'Guarda en lugar fresco, seco y sin luz solar directa',
      'Usa recipientes herméticos de vidrio o plástico apto para alimentos',
      'Revisa periódicamente cambios de color, olor o textura',
      'Aplica PEPS: primero que entra, primero que sale',
      'No almacenes junto a productos de limpieza o químicos',
    ],
  },
  {
    emoji: '♻️', titulo: 'Innovación y aprovechamiento de residuos', color: '#7c3aed', bg: '#ede9fe',
    items: [
      'Las cáscaras de frutas pueden usarse para harinas o compost',
      'Los líquidos de cocción son base de caldos o fermentos',
      'Semillas secas pueden convertirse en harinas nutritivas',
      'Los residuos orgánicos alimentan el suelo de tu parcela',
      'Investiga usos alternativos antes de desechar subproductos',
    ],
  },
];

export default function Calidad() {
  return (
    <SafeAreaView className="flex-1 bg-verde-50">
      <View className="bg-verde-800 px-6 pt-12 pb-6">
        <Text className="text-verde-200 text-sm mb-1">Normas y buenas prácticas</Text>
        <Text className="text-white text-2xl font-bold">Calidad e Inocuidad</Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        {SECCIONES.map((s) => (
          <View key={s.titulo} className="bg-white rounded-2xl p-5 mb-4 border border-verde-100">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: s.bg }}>
                <Text className="text-xl">{s.emoji}</Text>
              </View>
              <Text className="text-verde-900 font-bold text-base flex-1">{s.titulo}</Text>
            </View>
            {s.items.map((item, i) => (
              <View key={i} className="flex-row mb-2 gap-2">
                <Text style={{ color: s.color }} className="text-sm font-bold mt-0.5">✓</Text>
                <Text className="text-tierra-700 text-sm flex-1 leading-5">{item}</Text>
              </View>
            ))}
          </View>
        ))}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
