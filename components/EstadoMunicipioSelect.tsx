import { useState } from 'react';
import { View, Text, Pressable, Modal, FlatList, TextInput } from 'react-native';
import { ChevronDown, Search, X } from 'lucide-react-native';
import { ESTADOS_MUNICIPIOS, ESTADOS_LISTA } from '@/constants/estados_mx';

type Props = {
  estado:      string;
  municipio:   string;
  onEstado:    (v: string) => void;
  onMunicipio: (v: string) => void;
};

type PickerModalProps = {
  visible:   boolean;
  title:     string;
  items:     string[];
  selected:  string;
  onSelect:  (v: string) => void;
  onClose:   () => void;
};

function PickerModal({ visible, title, items, selected, onSelect, onClose }: PickerModalProps) {
  const [q, setQ] = useState('');
  const filtered = q.trim()
    ? items.filter((i) => i.toLowerCase().includes(q.toLowerCase()))
    : items;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(18,29,22,0.55)' }}>
        <View style={{ backgroundColor: '#D0CAC0', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '75%' }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
            <Text style={{ flex: 1, fontSize: 16, fontWeight: '600', color: '#1A1A1A', fontFamily: 'Poppins_600SemiBold' }}>{title}</Text>
            <Pressable onPress={onClose} style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: '#C1BAAE', alignItems: 'center', justifyContent: 'center' }}>
              <X size={18} color="#1A1A1A" />
            </Pressable>
          </View>
          {/* Search */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 8, backgroundColor: '#C1BAAE', borderRadius: 12, paddingHorizontal: 12, height: 44, borderWidth: 1, borderColor: '#B0A897' }}>
            <Search size={16} color="#4A4A4A" />
            <TextInput
              value={q}
              onChangeText={setQ}
              placeholder="Buscar..."
              placeholderTextColor="#9A917F"
              style={{ flex: 1, marginLeft: 8, fontSize: 14, color: '#1A1A1A', fontFamily: 'Poppins_400Regular' }}
            />
            {q.length > 0 && (
              <Pressable onPress={() => setQ('')}>
                <X size={15} color="#9A917F" />
              </Pressable>
            )}
          </View>
          {/* List */}
          <FlatList
            data={filtered}
            keyExtractor={(item) => item}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => { onSelect(item); setQ(''); onClose(); }}
                style={{ paddingVertical: 14, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: '#C4BDB2' }}
              >
                <Text style={{
                  fontSize: 14,
                  color: item === selected ? '#1F3D36' : '#1A1A1A',
                  fontWeight: item === selected ? '600' : '400',
                  fontFamily: item === selected ? 'Poppins_600SemiBold' : 'Poppins_400Regular',
                }}>
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

function SelectField({ label, value, placeholder, onPress }: { label: string; value: string; placeholder: string; onPress: () => void }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 13, fontWeight: '500', color: '#1A1A1A', marginBottom: 6, fontFamily: 'Poppins_500Medium' }}>{label}</Text>
      <Pressable
        onPress={onPress}
        style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#C1BAAE', borderRadius: 12, paddingHorizontal: 16, height: 50, borderWidth: 1, borderColor: '#B0A897' }}
      >
        <Text style={{ flex: 1, fontSize: 15, color: value ? '#1A1A1A' : '#9A917F', fontFamily: 'Poppins_400Regular' }}>
          {value || placeholder}
        </Text>
        <ChevronDown size={18} color="#4A4A4A" />
      </Pressable>
    </View>
  );
}

export function EstadoMunicipioSelect({ estado, municipio, onEstado, onMunicipio }: Props) {
  const [showEstados, setShowEstados] = useState(false);
  const [showMunicipios, setShowMunicipios] = useState(false);

  const municipios: string[] = estado && ESTADOS_MUNICIPIOS[estado] ? ESTADOS_MUNICIPIOS[estado] : [];
  const pendiente = estado && !ESTADOS_MUNICIPIOS[estado];

  return (
    <View>
      <SelectField
        label="Estado"
        value={estado}
        placeholder="Selecciona tu estado"
        onPress={() => setShowEstados(true)}
      />

      {pendiente ? (
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 13, fontWeight: '500', color: '#1A1A1A', marginBottom: 6, fontFamily: 'Poppins_500Medium' }}>Municipio</Text>
          <TextInput
            value={municipio}
            onChangeText={onMunicipio}
            placeholder="Escribe tu municipio"
            placeholderTextColor="#9A917F"
            style={{ backgroundColor: '#C1BAAE', borderRadius: 12, paddingHorizontal: 16, height: 50, borderWidth: 1, borderColor: '#B0A897', fontSize: 15, color: '#1A1A1A', fontFamily: 'Poppins_400Regular' }}
          />
        </View>
      ) : (
        <SelectField
          label="Municipio"
          value={municipio}
          placeholder={estado ? 'Selecciona tu municipio' : 'Primero elige un estado'}
          onPress={() => estado ? setShowMunicipios(true) : null}
        />
      )}

      <PickerModal
        visible={showEstados}
        title="Selecciona tu estado"
        items={ESTADOS_LISTA}
        selected={estado}
        onSelect={(v) => { onEstado(v); onMunicipio(''); }}
        onClose={() => setShowEstados(false)}
      />

      <PickerModal
        visible={showMunicipios}
        title={`Municipios de ${estado}`}
        items={municipios}
        selected={municipio}
        onSelect={onMunicipio}
        onClose={() => setShowMunicipios(false)}
      />
    </View>
  );
}
