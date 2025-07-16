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

  // Estado local para controlar o valor do input como string
  const [quantidades, setQuantidades] = useState<{ [key: number]: string }>(() => {
    const initial: { [key: number]: string } = {};
    carrinho.forEach(item => {
      initial[item.idProduto] = item.quantidade.toString();
    });
    return initial;
  });

  const { data: produtos } = useRecuperarProdutos();

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  // Atualiza quantidade no estado carrinho e sincroniza input
  const atualizarQuantidade = (idProduto: number, novaQtd: number) => {
    if (novaQtd < 1) return removerItem(idProduto);

    setCarrinho(carrinho.map(item =>
      item.idProduto === idProduto ? { ...item, quantidade: novaQtd } : item
    ));

    setQuantidades(prev => ({ ...prev, [idProduto]: novaQtd.toString() }));
  };

  const removerItem = (idProduto: number) => {
    setCarrinho(carrinho.filter(item => item.idProduto !== idProduto));
    setQuantidades(prev => {
      const copy = { ...prev };
      delete copy[idProduto];
      return copy;
    });
  };

  // Atualiza string do input enquanto usuário digita
  const onQuantidadeChange = (idProduto: number, value: string) => {
    setQuantidades(prev => ({ ...prev, [idProduto]: value }));
  };

  // Validação no blur do input
  const onQuantidadeBlur = (e: React.FocusEvent<HTMLInputElement>, idProduto: number) => {
    const val = e.target.value;
    const num = parseInt(val);

    if (val === "") {
      // campo vazio, mantém foco para forçar usuário a digitar algo válido
      e.target.focus();
    } else if (isNaN(num) || num < 0) {
      // valor inválido, mantém foco
      e.target.focus();
    } else if (num === 0) {
      // remove do carrinho se quantidade 0
      removerItem(idProduto);
    } else {
      // valor válido, atualiza carrinho e input
      atualizarQuantidade(idProduto, num);
    }
  };

  const carrinhoDetalhado = carrinho
    .map(item => {
      const produto = produtos?.find(p => p.id === item.idProduto);
      return produto ? {
        ...produto,
        quantidade: item.quantidade,
        subtotal: item.quantidade * produto.preco,
      } : null;
    })
    .filter(Boolean);

  const totalGeral = carrinhoDetalhado.reduce((total, item) => total + item!.subtotal, 0);

  return (
    <div className="container mt-4" style={{ maxWidth: "900px" }}>
      <h3 className="mb-4">🛒 Meu Carrinho</h3>

      {carrinhoDetalhado.length === 0 ? (
        <div className="alert alert-info shadow-sm">Seu carrinho está vazio.</div>
      ) : (
        <>
          <div className="row g-3">
            {carrinhoDetalhado.map(item => (
              <div key={item!.id} className="col-12">
                <div className="card shadow-sm border-0">
                  <div className="card-body d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3" style={{ minWidth: "250px" }}>
                      <img
                        src={item!.imagem}
                        alt={item!.nome}
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                        className="rounded"
                      />
                      <div className="text-truncate" style={{ maxWidth: "180px" }}>
                        <h6 className="mb-1 text-truncate" title={item!.nome}>{item!.nome}</h6>
                        <small className="text-muted">R$ {item!.preco.toFixed(2)} cada</small>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2" style={{ minWidth: "140px" }}>
                      <input
                        type="number"
                        min="0"
                        value={quantidades[item!.id] ?? item!.quantidade.toString()}
                        onChange={(e) => onQuantidadeChange(item!.id, e.target.value)}
                        onBlur={(e) => onQuantidadeBlur(e, item!.id)}
                        className="form-control form-control-sm text-center"
                        style={{ width: "60px" }}
                      />
                    </div>

                    <div className="text-end" style={{ minWidth: "90px" }}>
                      <strong className="d-block text-success">
                        R$ {item!.subtotal.toFixed(2)}
                      </strong>
                    </div>

                    <div>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removerItem(item!.id)}
                        title="Remover do carrinho"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="d-flex justify-content-end">
            <h5>
              Total: <span className="text-success">R$ {totalGeral.toFixed(2)}</span>
            </h5>
          </div>
        </>
      )}
    </div>
  );
};

export default CarrinhoPage;
