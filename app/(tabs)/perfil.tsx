import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Wrench, Target, RotateCcw, Moon, CircleUser } from 'lucide-react-native';
import { useUsuarioStore, type HerramientaDisponible, type NivelExperiencia } from '@/store/usuario';
import { EstadoMunicipioSelect } from '@/components/EstadoMunicipioSelect';
import { useState } from 'react';

const HERRAMIENTAS: { id: HerramientaDisponible; label: string; emoji: string }[] = [
  { id: 'olla_grande',          label: 'Olla grande',           emoji: '🍲' },
  { id: 'estufa',               label: 'Estufa',                emoji: '🔥' },
  { id: 'licuadora',            label: 'Licuadora',             emoji: '🌀' },
  { id: 'cuchillos',            label: 'Cuchillos',             emoji: '🔪' },
  { id: 'tabla_cortar',         label: 'Tabla de cortar',       emoji: '🪵' },
  { id: 'bascula',              label: 'Báscula',               emoji: '⚖️' },
  { id: 'termometro',           label: 'Termómetro',            emoji: '🌡️' },
  { id: 'envases_frascos',      label: 'Envases / frascos',     emoji: '🫙' },
  { id: 'refrigerador',         label: 'Refrigerador',          emoji: '❄️' },
  { id: 'recipientes_plasticos',label: 'Recipientes plásticos', emoji: '🥡' },
  { id: 'cucharas_acero',       label: 'Cucharas de acero',     emoji: '🥄' },
  { id: 'pelador',              label: 'Pelador',               emoji: '🥔' },
  { id: 'rallador',             label: 'Rallador',              emoji: '🧀' },
  { id: 'molino_mano',          label: 'Molino de mano',        emoji: '⚙️' },
  { id: 'exprimidor',           label: 'Exprimidor',            emoji: '🍋' },
  { id: 'colador',              label: 'Colador',               emoji: '🕳️' },
  { id: 'vasos_medidores',      label: 'Vasos medidores',       emoji: '🥛' },
  { id: 'pinzas_cocina',        label: 'Pinzas de cocina',      emoji: '🍴' },
  { id: 'embudo',               label: 'Embudo',                emoji: '🔻' },
];

const NIVELES: { id: NivelExperiencia; emoji: string; label: string; desc: string }[] = [
  { id: 'principiante', emoji: '🌱', label: 'Principiante', desc: 'Nunca he elaborado productos' },
  { id: 'medio',        emoji: '🌿', label: 'Intermedio',   desc: 'He hecho algunos productos' },
  { id: 'avanzado',     emoji: '🌳', label: 'Avanzado',     desc: 'Tengo experiencia' },
];

function SectionTitle({ icon: Icon, children }: { icon: any; children: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24, marginBottom: 12 }}>
      <Icon size={18} color="#9E5A38" strokeWidth={1.9} />
      <Text style={{ color: '#1A1A1A', fontSize: 13, fontWeight: '600', letterSpacing: 0.6, textTransform: 'uppercase', fontFamily: 'Poppins_600SemiBold' }}>{children}</Text>
    </View>
  );
}

