import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react-native';

type Pregunta = {
  pregunta: string;
  opciones:  string[];
  correcta:  number;
  explicacion: string;
};

type Seccion = {
  emoji:    string;
  titulo:   string;
  color:    string;
  bg:       string;
  items:    string[];
  quiz:     Pregunta;
};

const SECCIONES: Seccion[] = [
  {
    emoji: '🧼',
    titulo: 'Higiene y buenas prácticas',
    color: '#2d4030',
    bg: '#d6e2d4',
    items: [
      'Lávate las manos antes y durante el proceso',
      'Usa ropa limpia y cubre el cabello',
      'Limpia y desinfecta utensilios antes de usarlos',
      'No proceses si tienes enfermedad o heridas abiertas',
      'Mantén el área de trabajo libre de insectos y polvo',
    ],
    quiz: {
      pregunta: '¿Cuándo se deben lavar las manos durante el proceso?',
      opciones: [
        'Solo al inicio del proceso',
        'Antes y después de cada etapa crítica',
        'Solo cuando estén visiblemente sucias',
      ],
      correcta: 1,
      explicacion: 'Las manos deben lavarse antes y después de cada etapa crítica, especialmente al cambiar entre materias primas crudas y productos procesados.',
    },
  },
  {
    emoji: '🌡️',
    titulo: 'Inocuidad alimentaria',
    color: '#1d4ed8',
    bg: '#dbeafe',
    items: [
      'Respeta las temperaturas indicadas en cada proceso',
      'No mezcles utensilios de productos crudos con cocidos',
      'Esteriliza frascos antes de envasar',
      'Verifica el sellado hermético de tus productos',
      'Registra lotes con fecha de elaboración y vencimiento',
    ],
    quiz: {
      pregunta: '¿A qué temperatura mínima se pasteuriza una mermelada?',
      opciones: [
        '60°C durante 5 minutos',
        '85–100°C durante 15–20 minutos',
        'Temperatura ambiente es suficiente',
      ],
      correcta: 1,
      explicacion: 'La pasteurización de mermeladas requiere mantener los frascos a 85–100°C durante 15–20 minutos para eliminar microorganismos y crear el vacío de sellado.',
    },
  },
  {
    emoji: '📦',
    titulo: 'Almacenamiento correcto',
    color: '#92400e',
    bg: '#fef3c7',
    items: [
      'Guarda en lugar fresco, seco y sin luz solar directa',
      'Usa recipientes herméticos de vidrio o plástico apto para alimentos',
      'Revisa periódicamente cambios de color, olor o textura',
      'Aplica PEPS: primero que entra, primero que sale',
      'No almacenes junto a productos de limpieza o químicos',
    ],
    quiz: {
      pregunta: '¿Qué significa PEPS en el almacenamiento de alimentos?',
      opciones: [
        'Primero en producirse, primero en salir',
        'Primero en entrar, primero en salir',
        'Producto empacado, producto sellado',
      ],
      correcta: 1,
      explicacion: 'PEPS (Primero en Entrar, Primero en Salir) garantiza que los productos más antiguos se consuman o vendan antes, reduciendo mermas por vencimiento.',
    },
  },
  {
    emoji: '♻️',
    titulo: 'Aprovechamiento de residuos',
    color: '#6d28d9',
    bg: '#ede9fe',
    items: [
      'Las cáscaras de frutas pueden usarse para harinas o compost',
      'Los líquidos de cocción son base de caldos o fermentos',
      'Semillas secas pueden convertirse en harinas nutritivas',
      'Los residuos orgánicos alimentan el suelo de tu parcela',
      'Investiga usos alternativos antes de desechar subproductos',
    ],
    quiz: {
      pregunta: '¿Cuál de estas opciones es un buen uso para las cáscaras de frutas sobrantes?',
      opciones: [
        'Desecharlas directamente a la basura',
        'Convertirlas en harina deshidratada o compost',
        'Guardarlas indefinidamente sin procesarlas',
      ],
      correcta: 1,
      explicacion: 'Las cáscaras deshidratadas y molidas pueden convertirse en harinas con valor nutritivo y comercial, o incorporarse al compost para mejorar el suelo.',
    },
  },
];

type QuizState = { respondida: boolean; seleccion: number | null };

