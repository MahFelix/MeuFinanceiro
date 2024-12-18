import { useState } from "react";
import styled from "styled-components";
import Logo1 from '../assets/LogoMeuFinanceiro.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <Nav>
      <Logo>
        <LogoImage src={Logo1} alt="Logo" />
        MeuFinanceiro
      </Logo>
      <MenuToggle onClick={handleToggleMenu} isOpen={isMenuOpen}>
        <span />
        <span />
        <span />
      </MenuToggle>
      <Menu isOpen={isMenuOpen}>
        <a href="/dashboard">Dashboard</a>
        <a href="/categories">Categorias</a>
        <a href="/estimate">Estimativa</a>
        <a href="/expenses">Gastos</a>
      </Menu>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textLight};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 80px; /* Tamanho da logomarca */
  height: auto;
  margin-right: 10px; /* Espaço entre a logomarca e o texto */
`;

const Menu = styled.div`
  display: flex;
  margin-top: 20px;
  a {
    color: ${({ theme }) => theme.colors.textLight};
    text-decoration: none;
    margin-left: 1rem;
    opacity: 0; /* Começa invisível */
    transform: translateY(20px); /* Começa deslocado para baixo */
    animation: ${({ isOpen }) => (isOpen ? "fadeIn 0.5s ease-out forwards" : "none")}; /* Animação de surgimento */
    animation-delay: 0.2s; /* Delay para a animação do primeiro link */
  }

  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.primary};
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    padding: 1rem 0;
    z-index: 1;
    transition: all 0.3s ease-in-out; /* Transição suave para abrir e fechar */

    a {
      margin: 1rem 0;
      text-align: center;
      animation: ${({ isOpen }) => (isOpen ? "fadeIn 0.5s ease-out forwards" : "none")};
      opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px); /* Começa deslocado para baixo */
    }
    100% {
      opacity: 1;
      transform: translateY(0); /* Fica na posição original */
    }
  }
`;

const MenuToggle = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 30px;
  height: 21px;
  cursor: pointer;

  span {
    width: 30px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.textLight};
    transition: all 0.3s ease-in-out; /* Transição suave nas linhas do hambúrguer */
  }

  ${({ isOpen }) =>
    isOpen &&
    `
    span:nth-child(1) {
      transform: rotate(45deg);
      position: relative;
      top: 8px;
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: rotate(-45deg);
      position: relative;
      top: -8px;
    }
  `}

  @media (max-width: 768px) {
    display: flex;
  }
`;
