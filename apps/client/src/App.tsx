import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ValuationWizard from "./pages/ValuationWizard";
import StartPage from "./pages/StartPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/valuation-wizard/:step" element={<ValuationWizard />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
