import styled from "styled-components";
import SummaryCard from "../components/SummaryCard";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const location = useLocation();
  const { totalEstimated = 0, totalActual = 0, categories = [] } = location.state || {};
  const [salary, setSalary] = useState(0); // Estado para o salário bruto

  // Recupera o salário bruto do localStorage ao carregar a página
  useEffect(() => {
    const savedSalary = localStorage.getItem("salary");
    if (savedSalary) {
      setSalary(parseFloat(savedSalary));
    }
  }, []);

  // Salva o salário bruto no localStorage
  const handleSaveSalary = () => {
    localStorage.setItem("salary", salary);
    alert("Salário salvo com sucesso!");
  };

  const balance = totalActual - totalEstimated;
  const currentBalance = salary + balance; // Saldo atual considerando o salário bruto

  const handleSalaryChange = (e) => {
    setSalary(parseFloat(e.target.value) || 0);
  };

  return (
    <Container>
      <h1>Resumo Financeiro</h1>
      
      {/* Seção de Salário Bruto */}
      <SalarySection>
        <label htmlFor="salary">Meu Salário Bruto (R$):</label>
        <Input
          id="salary"
          type="number"
          value={salary}
          onChange={handleSalaryChange}
          placeholder="Digite o seu salário"
        />
        <SaveButton onClick={handleSaveSalary}>Salvar Salário</SaveButton>
      </SalarySection>
      
      {/* Cards de Resumo */}
      <CardContainer>
        <SummaryCard
          title="Gastos Totais"
          value={`R$ ${totalActual.toFixed(2)}`}
          color="#FF9800"
        />
        <SummaryCard
          title="Estimativa"
          value={`R$ ${totalEstimated.toFixed(2)}`}
          color="#4CAF50"
        />
        <SummaryCard
          title="Saldo"
          value={`R$ ${balance.toFixed(2)}`}
          color={balance >= 0 ? "#4CAF50" : "#F44336"}
        />
      </CardContainer>

      {/* Card de Saldo Atual considerando o salário */}
      <SummaryCard
        title="Saldo Atual"
        value={`R$ ${currentBalance.toFixed(2)}`}
        color={currentBalance >= 0 ? "#4CAF50" : "#F44336"}
      />

      {/* Detalhes por Categoria */}
      <CategoryDetails>
        <h2>Detalhes por Categoria</h2>
        <CategoryList>
          {categories.map((category) => (
            <CategoryItem key={category.name}>
              <span>{category.name}</span>
              <span>
                Estimado: R$ {category.estimated.toFixed(2)} | Gasto: R$ {category.actual.toFixed(2)}
              </span>
            </CategoryItem>
          ))}
        </CategoryList>
      </CategoryDetails>
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SalarySection = styled.div`
  margin-bottom: 2rem;

  label {
    display: block;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    label {
      font-size: 1rem;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const SaveButton = styled.button`
  margin-top: 1rem;
  padding: 0.8rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const CategoryDetails = styled.div`
  margin-top: 3rem;

  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #333;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.8rem;
  }
`;

const CategoryItem = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;

  span {
    display: block;
    font-size: 1rem;
    color: #555;

    &:first-child {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
`;
