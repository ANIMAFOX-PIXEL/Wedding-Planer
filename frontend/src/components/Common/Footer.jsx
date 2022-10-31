import React from 'react';
import styled from 'styled-components';

import { bool, func } from 'prop-types';

const Wrapper = styled.footer`
  display: flex;
  flex-flow: column nowrap;
  height: 432px;
`;

const SocialContainer = styled.section`
  flex: 0 0 136px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 10px;
  background-color: #e8fafa;
  padding: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LinksWrapper = styled.section`
  flex: 1 0 0;
  background-color: #364545;
  display: inline-block;
`;

const LinksContainer = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 128px;
  padding: 2rem;
  @media (max-width: 768px) {
    width: auto;
    flex-direction: column;
    margin: 0 auto;
  }
`;

const LinkListWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  list-style: none;
  gap: 12px;
`;

const LinkListTitle = styled.p`
  font-family: 'Inter';
  font-weight: 700;
  font-size: 1rem;
  color: #ffffff;
  margin: 0;
`;

const LinkList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const FooterLink = styled.a`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 0.875rem;
  color: #ffffff;
  opacity: 0.8;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = ({ showScrollTop, handleScrollTop }) => {
  return (
    <Wrapper>
      {/* Social Icons */}
      <SocialContainer></SocialContainer>
      {/* Useful Links */}
      <LinksWrapper>
        <LinksContainer>
          <LinkListWrapper>
            <LinkListTitle>Informacion de Contacto</LinkListTitle>
            <LinkList>
              <FooterLink href='#'>Acerca De</FooterLink>
            </LinkList>
          </LinkListWrapper>
          <LinkListWrapper>
            <LinkListTitle>Vinculos Comunes</LinkListTitle>
            <LinkList>
              <FooterLink href='#'>Metodos de pago</FooterLink>
              <FooterLink href='#'>Vende tus servicios</FooterLink>
            </LinkList>
          </LinkListWrapper>
          <LinkListWrapper>
            <LinkListTitle>Asistencia de Navegacion</LinkListTitle>
            <LinkList>
              <FooterLink href='#'>Cuenta</FooterLink>
              <FooterLink href='#'>Pedidos</FooterLink>
              <FooterLink href='#'>Planner</FooterLink>
            </LinkList>
          </LinkListWrapper>
        </LinksContainer>
      </LinksWrapper>
    </Wrapper>
  );
};

Footer.propTypes = {
  showScrollTop: bool.isRequired,
  handleScrollTop: func.isRequired,
};

export default Footer;
