import ScosPhoneDto from './ScosPhoneDto';

export default interface ScosServiceDto {
  Email: string;
  Filters: string;
  ID: string;
  Name: string;
  Note1: string;
  Note2: string;
  Phones: ScosPhoneDto[];
  Refer: string;
  URL: string;
}
