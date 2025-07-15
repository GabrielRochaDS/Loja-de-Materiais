import cinza from '../assets/cinza.png';

const CardPlaceholder = () => {
  return (
    <div className="card h-100 border-0">
      <img src={cinza} className="card-img-top" alt="imagem" />
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-11"></span>
          <span className="placeholder col-4"></span>
        </p>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-6"></span>
        </p>
      </div>
      <div className="card-footer p-0 mb-4">
        <button
          type="button"
          className="btn btn-secondary btn-sm disabled placeholder w-100"
          aria-disabled="true"
        ></button>
      </div>
    </div>
  );
};
export default CardPlaceholder;
