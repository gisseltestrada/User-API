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

export interface Login {
  email: string;
  password: string;
}

export interface NewUserRequest {
  email: string;
  password: string;
  profile:{
    name: string;
    dob: string;
    address: string;
  };
  occupancy: {
    title: string;
    company: string;
    salary: number;
    role: string;
  };
}

export interface UpdateRequest {
  _id: string;
  email?: string;
  password?: string;
  "profile.about"?: string;
  "profile.address"?: string;
  "occupancy.title"?: string;
  "occupancy.role"?: string;
  "occupancy.salary"?: number;
  "occupancy.company"?: string;
}
