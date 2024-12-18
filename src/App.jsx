
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/theme";

// Importando os componentes e páginas
import Navbar from "./components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Categories from "./Pages/Categories";
import Estimate from "./Pages/Estimate";
import Expenses from "./Pages/Expenses";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyles />
        <Navbar />
        <MainContainer>
          <Routes>
           
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/estimate" element={<Estimate />} />
            <Route path="/expenses" element={<Expenses />} />
          </Routes>
        </MainContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App;

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 1rem;
  max-width: 1200px;
`;
