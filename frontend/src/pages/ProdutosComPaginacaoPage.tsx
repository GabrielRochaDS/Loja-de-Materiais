import Paginacao from "../components/Paginacao";
import Pesquisa from "../components/Pesquisa";
import TabelaDeProdutos from "../components/TabelaDeProdutos";

const ProdutosComPaginacaoPage = () => {

  return (
    <>
      <h5>Lista de Produtos</h5>
      <hr className="mt-1" />

      <Pesquisa />
      <TabelaDeProdutos />
      <Paginacao />
    </>
  );
};
export default ProdutosComPaginacaoPage;
