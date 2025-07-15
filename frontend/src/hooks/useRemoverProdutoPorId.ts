import { useMutation } from "@tanstack/react-query";
import queryClient from "../main";
import isErrorResponse from "../util/isErrorResponse";

const removerProdutoPorId = async (id: number) => {
  const response = await fetch("http://localhost:8080/produtos/" + id, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error: any = await response.json();
    if (isErrorResponse(error)) {
      throw error;
    } else {
      throw new Error(
        "Ocorreu um erro ao remover o prodto com id = " +
          id +
          ". Status code = " +
          response.status
      );
    }
  }
  // return await response.json(); não retornar nada pois o back-end retorna void.
};

const useRemoverProdutoPorId = () => {
  return useMutation({
    mutationFn: (id: number) => removerProdutoPorId(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["produtos"],
      });
      queryClient.invalidateQueries({
        queryKey: ["produto", id],
      });
    },
  });
};
export default useRemoverProdutoPorId;
