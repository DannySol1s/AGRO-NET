import { create } from 'zustand';

type SeleccionState = {
  materiaPrimaActiva: string | null;
  productoActivo: string | null;
  setMateriaPrima: (id: string | null) => void;
  setProducto: (id: string | null) => void;
};

export const useSeleccionStore = create<SeleccionState>()((set) => ({
  materiaPrimaActiva: null,
  productoActivo: null,
  setMateriaPrima: (id) => set({ materiaPrimaActiva: id, productoActivo: null }),
  setProducto: (id) => set({ productoActivo: id }),
}));
