import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FlaskConical, BadgeCheck, TrendingUp } from 'lucide-react-native';

const FEATS: [React.ComponentType<{ size: number; color: string; strokeWidth: number }>, string, string][] = [
  [FlaskConical, 'Formulaciones Técnicas',    'Procesos profesionales con parámetros de calidad'],
  [BadgeCheck,   'Normativas Oficiales',       'NOM, CODEX y certificaciones de calidad'],
  [TrendingUp,   'Análisis Económico',         'Costos, rendimientos y estrategias de comercialización'],
];

export default function Bienvenida() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1F3D36' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 28, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}>

        {/* Logo */}
        <View style={{ width: 78, height: 78, borderRadius: 24, backgroundColor: 'rgba(147,179,111,0.12)', borderWidth: 1, borderColor: 'rgba(147,179,111,0.3)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <Text style={{ fontSize: 40 }}>🌱</Text>
        </View>

        <Text style={{ color: '#F4F1EA', fontSize: 32, fontWeight: '600', letterSpacing: 0.5, fontFamily: 'Poppins_600SemiBold' }}>
          AGRO-NET
        </Text>
        <Text style={{ color: '#A7C49A', fontSize: 12.5, fontWeight: '500', letterSpacing: 2.5, marginTop: 4, fontFamily: 'Poppins_500Medium' }}>
          CREA, CONSERVA Y EMPRENDE
        </Text>
        <Text style={{ color: '#CBD8C2', fontSize: 13, fontWeight: '300', textAlign: 'center', marginTop: 12, paddingHorizontal: 12, lineHeight: 20 }}>
          Plataforma Profesional de Transformación Agroalimentaria
        </Text>

        {/* Features */}
        <View style={{ width: '100%', marginTop: 28, gap: 12 }}>
          {FEATS.map(([Icon, title, desc]) => (
            <View key={title} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14 }}>
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(147,179,111,0.16)', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={22} color="#A7C49A" strokeWidth={1.7} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#F4F1EA', fontSize: 14.5, fontWeight: '500', fontFamily: 'Poppins_500Medium' }}>{title}</Text>
                <Text style={{ color: '#9FB596', fontSize: 12, fontWeight: '300', lineHeight: 17, marginTop: 2 }}>{desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA */}
        <Pressable
          onPress={() => router.replace('/diagnostico')}
          style={{ width: '100%', marginTop: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#9E5A38', borderRadius: 16, paddingVertical: 16, shadowColor: '#9E5A38', shadowOpacity: 0.7, shadowRadius: 20, shadowOffset: { width: 0, height: 8 }, elevation: 8 }}
        >
          <Text style={{ color: '#F7F2EC', fontSize: 16, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>
            Iniciar Plataforma ✨
          </Text>
        </Pressable>

        {/* Footer */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20 }}>
          <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#93B36F' }} />
          <Text style={{ color: '#9FB596', fontSize: 12, fontWeight: '300' }}>Funciona sin conexión</Text>
        </View>
        <Text style={{ color: '#6E8266', fontSize: 11, fontWeight: '300', marginTop: 8, textAlign: 'center' }}>
          Desarrollado para productores rurales mexicanos
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
