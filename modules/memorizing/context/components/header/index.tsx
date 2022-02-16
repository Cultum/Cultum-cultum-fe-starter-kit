import React from 'react';
// context
import { MemorizeBLLContext } from '@md-modules/memorizing/context/layers/business';
// components
import Card from '@md-modules/memorizing/context/components/card';
// views
import { Description, Title } from '@md-shared/views/common';
import { Wrapper, CardWrapper, ListWrapper } from '@md-modules/memorizing/context/components/header/views';

const Header = () => {
  const { selectedPerson } = React.useContext(MemorizeBLLContext);

  const renderLogs = React.useRef<string[]>([]);

  return React.useMemo(() => {
    renderLogs.current = [...renderLogs.current, 'Render'];

    return (
      <Wrapper>
        <Title>Selected Person: {selectedPerson?.name || 'N/A'}</Title>
        <Description>{selectedPerson ? JSON.stringify(selectedPerson) : 'N/A'}</Description>

        {selectedPerson && (
          <CardWrapper>
            <Card withoutButton key={selectedPerson.id} {...selectedPerson} />
          </CardWrapper>
        )}

        <Title yellowColor>Render logs</Title>
        <Description>total number of renders: {renderLogs.current.length}</Description>

        <ListWrapper>
          {renderLogs.current.map((item, index) => (
            <Description yellowColor={index % 2 === 0} key={index}>
              {item}
            </Description>
          ))}
        </ListWrapper>
      </Wrapper>
    );
  }, [selectedPerson]);
};

export default Header;
