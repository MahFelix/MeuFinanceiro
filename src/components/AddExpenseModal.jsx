/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";

const AddExpenseModal = ({ isOpen, onClose, category, onSave }) => {
  const [actualValue, setActualValue] = useState(category?.actual || 0);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!actualValue || isNaN(actualValue) || parseFloat(actualValue) <= 0) {
      setError("Por favor, insira um valor válido.");
      return;
    }
    onSave({ ...category, actual: parseFloat(actualValue) });
    onClose();
    setError(""); // Limpa o erro após salvar
  };

  return (
    <Backdrop>
      <ModalContainer>
        <Header>
          <h2>Editar Gasto - {category.name}</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        <Body>
          <Label>Valor Gasto:</Label>
          <Input
            type="number"
            value={actualValue}
            onChange={(e) => setActualValue(e.target.value)}
            placeholder="Digite o valor"
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Body>
        <Footer>
          <CancelButton onClick={onClose}>Cancelar</CancelButton>
          <SaveButton onClick={handleSave}>Salvar</SaveButton>
        </Footer>
      </ModalContainer>
    </Backdrop>
  );
};

export default AddExpenseModal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  padding: 1.5rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;
  
  @media (max-width: 768px) {
    width: 95%;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.8rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;

  h2 {
    font-size: 1.5rem;
    color: #333;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
`;

const Body = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #555;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CancelButton = styled.button`
  padding: 0.8rem 1.2rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
  color: #555;
  cursor: pointer;

  &:hover {
    background: #f3f3f3;
  }
`;

const SaveButton = styled.button`
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 4px;
  background: #4caf50;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #45a049;
  }
`;
