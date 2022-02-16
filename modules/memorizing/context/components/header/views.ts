import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  padding: 10px 20px;
  border-radius: 10px;
  flex-direction: column;

  ${({ theme }) => theme.templates.centerContent}
  border: 1px solid ${({ theme }) => theme.colors.yellow400};
`;

export const CardWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
`;

export const ListWrapper = styled.div`
  height: 200px;
  width: 100%;
  overflow: auto;
  flex-direction: column;

  ${({ theme }) => theme.templates.centerItems}
  background: ${({ theme }) => theme.colors.gray500};
`;
