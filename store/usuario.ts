import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type NivelExperiencia = 'principiante' | 'medio' | 'avanzado';

export type HerramientaDisponible =
  | 'olla_grande' | 'licuadora' | 'cuchillos' | 'tabla_cortar'
  | 'bascula' | 'termometro' | 'envases_frascos' | 'refrigerador'
  | 'estufa' | 'recipientes_plasticos' | 'cucharas_acero' | 'pelador'
  | 'rallador' | 'molino_mano' | 'exprimidor' | 'colador'
  | 'vasos_medidores' | 'pinzas_cocina' | 'embudo';

type UsuarioState = {
  onboardingCompleto: boolean;
  nombre:             string;
  estado:             string;
  municipio:          string;
  nivelExperiencia:   NivelExperiencia;
  herramientas:       HerramientaDisponible[];
  favoritos:          string[];   // IDs de productos marcados como favoritos
  setOnboardingCompleto: (valor: boolean) => void;
  setNombre:             (v: string) => void;
  setEstado:             (v: string) => void;
  setMunicipio:          (v: string) => void;
  setNivelExperiencia:   (nivel: NivelExperiencia) => void;
  toggleHerramienta:     (h: HerramientaDisponible) => void;
  toggleFavorito:        (id: string) => void;
  resetDiagnostico:      () => void;
};

export const useUsuarioStore = create<UsuarioState>()(
  persist(
    (set) => ({
      onboardingCompleto: false,
      nombre:             '',
      estado:             '',
      municipio:          '',
      nivelExperiencia:   'principiante',
      herramientas:       [],
      favoritos:          [],

      setOnboardingCompleto: (valor)     => set({ onboardingCompleto: valor }),
      setNombre:             (nombre)    => set({ nombre }),
      setEstado:             (estado)    => set({ estado }),
      setMunicipio:          (municipio) => set({ municipio }),
      setNivelExperiencia:   (nivel)     => set({ nivelExperiencia: nivel }),

      toggleHerramienta: (h) =>
        set((s) => ({
          herramientas: s.herramientas.includes(h)
            ? s.herramientas.filter((x) => x !== h)
            : [...s.herramientas, h],
        })),

      toggleFavorito: (id) =>
        set((s) => ({
          favoritos: s.favoritos.includes(id)
            ? s.favoritos.filter((x) => x !== id)
            : [...s.favoritos, id],
        })),

      resetDiagnostico: () =>
        set({ onboardingCompleto: false, nivelExperiencia: 'principiante', herramientas: [] }),
    }),
    {
      name: 'usuario-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
