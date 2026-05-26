import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Clock, Package, Star } from 'lucide-react-native';
import { db } from '@/db/client';
import { productos, insumos, pasos, parametrosCalidad, normas } from '@/db/schema';
import { eq } from 'drizzle-orm';

type Tab = 'ingredientes' | 'proceso' | 'calidad';

export default function ProductoDetalle() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [tab, setTab] = useState<Tab>('ingredientes');
  const [producto, setProducto] = useState<typeof productos.$inferSelect | null>(null);
  const [listaInsumos, setListaInsumos] = useState<(typeof insumos.$inferSelect)[]>([]);
  const [listaPasos, setListaPasos] = useState<(typeof pasos.$inferSelect)[]>([]);
  const [listaParametros, setListaParametros] = useState<(typeof parametrosCalidad.$inferSelect)[]>([]);
  const [listaNormas, setListaNormas] = useState<(typeof normas.$inferSelect)[]>([]);

  useEffect(() => {
    async function cargar() {
      const [p] = await db.select().from(productos).where(eq(productos.id, id));
      if (!p) return;
      setProducto(p);
      const [ins, pas, par, nor] = await Promise.all([
        db.select().from(insumos).where(eq(insumos.productoId, id)),
        db.select().from(pasos).where(eq(pasos.productoId, id)).orderBy(pasos.numero),
        db.select().from(parametrosCalidad).where(eq(parametrosCalidad.productoId, id)),
        db.select().from(normas).where(eq(normas.productoId, id)),
      ]);
      setListaInsumos(ins);
      setListaPasos(pas);
      setListaParametros(par);
      setListaNormas(nor);
    }
    cargar();
  }, [id]);

  const tiempoTotal = listaPasos.reduce((s, p) => s + (p.tiempoMinutos ?? 0), 0);

  const TABS: { id: Tab; label: string }[] = [
    { id: 'ingredientes', label: '🧺 Ingredientes' },
    { id: 'proceso',      label: '📋 Proceso' },
    { id: 'calidad',      label: '✅ Calidad' },
  ];

  if (!producto) {
    return (
      <SafeAreaView className="flex-1 bg-verde-50 items-center justify-center">
        <Text className="text-verde-700">Cargando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-verde-50">
      {/* Header */}
      <View className="bg-verde-800 px-6 pt-12 pb-5">
        <Pressable onPress={() => router.back()} className="mb-3">
          <ChevronLeft size={24} color="#bbf7d0" />
        </Pressable>
        <Text className="text-white text-xl font-bold leading-7">{producto.nombre}</Text>
        <View className="flex-row gap-4 mt-3">
          <View className="flex-row items-center gap-1">
            <Package size={14} color="#bbf7d0" />
            <Text className="text-verde-200 text-xs">
              {producto.rendimientoKg ? `${producto.rendimientoKg} kg` : `${producto.rendimientoL} L`}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Clock size={14} color="#bbf7d0" />
            <Text className="text-verde-200 text-xs">{tiempoTotal} min aprox.</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Star size={14} color="#bbf7d0" />
            <Text className="text-verde-200 text-xs capitalize">{producto.nivelDificultad}</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row bg-white border-b border-verde-100">
        {TABS.map((t) => (
          <Pressable
            key={t.id}
            onPress={() => setTab(t.id)}
            className={`flex-1 py-3 items-center border-b-2 ${
              tab === t.id ? 'border-verde-700' : 'border-transparent'
            }`}
          >
            <Text className={`text-xs font-semibold ${tab === t.id ? 'text-verde-800' : 'text-tierra-500'}`}>
              {t.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>

        {tab === 'ingredientes' && (
          <View>
            <Text className="text-verde-900 text-base font-bold mb-4">
              Ingredientes para {producto.rendimientoKg ?? producto.rendimientoL} {producto.rendimientoKg ? 'kg' : 'L'}
            </Text>
            {listaInsumos.map((ins) => (
              <View key={ins.id} className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-2 border border-verde-100">
                <View className="w-2 h-2 rounded-full bg-verde-500 mr-3" />
                <Text className="text-tierra-700 flex-1 text-sm">{ins.nombre}</Text>
                <Text className="text-verde-800 font-bold text-sm">
                  {ins.cantidad} {ins.unidad}
                </Text>
              </View>
            ))}
          </View>
        )}

        {tab === 'proceso' && (
          <View>
            {listaPasos.map((paso) => (
              <View key={paso.id} className="bg-white rounded-2xl p-4 mb-3 border border-verde-100">
                <View className="flex-row items-center mb-2 gap-3">
                  <View className="w-8 h-8 rounded-full bg-verde-700 items-center justify-center">
                    <Text className="text-white text-sm font-bold">{paso.numero}</Text>
                  </View>
                  <Text className="text-verde-900 font-bold text-sm flex-1">{paso.titulo}</Text>
                  {paso.tiempoMinutos && (
                    <Text className="text-tierra-500 text-xs">⏱ {paso.tiempoMinutos} min</Text>
                  )}
                </View>
                <Text className="text-tierra-700 text-sm leading-5 ml-11">{paso.descripcion}</Text>
              </View>
            ))}
          </View>
        )}

        {tab === 'calidad' && (
          <View>
            <Text className="text-verde-900 font-bold text-base mb-3">Parámetros de calidad</Text>
            {listaParametros.map((par) => (
              <View key={par.id} className="bg-white rounded-xl p-4 mb-2 border border-verde-100">
                <Text className="text-verde-800 font-semibold text-sm">{par.parametro}</Text>
                <Text className="text-tierra-700 text-sm mt-1">Esperado: {par.valorEsperado}</Text>
                {par.metodoVerificacion && (
                  <Text className="text-tierra-500 text-xs mt-1">🔍 {par.metodoVerificacion}</Text>
                )}
              </View>
            ))}

            <Text className="text-verde-900 font-bold text-base mb-3 mt-5">Vida útil</Text>
            <View className="bg-verde-100 rounded-xl p-4 mb-4">
              <Text className="text-verde-800 text-sm font-semibold">📅 {producto.vidaUtilDesc}</Text>
            </View>

            {listaNormas.length > 0 && (
              <>
                <Text className="text-verde-900 font-bold text-base mb-3">Normas aplicables</Text>
                {listaNormas.map((n) => (
                  <View key={n.id} className="bg-tierra-50 rounded-xl p-3 mb-2">
                    <Text className="text-tierra-800 text-xs font-bold">{n.codigo}</Text>
                    {n.descripcion && (
                      <Text className="text-tierra-600 text-xs mt-0.5">{n.descripcion}</Text>
                    )}
                  </View>
                ))}
              </>
            )}
          </View>
        )}

        <View className="h-6" />
      </ScrollView>

      {/* CTA Calculadora */}
      <View className="px-5 pb-6 pt-3 bg-verde-50 border-t border-verde-100">
        <Pressable
          onPress={() => router.push(`/(tabs)/materias/producto/costos?id=${id}`)}
          className="bg-tierra-600 rounded-2xl py-4 items-center active:opacity-80"
        >
          <Text className="text-white font-bold text-base">💰 Calcular mis costos y ganancias</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
