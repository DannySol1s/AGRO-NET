import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChevronLeft, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react-native';

type Pregunta = {
  pregunta:    string;
  opciones:    string[];
  correcta:    number;
  explicacion: string;
};

type Seccion = {
  emoji:  string;
  titulo: string;
  color:  string;
  bg:     string;
  items:  string[];
  preguntas: Pregunta[];
};

const SECCIONES: Seccion[] = [
  {
    emoji: '🧼', titulo: 'Higiene y buenas prácticas',
    color: '#2d4030', bg: '#d6e2d4',
    items: [
      'Lávate las manos antes y durante el proceso',
      'Usa ropa limpia y cubre el cabello',
      'Limpia y desinfecta utensilios antes de usarlos',
      'No proceses si tienes enfermedad o heridas abiertas',
      'Mantén el área de trabajo libre de insectos y polvo',
    ],
    preguntas: [
      {
        pregunta: '¿Cuándo se deben lavar las manos durante el proceso?',
        opciones: ['Antes y después de cada etapa crítica', 'Solo al inicio', 'Solo cuando estén sucias'],
        correcta: 0,
        explicacion: 'Deben lavarse antes y después de cada etapa crítica, especialmente al cambiar entre materias crudas y procesadas.',
      },
      {
        pregunta: '¿Qué debe cubrir el operador para proteger los alimentos?',
        opciones: ['Solo las manos con guantes', 'Cabello, nariz y boca con cofia y cubrebocas', 'Solo el cabello'],
        correcta: 1,
        explicacion: 'El cabello, la nariz y la boca deben cubrirse para evitar contaminación directa del producto.',
      },
      {
        pregunta: '¿Qué hacer si tienes una herida abierta en la mano?',
        opciones: ['Usar guante y seguir trabajando', 'Lavar bien y continuar', 'No procesar alimentos ese día'],
        correcta: 2,
        explicacion: 'Una herida abierta es fuente de microorganismos. No se deben procesar alimentos hasta que sane.',
      },
      {
        pregunta: '¿Con qué frecuencia se deben desinfectar las superficies de trabajo?',
        opciones: ['Antes de iniciar y después de cada lote', 'Una vez al día al terminar', 'Solo cuando se vean sucias'],
        correcta: 0,
        explicacion: 'Las superficies deben desinfectarse antes de iniciar y entre cada lote para evitar contaminación cruzada.',
      },
      {
        pregunta: '¿Cuál es la primera acción al llegar al área de elaboración?',
        opciones: ['Encender el fuego', 'Limpiar y desinfectar el área y utensilios', 'Pesar los ingredientes'],
        correcta: 1,
        explicacion: 'La limpieza y desinfección del área es siempre el primer paso antes de cualquier actividad de procesamiento.',
      },
    ],
  },
  {
    emoji: '🌡️', titulo: 'Inocuidad alimentaria',
    color: '#1d4ed8', bg: '#dbeafe',
    items: [
      'Respeta las temperaturas indicadas en cada proceso',
      'No mezcles utensilios de productos crudos con cocidos',
      'Esteriliza frascos antes de envasar',
      'Verifica el sellado hermético de tus productos',
      'Registra lotes con fecha de elaboración y vencimiento',
    ],
    preguntas: [
      {
        pregunta: '¿A qué temperatura mínima se pasteuriza una mermelada?',
        opciones: ['60°C por 5 minutos', 'Temperatura ambiente', '85–100°C por 15–20 minutos'],
        correcta: 2,
        explicacion: 'La pasteurización requiere 85–100°C por 15–20 minutos para eliminar microorganismos y crear el vacío de sellado.',
      },
      {
        pregunta: '¿Por qué no se deben mezclar utensilios de crudos y cocidos?',
        opciones: ['Para evitar contaminación cruzada de bacterias', 'Por ahorro de agua al lavar', 'Es solo una tradición'],
        correcta: 0,
        explicacion: 'Los utensilios de crudos pueden tener bacterias que al contacto con el producto cocido lo contaminan.',
      },
      {
        pregunta: '¿Cómo saber si un frasco quedó correctamente sellado al vacío?',
        opciones: ['La tapa suena hueca al golpearla', 'La tapa está hundida y no hace "clic" al presionar', 'El frasco está frío'],
        correcta: 1,
        explicacion: 'Una tapa hundida y firme (sin "clic" al presionar) indica que se formó el vacío y el sellado es correcto.',
      },
      {
        pregunta: '¿Qué información mínima debe llevar un registro de lote?',
        opciones: ['Solo el nombre del producto', 'Solo la fecha', 'Fecha, nombre del producto, cantidad producida y vencimiento'],
        correcta: 2,
        explicacion: 'El registro de lote debe incluir fecha, nombre, cantidad y vencimiento para garantizar la trazabilidad del producto.',
      },
      {
        pregunta: '¿Por qué se esterilizan los frascos antes de envasar?',
        opciones: ['Para eliminar microorganismos que causarían deterioro', 'Para que el vidrio no se fracture por el calor', 'Para que el producto no se pegue'],
        correcta: 0,
        explicacion: 'La esterilización elimina microorganismos presentes en el frasco que podrían contaminar el producto final.',
      },
    ],
  },
  {
    emoji: '📦', titulo: 'Almacenamiento correcto',
    color: '#92400e', bg: '#fef3c7',
    items: [
      'Guarda en lugar fresco, seco y sin luz solar directa',
      'Usa recipientes herméticos de vidrio o plástico apto para alimentos',
      'Revisa periódicamente cambios de color, olor o textura',
      'Aplica PEPS: primero que entra, primero que sale',
      'No almacenes junto a productos de limpieza o químicos',
    ],
    preguntas: [
      {
        pregunta: '¿Qué significa PEPS en el almacenamiento de alimentos?',
        opciones: ['Primero en producirse, primero en salir', 'Primero en entrar, primero en salir', 'Producto empacado, producto seguro'],
        correcta: 1,
        explicacion: 'PEPS garantiza que los productos más antiguos se vendan antes, reduciendo pérdidas por vencimiento.',
      },
      {
        pregunta: '¿Cuál es la condición ideal para almacenar conservas?',
        opciones: ['Lugar húmedo y cálido', 'Bajo el sol para que dure más', 'Lugar fresco, seco y sin luz solar directa'],
        correcta: 2,
        explicacion: 'El calor y la humedad aceleran el deterioro. Un lugar fresco, seco y oscuro prolonga la vida útil.',
      },
      {
        pregunta: '¿Con qué NO se deben almacenar productos alimenticios?',
        opciones: ['Con productos de limpieza o químicos', 'Con otros alimentos del mismo tipo', 'Con empaques sellados'],
        correcta: 0,
        explicacion: 'Los químicos y productos de limpieza pueden contaminar los alimentos por vapores o derrames accidentales.',
      },
      {
        pregunta: '¿Cada cuánto se deben revisar los productos almacenados?',
        opciones: ['Solo cuando se vayan a vender', 'Periódicamente, al menos una vez por semana', 'Solo al inicio del almacenamiento'],
        correcta: 1,
        explicacion: 'La revisión periódica permite detectar a tiempo cambios de color, olor o textura que indican deterioro.',
      },
      {
        pregunta: '¿Qué tipo de recipiente es mejor para almacenar alimentos procesados?',
        opciones: ['Cualquier bolsa de plástico', 'Latas sin sellar', 'Vidrio o plástico hermético apto para alimentos'],
        correcta: 2,
        explicacion: 'El vidrio y el plástico certificado para alimentos no transfieren sabores ni sustancias dañinas al producto.',
      },
    ],
  },
  {
    emoji: '♻️', titulo: 'Aprovechamiento de residuos',
    color: '#6d28d9', bg: '#ede9fe',
    items: [
      'Las cáscaras de frutas pueden usarse para harinas o compost',
      'Los líquidos de cocción son base de caldos o fermentos',
      'Semillas secas pueden convertirse en harinas nutritivas',
      'Los residuos orgánicos alimentan el suelo de tu parcela',
      'Investiga usos alternativos antes de desechar subproductos',
    ],
    preguntas: [
      {
        pregunta: '¿Cuál es un buen uso para las cáscaras de frutas sobrantes?',
        opciones: ['Convertirlas en harina deshidratada o compost', 'Desecharlas a la basura', 'Guardarlas sin procesar'],
        correcta: 0,
        explicacion: 'Las cáscaras deshidratadas y molidas pueden venderse como harina nutritiva o usarse como abono.',
      },
      {
        pregunta: '¿Para qué sirven los líquidos de cocción sobrantes?',
        opciones: ['Solo para tirarlos', 'Para limpiar utensilios', 'Como base para caldos, bebidas fermentadas o jarabes'],
        correcta: 2,
        explicacion: 'Los líquidos de cocción contienen minerales y azúcares aprovechables como base de bebidas o caldos.',
      },
      {
        pregunta: '¿Qué se puede hacer con las semillas sobrantes del proceso?',
        opciones: ['Desecharlas siempre', 'Secarlas y molerlas para obtener harinas nutritivas', 'Solo guardarlas para sembrar'],
        correcta: 1,
        explicacion: 'Muchas semillas contienen aceites y proteínas. Secas y molidas se convierten en harinas con valor comercial.',
      },
      {
        pregunta: '¿Qué beneficio aporta el compost de residuos orgánicos a la parcela?',
        opciones: ['Mejora la fertilidad y estructura del suelo', 'Ninguno, es solo basura orgánica', 'Solo sirve para cubrir malas hierbas'],
        correcta: 0,
        explicacion: 'El compost orgánico enriquece el suelo con nutrientes y mejora su capacidad de retener agua.',
      },
      {
        pregunta: '¿Cuál es la mejor práctica antes de desechar un subproducto?',
        opciones: ['Tirarlo inmediatamente para no acumular basura', 'Quemarlo para evitar plagas', 'Investigar si tiene algún uso alternativo o comercial'],
        correcta: 2,
        explicacion: 'Muchos subproductos tienen valor económico. Investigar antes de desechar puede abrir nuevas fuentes de ingreso.',
      },
    ],
  },
];

