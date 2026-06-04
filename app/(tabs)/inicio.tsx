import { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Sprout, Boxes, Calculator, Users, BookOpen, Bell, Mic, ChevronRight, Search, X, ArrowUpRight } from 'lucide-react-native';
import { db } from '@/db/client';
import { productos, materiasPrimas } from '@/db/schema';
import { useUsuarioStore } from '@/store/usuario';

type Result = { tipo: 'materia' | 'producto'; id: string; nombre: string; sub: string; emoji: string };

export default function Inicio() {
  const { nombre } = useUsuarioStore();
  const firstName = nombre?.split(' ')[0] || '';

  const [q, setQ]         = useState('');
  const [allProds, setAllProds] = useState<{ id: string; nombre: string; materiaPrimaId: string }[]>([]);
  const [allMats,  setAllMats]  = useState<{ id: string; nombre: string; emoji: string }[]>([]);

  useEffect(() => {
    db.select({ id: productos.id, nombre: productos.nombre, materiaPrimaId: productos.materiaPrimaId })
      .from(productos).then(setAllProds);
    db.select({ id: materiasPrimas.id, nombre: materiasPrimas.nombre, emoji: materiasPrimas.emoji })
      .from(materiasPrimas).then(setAllMats);
  }, []);

  const results = useMemo((): Result[] => {
    const ql = q.trim().toLowerCase();
    if (!ql) return [];
    return [
      ...allMats.filter((m) => m.nombre.toLowerCase().includes(ql))
        .map((m) => ({ tipo: 'materia' as const, id: m.id, nombre: m.nombre, sub: 'Materia prima', emoji: m.emoji })),
      ...allProds.filter((p) => p.nombre.toLowerCase().includes(ql))
        .map((p) => ({ tipo: 'producto' as const, id: p.id, nombre: p.nombre, sub: allMats.find((m) => m.id === p.materiaPrimaId)?.nombre ?? '', emoji: '🧪' })),
    ].slice(0, 6);
  }, [q, allProds, allMats]);

  function irA(r: Result) {
    setQ('');
    if (r.tipo === 'producto') router.push(`/(tabs)/materias/producto/${r.id}` as any);
    else router.push(`/(tabs)/materias/${r.id}` as any);
  }

  const GRID = [
    { icon: Sprout,    title: 'Materias Primas',           desc: 'Conoce propiedades y beneficios',   go: () => router.push('/(tabs)/materias' as any) },
    { icon: Boxes,     title: 'Productos Agroindustriales', desc: 'Explora productos y procesos',      go: () => router.push('/(tabs)/productos' as any) },
    { icon: Calculator,title: 'Calculadora',                desc: 'Costos, rendimiento y ganancias',  go: () => router.push('/(tabs)/costos' as any) },
    { icon: Users,     title: 'Comunidad',                  desc: 'Comparte experiencias y aprende',  go: () => router.push('/(tabs)/comunidad' as any), badge: 'Pronto' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D0CAC0' }} edges={['top']}>
      {/* Header */}
      <View style={{ backgroundColor: '#1F3D36', paddingHorizontal: 16, paddingTop: 4, paddingBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
            <Text style={{ fontSize: 28 }}>🌱</Text>
            <View>
              <Text style={{ color: '#F4F1EA', fontSize: 19, fontWeight: '600', letterSpacing: 0.5, fontFamily: 'Poppins_600SemiBold' }}>AGRO-NET</Text>
              <Text style={{ color: '#A7C49A', fontSize: 9.5, fontWeight: '300', letterSpacing: 1.6, marginTop: 2 }}>CONECTA, TRANSFORMA Y CRECE</Text>
            </View>
          </View>
          <Pressable
            onPress={() => Alert.alert('Notificaciones', 'Próximamente disponible.')}
            style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' }}
          >
            <Bell size={20} color="#F4F1EA" strokeWidth={1.7} />
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Bienvenida */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 4 }}>
          <Text style={{ color: '#1A1A1A', fontSize: 24, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>
            ¡Bienvenido{firstName ? `, ${firstName}` : ''}!
          </Text>
          <Text style={{ color: '#4A4A4A', fontSize: 14, fontWeight: '300', marginTop: 2 }}>¿Qué deseas hacer hoy?</Text>
        </View>

        {/* Buscador */}
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#C1BAAE', borderRadius: 16, paddingHorizontal: 16, height: 50, borderWidth: 1, borderColor: '#B0A897' }}>
            <Search size={19} color="#4A4A4A" strokeWidth={1.8} />
            <TextInput
              value={q}
              onChangeText={setQ}
              placeholder="Buscar productos o materias primas..."
              placeholderTextColor="#9A917F"
              style={{ flex: 1, paddingHorizontal: 12, fontSize: 14, color: '#1A1A1A', fontFamily: 'Poppins_400Regular' }}
            />
            {q.length > 0 && (
              <Pressable onPress={() => setQ('')}>
                <X size={18} color="#4A4A4A" strokeWidth={2} />
              </Pressable>
            )}
          </View>

          {q.trim().length > 0 && (
            <View style={{ backgroundColor: '#C1BAAE', borderRadius: 16, marginTop: 8, borderWidth: 1, borderColor: '#B0A897', overflow: 'hidden' }}>
              {results.length > 0 ? results.map((r, i) => (
                <Pressable key={`${r.tipo}-${r.id}`} onPress={() => irA(r)}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: i ? 1 : 0, borderTopColor: '#B0A897' }}>
                  <Text style={{ fontSize: 20 }}>{r.emoji}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: '#1A1A1A', fontSize: 14, fontWeight: '500', fontFamily: 'Poppins_500Medium' }}>{r.nombre}</Text>
                    <Text style={{ color: '#4A4A4A', fontSize: 11.5, fontWeight: '300' }}>{r.sub}</Text>
                  </View>
                  <ArrowUpRight size={17} color="#9E5A38" strokeWidth={2} />
                </Pressable>
              )) : (
                <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
                  <Text style={{ color: '#4A4A4A', fontSize: 13, fontWeight: '300' }}>Sin resultados para "{q}".</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Grid 2×2 */}
        <View style={{ paddingHorizontal: 16, marginTop: 20, gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {GRID.slice(0, 2).map((item) => <NavCard key={item.title} {...item} />)}
          </View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {GRID.slice(2, 4).map((item) => <NavCard key={item.title} {...item} />)}
          </View>
        </View>

        {/* Capacitación full-width */}
        <Pressable onPress={() => router.push('/(tabs)/calidad' as any)}
          style={{ marginHorizontal: 16, marginTop: 12, flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: '#1F3D36', borderRadius: 16, padding: 16, shadowColor: '#1F3D36', shadowOpacity: 0.6, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 6 }}>
          <View style={{ width: 50, height: 50, borderRadius: 14, backgroundColor: 'rgba(147,179,111,0.16)', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={25} color="#93B36F" strokeWidth={1.6} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#F4F1EA', fontSize: 16, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>Capacitación</Text>
            <Text style={{ color: '#A7C49A', fontSize: 12, fontWeight: '300', marginTop: 2 }}>Aprende con guías, videos y manuales</Text>
          </View>
          <ChevronRight size={20} color="#93B36F" strokeWidth={2} />
        </Pressable>

        {/* Asistente de voz */}
        <Pressable onPress={() => Alert.alert('Asistente de voz', 'Próximamente disponible.')}
          style={{ marginHorizontal: 16, marginTop: 12, flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#C1BAAE', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#9E5A38', borderStyle: 'dashed' }}>
          <View style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: '#9E5A38', alignItems: 'center', justifyContent: 'center' }}>
            <Mic size={22} color="#F7F2EC" strokeWidth={1.8} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#1A1A1A', fontSize: 14.5, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>Asistente de voz</Text>
            <Text style={{ color: '#4A4A4A', fontSize: 12, fontWeight: '300', marginTop: 2 }}>Próximamente disponible</Text>
          </View>
          <View style={{ backgroundColor: '#9E5A38', borderRadius: 99, paddingHorizontal: 10, paddingVertical: 4 }}>
            <Text style={{ color: '#F6EAE2', fontSize: 10, fontWeight: '600', letterSpacing: 0.4 }}>Pronto</Text>
          </View>
        </Pressable>

        {/* Nota NOM */}
        <View style={{ marginHorizontal: 16, marginTop: 20, flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
          <Text style={{ fontSize: 15, marginTop: 1 }}>ℹ️</Text>
          <Text style={{ color: '#4A4A4A', fontSize: 11.5, fontWeight: '300', lineHeight: 18, flex: 1 }}>
            Información basada en normas oficiales mexicanas (NOM, CODEX) integrada en cada producto.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function NavCard({ icon: Icon, title, desc, go, badge }: { icon: any; title: string; desc: string; go: () => void; badge?: string }) {
  return (
    <Pressable onPress={go} style={{ flex: 1, backgroundColor: '#C1BAAE', borderRadius: 16, padding: 16, minHeight: 152, shadowColor: '#1A1A1A', shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: '#1F3D36', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={24} color="#93B36F" strokeWidth={1.6} />
        </View>
        {badge && (
          <View style={{ backgroundColor: '#9E5A38', borderRadius: 99, paddingHorizontal: 10, paddingVertical: 4 }}>
            <Text style={{ color: '#F6EAE2', fontSize: 10, fontWeight: '600' }}>{badge}</Text>
          </View>
        )}
      </View>
      <View style={{ marginTop: 'auto', paddingTop: 12 }}>
        <Text style={{ color: '#1A1A1A', fontSize: 15, fontWeight: '600', lineHeight: 20, fontFamily: 'Poppins_600SemiBold' }}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 4 }}>
          <Text style={{ color: '#4A4A4A', fontSize: 11.5, fontWeight: '300', lineHeight: 16, flex: 1, maxWidth: '85%' }}>{desc}</Text>
          <ChevronRight size={18} color="#9E5A38" strokeWidth={2} />
        </View>
      </View>
    </Pressable>
  );
}
