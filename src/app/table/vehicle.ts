export type Vehicle = {
  id: number;
  brand: string;
  model: string;
  year: number;
  plate: string;
  kilometers: number;
  status: 'available' | 'in-use' | 'maintenance';
};

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 1,
    brand: 'Fiat',
    model: 'Panda',
    year: 2021,
    plate: 'AB123CD',
    kilometers: 45000,
    status: 'available',
  },
  {
    id: 2,
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2020,
    plate: 'EF456GH',
    kilometers: 78000,
    status: 'in-use',
  },
  {
    id: 3,
    brand: 'Ford',
    model: 'Fiesta',
    year: 2019,
    plate: 'IJ789KL',
    kilometers: 92000,
    status: 'maintenance',
  },
  {
    id: 4,
    brand: 'Toyota',
    model: 'Yaris',
    year: 2022,
    plate: 'MN012OP',
    kilometers: 23000,
    status: 'available',
  },
  {
    id: 5,
    brand: 'Renault',
    model: 'Clio',
    year: 2021,
    plate: 'QR345ST',
    kilometers: 56000,
    status: 'in-use',
  },
  {
    id: 6,
    brand: 'Peugeot',
    model: '208',
    year: 2020,
    plate: 'UV678WX',
    kilometers: 67000,
    status: 'available',
  },
];
