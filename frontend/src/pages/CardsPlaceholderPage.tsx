import { useParams } from "react-router-dom";
import CardPlaceholder from "../components/CardPlaceholder";

const CardsPlaceholderPage = () => {
  const {slugCategoria} = useParams();

  return (
    <>
      <h5>
        {slugCategoria
          ? slugCategoria.charAt(0).toUpperCase() + slugCategoria.slice(1)
          : "Produtos"}
      </h5>
      <div className="row">
        {Array.from({length: 12}).map((_, index) => (
          <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-6">
            <CardPlaceholder />
          </div>
        ))}
      </div>
    </>
  );
};
export default CardsPlaceholderPage;
