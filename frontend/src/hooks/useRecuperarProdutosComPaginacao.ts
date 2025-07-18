import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ResultadoPaginado from "../interfaces/ResultadoPaginado";
import Produto from "../interfaces/Produto";
import isErrorResponse from "../util/isErrorResponse";

interface QueryString {
  pagina: string;
  tamanho: string;
  nome: string;
}

// Função utilitária para simular delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const useRecuperarProdutosComPaginacao = (queryString: QueryString) => {

  const recuperarProdutosComPaginacao = async (queryString: QueryString) => {
    // Simula delay de 2 segundos para testes
    await delay(2000);

    const response = await fetch("http://localhost:8080/produtos/paginacao?" +
      new URLSearchParams({
        ...queryString
      }).toString()
    );

    if (!response.ok) {
      const error: any = await response.json();
      if (isErrorResponse(error)) {
        throw error;
      } else {
        throw new Error(
          "Ocorreu um erro ao recuperar produtos com paginação. Status code = " +
          response.status
        );
      }
    }

    return (await response.json()) as ResultadoPaginado<Produto>;
  };

  return useQuery({
    queryKey: ["produtos", "paginacao", queryString],
    queryFn: async () => recuperarProdutosComPaginacao(queryString),
    staleTime: 0,
    placeholderData: keepPreviousData,
  });
};

export default useRecuperarProdutosComPaginacao;
