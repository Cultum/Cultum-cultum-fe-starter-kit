import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 2;
  display: grid;
  grid-gap: 30px;
  margin: 0 0 0 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  // border-left: 1px solid ${({ theme }) => theme.colors.yellow400};
`;

export const ContentWrapper = styled.div`
  padding: 30px 0;
  margin: 0 auto;
  text-align: center;
  max-width: ${({ theme }) => theme.dimensions.pageMaxWidth}px;
`;

export const InnerWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
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
