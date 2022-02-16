import styled from 'styled-components';
import Image from 'next/image';

export const ImagesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Img = styled(Image)`
  margin: 0 20px !important;
`;
