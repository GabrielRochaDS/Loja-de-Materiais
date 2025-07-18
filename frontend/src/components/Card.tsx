import { useEffect, useState } from "react";
import Produto from "../interfaces/Produto";
import { ProdCarrinho } from "../pages/CardsPorSlugCategoriaPage";
import "bootstrap-icons/font/bootstrap-icons.css";
import useUsuarioStore from "../store/UsuarioStore";

interface Props {
  produto: Produto;
  produtoNoCarrinho: ProdCarrinho | null;
  adicionarProduto: (produto: Produto) => void;
  subtrairProduto: (produto: Produto) => void;
}

const Card = ({ produto, adicionarProduto, subtrairProduto, produtoNoCarrinho }: Props) => {
  const [favoritado, setFavoritado] = useState(false);
  const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);

  useEffect(() => {
    if (!usuarioLogado) return;

    const favoritosPorUsuario: Record<number, number[]> = JSON.parse(localStorage.getItem("favoritos") || "{}");
    const favoritosDoUsuario = favoritosPorUsuario[usuarioLogado] || [];

    setFavoritado(favoritosDoUsuario.includes(produto.id));
  }, [produto.id, usuarioLogado]);

  const toggleFavorito = () => {
    if (!usuarioLogado) return;

    const favoritosPorUsuario: Record<number, number[]> = JSON.parse(localStorage.getItem("favoritos") || "{}");
    const favoritosDoUsuario = favoritosPorUsuario[usuarioLogado] || [];

    let novosFavoritosDoUsuario: number[];
    if (favoritado) {
      novosFavoritosDoUsuario = favoritosDoUsuario.filter((id) => id !== produto.id);
    } else {
      novosFavoritosDoUsuario = [...favoritosDoUsuario, produto.id];
    }

    favoritosPorUsuario[usuarioLogado] = novosFavoritosDoUsuario;
    localStorage.setItem("favoritos", JSON.stringify(favoritosPorUsuario));
    setFavoritado(!favoritado);
  };

  return (
    <div className="card h-100 border-0 position-relative d-flex flex-column">
      {/* Ícone de Favorito (só aparece se estiver logado) */}
      {usuarioLogado > 0 && (
        <button
          onClick={toggleFavorito}
          className="btn position-absolute top-0 end-0 m-2 p-1"
          style={{
            backgroundColor: "rgba(255,255,255,0.85)",
            border: "1px solid #ccc",
          }}
        >
          <i
            className={`bi ${favoritado ? "bi-star-fill text-warning" : "bi-star text-secondary"} fs-5`}
          ></i>
        </button>
      )}

      {/* Imagem */}
      <img src={produto.imagem} className="card-img-top" alt={produto.nome} />

      {/* Conteúdo */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{produto.nome}</h5>
        <p className="card-text flex-grow-1">{produto.descricao}</p>
        <p className="card-text fw-bold mt-2" style={{ color: "rgb(220,60,60)" }}>
          R${" "}
          {produto.preco.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
          })}
        </p>
      </div>

      {/* Rodapé fixado na base */}
      <div className="card-footer mt-auto p-0 mb-4">
        {produtoNoCarrinho ? (
          <div className="btn-group w-100">
            <button onClick={() => subtrairProduto(produto)} type="button" className="btn btn-secondary btn-sm">-</button>
            <button type="button" className="btn btn-secondary btn-sm">{produtoNoCarrinho.quantidade}</button>
            <button onClick={() => adicionarProduto(produto)} type="button" className="btn btn-secondary btn-sm">+</button>
          </div>
        ) : (
          <button onClick={() => adicionarProduto(produto)} type="button" className="btn btn-success btn-sm w-100">
            Comprar
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
