export interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  contact: string;
  specialties: string[];
}

const mockHospitals: Hospital[] = [
  {
    id: 'h1',
    name: 'City General Hospital',
    address: '123 Health Ave, Medical District',
    distance: '2.4 km',
    rating: 4.5,
    contact: '(555) 123-4567',
    specialties: ['Endocrinology', 'General Medicine']
  },
  {
    id: 'h2',
    name: 'Metropolitan Diabetes Center',
    address: '456 Wellness Blvd, Downtown',
    distance: '5.1 km',
    rating: 4.8,
    contact: '(555) 987-6543',
    specialties: ['Specialized Diabetes Care', 'Dietetics']
  },
  {
    id: 'h3',
    name: 'Suburban Community Clinic',
    address: '789 Care Lane, Suburbia',
    distance: '8.3 km',
    rating: 4.2,
    contact: '(555) 456-7890',
    specialties: ['Family Medicine', 'Primary Care']
  }
];

export const getRecommendedHospitals = async (): Promise<Hospital[]> => {
  // Simulate network request to location/hospital API
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, we'd use geolocation navigator.geolocation.getCurrentPosition
      // and fetch nearby hospitals from an API like Google Places or Medicare
      resolve(mockHospitals);
    }, 1500);
  });
};
