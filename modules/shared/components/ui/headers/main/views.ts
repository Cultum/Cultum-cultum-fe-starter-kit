import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  background-color: ${({ theme }) => theme.colors.gray500};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray600};
`;

export const IWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  margin: 0 auto;
  height: 60px;
`;

export const LWrapper = styled.div`
  img {
    display: block;
    max-height: 20px;
  }

  ${({ theme }) => theme.templates.centerItems};
`;

export const RWrapper = styled.div`
  justify-content: flex-end;
  color: white;

  ${({ theme }) => theme.templates.centerItems};
`;

export const Icon = styled.img`
  height: 20px;
  width: 20px;
`;

export const TabsWrapper = styled.div`
  display: flex;
  height: 30px;
  padding: 0 15px;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.gray500};
  border-top: 1px solid ${({ theme }) => theme.colors.gray600};
`;
