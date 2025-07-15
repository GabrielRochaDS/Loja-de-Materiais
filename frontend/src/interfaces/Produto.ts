import Categoria from "./Categoria";

interface Produto {
    id?: number;
    imagem: string;
    categoria: Categoria;
    nome: string;
    slug: string;
    descricao: string;
    disponivel: boolean;
    dataCadastro: Date | null;
    qtdEstoque: number;
    preco: number;  
}
export default Produto;