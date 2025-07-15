import { create } from "zustand";

interface UsuarioStore{
    usuarioLogado: number;
    setUsuarioLogado: (novoUsuarioLogado: number) => void;
}

const useUsuarioStore = create<UsuarioStore>((set) => ({
    usuarioLogado: 0,
    setUsuarioLogado: (novoUsuarioLogado: number) => set(() => ({usuarioLogado: novoUsuarioLogado})),
}))
export default useUsuarioStore;