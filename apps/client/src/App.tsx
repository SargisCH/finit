import { BrowserRouter, Routes, Route } from "react-router-dom";
import ValuationWizard from "./pages/ValuationWizard";
import ImportWizard from "./pages/ImportWizard";
import StartPage from "./pages/StartPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./pages/NotFound";
import ValidationResult from "./pages/ValidationResult";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import UpgradePage from "./pages/UpgradePage";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upgrade" element={<UpgradePage />} />
          <Route
            path="/start"
            element={
              <MainLayout>
                <StartPage />
              </MainLayout>
            }
          />
          <Route
            path="/valuation-wizard/:id/:step"
            element={
              <MainLayout>
                <ValuationWizard />
              </MainLayout>
            }
          />
          <Route
            path="/valuation-wizard/:id/result"
            element={
              <MainLayout>
                <ValidationResult />
              </MainLayout>
            }
          />
          <Route
            path="/import-wizard/:step"
            element={
              <MainLayout>
                <ImportWizard />
              </MainLayout>
            }
          />

          <Route
            path="*"
            element={
              <MainLayout>
                <NotFound />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
