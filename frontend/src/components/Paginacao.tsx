import { ReactNode } from "react";
import useProdutoStore from "../store/ProdutoStore";
import useRecuperarProdutosComPaginacao from "../hooks/useRecuperarProdutosComPaginacao";

const Paginacao = () => {
  const pagina = useProdutoStore((s) => s.pagina);
  const tamanho = useProdutoStore((s) => s.tamanho);
  const nome = useProdutoStore((s) => s.nome);

  const setPagina = useProdutoStore((s) => s.setPagina);

  const {
    data: resultadoPaginado,
    isPending: carregandoProdutos,
    error: errorProdutos,
  } = useRecuperarProdutosComPaginacao({
    pagina: pagina.toString(),
    tamanho: tamanho.toString(),
    nome: nome,
  });

  const tratarPaginacao = (pagina: number) => {
    setPagina(pagina);
  };

  if (carregandoProdutos)
    return <p className="fw-bold">Carregando produtos...</p>;
  if (errorProdutos) throw errorProdutos;

  const totalDePaginas: number = resultadoPaginado.totalDePaginas;

  const arrayDePaginas: ReactNode[] = [];

  for (let i = 0; i < totalDePaginas; i++) {
    arrayDePaginas.push(
      <li key={i} className={pagina === i ? "page-item active" : "page-item"}>
        <a
          onClick={() => tratarPaginacao(i)}
          className="page-link"
          aria-current="page"
        >
          {i + 1}
        </a>
      </li>
    );
  }

  if (totalDePaginas < 2) return;

  return (
    <nav aria-label="paginaco">
      <ul className="pagination">
        <li className={pagina === 0 ? "page-item disabled" : "page-item"}>
          <a onClick={() => tratarPaginacao(pagina - 1)} className="page-link">
            Anterior
          </a>
        </li>
        {arrayDePaginas}
        <li
          className={
            pagina === totalDePaginas - 1 ? "page-item disabled" : "page-item"
          }
        >
          <a onClick={() => tratarPaginacao(pagina + 1)} className="page-link">
            Próxima
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Paginacao;
