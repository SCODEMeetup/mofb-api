import freshtrakLocationDto from '../freshtrakAPI/freshtrakLocationDto';

export default interface LocationDto {
  /* eslint-disable camelcase */
  id: string;
  provider_id: string;
  address1: string;
  address2: string;
  zipCode: string;
  name: string;
  phones: string[];
  handicapAccessFlag: 'Y' | 'N';
  hours: string;
  lat: string;
  long: string;
  freshtrakData: freshtrakLocationDto | null;
  /* eslint-disable camelcase */
}
