import freshtrakLocationDto from '../freshtrakAPI/freshtrakLocationDto';

export default interface LocationDto {
  id: string;
  // eslint-disable-next-line camelcase
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
}
