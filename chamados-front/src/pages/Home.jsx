import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ChamadoCard from "../components/ChamadoCard";

function Home() {
  const [chamados, setChamados] = useState([]);

  const [tipos, setTipos] = useState([]);
  const [locais, setLocais] = useState([]);
  const [prioridades, setPrioridades] = useState([]);

  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("");
  const [tipo, setTipo] = useState("");
  const [local, setLocal] = useState("");
  const [prioridade, setPrioridade] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");

        const [
          respostaChamados,
          respostaTipos,
          respostaLocais,
          respostaPrioridades,
        ] = await Promise.all([
          api.get("/chamados"),
          api.get("/tipos"),
          api.get("/locais"),
          api.get("/prioridades"),
        ]);

        setChamados(respostaChamados.data);
        setTipos(respostaTipos.data);
        setLocais(respostaLocais.data);
        setPrioridades(respostaPrioridades.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setErro("Não foi possível carregar os dados.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const chamadosFiltrados = chamados.filter((chamado) => {
    const texto = busca.toLowerCase();

    const correspondeBusca =
      chamado.titulo.toLowerCase().includes(texto) ||
      chamado.descricao.toLowerCase().includes(texto);

    const correspondeStatus =
      !status || chamado.status === status;

    const correspondeTipo =
      !tipo || chamado.tipo === tipo;

    const correspondeLocal =
      !local || chamado.local === local;

    const correspondePrioridade =
      !prioridade || chamado.prioridade === prioridade;

    return (
      correspondeBusca &&
      correspondeStatus &&
      correspondeTipo &&
      correspondeLocal &&
      correspondePrioridade
    );
  });

  function limparFiltros() {
    setBusca("");
    setStatus("");
    setTipo("");
    setLocal("");
    setPrioridade("");
  }

  return (
    <main className="home">
      <div className="home-topo">
        <h1>Chamados</h1>

        <Link to="/novo" className="botao">
          + Abrir chamado
        </Link>
      </div>

      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por título ou descrição..."
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
          className="campo-busca"
        />

        <div className="filtros-select">
          <select
            value={status}
            onChange={(evento) => setStatus(evento.target.value)}
          >
            <option value="">Todos os status</option>
            <option value="aberto">Aberto</option>
            <option value="em andamento">Em andamento</option>
            <option value="resolvido">Resolvido</option>
          </select>

          <select
            value={tipo}
            onChange={(evento) => setTipo(evento.target.value)}
          >
            <option value="">Todos os tipos</option>

            {tipos.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={local}
            onChange={(evento) => setLocal(evento.target.value)}
          >
            <option value="">Todos os locais</option>

            {locais.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={prioridade}
            onChange={(evento) => setPrioridade(evento.target.value)}
          >
            <option value="">Todas as prioridades</option>

            {prioridades.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={limparFiltros}
            className="botao-limpar"
          >
            Limpar filtros
          </button>
        </div>
      </div>

      {carregando && (
        <p className="mensagem">Carregando chamados...</p>
      )}

      {erro && (
        <p className="mensagem erro">{erro}</p>
      )}

      {!carregando && !erro && (
        <>
          <p className="contador">
            {chamadosFiltrados.length} chamado(s) encontrado(s)
          </p>

          {chamadosFiltrados.length === 0 ? (
            <p className="mensagem">
              Nenhum chamado encontrado.
            </p>
          ) : (
            <section className="lista-chamados">
              {chamadosFiltrados.map((chamado) => (
                <ChamadoCard
                  key={chamado.id}
                  chamado={chamado}
                />
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default Home;