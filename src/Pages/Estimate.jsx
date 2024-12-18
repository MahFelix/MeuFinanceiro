import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Estimate = () => {
  const location = useLocation();
  const { expenses } = location.state || {};

  const total = Object.values(expenses || {}).reduce((acc, curr) => acc + curr, 0);

  return (
    <Container>
      <h1>Estimativa de Gastos</h1>
      <ExpenseList>
        {expenses &&
          Object.entries(expenses).map(([category, value]) => (
            <ExpenseItem key={category}>
              <span>{category}</span>
              <span>R$ {value.toFixed(2)}</span>
            </ExpenseItem>
          ))}
      </ExpenseList>
      <Total>
        <strong>Total:</strong> R$ {total.toFixed(2)}
      </Total>
    </Container>
  );
};

export default Estimate;

const Container = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ExpenseList = styled.div`
  margin-top: 2rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;

  span {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0;

    span {
      font-size: 1rem;
    }
  }
`;

const Total = styled.div`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: right;

  @media (max-width: 768px) {
    margin-top: 1rem;
    font-size: 1.2rem;
    text-align: left;
  }
`;
