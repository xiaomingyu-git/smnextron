import { create } from 'zustand'
import {BearState} from "./type";

export const useBearStore = create<BearState>()((set,get) => ({
    bears: 0,
    fields:[],
    modalstatus:false,
    changemodalstatus: () =>set(() =>({modalstatus:!get().modalstatus})),
    increase: (by) => set((state) => ({ bears: state.bears + by })),
    setfieIds:(by) => set(() => ({ fields: by })),
}))