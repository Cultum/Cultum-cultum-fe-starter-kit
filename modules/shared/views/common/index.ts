import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

export const ContentWrapper = styled.div`
  padding: 30px 0;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.dimensions.pageMaxWidth}px;
`;

export const Description = styled.p<{ yellowColor?: boolean }>`
  opacity: 0.7;

  color: ${({ theme, yellowColor }) => (yellowColor ? theme.colors.yellow400 : theme.colors.white)};
`;

export const Title = styled.p<{ yellowColor?: boolean }>`
  font-size: 24px;
  font-weight: 500;

  color: ${({ theme, yellowColor }) => (yellowColor ? theme.colors.yellow400 : theme.colors.white)};
`;
