import { create } from 'zustand';

type SeleccionState = {
  materiaPrimaActiva: string | null;
  productoActivo:     string | null;
  cantidadBaseKg:     string;
  setMateriaPrima:    (id: string | null) => void;
  setProducto:        (id: string | null) => void;
  setCantidadBaseKg:  (v: string) => void;
};

export const useSeleccionStore = create<SeleccionState>()((set) => ({
  materiaPrimaActiva: null,
  productoActivo:     null,
  cantidadBaseKg:     '',
  setMateriaPrima:    (id) => set({ materiaPrimaActiva: id, productoActivo: null, cantidadBaseKg: '' }),
  setProducto:        (id) => set({ productoActivo: id }),
  setCantidadBaseKg:  (v)  => set({ cantidadBaseKg: v }),
}));
