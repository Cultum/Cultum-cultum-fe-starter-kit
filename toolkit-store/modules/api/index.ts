import { combineReducers } from '@reduxjs/toolkit';
// local
import * as planets from '../api/planets';

export type APIReducers = {
  planets: planets.PlanetsAPIReducers;
};

export const apiReducers = combineReducers<APIReducers>({
  planets: planets.planetsReducers
});

export { planets };
