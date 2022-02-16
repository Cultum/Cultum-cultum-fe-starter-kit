import * as React from 'react';
// context
import { MemorizeAPIContext, PersonItem } from '@md-modules/memorizing/context/layers/api';

interface Context {
  personId?: string;
  fakeState: number;
  selectedPerson?: PersonItem;
  setPersonId: (id: string) => void;
  setFakeState: React.Dispatch<React.SetStateAction<number>>;
}

const MemorizeBLLContext = React.createContext<Context>({
  setPersonId: () => {},
  setFakeState: () => {},
  fakeState: 0
});

const MemorizeBLLContextProvider: React.FC = ({ children }) => {
  const { people } = React.useContext(MemorizeAPIContext);

  const [personId, setId] = React.useState<string>();
  const [fakeState, setFakeState] = React.useState(0);

  const selectedPerson = React.useMemo(() => people.find((person) => person.id === personId), [people, personId]);

  const setPersonId = (id: string) => setId(id);

  return (
    <MemorizeBLLContext.Provider value={{ selectedPerson, setFakeState, fakeState, personId, setPersonId }}>
      {children}
    </MemorizeBLLContext.Provider>
  );
};

export { MemorizeBLLContextProvider, MemorizeBLLContext };
