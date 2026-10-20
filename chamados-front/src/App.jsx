import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import NovoChamado from "./pages/NovoChamado";
import ChamadoDetalhes from "./pages/ChamadoDetalhes";
import EditarChamado from "./pages/EditarChamado";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novo" element={<NovoChamado />} />
        <Route
          path="/chamado/:id"
          element={<ChamadoDetalhes />}
        />
        <Route
          path="/editar/:id"
          element={<EditarChamado />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;