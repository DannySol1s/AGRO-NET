import { EstadoMunicipioSelect } from "@/components/EstadoMunicipioSelect";
import {
  useUsuarioStore,
  type HerramientaDisponible,
  type NivelExperiencia,
} from "@/store/usuario";
import { router } from "expo-router";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const HERRAMIENTAS: {
  id: HerramientaDisponible;
  label: string;
  emoji: string;
}[] = [
  { id: "olla_grande", label: "Olla grande", emoji: "🍲" },
  { id: "estufa", label: "Estufa", emoji: "🔥" },
  { id: "licuadora", label: "Licuadora", emoji: "🌀" },
  { id: "cuchillos", label: "Cuchillos", emoji: "🔪" },
  { id: "tabla_cortar", label: "Tabla de cortar", emoji: "🪵" },
  { id: "bascula", label: "Báscula", emoji: "⚖️" },
  { id: "termometro", label: "Termómetro", emoji: "🌡️" },
  { id: "envases_frascos", label: "Envases / frascos", emoji: "🫙" },
  { id: "refrigerador", label: "Refrigerador", emoji: "❄️" },
  { id: "recipientes_plasticos", label: "Recipientes plásticos", emoji: "🥡" },
  { id: "cucharas_acero", label: "Cucharas de acero", emoji: "🥄" },
  { id: "pelador", label: "Pelador", emoji: "🥔" },
  { id: "rallador", label: "Rallador", emoji: "🧀" },
  { id: "molino_mano", label: "Molino de mano", emoji: "⚙️" },
  { id: "exprimidor", label: "Exprimidor", emoji: "🍋" },
  { id: "colador", label: "Colador", emoji: "🕳️" },
  { id: "vasos_medidores", label: "Vasos medidores", emoji: "🥛" },
  { id: "pinzas_cocina", label: "Pinzas de cocina", emoji: "🍴" },
  { id: "embudo", label: "Embudo", emoji: "🔻" },
];

const NIVELES: {
  id: NivelExperiencia;
  emoji: string;
  label: string;
  desc: string;
}[] = [
  {
    id: "principiante",
    emoji: "🌱",
    label: "Principiante",
    desc: "Nunca he elaborado productos",
  },
  {
    id: "medio",
    emoji: "🌿",
    label: "Intermedio",
    desc: "He elaborado algunos productos básicos",
  },
  {
    id: "avanzado",
    emoji: "🌳",
    label: "Avanzado",
    desc: "Tengo experiencia en procesamiento",
  },
];

const PASOS = 4;

