/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";
import handleAddExpense from '../Pages/Expenses'

const CategoryCard = ({ category, onAddExpense }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!value || isNaN(value) || parseFloat(value) <= 0) {
      setError("Por favor, insira um valor válido.");
      return;
    }
    // Enviar o valor para o tipo estimado na categoria
    onAddExpense(category, "estimated", parseFloat(value));
    setValue("");
    setIsOpen(false);
    setError("");
  };
  

  return (
    <Card>
      <CategoryButton onClick={() => setIsOpen(true)}>{category}</CategoryButton>
      {isOpen && (
        <Modal>
          <ModalContent>
          <CategoryCard
  category={category.name}
  onAddExpense={handleAddExpense} // Passa a função que lida com o envio do valor
/>
            <h3>Adicionar Gasto para {category}</h3>
            <Input
              type="number"
              placeholder="Digite o valor"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ButtonContainer>
              <Button onClick={handleAdd}>Adicionar</Button>
              <Button secondary onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
            </ButtonContainer>
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
};

export default CategoryCard;

const Card = styled.div`
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CategoryButton = styled.button`
  background: #ff8c42;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #ff7b2c;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  text-align: center;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-top: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button`
  background: ${(props) => (props.secondary ? "#ddd" : "#ff8c42")};
  color: ${(props) => (props.secondary ? "#333" : "white")};
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.secondary ? "#ccc" : "#ff7b2c")};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;
