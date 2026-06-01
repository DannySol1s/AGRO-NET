import { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Box, FlaskConical, Calculator, Users, BookOpen,
  Bell, Mic, ChevronRight, Search, X,
} from 'lucide-react-native';
import { db } from '@/db/client';
import { productos, materiasPrimas } from '@/db/schema';

type MenuItem = {
  icon: React.ComponentType<{ size: number; stroke: string }>;
  label: string;
  desc: string;
  ruta: string | null;
  proximamente?: boolean;
};

const GRID: MenuItem[] = [
  {
    icon: Box,
    label: 'Materias Primas',
    desc: 'Conoce propiedades y beneficios',
    ruta: '/(tabs)/materias',
  },
  {
    icon: FlaskConical,
    label: 'Productos Agroindustriales',
    desc: 'Explora productos y procesos',
    ruta: '/(tabs)/productos',
  },
  {
    icon: Calculator,
    label: 'Calculadora',
    desc: 'Costos, rendimiento y ganancias',
    ruta: '/(tabs)/costos',
  },
  {
    icon: Users,
    label: 'Comunidad',
    desc: 'Comparte experiencias y aprende',
    ruta: '/(tabs)/comunidad',
    proximamente: true,
  },
];

function handleNav(item: MenuItem) {
  if (!item.ruta) return;
  if (item.proximamente) {
    Alert.alert('Próximamente', 'La Red de Productores estará disponible en la siguiente versión de AGRO-NET.');
    return;
  }
  router.push(item.ruta as any);
}

type ResultadoBusqueda = {
  tipo: 'producto' | 'materia';
  id: string;
  nombre: string;
  subtitulo: string;
};

