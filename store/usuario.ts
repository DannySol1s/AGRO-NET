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
  | 'refrigerador'
  | 'estufa'
  | 'recipientes_plasticos'
  | 'cucharas_acero'
  | 'pelador'
  | 'rallador'
  | 'molino_mano'
  | 'exprimidor'
  | 'colador'
  | 'vasos_medidores'
  | 'pinzas_cocina'
  | 'embudo';

type UsuarioState = {
  onboardingCompleto: boolean;
  nombre:             string;
  municipio:          string;
  nivelExperiencia:   NivelExperiencia;
  herramientas:       HerramientaDisponible[];
  setOnboardingCompleto: (valor: boolean) => void;
  setNombre:             (nombre: string) => void;
  setMunicipio:          (municipio: string) => void;
  setNivelExperiencia:   (nivel: NivelExperiencia) => void;
  toggleHerramienta:     (herramienta: HerramientaDisponible) => void;
  resetDiagnostico:      () => void;
};

export const useUsuarioStore = create<UsuarioState>()(
  persist(
    (set) => ({
      onboardingCompleto: false,
      nombre:             '',
      municipio:          '',
      nivelExperiencia:   'principiante',
      herramientas:       [],

      setOnboardingCompleto: (valor)     => set({ onboardingCompleto: valor }),
      setNombre:             (nombre)    => set({ nombre }),
      setMunicipio:          (municipio) => set({ municipio }),
      setNivelExperiencia:   (nivel)     => set({ nivelExperiencia: nivel }),

      toggleHerramienta: (herramienta) =>
        set((state) => ({
          herramientas: state.herramientas.includes(herramienta)
            ? state.herramientas.filter((h) => h !== herramienta)
            : [...state.herramientas, herramienta],
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
