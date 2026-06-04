import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, MessagesSquare, Store, Handshake } from 'lucide-react-native';

const FEATURES = [
  { icon: MessagesSquare, label: 'Foros por región y cultivo' },
  { icon: Store,          label: 'Vitrina de productos locales' },
  { icon: Handshake,      label: 'Compra y venta entre productores' },
];

export default function Comunidad() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D0CAC0' }} edges={['top']}>
      <View style={{ backgroundColor: '#1F3D36', paddingHorizontal: 16, paddingTop: 4, paddingBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={() => router.back()} style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={21} color="#F4F1EA" strokeWidth={1.9} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#F4F1EA', fontSize: 18, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>Comunidad</Text>
            <Text style={{ color: '#A7C49A', fontSize: 12, fontWeight: '300' }}>Conecta con otros productores</Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
        <View style={{ width: 104, height: 104, borderRadius: 52, backgroundColor: '#C1BAAE', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 52 }}>👥</Text>
        </View>
        <Text style={{ color: '#1A1A1A', fontSize: 24, fontWeight: '600', textAlign: 'center', marginTop: 20, fontFamily: 'Poppins_600SemiBold' }}>Próximamente</Text>
        <Text style={{ color: '#4A4A4A', fontSize: 13.5, fontWeight: '300', textAlign: 'center', marginTop: 10, lineHeight: 21 }}>
          Una red para que los productores rurales compartan sus productos, intercambien consejos y aprendan unos de otros en todo México.
        </Text>

        <View style={{ width: '100%', gap: 10, marginTop: 28 }}>
          {FEATURES.map(({ icon: Icon, label }) => (
            <View key={label} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#C1BAAE', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14 }}>
              <Icon size={20} color="#465D43" strokeWidth={1.7} />
              <Text style={{ color: '#1A1A1A', fontSize: 13.5, fontWeight: '500', flex: 1, fontFamily: 'Poppins_500Medium' }}>{label}</Text>
            </View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#1F3D36', borderRadius: 99, paddingHorizontal: 16, paddingVertical: 8, marginTop: 28 }}>
          <Text style={{ fontSize: 14 }}>🚀</Text>
          <Text style={{ color: '#93B36F', fontSize: 12, fontWeight: '600', letterSpacing: 0.5, fontFamily: 'Poppins_600SemiBold' }}>Fase 2 — En desarrollo</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