type QuizSeccion = {
  preguntaActual: number;
  respuestas:     (number | null)[];
  terminado:      boolean;
};

function initQuiz(): QuizSeccion {
  return { preguntaActual: 0, respuestas: [null, null, null, null, null], terminado: false };
}

export default function Calidad() {
  const [seccionAbierta, setSeccionAbierta] = useState<number | null>(0);
  const [quizStates, setQuizStates] = useState<QuizSeccion[]>(SECCIONES.map(initQuiz));

  function responder(secIdx: number, opcionIdx: number) {
    setQuizStates((prev) => prev.map((q, i) => {
      if (i !== secIdx) return q;
      const nuevasRespuestas = [...q.respuestas];
      nuevasRespuestas[q.preguntaActual] = opcionIdx;
      return { ...q, respuestas: nuevasRespuestas };
    }));
  }

  function siguiente(secIdx: number) {
    setQuizStates((prev) => prev.map((q, i) => {
      if (i !== secIdx) return q;
      const siguiente = q.preguntaActual + 1;
      return siguiente >= SECCIONES[secIdx].preguntas.length
        ? { ...q, terminado: true }
        : { ...q, preguntaActual: siguiente };
    }));
  }

  function reiniciar(secIdx: number) {
    setQuizStates((prev) => prev.map((q, i) => i === secIdx ? initQuiz() : q));
  }

  return (
    <SafeAreaView className="flex-1 bg-tierra-50" edges={['top']}>
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
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-4 pb-8 gap-3">
          {SECCIONES.map((s, secIdx) => {
            const abierta = seccionAbierta === secIdx;
            const quiz = quizStates[secIdx];
            const pActual = s.preguntas[quiz.preguntaActual];
            const respActual = quiz.respuestas[quiz.preguntaActual];
            const correctasTotal = quiz.respuestas.filter((r, i) => r === s.preguntas[i]?.correcta).length;

            return (
              <View key={s.titulo} className="bg-white rounded-2xl border border-tierra-200 overflow-hidden">
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
                  {quiz.terminado && (
                    <View className="bg-verde-100 rounded-full px-2.5 py-0.5 mr-1">
                      <Text className="text-verde-700 text-xs font-bold">{correctasTotal}/5</Text>
                    </View>
                  )}
                  {abierta ? <ChevronUp size={18} stroke="#5c5248" /> : <ChevronDown size={18} stroke="#5c5248" />}
                </Pressable>

                {abierta && (
                  <View className="px-4 pb-4">
                    {s.items.map((item, i) => (
                      <View key={i} className="flex-row mb-2.5 gap-2">
                        <Text style={{ color: s.color }} className="text-sm font-bold mt-0.5">✓</Text>
                        <Text className="text-tierra-700 text-sm flex-1 leading-5">{item}</Text>
                      </View>
                    ))}

                    {/* Quiz */}
                    <View className="mt-4 bg-tierra-50 rounded-2xl p-4 border border-tierra-200">

                      {!quiz.terminado ? (
                        <>
                          {/* Progreso */}
                          <View className="flex-row items-center justify-between mb-3">
                            <Text className="text-carbon font-bold text-sm" style={{ fontFamily: 'Poppins_600SemiBold' }}>
                              🧠 Pregunta {quiz.preguntaActual + 1} de {s.preguntas.length}
                            </Text>
                            <View className="flex-row gap-1">
                              {s.preguntas.map((_, i) => (
                                <View key={i} className={`w-2 h-2 rounded-full ${
                                  i < quiz.preguntaActual ? 'bg-verde-500' :
                                  i === quiz.preguntaActual ? 'bg-cosecha-500' : 'bg-tierra-200'
                                }`} />
                              ))}
                            </View>
                          </View>

                          <Text className="text-carbon text-sm mb-3 leading-5">{pActual.pregunta}</Text>

                          <View className="gap-2">
                            {pActual.opciones.map((opcion, opIdx) => {
                              const esCorrecta = opIdx === pActual.correcta;
                              const seleccionada = respActual === opIdx;
                              const respondida = respActual !== null;
                              let estilo = 'bg-white border-tierra-200';
                              if (respondida) {
                                if (esCorrecta) estilo = 'bg-verde-100 border-verde-500';
                                else if (seleccionada) estilo = 'bg-red-50 border-red-300';
                              }
                              return (
                                <Pressable
                                  key={opIdx}
                                  onPress={() => !respondida && responder(secIdx, opIdx)}
                                  disabled={respondida}
                                  className={`flex-row items-center gap-3 p-3 rounded-xl border-2 ${estilo} active:opacity-75`}
                                >
                                  <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                                    respondida && esCorrecta ? 'border-verde-600 bg-verde-600' :
                                    respondida && seleccionada ? 'border-red-400 bg-red-400' :
                                    'border-tierra-300'
                                  }`}>
                                    {respondida && esCorrecta && <Text className="text-white text-xs font-bold">✓</Text>}
                                    {respondida && seleccionada && !esCorrecta && <Text className="text-white text-xs font-bold">✗</Text>}
                                  </View>
                                  <Text className={`text-sm flex-1 leading-5 ${
                                    respondida && esCorrecta ? 'text-verde-800 font-semibold' :
                                    respondida && seleccionada ? 'text-red-700' : 'text-carbon'
                                  }`}>{opcion}</Text>
                                </Pressable>
                              );
                            })}
                          </View>

                          {/* Explicación + botón siguiente */}
                          {respActual !== null && (
                            <View className="mt-3">
                              <View className={`p-3 rounded-xl mb-3 ${respActual === pActual.correcta ? 'bg-verde-100' : 'bg-red-50'}`}>
                                <Text className={`text-xs leading-5 ${respActual === pActual.correcta ? 'text-verde-800' : 'text-red-700'}`}>
                                  {respActual === pActual.correcta ? '✅ ' : '💡 '}{pActual.explicacion}
                                </Text>
                              </View>
                              <Pressable
                                onPress={() => siguiente(secIdx)}
                                className="bg-verde-800 rounded-xl py-3 items-center active:opacity-80"
                              >
                                <Text className="text-white font-bold text-sm">
                                  {quiz.preguntaActual + 1 < s.preguntas.length ? 'Siguiente pregunta →' : 'Ver resultados'}
                                </Text>
                              </Pressable>
                            </View>
                          )}
                        </>
                      ) : (
                        /* Resultados finales */
                        <View>
                          <Text className="text-carbon font-bold text-base text-center mb-2" style={{ fontFamily: 'Poppins_600SemiBold' }}>
                            {correctasTotal === 5 ? '🏆 ¡Perfecto!' : correctasTotal >= 3 ? '👍 ¡Buen trabajo!' : '📚 Sigue practicando'}
                          </Text>
                          <Text className="text-tierra-600 text-sm text-center mb-4">
                            Respondiste {correctasTotal} de {s.preguntas.length} preguntas correctamente
                          </Text>

                          {/* Resumen por pregunta */}
                          <View className="gap-1.5 mb-4">
                            {s.preguntas.map((p, i) => {
                              const correcta = quiz.respuestas[i] === p.correcta;
                              return (
                                <View key={i} className="flex-row items-center gap-2">
                                  <Text className="text-base">{correcta ? '✅' : '❌'}</Text>
                                  <Text className="text-tierra-700 text-xs flex-1 leading-4" numberOfLines={2}>{p.pregunta}</Text>
                                </View>
                              );
                            })}
                          </View>

                          <Pressable
                            onPress={() => reiniciar(secIdx)}
                            className="flex-row items-center justify-center gap-2 bg-tierra-100 rounded-xl py-3 active:opacity-70"
                          >
                            <RotateCcw size={15} stroke="#5c5248" />
                            <Text className="text-tierra-700 font-semibold text-sm">Reiniciar quiz</Text>
                          </Pressable>
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
