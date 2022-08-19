import { Collection, Document, Filter, WithId } from 'mongodb';
import {
  $Country,
  $RemoteIndicator,
  GetJobFilters,
  GetJobRequest,
  GetJobResponse,
  Jobs,
  MongoFilter,
} from '../../models/jobs.interface';
import { collections } from './connection';

export class JobDatabase {
  protected _collection!: Collection;
  constructor() {
    if (collections.jobCollection) {
      this._collection = collections.jobCollection;
    }
  }

  async getJobs(request: GetJobRequest) {
    try {
      console.log(`JobDatabase.getJobs`, `Got request ${JSON.stringify(request)}`);
      const { page, ...filters } = request;
      const query = this.createQuery(filters);
      const searchAggregate = this.generateAggregate(query);

      const filter: Filter<Jobs> = {
        title: request.searchInput,
      };
      return (await this._collection.find(filter).toArray()) as WithId<Jobs>[];
    } catch (error) {
      console.log(error);
    }
  }

  protected createQuery(filters: GetJobFilters) {
    console.log(`JobDatabase.createQuery`, `Filters to process ${JSON.stringify(filters)}`);
    let generatedFilter: MongoFilter = {
      title: '',
      $remoteIndicator: [],
      remoteIndicator: undefined,
      salary: undefined,
      $country: [],
    };
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== undefined || filters[key] !== null || !filters[key]) {
        if (key === 'searchInput') {
          generatedFilter.title = filters[key];
        }
        if (key === 'remoteFilter') {
          if (filters.remoteFilter && filters.remoteFilter.length === 1) {
            const filter = filters.remoteFilter[0];
            generatedFilter.remoteIndicator = filter;
          } else if (filters.remoteFilter && filters.remoteFilter.length === 2) {
            generatedFilter.$remoteIndicator = [
              { remoteIndicator: filters.remoteFilter[0] },
              { remoteIndicator: filters.remoteFilter[1] },
            ];
          }
        }
        if (key === 'maxSalaryFilter') {
          if (filters.maxSalaryFilter !== undefined) {
            generatedFilter.salary = { $lt: filters.maxSalaryFilter };
          }
        }
        if (key === 'locationFilter') {
          if (filters.locationFilter?.length) {
            const locations: $Country[] = filters.locationFilter.map((country) => {
              return { country: country };
            });
            generatedFilter.$country = [...locations];
          }
        }
      }
    });

    for (const key of Object.keys(generatedFilter)) {
      if (generatedFilter[key] === undefined) {
        delete generatedFilter[key];
      }
    }

    console.log('JobDatabase.createQuery', `Generated query ${JSON.stringify(generatedFilter)}`);
    return generatedFilter;
  }

  generateAggregate(filters: MongoFilter): Document[] {
    let searchAggregate: Document[] = [];

    const { $country, $remoteIndicator, ...otherFilters } = filters;

    if ($country?.length && $remoteIndicator?.length) {
      searchAggregate = [
        {
          $match: {
            ...otherFilters,
            $or: [...$country],
          },
        },
        {
          $match: {
            $or: [...$remoteIndicator],
          },
        },
      ];
    } else if ($country && $country.length) {
      searchAggregate = [
        {
          $match: {
            ...otherFilters,
            $or: [...$country],
          },
        },
      ];
    } else if ($remoteIndicator && $remoteIndicator.length) {
      searchAggregate = [
        {
          $match: {
            ...otherFilters,
            $or: [...$remoteIndicator],
          },
        },
      ];
    } else {
      searchAggregate = [
        {
          $match: {
            ...otherFilters,
          },
        },
      ];
    }

    console.log('JobDatabase.generateAggregate', `Query ${JSON.stringify(searchAggregate)}`);

    return searchAggregate;
  }

  // async paginatedResponse(): GetJobResponse {}
}
