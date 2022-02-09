import { combineReducers } from '@reduxjs/toolkit';
// local
import * as getPlanet from './get-planet';
import * as getPlanets from './get-planets';

export type PlanetsAPIReducers = {
  getPlanet: getPlanet.InitialState;
  getPlanets: getPlanets.InitialState;
};

export const planetsReducers = combineReducers<PlanetsAPIReducers>({
  getPlanet: getPlanet.slice.reducer,
  getPlanets: getPlanets.slice.reducer
});

export { getPlanet, getPlanets };
