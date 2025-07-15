import { useEffect, useState } from "react";
import useRecuperarProdutos from "../hooks/useRecuperarProdutos";
import Produto from "../interfaces/Produto";
import { ProdCarrinho } from "./CardsPorSlugCategoriaPage";

const FavoritosPage = () => {
  const [favoritosIds, setFavoritosIds] = useState<number[]>([]);
  const [carrinho, setCarrinho] = useState<ProdCarrinho[]>(() => {
    const itensDeCarrinho = localStorage.getItem("carrinho");
    return itensDeCarrinho ? JSON.parse(itensDeCarrinho) : [];
  });

  const { data: produtos } = useRecuperarProdutos();

  useEffect(() => {
    const favoritosStorage = JSON.parse(localStorage.getItem("favoritos") || "[]");
    setFavoritosIds(favoritosStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarProduto = (produto: Produto) => {
    setCarrinho((prevCarrinho) => {
      const existe = prevCarrinho.find((item) => item.idProduto === produto.id);
      if (existe) {
        return prevCarrinho.map((item) =>
          item.idProduto === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prevCarrinho, { idProduto: produto.id, quantidade: 1 }];
    });
  };

  const subtrairProduto = (produto: Produto) => {
    setCarrinho((prevCarrinho) => {
      const existe = prevCarrinho.find((item) => item.idProduto === produto.id);
      if (existe) {
        const atualizado = prevCarrinho
          .map((item) =>
            item.idProduto === produto.id
              ? { ...item, quantidade: item.quantidade - 1 }
              : item
          )
          .filter((item) => item.quantidade > 0);
        return atualizado;
      }
      return prevCarrinho;
    });
  };

  const removerFavorito = (id: number) => {
    const atualizados = favoritosIds.filter((favId) => favId !== id);
    localStorage.setItem("favoritos", JSON.stringify(atualizados));
    setFavoritosIds(atualizados);
  };

  const favoritosDetalhados: Produto[] =
    produtos?.filter((produto) => favoritosIds.includes(produto.id)) || [];

  const getProdutoNoCarrinho = (produtoId: number) =>
    carrinho.find((item) => item.idProduto === produtoId) || null;

  return (
    <div className="container mt-4">
      <h2>Meus Favoritos</h2>

      {favoritosDetalhados.length === 0 ? (
        <p>Nenhum produto foi adicionado aos favoritos.</p>
      ) : (
        <div className="row">
          {favoritosDetalhados.map((produto) => {
            const produtoNoCarrinho = getProdutoNoCarrinho(produto.id);
            return (
              <div key={produto.id} className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                <div className="card h-100 border-0 d-flex flex-column">
                  {/* Imagem */}
                  <img
                    src={produto.imagem}
                    className="card-img-top"
                    alt={produto.nome}
                  />

                  {/* Conteúdo */}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{produto.nome}</h5>
                    <p className="card-text flex-grow-1">{produto.descricao}</p>
                    <p
                      className="card-text fw-bold mt-2"
                      style={{ color: "rgb(220,60,60)" }}
                    >
                      R${" "}
                      {produto.preco.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        useGrouping: true,
                      })}
                    </p>
                  </div>

                  {/* Rodapé */}
                  <div className="card-footer mt-auto p-0 mb-3">
                    {produtoNoCarrinho ? (
                      <div className="btn-group w-100">
                        <button
                          onClick={() => subtrairProduto(produto)}
                          className="btn btn-secondary btn-sm"
                        >
                          -
                        </button>
                        <button className="btn btn-secondary btn-sm">
                          {produtoNoCarrinho.quantidade}
                        </button>
                        <button
                          onClick={() => adicionarProduto(produto)}
                          className="btn btn-secondary btn-sm"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => adicionarProduto(produto)}
                        className="btn btn-success btn-sm w-100"
                      >
                        Comprar
                      </button>
                    )}

                    {/* Botão Remover Favorito */}
                    <button
                      onClick={() => removerFavorito(produto.id)}
                      className="btn btn-outline-danger btn-sm w-100 mt-1"
                    >
                      Remover dos Favoritos
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FavoritosPage;
