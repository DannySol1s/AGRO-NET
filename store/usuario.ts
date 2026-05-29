import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type NivelExperiencia = 'principiante' | 'medio' | 'avanzado';

export type HerramientaDisponible =
  | 'olla_grande'
  | 'licuadora'
  | 'cuchillos'
  | 'tabla_cortar'
  | 'bascula'
  | 'termometro'
  | 'envases_frascos'
  | 'refrigerador';

type UsuarioState = {
  onboardingCompleto: boolean;
  nombre: string;
  nivelExperiencia: NivelExperiencia;
  herramientas: HerramientaDisponible[];
  cantidadKg: string;
  setOnboardingCompleto: (valor: boolean) => void;
  setNombre: (nombre: string) => void;
  setNivelExperiencia: (nivel: NivelExperiencia) => void;
  toggleHerramienta: (herramienta: HerramientaDisponible) => void;
  setCantidadKg: (cantidad: string) => void;
  resetDiagnostico: () => void;
};

export const useUsuarioStore = create<UsuarioState>()(
  persist(
    (set) => ({
      onboardingCompleto: false,
      nombre: '',
      nivelExperiencia: 'principiante',
      herramientas: [],
      cantidadKg: '',

      setOnboardingCompleto: (valor) => set({ onboardingCompleto: valor }),
      setNombre: (nombre) => set({ nombre }),
      setNivelExperiencia: (nivel) => set({ nivelExperiencia: nivel }),
      setCantidadKg: (cantidadKg) => set({ cantidadKg }),

      toggleHerramienta: (herramienta) =>
        set((state) => ({
          herramientas: state.herramientas.includes(herramienta)
            ? state.herramientas.filter((h) => h !== herramienta)
            : [...state.herramientas, herramienta],
        })),

      resetDiagnostico: () =>
        set({ nivelExperiencia: 'principiante', herramientas: [], cantidadKg: '' }),
    }),
    {
      name: 'usuario-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