export default function Diagnostico() {
  const insets = useSafeAreaInsets();
  const [paso, setPaso] = useState(1);
  const {
    nombre,
    setNombre,
    estado,
    setEstado,
    municipio,
    setMunicipio,
    herramientas,
    toggleHerramienta,
    nivelExperiencia,
    setNivelExperiencia,
    setOnboardingCompleto,
  } = useUsuarioStore();

  const canNext =
    paso === 1
      ? nombre.trim().length > 0
      : paso === 3
        ? !!nivelExperiencia
        : true;

  function avanzar() {
    if (paso < PASOS) setPaso(paso + 1);
    else {
      setOnboardingCompleto(true);
      router.replace("/(tabs)/inicio");
    }
  }

  function retroceder() {
    if (paso > 1) setPaso(paso - 1);
    else router.replace("/bienvenida");
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#D0CAC0" }}
      edges={["top"]}
    >
      {/* Header */}
      <View
        style={{
          backgroundColor: "#1F3D36",
          paddingHorizontal: 16,
          paddingTop: 4,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <Pressable
            onPress={retroceder}
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: "rgba(255,255,255,0.08)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowLeft size={21} color="#F4F1EA" strokeWidth={1.9} />
          </Pressable>
          <Text
            style={{
              color: "#A7C49A",
              fontSize: 13,
              fontWeight: "500",
              flex: 1,
            }}
          >
            Paso {paso} de {PASOS}
          </Text>
          <Text style={{ color: "#F4F1EA", fontSize: 13, fontWeight: "600" }}>
            Diagnóstico
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 6 }}>
          {Array.from({ length: PASOS }).map((_, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: 5,
                borderRadius: 3,
                backgroundColor:
                  i < paso ? "#9E5A38" : "rgba(255,255,255,0.14)",
              }}
            />
          ))}
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* PASO 1 — Datos personales */}
        {paso === 1 && (
          <View>
            <Text
              style={{
                color: "#1A1A1A",
                fontSize: 23,
                fontWeight: "600",
                lineHeight: 30,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              ¿Cómo te llamas?
            </Text>
            <Text
              style={{
                color: "#4A4A4A",
                fontSize: 13.5,
                fontWeight: "300",
                marginTop: 6,
                marginBottom: 24,
                lineHeight: 20,
              }}
            >
              Esta información personaliza tu experiencia en la app
            </Text>

            <Text
              style={{
                color: "#1A1A1A",
                fontSize: 13,
                fontWeight: "500",
                marginBottom: 6,
                fontFamily: "Poppins_500Medium",
              }}
            >
              Tu nombre
            </Text>
            <TextInput
              value={nombre}
              onChangeText={setNombre}
              placeholder="Ej: Ángel Solís"
              placeholderTextColor="#9A917F"
              style={{
                backgroundColor: "#C1BAAE",
                borderRadius: 12,
                paddingHorizontal: 16,
                height: 50,
                borderWidth: 1,
                borderColor: "#B0A897",
                fontSize: 15,
                color: "#1A1A1A",
                marginBottom: 16,
                fontFamily: "Poppins_400Regular",
              }}
            />

            <EstadoMunicipioSelect
              estado={estado}
              municipio={municipio}
              onEstado={setEstado}
              onMunicipio={setMunicipio}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 10,
                backgroundColor: "rgba(70,93,67,0.12)",
                borderWidth: 1,
                borderColor: "rgba(70,93,67,0.2)",
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginTop: 4,
              }}
            >
              <ShieldCheck size={18} color="#465D43" strokeWidth={1.7} />
              <Text
                style={{
                  color: "#3C4F3A",
                  fontSize: 12.5,
                  fontWeight: "300",
                  flex: 1,
                  lineHeight: 19,
                }}
              >
                Estos datos solo se guardan en tu teléfono. No se comparten con
                nadie.
              </Text>
            </View>
          </View>
        )}

        {/* PASO 2 — Herramientas */}
        {paso === 2 && (
          <View>
            <Text
              style={{
                color: "#1A1A1A",
                fontSize: 23,
                fontWeight: "600",
                lineHeight: 30,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              ¿Qué herramientas tienes?
            </Text>
            <Text
              style={{
                color: "#4A4A4A",
                fontSize: 13.5,
                fontWeight: "300",
                marginTop: 6,
                marginBottom: 24,
                lineHeight: 20,
              }}
            >
              Selecciona todo lo que tienes disponible
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {HERRAMIENTAS.map((h) => {
                const on = herramientas.includes(h.id);
                return (
                  <Pressable
                    key={h.id}
                    onPress={() => toggleHerramienta(h.id)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: on ? "#1F3D36" : "#C1BAAE",
                      borderWidth: 1,
                      borderColor: on ? "#1F3D36" : "#B0A897",
                      borderRadius: 99,
                      paddingHorizontal: 14,
                      paddingVertical: 10,
                    }}
                  >
                    <Text style={{ fontSize: 15 }}>{h.emoji}</Text>
                    <Text
                      style={{
                        color: on ? "#F4F1EA" : "#1A1A1A",
                        fontSize: 13,
                        fontWeight: "500",
                        fontFamily: "Poppins_500Medium",
                      }}
                    >
                      {h.label}
                    </Text>
                    {on && (
                      <Text
                        style={{
                          color: "#93B36F",
                          fontSize: 12,
                          fontWeight: "700",
                        }}
                      >
                        ✓
                      </Text>
                    )}
                  </Pressable>
                );
              })}
            </View>
            <Text
              style={{
                color: "#4A4A4A",
                fontSize: 12,
                fontWeight: "300",
                marginTop: 16,
              }}
            >
              {herramientas.length} seleccionada
              {herramientas.length !== 1 ? "s" : ""}
            </Text>
          </View>
        )}

        {/* PASO 3 — Nivel */}
        {paso === 3 && (
          <View>
            <Text
              style={{
                color: "#1A1A1A",
                fontSize: 23,
                fontWeight: "600",
                lineHeight: 30,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              ¿Cuál es tu experiencia?
            </Text>
            <Text
              style={{
                color: "#4A4A4A",
                fontSize: 13.5,
                fontWeight: "300",
                marginTop: 6,
                marginBottom: 24,
                lineHeight: 20,
              }}
            >
              Esto nos ayuda a recomendarte los procesos más adecuados
            </Text>
            <View style={{ gap: 12 }}>
              {NIVELES.map((n) => {
                const on = nivelExperiencia === n.id;
                return (
                  <Pressable
                    key={n.id}
                    onPress={() => setNivelExperiencia(n.id)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 14,
                      backgroundColor: on ? "#1F3D36" : "#C1BAAE",
                      borderWidth: 2,
                      borderColor: on ? "#9E5A38" : "#B0A897",
                      borderRadius: 16,
                      paddingHorizontal: 16,
                      paddingVertical: 16,
                    }}
                  >
                    <Text style={{ fontSize: 30 }}>{n.emoji}</Text>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: on ? "#F4F1EA" : "#1A1A1A",
                          fontSize: 16,
                          fontWeight: "600",
                          fontFamily: "Poppins_600SemiBold",
                        }}
                      >
                        {n.label}
                      </Text>
                      <Text
                        style={{
                          color: on ? "#A7C49A" : "#4A4A4A",
                          fontSize: 12.5,
                          fontWeight: "300",
                          marginTop: 2,
                        }}
                      >
                        {n.desc}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: on ? "#9E5A38" : "#9A917F",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {on && (
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: "#9E5A38",
                          }}
                        />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {/* PASO 4 — Confirmación */}
        {paso === 4 && (
          <View style={{ alignItems: "center", paddingTop: 8 }}>
            <View
              style={{
                width: 84,
                height: 84,
                borderRadius: 42,
                backgroundColor: "rgba(147,179,111,0.18)",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 4,
              }}
            >
              <Text style={{ fontSize: 44 }}>🎉</Text>
            </View>
            <Text
              style={{
                color: "#1A1A1A",
                fontSize: 23,
                fontWeight: "600",
                textAlign: "center",
                marginTop: 12,
                fontFamily: "Poppins_600SemiBold",
              }}
            >
              ¡Todo listo{nombre ? `, ${nombre.split(" ")[0]}` : ""}!
            </Text>
            <Text
              style={{
                color: "#4A4A4A",
                fontSize: 13.5,
                fontWeight: "300",
                textAlign: "center",
                marginTop: 8,
                paddingHorizontal: 12,
                lineHeight: 20,
              }}
            >
              Tu perfil está configurado. La app se adaptará a tus herramientas
              y nivel de experiencia.
            </Text>
            <View style={{ width: "100%", gap: 10, marginTop: 24 }}>
              {[
                ["👤", "Nombre", nombre || "—"],
                ["📍", "Estado", estado || "—"],
                ["📍", "Municipio", municipio || "—"],
                [
                  "🎯",
                  "Nivel",
                  NIVELES.find((n) => n.id === nivelExperiencia)?.label || "—",
                ],
                ["🔧", "Herramientas", herramientas.length + " seleccionadas"],
              ].map(([ic, k, v]) => (
                <View
                  key={k}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    backgroundColor: "#C1BAAE",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{ic}</Text>
                  <Text
                    style={{
                      color: "#4A4A4A",
                      fontSize: 13,
                      fontWeight: "300",
                      flex: 1,
                    }}
                  >
                    {k}
                  </Text>
                  <Text
                    style={{
                      color: "#1A1A1A",
                      fontSize: 13.5,
                      fontWeight: "500",
                      fontFamily: "Poppins_500Medium",
                    }}
                  >
                    {v}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Botón */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingBottom: Math.max(insets.bottom + 16, 32),
          paddingTop: 12,
          backgroundColor: "#D0CAC0",
        }}
      >
        <Pressable
          onPress={avanzar}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            backgroundColor: canNext ? "#9E5A38" : "#B9A99B",
            borderRadius: 16,
            paddingVertical: 16,
            shadowColor: "#9E5A38",
            shadowOpacity: canNext ? 0.7 : 0,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 8 },
            elevation: canNext ? 8 : 0,
          }}
        >
          <Text
            style={{
              color: "#F7F2EC",
              fontSize: 16,
              fontWeight: "600",
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            {paso === PASOS ? "Empezar a explorar" : "Continuar"}
          </Text>
          <ArrowRight size={19} color="#F7F2EC" strokeWidth={2} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
