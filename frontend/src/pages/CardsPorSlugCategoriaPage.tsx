import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import useRecuperarProdutosPorSlugCategoriaComPaginacao from "../hooks/useRecuperarProdutosPorSlugCategoriaComPaginacao";
import Produto from "../interfaces/Produto";
import useProdutoStore from "../store/ProdutoStore";
import CardsPlaceholderPage from "./CardsPlaceholderPage";
import InfiniteScroll from "react-infinite-scroll-component";

export interface ProdCarrinho {
  idProduto: number;
  quantidade: number;
}

const CardsPorSlugCategoriaPage = () => {
  const tamanho = useProdutoStore((s) => s.tamanho);

  const [carrinho, setCarrinho] = useState(() => {
    const itensDeCarrinho = localStorage.getItem("carrinho");
    return itensDeCarrinho ? JSON.parse(itensDeCarrinho) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarProduto = (produto: Produto) => {
    setCarrinho((prevCarrinho: ProdCarrinho[]) => {
      const existe = prevCarrinho.find((item) => item.idProduto === produto.id);
      if (existe) {
        const novoCarrinho: ProdCarrinho[] = prevCarrinho.map(
          (item: ProdCarrinho) =>
            item.idProduto === produto.id
              ? { idProduto: item.idProduto, quantidade: item.quantidade + 1 }
              : item
        );
        return novoCarrinho;
      } else {
        return [...prevCarrinho, { idProduto: produto.id, quantidade: 1 }];
      }
    });
  };

  const subtrairProduto = (produto: Produto) => {
    setCarrinho((prevCarrinho: ProdCarrinho[]) => {
      const existe = prevCarrinho.find((item) => item.idProduto === produto.id);
      if (existe) {
        const novoCarrinho: ProdCarrinho[] = prevCarrinho.map(
          (item: ProdCarrinho) =>
            item.idProduto === produto.id
              ? { idProduto: item.idProduto, quantidade: item.quantidade - 1 }
              : item
        );
        return novoCarrinho.filter((item) => item.quantidade > 0);
      } else {
        throw new Error("Erro ao subtrair 1 de produto no carrinho.");
      }
    });
  };

  const { slugCategoria } = useParams();
  const {
    data,
    isPending: carregandoProdutos,
    error: errorProdutos,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useRecuperarProdutosPorSlugCategoriaComPaginacao({
    tamanho: tamanho.toString(),
    slugCategoria: slugCategoria ? slugCategoria : "",
  });

  if (carregandoProdutos) return <CardsPlaceholderPage />;
  if (errorProdutos) throw errorProdutos;

  const produtosNoCarrinho: (ProdCarrinho | null)[] = [];
  data.pages.forEach((page) => {
    page.itens.forEach((produto) => {
      const prodCarrinho = carrinho.find(
        (item: ProdCarrinho) => item.idProduto === produto.id
      );
      produtosNoCarrinho.push(prodCarrinho ? prodCarrinho : null);
    });
  });

  return (
    <InfiniteScroll
      style={{ overflowX: "hidden" }}
      dataLength={data.pages.reduce(
        (total, page) => total + page.totalDeItens,
        0
      )}
      hasMore={hasNextPage}
      next={fetchNextPage}
      loader={
        <div className="d-flex justify-content-center my-4">
          <div className="text-center">
            <div
              className="spinner-border text-success mb-2"
              role="status"
              style={{ width: "2rem", height: "2rem" }}
            >
              <span className="visually-hidden">Carregando...</span>
            </div>
            <div className="fw-medium text-muted">
              Carregando mais produtos...
            </div>
          </div>
        </div>
      }
    >
      <h5 className="mt-3">
        {slugCategoria
          ? slugCategoria.charAt(0).toUpperCase() + slugCategoria.slice(1)
          : "Produtos"}
      </h5>
      <div className="row">
        {data.pages.map((page, pagina) =>
          page.itens.map((produto, index) => (
            <div key={produto.id} className="col-lg-2 col-md-3 col-sm-4 col-6">
              <Card
                produto={produto}
                produtoNoCarrinho={produtosNoCarrinho[pagina * tamanho + index]}
                adicionarProduto={adicionarProduto}
                subtrairProduto={subtrairProduto}
              />
            </div>
          ))
        )}
      </div>
    </InfiniteScroll>
  );
};

export default CardsPorSlugCategoriaPage;
