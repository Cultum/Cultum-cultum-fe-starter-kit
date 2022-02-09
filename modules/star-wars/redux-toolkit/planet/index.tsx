import * as React from 'react';
// hooks
import { useSelector } from 'react-redux';
// helpers
import { clientError } from '@md-utils/errors';
// types
import { RootToolkitStore } from '@md-toolkit-store/index';
// view components
import Image from 'next/image';
import { Info } from '@md-sw/shared/components/info';
import { ContentLoader } from '@md-ui/loaders/content-loader';
// views
import { Name, Wrapper, ImgContainer, InfoContainer, ContentWrapper, DetailsContainer } from '@md-sw/shared/views';

// types
interface PlanetInfoProps {
  label: string;
  value: string | number;
}

// constants
const IMAGE_WIDTH = 600;
const IMAGE_HEIGHT = 600;

const PlanetToolkit = () => {
  // store
  const {
    data: planet,
    error,
    loading
  } = useSelector<
    RootToolkitStore,
    Pick<RootToolkitStore['api']['planets']['getPlanet'], 'data' | 'error' | 'loading'>
  >((state) => ({
    data: state.api.planets.getPlanet.data,
    error: state.api.planets.getPlanet.error,
    loading: state.api.planets.getPlanet.loading
  }));

  // data transformation
  const planetInfo = React.useMemo<PlanetInfoProps[]>(() => {
    if (!planet) {
      return [];
    }

    return [
      { label: 'Name', value: planet.properties.name ?? 'N/A' },
      { label: 'Gravity', value: planet.properties.gravity ?? 'N/A' },
      { label: 'Orbital Period', value: planet.properties.orbital_period ?? 'N/A' },
      { label: 'Population', value: planet.properties.population ?? 'N/A' }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planet]);

  return (
    <ContentWrapper>
      <Wrapper>
        <ContentLoader isLoading={loading} error={clientError(error)}>
          <ImgContainer>
            <Image
              alt='planet'
              layout='responsive'
              placeholder='blur'
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              src='/static/images/planet.png'
              blurDataURL='/static/images/planet.png'
            />
          </ImgContainer>
          <DetailsContainer>
            {planet && <Name>{planet.properties.name}</Name>}
            <InfoContainer>
              {planetInfo.map((i, idx) => (
                <Info key={idx} {...i} />
              ))}
            </InfoContainer>
          </DetailsContainer>
        </ContentLoader>
      </Wrapper>
    </ContentWrapper>
  );
};

export { PlanetToolkit };
