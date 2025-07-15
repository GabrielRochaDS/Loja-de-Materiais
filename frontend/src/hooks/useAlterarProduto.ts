import { useMutation } from "@tanstack/react-query";
import Produto from "../interfaces/Produto";
import queryClient from "../main";
import isErrorResponse from "../util/isErrorResponse";

const alterarProduto = async (produto: Produto) => {
  const response = await fetch("http://localhost:8080/produtos", {
    method: "PUT",
    headers: {
      // tipo do conteúdo que o back-end espera receber
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(produto)
  });
    if (!response.ok) {
      const error: any = await response.json();
      if (isErrorResponse(error)) {
        throw error;
      } else {
        throw new Error(
          "Ocorreu um erro ao alterar um produto. Status code = " +
            response.status
        );
      }
    }
  return await response.json(); 
};

const useAlterarProduto = () => {
  return useMutation({
    mutationFn: (produto: Produto) => alterarProduto(produto),
    onSuccess: (prodAlterado: Produto) => {
      queryClient.invalidateQueries({
        queryKey: ["produtos"]
      })
      queryClient.invalidateQueries({
        queryKey: ["produto", prodAlterado.id]
      })
    }
  });
}
export default useAlterarProduto;
