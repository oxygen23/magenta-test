export interface FetchingData {
  filteredData: People[],
  originalData: People[];
  results: People[];
  sortedData: People[]
  status: 'error' | 'pending' | 'success';
}

export type PayloadUnion = '' | 'birth_year' | 'created' | 'edited' | 'eye_color' | 'gender' | 'hair_color' | 'height' | 'mass' | 'name' | 'skin_color';
