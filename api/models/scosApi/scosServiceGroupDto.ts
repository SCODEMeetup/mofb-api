import ScosPhoneDto from './ScosPhoneDto';

export default interface ScosServiceGroupDto {
  email: string;
  id: string;
  name: string;
  phones: ScosPhoneDto[];
  program: string;
  sgtext: string;
  servicesites: string[];
  url: string;
}
