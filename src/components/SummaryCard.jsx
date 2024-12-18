/* eslint-disable react/prop-types */

import styled from "styled-components";

const SummaryCard = ({ title, value, color }) => {
  return (
    <Card color={color}>
      <h2>{title}</h2>
      <p>{value}</p>
    </Card>
  );
};

export default SummaryCard;

const Card = styled.div`
  background: ${({ color }) => color};
  color: white;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  flex: 1;
  text-align: center;
  width: 100%; /* Garante que ocupe toda a largura disponível */
  box-sizing: border-box;

  h2 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem; /* Ajuste da fonte do título */
  }

  p {
    font-size: 1rem; /* Ajuste da fonte do valor */
  }

  /* Responsividade */
  @media (max-width: 768px) {
    padding: 1rem;
    h2 {
      font-size: 1rem; /* Diminui o tamanho do título */
    }
    p {
      font-size: 0.9rem; /* Diminui o tamanho do valor */
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 0.9rem; /* Diminui ainda mais o tamanho do título */
    }
    p {
      font-size: 0.8rem; /* Diminui ainda mais o tamanho do valor */
    }
  }
`;
