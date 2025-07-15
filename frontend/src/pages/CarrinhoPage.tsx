import { useEffect, useState } from "react";
import useRecuperarProdutos from "../hooks/useRecuperarProdutos";

interface ItemCarrinho {
  idProduto: number;
  quantidade: number;
}

const CarrinhoPage = () => {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>(() => {
    const itens = localStorage.getItem("carrinho");
    return itens ? JSON.parse(itens) : [];
  });

  const { data: produtos } = useRecuperarProdutos(); // todos os produtos

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const atualizarQuantidade = (idProduto: number, novaQtd: number) => {
    if (novaQtd < 1) {
      removerItem(idProduto);
    };
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.map((item) =>
        item.idProduto === idProduto
          ? { ...item, quantidade: novaQtd }
          : item
      )
    );
  };

  const removerItem = (idProduto: number) => {
    setCarrinho((c) => c.filter((item) => item.idProduto !== idProduto));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    idProduto: number,
    qtdAtual: number
  ) => {
    const valor = parseInt(e.target.value);
    if (!valor || valor < 1) {
      e.target.focus();
    } else {
      atualizarQuantidade(idProduto, valor);
    }
  };

  const listaDeProdutos = produtos || [];

  const carrinhoDetalhado = carrinho
    .map((item) => {
      const produto = listaDeProdutos.find((p) => p.id === item.idProduto);
      if (!produto) return null;
      return {
        ...produto,
        quantidade: item.quantidade,
        subtotal: item.quantidade * produto.preco,
      };
    })
    .filter(Boolean);

  return (
    <div className="container mt-4">
      <h2>Carrinho de Compras</h2>
      {carrinhoDetalhado.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {carrinhoDetalhado.map((item) => (
              <tr key={item!.id}>
                <td>{item!.nome}</td>
                <td>R$ {item!.preco.toFixed(2)}</td>
                <td className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() =>
                      atualizarQuantidade(item.id, item.quantidade - 1)
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control"
                    style={{ width: "70px" }}
                    value={item!.quantidade}
                    onChange={(e) =>
                      atualizarQuantidade(
                        item.id,
                        parseInt(e.target.value) || 1
                      )
                    }
                    onBlur={(e) =>
                      handleBlur(e, item.id, item.quantidade)
                    }
                  />
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() =>
                      atualizarQuantidade(item.id, item.quantidade + 1)
                    }
                  >
                    +
                  </button>
                </td>
                <td>R$ {item!.subtotal.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removerItem(item.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-end fw-bold">
                Total Geral:
              </td>
              <td colSpan={2} className="fw-bold">
                R${" "}
                {carrinhoDetalhado
                  .reduce((total, item) => total + item!.subtotal, 0)
                  .toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default CarrinhoPage;
