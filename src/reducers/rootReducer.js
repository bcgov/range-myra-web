//
// MyRA
//
// Copyright © 2018 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Created by Kyubin Han.
//

import { combineReducers } from 'redux';
import * as reducerTypes from '../constants/reducerTypes';
import { SIGN_OUT } from '../constants/actionTypes';
import agreementReducer, * as fromAgreement from './agreementReducer';
import networkReducer, * as fromNetwork from './networkReducer';
import authReducer, * as fromAuth from './authReducer';
import planReducer, * as fromPlan from './planReducer';
import commonStoreReducer, * as fromCommonStore from './commonStoreReducer';
import clientReducer, * as fromClient from './clientReducer';

// const createReduce
// createReducer to allow for reducer reuse
const createReducer = (reducer, name) => (state, action) => {
  if (name !== action.name && state !== undefined) {
    return state;
  }
  return reducer(state, action);
};

const appReducer = combineReducers({
  [reducerTypes.AUTH]: authReducer,
  [reducerTypes.AGREEMENTS]: agreementReducer,
  [reducerTypes.PLAN]: planReducer,
  [reducerTypes.COMMON]: commonStoreReducer,
  [reducerTypes.CLIENT]: clientReducer,
  [reducerTypes.SEARCH_AGREEMENTS]: createReducer(networkReducer, reducerTypes.SEARCH_AGREEMENTS),
  [reducerTypes.GET_PLAN]: createReducer(networkReducer, reducerTypes.GET_PLAN),
  [reducerTypes.UPDATE_USER_ID_OF_ZONE]: createReducer(networkReducer, reducerTypes.UPDATE_USER_ID_OF_ZONE),
  [reducerTypes.SEARCH_CLIENTS]: createReducer(networkReducer, reducerTypes.SEARCH_CLIENTS),
  [reducerTypes.UPDATE_PLAN_STATUS]: createReducer(networkReducer, reducerTypes.UPDATE_PLAN_STATUS),
});

// public selectors
export const getAgreements = state => fromAgreement.getAgreements(state[reducerTypes.AGREEMENTS]);
export const getAgreementIds = state => fromAgreement.getAgreementIds(state[reducerTypes.AGREEMENTS]);
export const getAgreementsMap = state => fromAgreement.getAgreementsMap(state[reducerTypes.AGREEMENTS]);
export const getAgreementsPagination = state => fromNetwork.getPagination(state[reducerTypes.SEARCH_AGREEMENTS]);
export const getAgreementsIsFetching = state => fromNetwork.getIsFetching(state[reducerTypes.SEARCH_AGREEMENTS]);
export const getAgreementsErrorMessage = state => fromNetwork.getErrorMessage(state[reducerTypes.SEARCH_AGREEMENTS]);

export const getAuthData = state => fromAuth.getAuthData(state[reducerTypes.AUTH]);
export const getUser = state => fromAuth.getUser(state[reducerTypes.AUTH]);
export const getToken = state => fromAuth.getToken(state[reducerTypes.AUTH]);

export const getZones = state => fromCommonStore.getZones(state[reducerTypes.COMMON]);
export const getZonesMap = state => fromCommonStore.getZonesMap(state[reducerTypes.COMMON]);
export const getReferences = state => fromCommonStore.getReferences(state[reducerTypes.COMMON]);
export const getUsers = state => fromCommonStore.getUsers(state[reducerTypes.COMMON]);
export const getUsersMap = state => fromCommonStore.getUsersMap(state[reducerTypes.COMMON]);
export const getUserIdOfZoneIsUpdating = state => fromNetwork.getIsFetching(state[reducerTypes.UPDATE_USER_ID_OF_ZONE]);

export const getClients = state => fromClient.getClients(state[reducerTypes.CLIENT]);
export const getClientsMap = state => fromClient.getClientsMap(state[reducerTypes.CLIENT]);
export const getClientsIsFetching = state => fromNetwork.getIsFetching(state[reducerTypes.SEARCH_CLIENTS]);

export const getPlansMap = state => fromPlan.getPlansMap(state[reducerTypes.PLAN]);
export const getPlanIds = state => fromPlan.getPlanIds(state[reducerTypes.PLAN]);
export const getPlanIsFetching = state => fromNetwork.getIsFetching(state[reducerTypes.GET_PLAN]);
export const getPlanErrorMessage = state => fromNetwork.getErrorMessage(state[reducerTypes.GET_PLAN]);
export const getPasturesMap = state => fromPlan.getPasturesMap(state[reducerTypes.PLAN]);
export const getGrazingSchedulesMap = state => fromPlan.getGrazingSchedulesMap(state[reducerTypes.PLAN]);
// export const getGrazingScheduleEntriesMap = state => fromPlan.getGrazingScheduleEntriesMap(state[reducerTypes.PLAN]);
export const getMinisterIssuesMap = state => fromPlan.getMinisterIssuesMap(state[reducerTypes.PLAN]);

const rootReducer = (state, action) => {
  // reset the state of a Redux store when users sign out
  if (action.type === SIGN_OUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
export default rootReducer;
