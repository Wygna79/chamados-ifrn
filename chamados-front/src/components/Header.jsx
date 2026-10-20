import { useEffect, useState } from "react";
import api from "../services/api";

function Header() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function buscarUsuario() {
      try {
        const resposta = await api.get("/eu");
        setUsuario(resposta.data);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    }

    buscarUsuario();
  }, []);

  return (
    <header>
      <div>
        <strong>🔧 Chamados IFRN</strong>
      </div>

      <div>
        {usuario ? (
          <span>Olá, {usuario.nome}</span>
        ) : (
          <span>Carregando...</span>
        )}
      </div>
    </header>
  );
}

export default Header;