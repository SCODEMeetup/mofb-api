import FreshtrakEventDto from './freshtrakEventDto';

export default interface FreshtrakLocationDto {
  zipURL: string;
  agencyURL: string;
  agencyName: string;
  events: FreshtrakEventDto[] | null;
}
