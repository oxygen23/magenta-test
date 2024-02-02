import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

import { FetchingData, PayloadUnion } from '../../types/FetchingData';
import { People } from '../../types/People';

const initialState: FetchingData = {
  filteredData: [],
  originalData: [],
  results: [],
  sortedData: [],
  status: 'pending',
};

export const fetchDataApi = createAsyncThunk('api/getData', async () => {
  const response: FetchingData & { data: { results: [] } } = await axios.get('https://swapi.dev/api/people');
  return response.data;
});

const apiSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchDataApi.fulfilled, (state, { payload }) => {
      state.results = payload.results;
      state.originalData = payload.results;
      state.status = 'success';
    });
    builder.addCase(fetchDataApi.pending, (state) => {
      state.results = initialState.results;
      state.status = initialState.status;
    });
    builder.addCase(fetchDataApi.rejected, (state) => {
      state.results = initialState.results;
      state.status = initialState.status;
    });
  },
  initialState,
  name: 'ApiSlice',
  reducers: {
    filter(state, { payload }: { payload: string[] }) {
      if (payload.length > 0) {
        const initialResults = state.sortedData.length > 0 ? state.sortedData : state.originalData;

        const filteredResults = initialResults.filter((item: People) => {
          if (payload.includes('male') && item.gender !== 'male') {
            return false;
          }
          if (payload.includes('female') && item.gender !== 'female') {
            return false;
          }
          if (payload.includes('heightMore100') && Number(item.height) < 100) {
            return false;
          }
          if (payload.includes('heightLess100') && Number(item.height) > 100) {
            return false;
          }
          if (payload.includes('massMore50') && Number(item.mass) < 50) {
            return false;
          }
          if (payload.includes('massLess50') && Number(item.mass) > 50) {
            return false;
          }
          return true;
        });

        state.results = filteredResults;
        state.filteredData = filteredResults;
      } else {
        state.results = state.sortedData.length > 0 ? state.sortedData : state.originalData;
        state.filteredData = [];
        console.log('else');
      }
    },
    sort(state, { payload }: { payload: PayloadUnion }) {
      if (payload === '') {
        state.results = state.filteredData.length !== 0
          ? state.filteredData
          : state.originalData;

        state.sortedData = [];
      } else {
        const initialResults = state.filteredData.length !== 0
          ? state.filteredData
          : state.originalData;

        const sortedResults = initialResults.slice().sort((a: People, b: People) => {
          const valueA = parseFloat(a[payload]);
          const valueB = parseFloat(b[payload]);

          if (Number.isNaN(valueA) || Number.isNaN(valueB)) {
            return a[payload].localeCompare(b[payload]);
          }
          return valueB - valueA;
        });
        state.results = state.filteredData.length !== 0 || state.filteredData.length === 0
          ? sortedResults
          : state.filteredData;
        state.sortedData = sortedResults;
      }
    },
  },
});

export const { filter, sort } = apiSlice.actions;

export const selectData = (state: { apiSlice: FetchingData }) => state.apiSlice;

export default apiSlice.reducer;
