interface User {
  email: string;
  profile: Profile;
  password: string;
  createdAt: string;
  occupancy: Occupancy;
  updatedAt: string;
}

interface Profile {
  dob: string;
  name: string;
  about: string;
  address: string;
  location: {
    lat: number;
    long: number;
  };
  countyOfOrigin: string;
}

interface Occupancy {
  role: string[];
  title: string;
  salary: string;
  company: string;
}
