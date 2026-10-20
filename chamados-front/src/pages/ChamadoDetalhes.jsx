import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ChamadoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chamado, setChamado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [excluindo, setExcluindo] = useState(false);

  useEffect(() => {
    async function buscarChamado() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await api.get(`/chamados/${id}`);

        setChamado(resposta.data);
      } catch (error) {
        console.error("Erro ao carregar chamado:", error);

        if (error.response?.data?.detail) {
          setErro(error.response.data.detail);
        } else {
          setErro("Não foi possível carregar o chamado.");
        }
      } finally {
        setCarregando(false);
      }
    }

    buscarChamado();
  }, [id]);

  async function excluirChamado() {
    const confirmou = window.confirm(
      "Tem certeza que deseja excluir este chamado?"
    );

    if (!confirmou) {
      return;
    }

    try {
      setExcluindo(true);
      setErro("");

      await api.delete(`/chamados/${id}`);

      navigate("/");
    } catch (error) {
      console.error("Erro ao excluir chamado:", error);

      if (error.response?.data?.detail) {
        setErro(error.response.data.detail);
      } else {
        setErro("Não foi possível excluir o chamado.");
      }

      setExcluindo(false);
    }
  }

  if (carregando) {
    return (
      <main>
        <p className="mensagem">Carregando chamado...</p>
      </main>
    );
  }

  if (erro && !chamado) {
    return (
      <main>
        <p className="mensagem erro">{erro}</p>

        <Link to="/" className="link-detalhes">
          ← Voltar para chamados
        </Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/" className="voltar">
        ← Voltar para chamados
      </Link>

      <div className="detalhes-chamado">
        <div className="detalhes-topo">
          <h1>{chamado.titulo}</h1>

          <span className={`status status-${chamado.status}`}>
            {chamado.status}
          </span>
        </div>

        <div className="detalhes-secao">
          <h2>Descrição</h2>

          <p>{chamado.descricao}</p>
        </div>

        <div className="detalhes-informacoes">
          <div>
            <strong>Tipo</strong>
            <span>{chamado.tipo}</span>
          </div>

          <div>
            <strong>Local</strong>
            <span>{chamado.local}</span>
          </div>

          <div>
            <strong>Prioridade</strong>
            <span>{chamado.prioridade}</span>
          </div>

          <div>
            <strong>Data de abertura</strong>
            <span>{chamado.data_abertura}</span>
          </div>
        </div>

        <div className="detalhes-secao">
          <h2>Responsável</h2>

          <p>
            {chamado.responsavel || "Ainda não definido"}
          </p>
        </div>

        <div className="detalhes-secao">
          <h2>Solução</h2>

          <p>
            {chamado.solucao || "Nenhuma solução registrada."}
          </p>
        </div>

        {chamado.data_resolucao && (
          <div className="detalhes-secao">
            <h2>Data de resolução</h2>

            <p>{chamado.data_resolucao}</p>
          </div>
        )}

        {erro && chamado && (
          <p className="mensagem erro">
            {erro}
          </p>
        )}

        <div className="acoes-detalhes">
          {chamado.status !== "resolvido" && (
            <button
              type="button"
              className="botao-principal"
              onClick={() => navigate(`/editar/${chamado.id}`)}
            >
              ✏️ Editar
            </button>
          )}

          <button
            type="button"
            className="botao-excluir"
            onClick={excluirChamado}
            disabled={excluindo}
          >
            {excluindo ? "Excluindo..." : "🗑️ Excluir"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default ChamadoDetalhes;