export default function Perfil() {
  const { nombre, setNombre, estado, setEstado, municipio, setMunicipio,
          herramientas, toggleHerramienta, nivelExperiencia, setNivelExperiencia,
          favoritos, resetDiagnostico } = useUsuarioStore();
  const [darkMode, setDarkMode] = useState(false);
  const inicial = (nombre || 'A').trim().charAt(0).toUpperCase();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D0CAC0' }} edges={['top']}>
      {/* Header */}
      <View style={{ backgroundColor: '#1F3D36', paddingHorizontal: 16, paddingTop: 4, paddingBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={() => router.back()} style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={21} color="#F4F1EA" strokeWidth={1.9} />
          </Pressable>
          <View style={{ width: 46, height: 46, borderRadius: 14, backgroundColor: 'rgba(147,179,111,0.18)', borderWidth: 1, borderColor: 'rgba(147,179,111,0.25)', alignItems: 'center', justifyContent: 'center' }}>
            <CircleUser size={26} color="#93B36F" strokeWidth={1.5} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#F4F1EA', fontSize: 20, fontWeight: '600', fontFamily: 'Poppins_600SemiBold', lineHeight: 26 }}>
              {nombre ? nombre.split(' ')[0] : 'Mi Perfil'}
            </Text>
            <Text style={{ color: '#A7C49A', fontSize: 12, fontWeight: '300', marginTop: 1 }}>
              {herramientas.length > 0 ? `${herramientas.length} herramientas · ${nivelExperiencia}` : 'Configura tu perfil'}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>

        {/* Avatar */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#C1BAAE', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14 }}>
          <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#1F3D36', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#93B36F', fontSize: 24, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>{inicial}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#1A1A1A', fontSize: 16, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>{nombre || 'Productor'}</Text>
            <Text style={{ color: '#4A4A4A', fontSize: 12, fontWeight: '300', marginTop: 2 }}>
              {herramientas.length} herramientas · {favoritos.length} favoritos
            </Text>
          </View>
        </View>

        {/* Datos */}
        <SectionTitle icon={() => <Text style={{ fontSize: 18 }}>👤</Text>}>Mis datos</SectionTitle>
        <View style={{ gap: 12 }}>
          <View>
            <Text style={{ color: '#1A1A1A', fontSize: 12.5, fontWeight: '500', marginBottom: 6, fontFamily: 'Poppins_500Medium' }}>Nombre</Text>
            <TextInput
              value={nombre}
              onChangeText={setNombre}
              placeholder="Tu nombre"
              placeholderTextColor="#9A917F"
              style={{ backgroundColor: '#C1BAAE', borderRadius: 12, paddingHorizontal: 16, height: 48, borderWidth: 1, borderColor: '#B0A897', fontSize: 15, color: '#1A1A1A', fontFamily: 'Poppins_400Regular' }}
            />
          </View>
          <EstadoMunicipioSelect estado={estado} municipio={municipio} onEstado={setEstado} onMunicipio={setMunicipio} />
        </View>

        {/* Herramientas */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 24, marginBottom: 12 }}>
          <Wrench size={18} color="#9E5A38" strokeWidth={1.9} />
          <Text style={{ color: '#1A1A1A', fontSize: 13, fontWeight: '600', letterSpacing: 0.6, textTransform: 'uppercase', flex: 1, fontFamily: 'Poppins_600SemiBold' }}>MIS HERRAMIENTAS</Text>
          <Text style={{ color: '#465D43', fontSize: 12, fontWeight: '500', fontFamily: 'Poppins_500Medium' }}>{herramientas.length} de {HERRAMIENTAS.length}</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {HERRAMIENTAS.map((h) => {
            const on = herramientas.includes(h.id);
            return (
              <Pressable key={h.id} onPress={() => toggleHerramienta(h.id)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: on ? '#1F3D36' : '#C1BAAE', borderWidth: 1, borderColor: on ? '#1F3D36' : '#B0A897', borderRadius: 99, paddingHorizontal: 14, paddingVertical: 10 }}>
                <Text style={{ fontSize: 14 }}>{h.emoji}</Text>
                <Text style={{ color: on ? '#F4F1EA' : '#1A1A1A', fontSize: 12.5, fontWeight: '500', fontFamily: 'Poppins_500Medium' }}>{h.label}</Text>
                {on && <Text style={{ color: '#93B36F', fontSize: 12, fontWeight: '700' }}>✓</Text>}
              </Pressable>
            );
          })}
        </View>

        {/* Nivel */}
        <SectionTitle icon={Target}>Nivel de experiencia</SectionTitle>
        <View style={{ gap: 10 }}>
          {NIVELES.map((n) => {
            const on = nivelExperiencia === n.id;
            return (
              <Pressable key={n.id} onPress={() => setNivelExperiencia(n.id)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: on ? '#1F3D36' : '#C1BAAE', borderWidth: 2, borderColor: on ? '#9E5A38' : 'transparent', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14 }}>
                <Text style={{ fontSize: 26 }}>{n.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: on ? '#F4F1EA' : '#1A1A1A', fontSize: 15, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>{n.label}</Text>
                  <Text style={{ color: on ? '#A7C49A' : '#4A4A4A', fontSize: 11.5, fontWeight: '300', marginTop: 2 }}>{n.desc}</Text>
                </View>
                <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: on ? '#9E5A38' : '#9A917F', alignItems: 'center', justifyContent: 'center' }}>
                  {on && <View style={{ width: 11, height: 11, borderRadius: 5.5, backgroundColor: '#9E5A38' }} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Reconfigurar */}
        <Pressable onPress={() => { resetDiagnostico(); router.replace('/diagnostico'); }}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(158,90,56,0.1)', borderWidth: 1, borderColor: 'rgba(158,90,56,0.35)', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, marginTop: 24 }}>
          <RotateCcw size={19} color="#9E5A38" strokeWidth={1.9} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#9E5A38', fontSize: 14, fontWeight: '600', fontFamily: 'Poppins_600SemiBold' }}>Reconfigurar perfil</Text>
            <Text style={{ color: '#4A4A4A', fontSize: 11.5, fontWeight: '300', marginTop: 2 }}>Reinicia herramientas y nivel de experiencia</Text>
          </View>
        </Pressable>

        {/* Modo noche */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#C1BAAE', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, marginTop: 12 }}>
          <Moon size={19} color="#465D43" strokeWidth={1.7} />
          <Text style={{ color: '#1A1A1A', fontSize: 14, fontWeight: '500', flex: 1, fontFamily: 'Poppins_500Medium' }}>Modo noche</Text>
          <Pressable onPress={() => setDarkMode(!darkMode)}
            style={{ width: 48, height: 28, borderRadius: 14, backgroundColor: darkMode ? '#9E5A38' : '#9A917F', padding: 3, justifyContent: 'center', alignItems: darkMode ? 'flex-end' : 'flex-start' }}>
            <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: '#F4F1EA' }} />
          </Pressable>
        </View>

        {/* Version */}
        <View style={{ alignItems: 'center', marginTop: 24 }}>
          <Text style={{ fontSize: 24 }}>🌱</Text>
          <Text style={{ color: '#7C9C59', fontSize: 11, fontWeight: '500', marginTop: 8, letterSpacing: 1, fontFamily: 'Poppins_500Medium' }}>AGRO-NET · v1.0</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
