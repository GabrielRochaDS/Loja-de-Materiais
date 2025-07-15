import dayjs from "dayjs";
import Produto from "../interfaces/Produto";
import { Link } from "react-router-dom";
import useProdutoStore from "../store/ProdutoStore";
import useRecuperarProdutosComPaginacao from "../hooks/useRecuperarProdutosComPaginacao";
import useRemoverProdutoPorId from "../hooks/useRemoverProdutoPorId";

const TabelaDeProdutos = () => {
  const pagina = useProdutoStore((s) => s.pagina);
  const tamanho = useProdutoStore((s) => s.tamanho);
  const nome = useProdutoStore((s) => s.nome);

  const setPagina = useProdutoStore((s) => s.setPagina);
  const setMensagem = useProdutoStore((s) => s.setMensagem);

  const {
    data: resultadoPaginado,
    isPending: carregandoProdutos,
    error: errorProdutos,
  } = useRecuperarProdutosComPaginacao({
    pagina: pagina.toString(),
    tamanho: tamanho.toString(),
    nome: nome,
  });
  
  const { mutate: removerProduto, error: errorRemocaoProduto } =
    useRemoverProdutoPorId();

  const tratarRemocao = (id: number) => {
    removerProduto(id);
    setPagina(0);
  };

  if (carregandoProdutos)
    return <p className="fw-bold">Carregando produtos...</p>;
  if (errorProdutos) throw errorProdutos;
  if (errorRemocaoProduto) throw errorRemocaoProduto;

  const produtos: Produto[] = resultadoPaginado.itens;

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-sm table-hover table-striped">
        <thead>
          <tr>
            <th className="text-center align-middle">Id</th>
            <th className="text-center align-middle">Imagem</th>
            <th className="text-center align-middle">Categoria</th>
            <th className="text-center align-middle">Nome</th>
            <th className="text-center align-middle">Data de Cadastro</th>
            <th className="text-center align-middle">Quantidade</th>
            <th className="text-center align-middle">Preço</th>
            <th className="text-center align-middle">Ação</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td width="8%" className="text-center align-middle">
                {produto.id}
              </td>
              <td width="13%" className="text-center align-middle">
                <img
                  src={produto.imagem}
                  alt="imagem de produto"
                  style={{ width: "40px" }}
                />
              </td>
              <td width="13%" className="text-center align-middle">
                {produto.categoria.nome}
              </td>
              <td width="17%" className="align-middle ps-3">
                <Link
                  onClick={() => setMensagem("")}
                  style={{ textDecoration: "none" }}
                  to={"/produtos/" + produto.id}
                >
                  {produto.nome}
                </Link>
              </td>
              <td width="13%" className="text-center align-middle">
                {dayjs(produto.dataCadastro).format("DD/MM/YYYY")}
              </td>
              <td width="13%" className="text-center align-middle">
                {produto.qtdEstoque}
              </td>
              <td width="10%" className="text-end align-middle pe-3">
                {produto.preco.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
              </td>
              <td width="13%" className="text-center align-middle">
                <button
                  onClick={() => tratarRemocao(produto.id!)}
                  className="btn btn-danger btn-sm"
                  type="button"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-center align-middle fw-bold" colSpan={5}>
              Total...
            </td>
            <td className="text-center align-middle fw-bold" colSpan={2}>
              R${" "}
              {produtos
                .reduce(
                  (total, produto) =>
                    total + produto.qtdEstoque * produto.preco,
                  0
                )
                .toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default TabelaDeProdutos;
