import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { GetStarshipsResponse, StarshipTechResponse } from '@md-shared/services/api/controllers';

export const starshipsAPI = createApi({
  reducerPath: 'starshipsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (build) => ({
    getStarships: build.query<GetStarshipsResponse, null>({
      query: () => ({ url: '/starships' })
    }),
    getStarship: build.query<StarshipTechResponse, string>({
      query: (id) => ({ url: `/starships/${id}` })
    })
  })
});