export default function Calidad() {
  const [seccionAbierta, setSeccionAbierta] = useState<number | null>(0);
  const [quizStates, setQuizStates] = useState<QuizState[]>(
    SECCIONES.map(() => ({ respondida: false, seleccion: null }))
  );

  function responder(secIdx: number, opcionIdx: number) {
    if (quizStates[secIdx].respondida) return;
    setQuizStates((prev) =>
      prev.map((q, i) => i === secIdx ? { respondida: true, seleccion: opcionIdx } : q)
    );
  }

  const totalCorrectas = quizStates.filter(
    (q, i) => q.respondida && q.seleccion === SECCIONES[i].quiz.correcta
  ).length;

  return (
    <SafeAreaView className="flex-1 bg-tierra-50" edges={['top']}>
      {/* Header */}
      <View className="bg-verde-800 px-6 pt-4 pb-5">
        <Pressable onPress={() => router.back()} className="mb-3 self-start">
          <ChevronLeft size={24} stroke="#d6e2d4" />
        </Pressable>
        <View className="flex-row items-center gap-3">
          <View className="bg-verde-700 rounded-xl p-2">
            <Text className="text-xl">✅</Text>
          </View>
          <View className="flex-1">
            <Text className="text-white text-lg font-bold" style={{ fontFamily: 'Poppins_600SemiBold' }}>
              Calidad e Inocuidad
            </Text>
            <Text className="text-verde-300 text-xs">Normas y buenas prácticas</Text>
          </View>
          {quizStates.some((q) => q.respondida) && (
            <View className="bg-cosecha-500 rounded-xl px-3 py-1">
              <Text className="text-white text-xs font-bold">{totalCorrectas}/{SECCIONES.length} ✓</Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-4 pb-8 gap-3">
          {SECCIONES.map((s, secIdx) => {
            const abierta = seccionAbierta === secIdx;
            const quiz = quizStates[secIdx];

            return (
              <View key={s.titulo} className="bg-white rounded-2xl border border-tierra-200 overflow-hidden">
                {/* Header de sección */}
                <Pressable
                  onPress={() => setSeccionAbierta(abierta ? null : secIdx)}
                  className="flex-row items-center p-4 gap-3 active:opacity-80"
                >
                  <View className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: s.bg }}>
                    <Text className="text-xl">{s.emoji}</Text>
                  </View>
                  <Text className="text-carbon font-bold text-sm flex-1" style={{ fontFamily: 'Poppins_600SemiBold' }}>
                    {s.titulo}
                  </Text>
                  {quiz.respondida && (
                    <Text className="text-lg mr-1">
                      {quiz.seleccion === s.quiz.correcta ? '✅' : '❌'}
                    </Text>
                  )}
                  {abierta
                    ? <ChevronUp size={18} stroke="#5c5248" />
                    : <ChevronDown size={18} stroke="#5c5248" />
                  }
                </Pressable>

                {abierta && (
                  <View className="px-4 pb-4">
                    {/* Buenas prácticas */}
                    {s.items.map((item, i) => (
                      <View key={i} className="flex-row mb-2.5 gap-2">
                        <Text style={{ color: s.color }} className="text-sm font-bold mt-0.5">✓</Text>
                        <Text className="text-tierra-700 text-sm flex-1 leading-5">{item}</Text>
                      </View>
                    ))}

                    {/* Quiz */}
                    <View className="mt-4 bg-tierra-50 rounded-2xl p-4 border border-tierra-200">
                      <Text className="text-carbon font-bold text-sm mb-3" style={{ fontFamily: 'Poppins_600SemiBold' }}>
                        🧠 Pregunta rápida
                      </Text>
                      <Text className="text-carbon text-sm mb-3 leading-5">{s.quiz.pregunta}</Text>

                      <View className="gap-2">
                        {s.quiz.opciones.map((opcion, opIdx) => {
                          const esCorrecta = opIdx === s.quiz.correcta;
                          const seleccionada = quiz.seleccion === opIdx;
                          let estilo = 'bg-white border-tierra-200';
                          if (quiz.respondida) {
                            if (esCorrecta) estilo = 'bg-verde-100 border-verde-500';
                            else if (seleccionada) estilo = 'bg-red-50 border-red-300';
                          }

                          return (
                            <Pressable
                              key={opIdx}
                              onPress={() => responder(secIdx, opIdx)}
                              disabled={quiz.respondida}
                              className={`flex-row items-center gap-3 p-3 rounded-xl border-2 ${estilo} active:opacity-75`}
                            >
                              <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                                quiz.respondida && esCorrecta ? 'border-verde-600 bg-verde-600' :
                                quiz.respondida && seleccionada ? 'border-red-400 bg-red-400' :
                                'border-tierra-300'
                              }`}>
                                {quiz.respondida && esCorrecta && <Text className="text-white text-xs font-bold">✓</Text>}
                                {quiz.respondida && seleccionada && !esCorrecta && <Text className="text-white text-xs font-bold">✗</Text>}
                              </View>
                              <Text className={`text-sm flex-1 leading-5 ${
                                quiz.respondida && esCorrecta ? 'text-verde-800 font-semibold' :
                                quiz.respondida && seleccionada ? 'text-red-700' :
                                'text-carbon'
                              }`}>
                                {opcion}
                              </Text>
                            </Pressable>
                          );
                        })}
                      </View>

                      {quiz.respondida && (
                        <View className={`mt-3 p-3 rounded-xl ${
                          quiz.seleccion === s.quiz.correcta ? 'bg-verde-100' : 'bg-red-50'
                        }`}>
                          <Text className={`text-xs leading-5 ${
                            quiz.seleccion === s.quiz.correcta ? 'text-verde-800' : 'text-red-700'
                          }`}>
                            {quiz.seleccion === s.quiz.correcta ? '✅ ' : '💡 '}
                            {s.quiz.explicacion}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
