import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, ChevronRight, Leaf } from 'lucide-react-native';
import { db } from '@/db/client';
import { materiasPrimas } from '@/db/schema';
import { useSeleccionStore } from '@/store/seleccion';

type Materia = typeof materiasPrimas.$inferSelect;

const CAT_COLOR: Record<string, string> = {
  fruta: '#C9A227', tuberculo: '#8A6A4A', hierba: '#5C7A3F',
  semilla: '#7A5A38', legumbre: '#A07842',
};

export default function MateriasIndex() {
  const [materias, setMaterias]   = useState<Materia[]>([]);
  const [cats, setCats]           = useState<string[]>([]);
  const [cargando, setCargando]   = useState(true);
  const setMateriaPrima = useSeleccionStore((s) => s.setMateriaPrima);

  useEffect(() => {
    db.select().from(materiasPrimas).then((data) => { setMaterias(data); setCargando(false); });
  }, []);

  const allCats = [...new Set(materias.map((m) => m.categoria))];
  const toggle = (c: string) => setCats(cats.includes(c) ? cats.filter((x) => x !== c) : [...cats, c]);
  const list = cats.length ? materias.filter((m) => cats.includes(m.categoria)) : materias;

  const CAT_LABEL: Record<string, string> = {
    fruta: 'Fruta', tuberculo: 'Tubérculo', hierba: 'Hierba', semilla: 'Semilla', legumbre: 'Legumbre',
  };

  function seleccionar(id: string) {
    setMateriaPrima(id);
    router.push(`/(tabs)/materias/${id}` as any);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D0CAC0' }} edges={['top']}>
      {/* Header */}
      <View style={{ backgroundColor: '#1F3D36', paddingHorizontal: 16, paddingTop: 4, paddingBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={() => router.back()} style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={21} color="#F4F1EA" strokeWidth={1.9} />
          </Pressable>
          <View style={{ width: 46, height: 46, borderRadius: 14, backgroundColor: 'rgba(147,179,111,0.18)', borderWidth: 1, borderColor: 'rgba(147,179,111,0.25)', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={24} color="#93B36F" strokeWidth={1.6} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#F4F1EA', fontSize: 20, fontWeight: '600', fontFamily: 'Poppins_600SemiBold', lineHeight: 26 }}>Materias Primas</Text>
            <Text style={{ color: '#A7C49A', fontSize: 12, fontWeight: '300', marginTop: 1 }}>Información nutricional y propiedades funcionales</Text>
          </View>
        </View>
      </View>

      {cargando ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#4A4A4A', fontSize: 14 }}>Cargando...</Text>
        </View>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
              <Text style={{ color: '#4A4A4A', fontSize: 13, fontWeight: '500', marginBottom: 10, fontFamily: 'Poppins_500Medium' }}>Selecciona una o más categorías</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {allCats.map((c) => {
                  const on = cats.includes(c);
                  return (
                    <Pressable key={c} onPress={() => toggle(c)}
                      style={{ backgroundColor: on ? '#465D43' : '#C1BAAE', borderWidth: 1, borderColor: on ? '#465D43' : '#B0A897', borderRadius: 99, paddingHorizontal: 14, paddingVertical: 8 }}>
                      <Text style={{ color: on ? '#F4F1EA' : '#1A1A1A', fontSize: 12.5, fontWeight: '500', fontFamily: 'Poppins_500Medium' }}>{CAT_LABEL[c] ?? c}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          }
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24, gap: 10 }}
          renderItem={({ item }) => (
            <Pressable onPress={() => seleccionar(item.id)}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#C1BAAE', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14 }}>
              <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: '#D8D2C8', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 26 }}>{item.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#1A1A1A', fontSize: 16, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>{item.nombre}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: CAT_COLOR[item.categoria] ?? '#465D43' }} />
                  <Text style={{ color: '#4A4A4A', fontSize: 12, fontWeight: '300' }}>{CAT_LABEL[item.categoria] ?? item.categoria}</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#9E5A38" strokeWidth={2} />
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}
