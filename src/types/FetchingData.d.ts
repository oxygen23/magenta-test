export interface FetchingData {
  baseUrl: string
  data: {
    next: ''
    previous: ''
    results: People[];
  }
  filteredData: People[],
  originalData: People[];
  pageUrl: string;
  sortedData: People[];
  status: 'error' | 'pending' | 'success';
}

export type SortedUnion = '' | 'birth_year' | 'created' | 'edited' | 'eye_color' | 'gender' | 'hair_color' | 'height' | 'mass' | 'name' | 'skin_color';
