import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import Home from "./pages/Home";
import ValuationWizard from "./pages/ValuationWizard";
import StartPage from "./pages/StartPage";
import { useCallback } from "react";
import { ValuationStep } from "../../../packages/types/dist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/valuation-wizard/:step" element={<ValuationWizard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
