import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ResultadoPaginado from "../interfaces/ResultadoPaginado";
import Produto from "../interfaces/Produto";
import isErrorResponse from "../util/isErrorResponse";

interface QueryString {  
  pagina: string;
  tamanho: string;
  nome: string;
}

const useRecuperarProdutosComPaginacao = (queryString: QueryString) => {
  
  const recuperarProdutosComPaginacao = async (queryString: QueryString) => {
    
    // await new Promise<void>((resolve) => {
    //   setTimeout(resolve, 2000);
    // });

    // URLSearchParams espera receber um objeto com propriedades do tipo string
    // A partir de {pagina: "1", tamanho: "5"} vai gerar o seguinte string: pagina=1&tamanho=5
    
    // const pessoa = {nome: "João", endereco: "Rua X n. 10"};
    // const empregado = {...pessoa, salario: 7000, cargo: "Programador"}; // operador spread
    // console.log(empregado.nome);

    // queryString contém um objeto com os valores 1 e 5. Usando o operador spread estamos gerando
    // um objeto literal assim:
    // {pagina: "1", tamanho: "5"} que é o que o construtor de URLSearchParam espera receber.
    const response = await fetch("http://localhost:8080/produtos/paginacao?" + 
      new URLSearchParams({
        // pagina: queryString.pagina,
        // tamanho: queryString.tamanho
        ...queryString
      }).toString());

    // A chamada do .toString() acima não é necessária uma vez que javascript automaticamente 
    // chama .toString() quando um objeto é concatenadoa um string. 

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
    return (await response.json()) as ResultadoPaginado<Produto>; // asserção de tipo
  };

  return useQuery({
    // É preciso acrescentar o return antes de useQuery.
    // Veja que na linha 5 o return está implícito.
    queryKey: ["produtos", "paginacao", queryString],
    queryFn: async () => recuperarProdutosComPaginacao(queryString),
    staleTime: 0,
    placeholderData: keepPreviousData, // mostrar com e sem isso. Importante manter o setTimeout.
  });
};
export default useRecuperarProdutosComPaginacao;
