import ScosAddressDto from './scosAddressDto';
import ScosPhoneDto from './ScosPhoneDto';

export default interface ScosSiteDto {
  Address: ScosAddressDto;
  Distance: string;
  Email: string;
  Latitude: number;
  Longitude: number;
  Name: string;
  STGPhones: ScosPhoneDto;
  STPhones: ScosPhoneDto;
  STText: string;
  URL: string;
}
