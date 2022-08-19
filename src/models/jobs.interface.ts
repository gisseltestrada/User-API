import { Document, WithId } from 'mongodb';

export interface Jobs extends WithId<Document> {
  city: string;
  role: string;
  state: string;
  title: string;
  salary: number;
  company: string;
  country: string;
  createdAt: string;
  topSkills: string[];
  remoteIndicator: string;
  fullTimeIndicator: string;
}

export interface GetJobResponse {
  content: Jobs[];
  pagination: Pagination;
}

export interface Pagination {
  firstPage: boolean;
  lastPage: boolean;
  currentPage: number;
  previousPage: number;
  nextPage: number;
  totalPages: number;
  hasNextpage: boolean;
  hasPreviousPage: boolean;
  totalElements: number;
  pageSize: number;
}

export interface Page {
  skip: number;
  pageSize: number;
}

export interface GetJobRequest {
  searchInput: string;
  remoteFilter?: string[];
  maxSalaryFilter?: number;
  locationFilter?: string[];
  page: Page;
}

export interface GetJobFilters {
  searchInput: string;
  remoteFilter?: string[];
  maxSalaryFilter?: number;
  locationFilter?: string[];
}

export interface MongoFilter {
  title: string;
  $remoteIndicator?: $RemoteIndicator[];
  remoteIndicator?: string;
  salary?: $Salary;
  $country?: $Country[];
}

export interface $RemoteIndicator {
  remoteIndicator: string;
}
export interface $Salary {
  $lt: number;
}

export interface $Country {
  country: string;
}
