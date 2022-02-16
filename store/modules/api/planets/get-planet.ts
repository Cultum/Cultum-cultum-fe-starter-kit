import {
  ClientError,
  clientError,
  RequestError,
  ClientSuccess,
  clientSuccess,
  getRequestError
} from '@md-shared/services/api/helpers';
import { createAction, ThunkAction } from '@md-store/helpers';
import { PlanetTechResponse, PlanetTechResponseResult } from '@md-shared/services/api/controllers/planets';

/* ------------- Types ------------- */

export const GET_PLANET_LOADING = '@planet/GET_PLANET_LOADING';
export const GET_PLANET_ERROR = '@planet/GET_PLANET_ERROR';
export const GET_PLANET_SUCCESS = '@planet/GET_PLANET_SUCCESS';

/* ------------- Types and Action Creators ------------- */

export const setGetPlanetLoadingAction = createAction<typeof GET_PLANET_LOADING, boolean>(GET_PLANET_LOADING);

export type SetGetPlanetLoadingAction = ReturnType<typeof setGetPlanetLoadingAction>;

export const setGetPlanetErrorAction = createAction<typeof GET_PLANET_ERROR, string>(GET_PLANET_ERROR);

export type SetGetPlanetErrorAction = ReturnType<typeof setGetPlanetErrorAction>;

export const setGetPlanetSuccessAction = createAction<typeof GET_PLANET_SUCCESS, PlanetTechResponseResult>(
  GET_PLANET_SUCCESS
);

export type SetGetPlanetSuccessAction = ReturnType<typeof setGetPlanetSuccessAction>;

type Actions = SetGetPlanetLoadingAction | SetGetPlanetErrorAction | SetGetPlanetSuccessAction;

/* ------------- Initial State ------------- */

export type InitialState = {
  loading: boolean;
  error: null | string;
  data: PlanetTechResponseResult | null;
};

export const INITIAL_STATE: InitialState = {
  loading: false,
  error: null,
  data: null
};

/* ------------- Thunks ------------- */

export type GetPlanetThunk = (
  id: string
) => ThunkAction<
  typeof GET_PLANET_LOADING | typeof GET_PLANET_ERROR | typeof GET_PLANET_SUCCESS,
  Promise<ClientSuccess<PlanetTechResponse> | ClientError<RequestError>>
>;

export const performAPIGetPlanet: GetPlanetThunk = (id) => async (dispatch, getState, createApi) => {
  const api = createApi();

  try {
    dispatch(setGetPlanetLoadingAction(true));

    const { data } = await api.getPlanet(id);

    dispatch(setGetPlanetSuccessAction(data?.result));

    return clientSuccess(data);
  } catch (error: any) {
    const errorMap = getRequestError(error);

    dispatch(setGetPlanetErrorAction(error.message));

    return clientError(errorMap);
  } finally {
    dispatch(setGetPlanetLoadingAction(false));
  }
};

/* ------------- Hookup Reducers To Types ------------- */

export function reducer(state = INITIAL_STATE, action: Actions): InitialState {
  switch (action.type) {
    case GET_PLANET_SUCCESS:
      return {
        ...state,
        data: action.payload || null,
        error: null
      };
    case GET_PLANET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case GET_PLANET_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
