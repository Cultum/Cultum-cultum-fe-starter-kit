import * as React from 'react';
// view components
import { Info } from '@md-sw/shared/components/info';
import { ContentLoader } from '@md-ui/loaders/content-loader';
// hooks
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
// types
import { RootStore } from '@md-store/index';
// helpers
import { clientError } from '@md-utils/errors';
// store
import * as API from '@md-store/modules/api';
import { ThunkDispatch } from '@md-store/helpers';
// views
import { Name, Wrapper, ImgContainer, InfoContainer, ContentWrapper, DetailsContainer } from '@md-sw/shared/views';

interface StarshipInfoProps {
  label: string;
  value: string | number;
}

const StarshipContainer = () => {
  // hooks
  const dispatch = useDispatch<ThunkDispatch>();
  const { query } = useRouter();

  // store
  const { data: starship, error, loading } = useSelector<
    RootStore,
    Pick<RootStore['api']['starships']['getStarship'], 'data' | 'error' | 'loading'>
  >((state) => ({
    data: state.api.starships.getStarship.data,
    error: state.api.starships.getStarship.error,
    loading: state.api.starships.getStarship.loading
  }));

  // data transformation
  const starshipInfo = React.useMemo<StarshipInfoProps[]>(() => {
    if (!starship) {
      return [];
    }

    return [
      { label: 'Name', value: starship.properties.name ?? 'N/A' },
      { label: 'Model', value: starship.properties.model ?? 'N/A' },
      { label: 'Cost In Credits', value: starship.properties.cost_in_credits ?? 'N/A' },
      { label: 'Hyperdrive Rating', value: starship.properties.hyperdrive_rating ?? 'N/A' },
      { label: 'Passengers', value: starship.properties.passengers ?? 'N/A' }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [starship]);

  React.useEffect(() => {
    if (!query.id) return;

    dispatch(API.starships.getStarship.performAPIGetStarship(query.id as string));
  }, [dispatch, query.id]);

  return (
    <ContentWrapper>
      <Wrapper>
        <ContentLoader isLoading={loading} error={clientError(error)}>
          <ImgContainer>
            <img src='/static/images/starship.jpg' alt='starship' />
          </ImgContainer>
          <DetailsContainer>
            {starship && <Name>{starship.properties.name}</Name>}
            <InfoContainer>
              {starshipInfo.map((i, idx) => (
                <Info key={idx} {...i} />
              ))}
            </InfoContainer>
          </DetailsContainer>
        </ContentLoader>
      </Wrapper>
    </ContentWrapper>
  );
};

export { StarshipContainer };
