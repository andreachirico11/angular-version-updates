export interface ListItem {
  id: number;
  title: string;
  description: string;
  active: boolean;
}

export const MOCK_DATA: ListItem[] = [
  {
    id: 1,
    title: 'Primo elemento',
    description: 'Descrizione del primo elemento della lista',
    active: true,
  },
  {
    id: 2,
    title: 'Secondo elemento',
    description: 'Descrizione del secondo elemento della lista',
    active: false,
  },
  {
    id: 3,
    title: 'Terzo elemento',
    description: 'Descrizione del terzo elemento della lista',
    active: true,
  },
];