export default function Inicio() {
  const [busqueda, setBusqueda] = useState('');
  const [todosProductos, setTodosProductos] = useState<{ id: string; nombre: string; materiaPrimaId: string }[]>([]);
  const [todasMaterias, setTodasMaterias] = useState<{ id: string; nombre: string; emoji: string }[]>([]);

  useEffect(() => {
    db.select({ id: productos.id, nombre: productos.nombre, materiaPrimaId: productos.materiaPrimaId })
      .from(productos).then(setTodosProductos);
    db.select({ id: materiasPrimas.id, nombre: materiasPrimas.nombre, emoji: materiasPrimas.emoji })
      .from(materiasPrimas).then(setTodasMaterias);
  }, []);

  const resultados = useMemo((): ResultadoBusqueda[] => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return [];
    const materiaMap = Object.fromEntries(todasMaterias.map((m) => [m.id, m.nombre]));
    const prods = todosProductos
      .filter((p) => p.nombre.toLowerCase().includes(q) || materiaMap[p.materiaPrimaId]?.toLowerCase().includes(q))
      .slice(0, 4)
      .map((p) => ({ tipo: 'producto' as const, id: p.id, nombre: p.nombre, subtitulo: materiaMap[p.materiaPrimaId] ?? '' }));
    const mats = todasMaterias
      .filter((m) => m.nombre.toLowerCase().includes(q))
      .slice(0, 3)
      .map((m) => ({ tipo: 'materia' as const, id: m.id, nombre: `${m.emoji} ${m.nombre}`, subtitulo: 'Materia prima' }));
    return [...mats, ...prods];
  }, [busqueda, todosProductos, todasMaterias]);

  function irA(r: ResultadoBusqueda) {
    setBusqueda('');
    if (r.tipo === 'producto') router.push(`/(tabs)/materias/producto/${r.id}` as any);
    else router.push(`/(tabs)/materias/${r.id}` as any);
  }

  return (
    <SafeAreaView className="flex-1 bg-tierra-50" edges={['top']}>
      {/* ── HEADER ─────────────────────────────── */}
      <View className="bg-verde-800 px-5 pt-3 pb-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 bg-verde-700 rounded-xl items-center justify-center">
              <Text className="text-xl">🌿</Text>
            </View>
            <View>
              <Text
                className="text-white text-xl font-bold tracking-widest"
                style={{ fontFamily: 'Poppins_600SemiBold' }}
              >
                AGRO-NET
              </Text>
              <Text className="text-verde-300 text-xs tracking-widest">
                CONECTA, TRANSFORMA Y CRECE
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => Alert.alert('Notificaciones', 'Las notificaciones estarán disponibles próximamente.')}
            className="w-10 h-10 bg-verde-700 rounded-xl items-center justify-center active:opacity-70"
          >
            <Bell size={18} stroke="#d6e2d4" />
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── BIENVENIDA ──────────────────────────── */}
        <View className="bg-verde-800 px-5 pt-2 pb-8">
          <Text
            className="text-white text-2xl"
            style={{ fontFamily: 'Poppins_600SemiBold' }}
          >
            ¡Bienvenido!
          </Text>
          <Text className="text-verde-300 text-sm mt-1">
            ¿Qué deseas hacer hoy?
          </Text>
        </View>

        {/* ── BUSCADOR GLOBAL ─────────────────────── */}
        <View className="px-4 -mt-5 mb-1">
          <View className="bg-white rounded-2xl border border-tierra-200 flex-row items-center px-3 py-2.5 gap-2"
            style={{ shadowColor: '#1F3D36', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}
          >
            <Search size={18} stroke="#84a681" />
            <TextInput
              className="flex-1 text-sm text-carbon"
              placeholder="Buscar productos o materias primas..."
              placeholderTextColor="#a8a098"
              value={busqueda}
              onChangeText={setBusqueda}
              style={{ fontFamily: 'Poppins_400Regular' }}
            />
            {busqueda.length > 0 && (
              <Pressable onPress={() => setBusqueda('')}>
                <X size={16} stroke="#a8a098" />
              </Pressable>
            )}
          </View>

          {resultados.length > 0 && (
            <View className="bg-white rounded-2xl border border-tierra-200 mt-1 overflow-hidden"
              style={{ shadowColor: '#1F3D36', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}
            >
              {resultados.map((r, i) => (
                <Pressable
                  key={`${r.tipo}-${r.id}`}
                  onPress={() => irA(r)}
                  className={`flex-row items-center px-4 py-3 gap-3 active:bg-tierra-50 ${i > 0 ? 'border-t border-tierra-100' : ''}`}
                >
                  <Text className="text-base">{r.tipo === 'materia' ? '🌿' : '🧪'}</Text>
                  <View className="flex-1">
                    <Text className="text-carbon text-sm font-semibold">{r.nombre}</Text>
                    <Text className="text-tierra-500 text-xs">{r.subtitulo}</Text>
                  </View>
                  <ChevronRight size={14} stroke="#a8a098" />
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* ── GRID PRINCIPAL ──────────────────────── */}
        <View className="px-4 mt-3">
          <View className="flex-row flex-wrap gap-3">
            {GRID.map((item) => {
              const Icon = item.icon;
              return (
                <Pressable
                  key={item.label}
                  onPress={() => handleNav(item)}
                  className="active:opacity-75"
                  style={{ width: '47.5%' }}
                >
                  <View
                    className="bg-white rounded-2xl p-4 border border-tierra-200"
                    style={{
                      shadowColor: '#1F3D36',
                      shadowOpacity: 0.08,
                      shadowRadius: 8,
                      shadowOffset: { width: 0, height: 2 },
                      elevation: 2,
                    }}
                  >
                    <View className="w-10 h-10 bg-verde-100 rounded-xl items-center justify-center mb-3">
                      <Icon size={20} stroke="#1F3D36" />
                    </View>
                    <Text
                      className="text-carbon text-sm leading-5 mb-1"
                      style={{ fontFamily: 'Poppins_600SemiBold' }}
                      numberOfLines={2}
                    >
                      {item.label}
                    </Text>
                    <Text className="text-tierra-600 text-xs leading-4" numberOfLines={2}>
                      {item.desc}
                    </Text>
                    <View className="flex-row items-center justify-end mt-2">
                      {item.proximamente ? (
                        <View className="bg-tierra-100 rounded-full px-2 py-0.5">
                          <Text className="text-tierra-600 text-xs">Pronto</Text>
                        </View>
                      ) : (
                        <ChevronRight size={14} stroke="#9E5A38" />
                      )}
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* ── CAPACITACIÓN (full width) ──────────── */}
          <Pressable
            onPress={() => router.push('/(tabs)/calidad' as any)}
            className="mt-3 active:opacity-75"
          >
            <View
              className="bg-white rounded-2xl p-4 border border-tierra-200 flex-row items-center gap-4"
              style={{
                shadowColor: '#1F3D36',
                shadowOpacity: 0.08,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
              }}
            >
              <View className="w-12 h-12 bg-cosecha-400 rounded-xl items-center justify-center">
                <BookOpen size={22} stroke="#fff" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-carbon text-sm mb-0.5"
                  style={{ fontFamily: 'Poppins_600SemiBold' }}
                >
                  Capacitación
                </Text>
                <Text className="text-tierra-600 text-xs leading-4">
                  Aprende con guías, videos y manuales
                </Text>
              </View>
              <ChevronRight size={16} stroke="#9E5A38" />
            </View>
          </Pressable>
        </View>

        {/* ── ASISTENTE DE VOZ (integrado en scroll) ─ */}
        <Pressable
          onPress={() => Alert.alert('Asistente de voz', 'Próximamente disponible.')}
          className="mx-4 mt-3 active:opacity-75"
        >
          <View
            className="bg-cosecha-500 rounded-2xl p-4 flex-row items-center gap-4"
            style={{ shadowColor: '#9E5A38', shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 3 }}
          >
            <View className="w-12 h-12 bg-white bg-opacity-20 rounded-xl items-center justify-center">
              <Mic size={24} stroke="#fff" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-sm" style={{ fontFamily: 'Poppins_600SemiBold' }}>
                Asistente de voz
              </Text>
              <Text className="text-white text-xs opacity-80">Próximamente disponible</Text>
            </View>
          </View>
        </Pressable>

        {/* ── NOTA NOM/CODEX ──────────────────────── */}
        <View className="mx-4 mt-4 mb-8 bg-verde-800 rounded-2xl p-4">
          <Text className="text-verde-200 text-xs text-center leading-5">
            Información basada en{' '}
            <Text className="font-bold text-verde-100">
              normas oficiales mexicanas (NOM, CODEX)
            </Text>
            {' '}integrada en cada producto.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
