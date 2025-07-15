import Categoria from "../interfaces/Categoria";
import Produto from "../interfaces/Produto";

const fruta: Categoria = { id: 1, nome: "Frutas", slug: "fruta" }
const legume: Categoria = { id: 2, nome: "Legumes", slug: "legume" }
const verdura: Categoria = { id: 3, nome: "Verduras", slug: "verdura" }

const produtos: Produto[] = [
    {
      id: 1,
      imagem: "abacate.png",
      categoria: fruta,
      nome: "Abacate",
      slug: "abacate",
      descricao: "1 unidade aprox. 750g",
      disponivel: true,
      dataCadastro: new Date(2023, 4, 26),
      qtdEstoque: 100,
      preco: 2.45,
    },
    {
      id: 2,
      imagem: "abobrinha.png",
      categoria: legume,
      nome: "Abobrinha",
      slug: "abobrinha",
      descricao: "1 unidade aprox. 250g",
      disponivel: false,
      dataCadastro: new Date(2023, 5, 22),
      qtdEstoque: 500,
      preco: 1.1,
    },
    {
      id: 3,
      imagem: "abobora.png",
      categoria: legume,
      nome: "Abóbora",
      slug: "abobora",
      descricao: "1 unidade aprox. 1,9kg",
      disponivel: true,
      dataCadastro: new Date(2023, 3, 24),
      qtdEstoque: 400,
      preco: 4.7,
    },
    {
      id: 4,
      imagem: "acelga.png",
      categoria: verdura,
      nome: "Acelga",
      slug: "acelga",
      descricao: "1 maço de aprox. 400g",
      disponivel: true,
      dataCadastro: new Date(2023, 3, 12),
      qtdEstoque: 120,
      preco: 4.99,
    },
    {
      id: 5,
      imagem: "agriao.png",
      categoria: verdura,
      nome: "Agrião",
      slug: "agriao",
      descricao: "1 maço de aprox. 200g",
      disponivel: true,
      dataCadastro: new Date(2023, 5, 17),
      qtdEstoque: 340,
      preco: 2.5,
    },
    {
      id: 6,
      imagem: "alface.png",
      categoria: verdura,
      nome: "Alface",
      slug: "alface",
      descricao: "1 maço de aprox. 200g",
      disponivel: true,
      dataCadastro: new Date(2023, 5, 14),
      qtdEstoque: 220,
      preco: 4.99,
    },
    {
      id: 7,
      imagem: "banana.png",
      categoria: fruta,
      nome: "Banana",
      slug: "banana",
      descricao: "1 unidade aprox. 165g",
      disponivel: true,
      dataCadastro: new Date(2023, 2, 22),
      qtdEstoque: 350,
      preco: 1.05,
    },
    {
      id: 8,
      imagem: "beringela.png",
      categoria: legume,
      nome: "Beringela",
      slug: "beringela",
      descricao: "1 unidade aprox. 370g",
      disponivel: true,
      dataCadastro: new Date(2023, 2, 23),
      qtdEstoque: 720,
      preco: 1.85,
    },
    {
      id: 9,
      imagem: "brocolis.png",
      categoria: verdura,
      nome: "Brócolis",
      slug: "brocolis",
      descricao: "1 unidade aprox. 300g",
      disponivel: true,
      dataCadastro: new Date(2023, 3, 28),
      qtdEstoque: 600,
      preco: 5.39,
    },
    {
      id: 10,
      imagem: "cebola.png",
      categoria: legume,
      nome: "Cebola",
      slug: "cebola",
      descricao: "1 unidade aprox. 200g",
      disponivel: true,
      dataCadastro: new Date(2023, 4, 30),
      qtdEstoque: 95,
      preco: 0.56,
    },
    {
      id: 11,
      imagem: "cenoura.png",
      categoria: legume,
      nome: "Cenoura",
      slug: "cenoura",
      descricao: "1 unidade aprox. 180g",
      disponivel: true,
      dataCadastro: new Date(2023, 5, 29),
      qtdEstoque: 350,
      preco: 1.01,
    },
    {
      id: 12,
      imagem: "cereja.png",
      categoria: fruta,
      nome: "Cereja",
      slug: "cereja",
      descricao: "1 unidade aprox. 250g",
      disponivel: true,
      dataCadastro: new Date(2023, 5, 11),
      qtdEstoque: 240,
      preco: 11.23,
    },
];

const recuperarProdutos = () => {
  console.log("Excecutando recuperarProdutos()");
  return new Promise<Produto[]>((resolve) => {
    setTimeout(() => {
      resolve(produtos);
    }, 2000)
  })
    return produtos
}
export default recuperarProdutos;