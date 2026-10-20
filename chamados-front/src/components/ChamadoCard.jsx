import { Link } from "react-router-dom";

function ChamadoCard({ chamado }) {
  return (
    <article className="card-chamado">
      <h2>{chamado.titulo}</h2>

      <p className="descricao">
        {chamado.descricao}
      </p>

      <div className="informacoes-chamado">
        <span>
          <strong>Status:</strong> {chamado.status}
        </span>

        <span>
          <strong>Prioridade:</strong> {chamado.prioridade}
        </span>
      </div>

      <Link
        to={`/chamado/${chamado.id}`}
        className="link-detalhes"
      >
        Ver detalhes →
      </Link>
    </article>
  );
}

export default ChamadoCard;