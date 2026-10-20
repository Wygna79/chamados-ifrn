import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function NovoChamado() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    titulo: "",
    descricao: "",
    tipo: "",
    local: "",
    prioridade: "",
  });

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  async function criarChamado(evento) {
    evento.preventDefault();

    try {
      setEnviando(true);
      setErro("");

      const hoje = new Date().toISOString().split("T")[0];

      await api.post("/chamados", {
        ...formulario,
        data_abertura: hoje,
      });

      navigate("/");
    } catch (error) {
      console.error("Erro ao criar chamado:", error);
      setErro("Não foi possível criar o chamado.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main>
      <h1>Novo chamado</h1>

      {erro && (
        <p className="mensagem erro">
          {erro}
        </p>
      )}

      <form onSubmit={criarChamado} className="formulario">
        <label>
          Título
          <input
            type="text"
            name="titulo"
            value={formulario.titulo}
            onChange={atualizarCampo}
            required
          />
        </label>

        <label>
          Descrição
          <textarea
            name="descricao"
            value={formulario.descricao}
            onChange={atualizarCampo}
            required
          />
        </label>

        <label>
          Tipo
          <select
            name="tipo"
            value={formulario.tipo}
            onChange={atualizarCampo}
            required
          >
            <option value="">Selecione o tipo</option>
            <option value="elétrica">Elétrica</option>
            <option value="hidráulica">Hidráulica</option>
            <option value="informática">Informática</option>
            <option value="climatização">Climatização</option>
            <option value="mobiliário">Mobiliário</option>
            <option value="limpeza">Limpeza</option>
            <option value="outro">Outro</option>
          </select>
        </label>

        <label>
          Local
          <select
            name="local"
            value={formulario.local}
            onChange={atualizarCampo}
            required
          >
            <option value="">Selecione o local</option>
            <option value="Bloco A">Bloco A</option>
            <option value="Bloco B">Bloco B</option>
            <option value="Laboratórios">Laboratórios</option>
            <option value="Biblioteca">Biblioteca</option>
            <option value="Cantina">Cantina</option>
            <option value="Quadra">Quadra</option>
            <option value="Auditório">Auditório</option>
            <option value="Banheiros">Banheiros</option>
            <option value="Estacionamento">Estacionamento</option>
          </select>
        </label>

        <label>
          Prioridade
          <select
            name="prioridade"
            value={formulario.prioridade}
            onChange={atualizarCampo}
            required
          >
            <option value="">Selecione a prioridade</option>
            <option value="baixa">Baixa</option>
            <option value="média">Média</option>
            <option value="alta">Alta</option>
          </select>
        </label>

        <div className="acoes-formulario">
          <button
            type="button"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>

          <button type="submit" disabled={enviando}>
            {enviando ? "Criando..." : "Criar chamado"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default NovoChamado;