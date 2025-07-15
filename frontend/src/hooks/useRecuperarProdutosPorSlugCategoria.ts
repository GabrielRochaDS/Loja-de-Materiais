import { useQuery } from "@tanstack/react-query";
import Produto from "../interfaces/Produto";
import isErrorResponse from "../util/isErrorResponse";

const useRecuperarProdutoPorSlugCategoria = (slugCategororia?: string) => {
  const recuperarProdutoPorSlugCategoria = async (
    slugCategororia?: string
  ): Promise<Produto[]> => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    const response = await fetch(
      "http://localhost:8080/produtos" +
        (slugCategororia ? "/categoria/" + slugCategororia : "")
    );
    if (!response.ok) {
      const error: any = await response.json();
      if (isErrorResponse(error)) {
        throw error;
      } else {
        throw new Error(
          "Ocorreu um erro ao recuperar os produtos com slugCategororia = " +
            slugCategororia +
            ". Status code = " +
            response.status
        );
      }
    }
    return await response.json();
  };

  return useQuery({
    queryKey: slugCategororia
      ? ["produtos", "categoria", slugCategororia]
      : ["produtos"],
    queryFn: () => recuperarProdutoPorSlugCategoria(slugCategororia),
    staleTime: 10_000,
  });
};
export default useRecuperarProdutoPorSlugCategoria;
