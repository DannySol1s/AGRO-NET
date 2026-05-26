import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { db } from '@/db/client';
import { productos, insumos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { calcularCostos, formatMXN } from '@/services/calculadora';

type InsumoConPrecio = {
  id: number;
  nombre: string;
  cantidad: number;
  unidad: string;
  precio: string;
};

export default function Costos() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [producto, setProducto] = useState<typeof productos.$inferSelect | null>(null);
  const [insumosConPrecio, setInsumosConPrecio] = useState<InsumoConPrecio[]>([]);
  const [margen, setMargen] = useState('40');

  useEffect(() => {
    async function cargar() {
      const [p] = await db.select().from(productos).where(eq(productos.id, id));
      if (!p) return;
      setProducto(p);
      const ins = await db.select().from(insumos).where(eq(insumos.productoId, id));
      setInsumosConPrecio(ins.map((i) => ({ ...i, precio: '' })));
    }
    cargar();
  }, [id]);

  function actualizarPrecio(insId: number, valor: string) {
    setInsumosConPrecio((prev) =>
      prev.map((i) => (i.id === insId ? { ...i, precio: valor } : i))
    );
  }

  const todosConPrecio = insumosConPrecio.every((i) => i.precio !== '' && !isNaN(Number(i.precio)));

  const resultado = todosConPrecio && producto
    ? calcularCostos(
        insumosConPrecio.map((i) => ({
          nombre: i.nombre, cantidad: i.cantidad, unidad: i.unidad,
          precioUnitario: Number(i.precio),
        })),
        producto.rendimientoKg ?? producto.rendimientoL ?? 10,
        Number(margen) / 100
      )
    : null;

  return (
    <SafeAreaView className="flex-1 bg-verde-50">
      {/* Header */}
      <View className="bg-tierra-700 px-6 pt-12 pb-5">
        <Pressable onPress={() => router.back()} className="mb-3">
          <ChevronLeft size={24} color="#fae8cc" />
        </Pressable>
        <Text className="text-tierra-100 text-lg font-bold">Calculadora de Costos</Text>
        {producto && (
          <Text className="text-tierra-200 text-sm mt-1">{producto.nombre}</Text>
        )}
      </View>

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>

        {/* Instrucción */}
        <View className="bg-tierra-50 rounded-xl p-4 mb-5 border border-tierra-200">
          <Text className="text-tierra-700 text-sm leading-5">
            💡 Ingresa el precio que pagas por cada ingrediente en tu comunidad para calcular tu inversión y ganancia estimada.
          </Text>
        </View>

        {/* Insumos */}
        <Text className="text-verde-900 font-bold text-base mb-3">Precio de ingredientes</Text>
        {insumosConPrecio.map((ins) => (
          <View key={ins.id} className="bg-white rounded-xl p-4 mb-2 border border-verde-100">
            <Text className="text-tierra-700 text-sm font-semibold mb-2">
              {ins.nombre} — {ins.cantidad} {ins.unidad}
            </Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-verde-700 text-sm">Precio por {ins.unidad}:</Text>
              <TextInput
                className="flex-1 border border-verde-200 rounded-lg px-3 py-2 text-sm text-tierra-800 bg-verde-50"
                placeholder="$0.00"
                keyboardType="numeric"
                value={ins.precio}
                onChangeText={(v) => actualizarPrecio(ins.id, v)}
              />
            </View>
          </View>
        ))}

        {/* Margen de ganancia */}
        <Text className="text-verde-900 font-bold text-base mt-5 mb-3">Margen de ganancia</Text>
        <View className="flex-row gap-2 mb-5">
          {['20', '30', '40', '50'].map((m) => (
            <Pressable
              key={m}
              onPress={() => setMargen(m)}
              className={`flex-1 py-3 rounded-xl items-center border-2 ${
                margen === m ? 'bg-verde-700 border-verde-700' : 'bg-white border-verde-200'
              }`}
            >
              <Text className={`font-bold text-sm ${margen === m ? 'text-white' : 'text-verde-700'}`}>
                {m}%
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Resultado */}
        {resultado && (
          <View className="bg-verde-800 rounded-2xl p-5 mb-6">
            <Text className="text-verde-200 text-sm font-semibold mb-4 text-center">Resultado del cálculo</Text>
            <View className="gap-3">
              {[
                { label: 'Inversión total',       valor: formatMXN(resultado.inversionTotal) },
                { label: `Rendimiento`,            valor: `${resultado.rendimientoKg} kg` },
                { label: 'Costo por kg',           valor: formatMXN(resultado.costoPorKg) },
                { label: 'Precio sugerido/kg',     valor: formatMXN(resultado.precioSugeridoKg), destacado: true },
                { label: 'Ganancia estimada',      valor: formatMXN(resultado.gananciaEstimada),  destacado: true },
              ].map(({ label, valor, destacado }) => (
                <View key={label} className="flex-row justify-between items-center">
                  <Text className="text-verde-200 text-sm">{label}</Text>
                  <Text className={`font-bold text-sm ${destacado ? 'text-cosecha-400 text-base' : 'text-white'}`}>
                    {valor}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {!todosConPrecio && (
          <View className="bg-verde-100 rounded-xl p-4 mb-6 items-center">
            <Text className="text-verde-700 text-sm text-center">
              Ingresa el precio de todos los ingredientes para ver el resultado.
            </Text>
          </View>
        )}

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
