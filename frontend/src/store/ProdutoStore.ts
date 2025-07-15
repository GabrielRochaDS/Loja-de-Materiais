import { create } from "zustand";
import Produto from "../interfaces/Produto";

interface ProdutoStore {
    pagina: number;
    tamanho: number;
    nome: string;
    mensagem: string;
    produtoSelecionado: Produto;

    setPagina: (novaPagina: number) => void;
    setNome: (novoNome: string) => void;
    setMensagem: (novaMensagem: string) => void;
    setProdutoSelecionado: (novoProdutoSelecionado: Produto) => void;
}

const useProdutoStore = create<ProdutoStore>((set) => ({
    pagina: 0,
    tamanho: 18,
    nome: "",
    mensagem: "",
    produtoSelecionado: {} as Produto,

    setPagina: (novaPagina: number) => set(() => ({pagina: novaPagina})),
    setNome: (novoNome: string) => set(() => ({nome: novoNome})),
    setMensagem: (novaMensagem: string) => set(() => ({mensagem: novaMensagem})),
    setProdutoSelecionado: (novoProdutoSelecionado: Produto) => set(() => ({produtoSelecionado: novoProdutoSelecionado}))
}))
export default useProdutoStore;

// const produtoStore = useProdutoStore();

// const setPagina = useProdutoStore((s) => s.setPagina);