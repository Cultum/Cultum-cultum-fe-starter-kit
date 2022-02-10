import * as React from 'react';
// view components
import Image from 'next/image';
import { Info } from '@md-sw/shared/components/info';
import { ContentLoader } from '@md-ui/loaders/content-loader';
// hooks
import { useRouter } from 'next/dist/client/router';
// utils
import * as U from '@md-utils';
// api
import { starshipsAPI } from '@md-toolkit-store/services/starships/get-starships-api';
// views
import { Name, Wrapper, ImgContainer, InfoContainer, ContentWrapper, DetailsContainer } from '@md-sw/shared/views';

// types
interface StarshipInfoProps {
  label: string;
  value: string | number;
}

// constants
const IMAGE_WIDTH = 600;
const IMAGE_HEIGHT = 350;

const StarshipToolkit = () => {
  const { query } = useRouter();

  // api
  const { data, error, isLoading } = starshipsAPI.useGetStarshipQuery(query.id as string);

  const clientError = error && U.errors.parseRTKQAndCreateClientError(error);

  // data transformation
  const starshipInfo = React.useMemo<StarshipInfoProps[]>(() => {
    if (!data) {
      return [];
    }

    return [
      { label: 'Name', value: data.result.properties.name ?? 'N/A' },
      { label: 'Model', value: data.result.properties.model ?? 'N/A' },
      { label: 'Cost In Credits', value: data.result.properties.cost_in_credits ?? 'N/A' },
      {
        label: 'Hyperdrive Rating',
        value: data.result.properties.hyperdrive_rating ?? 'N/A'
      },
      { label: 'Passengers', value: data.result.properties.passengers ?? 'N/A' }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <ContentWrapper>
      <Wrapper>
        <ContentLoader isLoading={isLoading} error={clientError}>
          <ImgContainer>
            <Image
              alt='starship'
              layout='responsive'
              placeholder='blur'
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              src='/static/images/starship.jpg'
              blurDataURL='/static/images/starship.jpg'
            />
          </ImgContainer>
          <DetailsContainer>
            {data && <Name>{data.result.properties.name}</Name>}
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

export { StarshipToolkit };
