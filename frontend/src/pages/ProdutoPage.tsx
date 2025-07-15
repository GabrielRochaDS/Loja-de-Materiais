import { useNavigate, useParams } from "react-router-dom";
import useRecuperarProdutoPorId from "../hooks/useRecuperarProdutoPorId";
import dayjs from "dayjs";
import useRemoverProdutoPorId from "../hooks/useRemoverProdutoPorId";
import { useState } from "react";
import useProdutoStore from "../store/ProdutoStore";

const ProdutoPage = () => {
  const [removido, setRemovido] = useState(false);
  const mensagem = useProdutoStore((s) => s.mensagem);
  const setMensagem = useProdutoStore((s) => s.setMensagem);
  const setProdutoSelecionado = useProdutoStore((s) => s.setProdutoSelecionado);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: produto,
    isPending: carregandoProduto,
    error: errorProduto,
  } = useRecuperarProdutoPorId(+id!, removido);

  const { mutate: removerProduto, error: errorRemocaoProduto } =
    useRemoverProdutoPorId();

  const tratarRemocao = (id: number) => {
    setMensagem("Produto removido com sucesso!");
    removerProduto(id);
    setRemovido(true);
  };

  if (carregandoProduto)
    return <p className="fw-bold">Carregando produtos...</p>;
  if (errorProduto) throw errorProduto;
  if (errorRemocaoProduto) throw errorRemocaoProduto;

  return (
    <>
      <div className="mb-4">
        <h5>Cadastro de Produtos</h5>
        <hr className="mt-1" />
      </div>

      {mensagem && (
        <div className="alert alert-primary" role="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="bi flex-shrink-0 me-2"
            viewBox="0 0 16 16"
            role="img"
            aria-label="Warning:"
            style={{height: "25px"}}
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />{" "}
          </svg>
          {mensagem}
        </div>
      )}

      <div className="row">
        <div className="col-lg-3 col-md-4">
          {/* Para chegar nessa página o url foi /produtos/:id */}
          {/* Sem a / abaixo seria enviada uma requisição para /produtos/abacate.png*/}
          <img
            src={"/" + produto.imagem}
            className="d-block d-md-none mb-3"
            style={{ width: "170px" }}
          />
          <img
            src={"/" + produto.imagem}
            className="d-none d-md-block"
            style={{ width: "210px" }}
          />
        </div>
        <div className="col-lg-9 col-md-8">
          <div className="row">
            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">
              Categoria
            </div>
            <div className="col-xl-10 col-lg-9 col-8">
              {produto.categoria.nome}
            </div>
            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">Nome</div>
            <div className="col-xl-10 col-lg-9 col-8">
              {produto.nome} ({produto.descricao})
            </div>
            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">Preço</div>
            {/*
            <div className="col-xl-10 col-lg-9 col-8">
              {produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </div>
          */}
            <div className="col-xl-10 col-lg-9 col-8">
              {produto.preco.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true,
              })}
            </div>
            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">Estoque</div>
            <div className="col-xl-10 col-lg-9 col-8">{produto.qtdEstoque}</div>

            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">
              Data Cadastro
            </div>
            <div className="col-xl-10 col-lg-9 col-8">
              {dayjs(produto.dataCadastro).format("DD/MM/YYYY")}
            </div>

            <div className="col-xl-2 col-lg-3 col-4 fw-bold mb-1">
              Disponível
            </div>
            <div className="col-xl-10 col-lg-9 col-8">
              {produto.disponivel ? "Sim" : "Não"}
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6 mt-3">
          <button
            disabled={removido}
            onClick={() => {
              setProdutoSelecionado(produto);
              navigate("/cadastrar-produto");
            }}
            className="btn btn-primary btn-sm me-3 w-100"
            type="button"
          >
            Editar
          </button>
        </div>
        <div className="col-lg-3 col-md-4 col-6 mt-3">
          <button
            disabled={removido}
            onClick={() => tratarRemocao(produto.id!)}
            className="btn btn-danger btn-sm w-100"
            type="button"
          >
            Remover
          </button>
        </div>
      </div>
    </>
  );
};
export default ProdutoPage;
