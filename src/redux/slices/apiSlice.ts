import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { FetchingData, SortedUnion } from '../../types/FetchingData';
import { People } from '../../types/People';

const initialState: FetchingData = {
  baseUrl: 'https://swapi.dev/api/people',
  data: {
    next: '',
    previous: '',
    results: [],
  },
  filteredData: [],
  originalData: [],
  pageUrl: 'https://swapi.dev/api/people/?page=1',
  sortedData: [],
  status: 'pending',
};

export const fetchDataApi = createAsyncThunk('api/getData', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const { pageUrl } = (state as { apiSlice: FetchingData }).apiSlice;
  const response: FetchingData = await axios.get(pageUrl);
  return response.data;
});

const apiSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchDataApi.fulfilled, (state, { payload }) => {
      state.data.results = payload.results;
      state.data.previous = payload.previous;
      state.data.next = payload.next;
      state.originalData = payload.results;
      state.status = 'success';
    });
    builder.addCase(fetchDataApi.pending, (state) => {
      state.data.results = initialState.data.results;
      state.data.previous = initialState.data.previous;
      state.data.next = initialState.data.next;
      state.status = initialState.status;
    });
    builder.addCase(fetchDataApi.rejected, (state) => {
      state.data.results = initialState.data.results;
      state.data.previous = initialState.data.previous;
      state.data.next = initialState.data.next;
      state.status = 'error';
    });
  },
  initialState,
  name: 'ApiSlice',
  reducers: {
    changePage(state, { payload }: { payload: string }) {
      if (payload === 'next' && state.data.next !== null) {
        state.pageUrl = state.data.next;
      } else if (payload === 'previous' && state.data.previous) {
        state.pageUrl = state.data.previous;
      } else {
        state.pageUrl = state.baseUrl;
      }
    },
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

        state.data.results = filteredResults;
        state.filteredData = filteredResults;
      } else {
        if (state.sortedData.length > 0) {
          state.data.results = state.sortedData;
        } else if (payload.length === 0) {
          state.data.results = state.originalData;
        } else {
          state.data.results = state.filteredData;
        }

        state.filteredData = [];
      }
    },
    sort(state, { payload }: { payload: SortedUnion }) {
      const initialResults = state.filteredData.length !== 0
        ? state.filteredData
        : state.originalData;

      if (payload === '') {
        state.data.results = initialResults;

        state.sortedData = [];
      } else {
        const sortedResults = initialResults.slice().sort((a: People, b: People) => {
          const valueA = parseFloat(a[payload]);
          const valueB = parseFloat(b[payload]);

          if (Number.isNaN(valueA) || Number.isNaN(valueB)) {
            return a[payload].localeCompare(b[payload]);
          }
          return valueB - valueA;
        });

        if (state.filteredData.length >= 0) {
          state.data.results = sortedResults;
        } else {
          state.data.results = state.filteredData;
        }

        state.sortedData = sortedResults;
      }
    },
  },
});

export const { changePage, filter, sort } = apiSlice.actions;

export const selectData = (state: { apiSlice: FetchingData }) => state.apiSlice;

export default apiSlice.reducer;
