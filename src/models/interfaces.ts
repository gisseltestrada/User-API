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
  profile: ProfileRequest;
  occupancy: OccupancyRequest;
}

export interface OccupancyRequest {
  title: string;
  company: string;
  salary: number;
  role: string;
}
export interface ProfileRequest {
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
}

export interface NewUser {
  email: string;
  password: string;
  profile: {
    name: string;
    dob: string;
    address: string;
  };
  occupancy: OccupancyRequest;
}

export interface UpdateRequest {
  _id: string;
  email?: string;
  password?: string;
  'profile.about'?: string;
  'profile.address'?: string;
  'occupancy.title'?: string;
  'occupancy.role'?: string;
  'occupancy.salary'?: number;
  'occupancy.company'?: string;
  'occupancy.location'?: string;
  skill1?: string;
  skill2?: string;
  skill3?: string;
  skill4?: string;
  skill5?: string;
  skills?: Skills;
  currentSkills?: Skills;
}

export interface Skills {
  skill1?: string | undefined;
  skill2?: string | undefined;
  skill3?: string | undefined;
  skill4?: string | undefined;
  skill5?: string | undefined;
}

export interface EditForm {
  _id: string;
  'profile.name': string | undefined;
  email: string | undefined;
  password: string | undefined;
  'profile.dob': string | undefined;
  'profile.about': string | undefined;
  'profile.address': string | undefined;
  'occupancy.title': string | undefined;
  role: string | undefined;
  'occupancy.salary': number | undefined;
  'occupancy.company': string | undefined;
  'occupancy.location': string | undefined;
  city: string | undefined;
  experience: number | undefined;
  phone: number | undefined;
  site: string | undefined;
  gender: string | undefined;
  pronouns: string | undefined;
  skills: Skills | undefined;
  skill1: string | undefined;
  skill2: string | undefined;
  skill3: string | undefined;
  skill4: string | undefined;
  skill5: string | undefined;
  'previous.prevcompany': string | undefined;
  'previous.prevlocation': string | undefined;
  'previous.prevsalary': number | undefined;
  skillsArr: [] | undefined;
}
const INIT_FORM: Partial<EditForm> = {
  'profile.name': undefined,
  email: undefined,
  password: undefined,
  'profile.dob': undefined,
  'profile.about': undefined,
  'profile.address': undefined,
  'occupancy.title': undefined,
  role: undefined,
  'occupancy.salary': undefined,
  'occupancy.company': undefined,
  'occupancy.location': undefined,
  city: undefined,
  experience: undefined,
  phone: undefined,
  site: undefined,
  gender: undefined,
  pronouns: undefined,
  skills: undefined,
  skill1: undefined,
  skill2: undefined,
  skill3: undefined,
  skill4: undefined,
  skill5: undefined,
  'previous.prevcompany': undefined,
  'previous.prevlocation': undefined,
  'previous.prevsalary': undefined,
  skillsArr: undefined,
};
