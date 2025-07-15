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

  console.log("carrinho = ", carrinho);

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarProduto = (produto: Produto) => {
    setCarrinho((prevCarrinho: ProdCarrinho[]) => {
      const existe = prevCarrinho.find((item) => item.idProduto === produto.id);
      if (existe) {
        // existe.quantidade = existe.quantidade + 1;  Isso não funciona
        // return prevCarrinho;
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
        // existe.quantidade = existe.quantidade + 1;  Isso não funciona
        // return prevCarrinho;
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

  console.log("produtos no carrinho = ", produtosNoCarrinho);

  return (
    <InfiniteScroll
      style={{overflowX: "hidden"}}
      dataLength={data.pages.reduce((total, page) => total + page.totalDeItens, 0)}
      hasMore={hasNextPage}
      next={() => fetchNextPage()}
      loader={<h6>Carregando...</h6>}
    >
      <h5>
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
      {/* {hasNextPage && (
        <div className="d-flex justify-content-center">
          <button
            onClick={() => fetchNextPage()}
            className="btn btn btn-outline-success mb-5 w-50"
          >
            {isFetchingNextPage ? "Recuperando..." : "Recuperar mais..."}
          </button>
        </div>
      )} */}
    </InfiniteScroll>
  );
};
export default CardsPorSlugCategoriaPage;
