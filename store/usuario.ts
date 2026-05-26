import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type NivelExperiencia = 'principiante' | 'medio' | 'avanzado';

export type HerramientaDisponible =
  | 'olla_grande'
  | 'licuadora'
  | 'colador'
  | 'frascos_vidrio'
  | 'refractometro'
  | 'termometro'
  | 'deshidratador';

type UsuarioState = {
  onboardingCompleto: boolean;
  nombre: string;
  nivelExperiencia: NivelExperiencia;
  herramientas: HerramientaDisponible[];
  setOnboardingCompleto: (valor: boolean) => void;
  setNombre: (nombre: string) => void;
  setNivelExperiencia: (nivel: NivelExperiencia) => void;
  toggleHerramienta: (herramienta: HerramientaDisponible) => void;
  resetDiagnostico: () => void;
};

export const useUsuarioStore = create<UsuarioState>()(
  persist(
    (set) => ({
      onboardingCompleto: false,
      nombre: '',
      nivelExperiencia: 'principiante',
      herramientas: [],

      setOnboardingCompleto: (valor) => set({ onboardingCompleto: valor }),
      setNombre: (nombre) => set({ nombre }),
      setNivelExperiencia: (nivel) => set({ nivelExperiencia: nivel }),

      toggleHerramienta: (herramienta) =>
        set((state) => ({
          herramientas: state.herramientas.includes(herramienta)
            ? state.herramientas.filter((h) => h !== herramienta)
            : [...state.herramientas, herramienta],
        })),

      resetDiagnostico: () =>
        set({ nivelExperiencia: 'principiante', herramientas: [] }),
    }),
    {
      name: 'usuario-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
