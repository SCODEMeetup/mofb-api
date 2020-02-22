import ScosAddressDto from './scosAddressDto';
import ScosPhoneDto from './ScosPhoneDto';

export default interface ScosSiteDto {
  address: ScosAddressDto[];
  distance: string;
  email: string;
  latitude: number;
  longitude: number;
  name: string;
  stgphones: ScosPhoneDto[];
  stphones: ScosPhoneDto[];
  sttext: string;
  url: string;
}
