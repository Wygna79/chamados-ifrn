import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditarChamado() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    titulo: "",
    descricao: "",
    tipo: "",
    local: "",
    prioridade: "",
    data_abertura: "",
  });

  const [tipos, setTipos] = useState([]);
  const [locais, setLocais] = useState([]);
  const [prioridades, setPrioridades] = useState([]);

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");

        const [chamadoResponse, tiposResponse, locaisResponse, prioridadesResponse] =
          await Promise.all([
            api.get(`/chamados/${id}`),
            api.get("/tipos"),
            api.get("/locais"),
            api.get("/prioridades"),
          ]);

        const chamado = chamadoResponse.data;

        // Chamados resolvidos não podem ser editados
        if (chamado.status === "resolvido") {
          setErro("Chamados resolvidos não podem ser editados.");
          return;
        }

        setFormulario({
          titulo: chamado.titulo || "",
          descricao: chamado.descricao || "",
          tipo: chamado.tipo || "",
          local: chamado.local || "",
          prioridade: chamado.prioridade || "",
          data_abertura: chamado.data_abertura || "",
        });

        setTipos(tiposResponse.data);
        setLocais(locaisResponse.data);
        setPrioridades(prioridadesResponse.data);
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

    carregarDados();
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSalvando(true);
      setErro("");

      await api.put(`/chamados/${id}`, formulario);

      // Depois de salvar, volta para os detalhes
      navigate(`/chamado/${id}`);
    } catch (error) {
      console.error("Erro ao editar chamado:", error);

      if (error.response?.data?.detail) {
        setErro(error.response.data.detail);
      } else {
        setErro("Não foi possível salvar as alterações.");
      }
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <main className="form-page">
        <p>Carregando chamado...</p>
      </main>
    );
  }

  if (erro) {
    return (
      <main className="form-page">
        <div className="form-card">
          <h1>Editar chamado</h1>

          <p className="mensagem-erro">{erro}</p>

          <button
            type="button"
            className="botao-secundario"
            onClick={() => navigate(`/chamado/${id}`)}
          >
            ← Voltar
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="form-page">
      <h1>Editar chamado</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="titulo">Título</label>

          <input
            id="titulo"
            name="titulo"
            type="text"
            value={formulario.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="descricao">Descrição</label>

          <textarea
            id="descricao"
            name="descricao"
            value={formulario.descricao}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="tipo">Tipo</label>

          <select
            id="tipo"
            name="tipo"
            value={formulario.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o tipo</option>

            {tipos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="local">Local</label>

          <select
            id="local"
            name="local"
            value={formulario.local}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o local</option>

            {locais.map((local) => (
              <option key={local} value={local}>
                {local}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="prioridade">Prioridade</label>

          <select
            id="prioridade"
            name="prioridade"
            value={formulario.prioridade}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a prioridade</option>

            {prioridades.map((prioridade) => (
              <option key={prioridade} value={prioridade}>
                {prioridade}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="data_abertura">Data de abertura</label>

          <input
            id="data_abertura"
            name="data_abertura"
            type="date"
            value={formulario.data_abertura}
            onChange={handleChange}
            required
          />
        </div>

        {erro && <p className="mensagem-erro">{erro}</p>}

        <div className="acoes-formulario">
          <button
            type="button"
            className="botao-secundario"
            onClick={() => navigate(`/chamado/${id}`)}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="botao-principal"
            disabled={salvando}
          >
            {salvando ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditarChamado;