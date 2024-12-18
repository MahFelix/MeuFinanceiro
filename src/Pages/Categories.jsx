import { useState } from "react";
import styled from "styled-components";
import CategoryCard from "../components/CategoryCard";
import { useNavigate } from "react-router-dom";

const categories = [
  "Água",
  "Apartamento",
  "Assinaturas",
  "Celular",
  "Cosméticos",
  "Educação",
  "Energia",
  "Internet",
  "Lazer",
  "Mercado",
  "Pets",
  "Restaurantes",
  "Saúde",
];

const Categories = () => {
  const [expenses, setExpenses] = useState({});
  const navigate = useNavigate();

  const handleAddExpense = (category, value) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: (prevExpenses[category] || 0) + value,
    }));
  };

  const handleNavigateToEstimate = () => {
    // Salvar no localStorage se necessário
    localStorage.setItem("expenses", JSON.stringify(expenses));
    navigate("/estimate", { state: { expenses } });
  };

  return (
    <Container>
      <h1>Categorias</h1>
      <CardGrid>
        {categories.map((category) => (
          <CategoryCard
            key={category}
            category={category}
            onAddExpense={handleAddExpense}
          />
        ))}
      </CardGrid>
      <EstimateButton onClick={handleNavigateToEstimate}>
        Ver Estimativa
      </EstimateButton>
    </Container>
  );
};

export default Categories;

const Container = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const EstimateButton = styled.button`
  background: #ff8c42;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 2rem;
  font-size: 1.2rem;

  &:hover {
    background: #ff7b2c;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;
