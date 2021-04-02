import * as React from 'react';
// components
import { Link } from '@md-ui/link';
import { Button } from '@md-ui/button';
// views
import { CardWrapper, CardImgWrapper, CardImg, CardFooter, CardFooterTitle } from './views';
// types
import { LinkProps } from 'next/link';

interface Props extends LinkProps {
  id: string;
  name: string;
  image: string;
  openModal?: (id: string) => void;
}

const Card: React.FC<Props> = ({ id, name, image, openModal, ...rest }) => {
  return (
    <CardWrapper>
      <CardImgWrapper>
        <CardImg src={image} alt={`${name}-${id}`} />
      </CardImgWrapper>
      <CardFooter>
        <Link {...rest}>
          <CardFooterTitle>{name}</CardFooterTitle>
        </Link>
        {openModal ? (
          <Button preset='details' onClick={() => openModal(id)}>
            Details
          </Button>
        ) : (
          <Link {...rest}>
            <Button preset='details'>Details</Button>
          </Link>
        )}
      </CardFooter>
    </CardWrapper>
  );
};

const memoized = React.memo(Card);

export { memoized as Card };
