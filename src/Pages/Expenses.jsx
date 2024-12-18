import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AddExpenseModal from "../components/AddExpenseModal";

const initialCategories = [
  { name: "Água", estimated: 0, actual: 0 },
  { name: "Apartamento", estimated: 0, actual: 0 },
  { name: "Assinaturas", estimated: 0, actual: 0 },
  { name: "Celular", estimated: 0, actual: 0 },
  { name: "Cosméticos", estimated: 0, actual: 0 },
  { name: "Educação", estimated: 0, actual: 0 },
  { name: "Energia", estimated: 0, actual: 0 },
  { name: "Internet", estimated: 0, actual: 0 },
  { name: "Lazer", estimated: 0, actual: 0 },
  { name: "Mercado", estimated: 0, actual: 0 },
  { name: "Pets", estimated: 0, actual: 0 },
  { name: "Restaurantes", estimated: 0, actual: 0 },
  { name: "Saúde", estimated: 0, actual: 0 },
];

const Expenses = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Carregar as categorias do localStorage ao iniciar
  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem("categories"));
    if (savedCategories) {
      setCategories(savedCategories);
    }
  }, []);

  // Função para salvar as categorias no localStorage
  const handleSave = () => {
    localStorage.setItem("categories", JSON.stringify(categories));
    alert("Valores salvos com sucesso!");
  };

  // Função para atualizar os valores das categorias
  const handleUpdate = (index, type, value) => {
    setCategories((prevCategories) =>
      prevCategories.map((category, i) =>
        i === index
          ? {
              ...category,
              [type]: parseFloat(value) || 0, // Certifica-se de que é um número válido
            }
          : category
      )
    );
  };

  // Função para adicionar uma nova categoria
  const handleAddCategory = (newCategoryName) => {
    setCategories((prevCategories) => [
      ...prevCategories,
      { name: newCategoryName, estimated: 0, actual: 0 },
    ]);
  };

  // Função para remover uma categoria
  const handleRemoveCategory = (index) => {
    setCategories((prevCategories) => prevCategories.filter((_, i) => i !== index));
  };

  // Função para navegar para o dashboard
  const handleNavigateToDashboard = () => {
    navigate("/dashboard", { state: { categories, totalEstimated, totalActual } });
  };

  const totalEstimated = categories.reduce((acc, category) => acc + category.estimated, 0);
  const totalActual = categories.reduce((acc, category) => acc + category.actual, 0);

  return (
    <Container>
      <h1>Gastos</h1>
      <Button onClick={() => setIsModalOpen(true)}>Adicionar Categoria</Button>
      <Table>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Estimativa (R$)</th>
            <th>Gasto Real (R$)</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.name}>
              <td>{category.name}</td>
              <td>
                <Input
                  type="number"
                  value={category.estimated}
                  onChange={(e) => handleUpdate(index, "estimated", e.target.value)}
                />
              </td>
              <td>
                <Input
                  type="number"
                  value={category.actual}
                  onChange={(e) => handleUpdate(index, "actual", e.target.value)}
                />
              </td>
              <td>
                <RemoveButton onClick={() => handleRemoveCategory(index)}>Remover</RemoveButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Summary>
        <p>
          <strong>Total Estimado:</strong> R$ {totalEstimated.toFixed(2)}
        </p>
        <p>
          <strong>Total Gasto:</strong> R$ {totalActual.toFixed(2)}
        </p>
        <p>
          <strong>Diferença:</strong> R$ {(totalActual - totalEstimated).toFixed(2)}
        </p>
      </Summary>
      <Button onClick={handleNavigateToDashboard}>Ir para o Dashboard</Button>
      <SaveButton onClick={handleSave}>Salvar Valores</SaveButton>

      {isModalOpen && (
        <AddExpenseModal
          onClose={() => setIsModalOpen(false)}
          onAddCategory={handleAddCategory}
        />
      )}
    </Container>
  );
};

export default Expenses;

const Container = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 0rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    border: 1px solid #ddd;
    padding: 1rem;
    text-align: left;
  }

  th {
    background: #f4f4f4;
  }

  @media (max-width: 768px) {
    th,
    td {
      font-size: 0.9rem;
      padding: 0.5rem;
    }

    th {
      font-size: 1rem;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;

  @media (max-width: 768px) {
    padding: 0.4rem;
    font-size: 0.9rem;
  }
`;

const RemoveButton = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #e60000;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Summary = styled.div`
  margin-top: 2rem;
  font-size: 1.2rem;

  p {
    margin: 0.5rem 0;
  }

  @media (max-width: 768px) {
    font-size: 1rem;

    p {
      margin: 0.4rem 0;
    }
  }
`;

const Button = styled.button`
  background: #ff8c42;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1.2rem;

  &:hover {
    background: #ff7b2c;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

const SaveButton = styled.button`
  background: #42b883;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1.2rem;

  &:hover {
    background: #388e56;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;
