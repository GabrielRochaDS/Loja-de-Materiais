// import TabelaDeProdutos from "../components/TabelaDeProdutos";
// import useRecuperarProdutos from "../hooks/useRecuperarProdutos";

// const ProdutosPage = () => {
//   const {data: produtos,
//          isPending: carregandoProdutos,
//          error: errorProdutos} = useRecuperarProdutos();
 
//   if (carregandoProdutos) return <p className="fw-bold">Carregando produtos...</p>
//   if (errorProdutos) throw errorProdutos;
  
//   return (
//     <>
//       <h5>Lista de Produtos</h5>
//       <hr className="mt-1"/>
      
//       <TabelaDeProdutos produtos={produtos} />
//     </>
//   );
// };
// export default ProdutosPage;
