import React from 'react';
// components
import Image from 'next/image';
import { Button } from '@md-ui/button';
// context
import { MemorizeBLLContext } from '@md-modules/memorizing/context/layers/business';
// views
import { Description } from '@md-shared/views/common';
import { CounterWrapper } from '@md-modules/memorizing/context/components/card/views';
import { CardFooter, CardFooterTitle, CardWrapper } from '@md-sw/shared/components/card/views';

// types
interface Props {
  id: string;
  name: string;
  image: string;
  withoutButton?: boolean;
}

// constants
const IMAGE_WIDTH = 600;
const IMAGE_HEIGHT = 338;

const Card: React.FC<Props> = ({ id, name, image, withoutButton }) => {
  const { setPersonId, setFakeState, fakeState } = React.useContext(MemorizeBLLContext);

  const getId = () => setPersonId(id);
  const increment = () => setFakeState((prevState) => prevState + 1);

  return (
    <CardWrapper>
      <Image
        src={image}
        objectFit='cover'
        placeholder='blur'
        layout='responsive'
        width={IMAGE_WIDTH}
        blurDataURL={image}
        height={IMAGE_HEIGHT}
        alt={`${name}-${id}`}
      />

      <CounterWrapper>
        <Description>Counter: {fakeState}</Description>
        <Button onClick={increment}>+</Button>
      </CounterWrapper>

      <CardFooter>
        <CardFooterTitle>{name}</CardFooterTitle>

        {!withoutButton && (
          <Button onClick={getId} preset='details'>
            Get ID
          </Button>
        )}
      </CardFooter>
    </CardWrapper>
  );
};

export default Card;
