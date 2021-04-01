import * as React from 'react';
// components
import { Link } from '@md-ui/link';
import { Button } from '@md-ui/button';
// hooks
import { useModal } from '@md-modules/shared/hooks/use-modal';
// views
import { CardWrapper, CardImgWrapper, CardImg, CardFooter, CardFooterTitle } from './views';
// types
import { LinkProps } from 'next/link';
import { ModalType } from '@md-modules/shared/constants/modal';

interface Props extends LinkProps {
  id: string;
  name: string;
  image: string;
  modalEnabled?: boolean;
  modalType?: ModalType;
}

const Card: React.FC<Props> = ({
  id,
  name,
  image,
  modalEnabled = false,
  modalType = 'PERSON_DETAILS_MODAL',
  ...rest
}) => {
  const { openModal } = useModal({ modalType });

  return (
    <CardWrapper>
      <CardImgWrapper>
        <CardImg src={image} alt={`${name}-${id}`} />
      </CardImgWrapper>
      <CardFooter>
        <Link {...rest}>
          <CardFooterTitle>{name}</CardFooterTitle>
        </Link>
        {modalEnabled ? (
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
