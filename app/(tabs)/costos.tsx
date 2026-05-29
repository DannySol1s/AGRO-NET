import { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Campos = {
  materiaPrima: string;
  empaque: string;
  manoObra: string;
  unidades: string;
};

function calcular(c: Campos) {
  const mp = parseFloat(c.materiaPrima) || 0;
  const emp = parseFloat(c.empaque) || 0;
  const mo = parseFloat(c.manoObra) || 0;
  const uni = parseFloat(c.unidades) || 0;

  const costoTotal = mp + emp + mo;
  const costoPorUnidad = uni > 0 ? costoTotal / uni : 0;
  const precioSugerido = costoPorUnidad * 2.5;
  const gananciaPorUnidad = precioSugerido - costoPorUnidad;
  const gananciaTotal = gananciaPorUnidad * uni;

  return { costoTotal, costoPorUnidad, precioSugerido, gananciaPorUnidad, gananciaTotal };
}

function fmt(n: number) {
  return `$${n.toFixed(2)}`;
}

export default function Costos() {
  const [campos, setCampos] = useState<Campos>({
    materiaPrima: '',
    empaque: '',
    manoObra: '',
    unidades: '',
  });

  function set(campo: keyof Campos) {
    return (v: string) => setCampos((prev) => ({ ...prev, [campo]: v }));
  }

  const resultado = calcular(campos);

  const INPUTS: { campo: keyof Campos; label: string; placeholder: string }[] = [
    { campo: 'materiaPrima', label: 'Materia prima ($)',      placeholder: '0' },
    { campo: 'empaque',      label: 'Empaque y etiquetas ($)', placeholder: '0' },
    { campo: 'manoObra',     label: 'Mano de obra ($)',        placeholder: '0' },
    { campo: 'unidades',     label: 'Unidades a producir',     placeholder: '0' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="bg-verde-800 px-6 pt-4 pb-5">
        <View className="flex-row items-center gap-3">
          <View className="bg-verde-700 rounded-xl p-2">
            <Text className="text-xl">💰</Text>
          </View>
          <View>
            <Text className="text-white text-lg font-bold">Análisis Económico</Text>
            <Text className="text-verde-300 text-xs">Costos, rendimientos y rentabilidad</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-5" showsVerticalScrollIndicator={false}>

        {/* Inputs */}
        <Text className="text-gray-700 font-semibold text-sm mb-3">Costos de producción</Text>
        <View className="gap-3 mb-5">
          {INPUTS.map(({ campo, label, placeholder }) => (
            <View key={campo}>
              <Text className="text-gray-600 text-xs mb-1.5">{label}</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm"
                placeholder={placeholder}
                placeholderTextColor="#d1d5db"
                keyboardType="numeric"
                value={campos[campo]}
                onChangeText={set(campo)}
              />
            </View>
          ))}
        </View>

        {/* Resumen financiero */}
        <View className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-4">
          <View className="flex-row items-center gap-2 mb-4">
            <Text className="text-gray-600 text-sm font-semibold">💵 Resumen financiero</Text>
          </View>

          <View className="gap-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-600 text-sm">Costo total:</Text>
              <Text className="text-gray-800 font-semibold text-sm">{fmt(resultado.costoTotal)}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600 text-sm">Costo por unidad:</Text>
              <Text className="text-gray-800 font-semibold text-sm">{fmt(resultado.costoPorUnidad)}</Text>
            </View>

            <View className="h-px bg-gray-200" />

            <View className="flex-row justify-between items-center bg-verde-50 rounded-xl px-3 py-2.5">
              <Text className="text-verde-700 text-sm font-semibold">💚 Precio sugerido:</Text>
              <Text className="text-verde-700 font-bold text-sm">{fmt(resultado.precioSugerido)}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-1">
                <Text className="text-verde-600 text-sm">↗ Ganancia por unidad:</Text>
              </View>
              <Text className="text-verde-700 font-semibold text-sm">{fmt(resultado.gananciaPorUnidad)}</Text>
            </View>
          </View>
        </View>

        {/* Total proyectado */}
        <View className="bg-verde-700 rounded-2xl py-4 px-5 flex-row justify-between items-center mb-5">
          <Text className="text-white font-bold text-sm">Ganancia total proyectada:</Text>
          <Text className="text-white font-bold text-lg">{fmt(resultado.gananciaTotal)}</Text>
        </View>

        {/* Nota */}
        <View className="mb-8">
          <Text className="text-gray-400 text-xs leading-5 text-center">
            <Text className="font-semibold">Nota: </Text>
            El precio sugerido incluye un margen de 150% sobre el costo de producción. Ajusta según tu mercado local y competencia. No olvides considerar costos adicionales como transporte, almacenamiento y comercialización.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
