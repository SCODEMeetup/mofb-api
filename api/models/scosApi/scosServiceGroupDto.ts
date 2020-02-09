import ScosPhoneDto from './ScosPhoneDto';

export default interface ScosServiceGroupDto {
  Email: string;
  ID: string;
  Name: string;
  Phones: ScosPhoneDto[];
  Program: string;
  SGText: string;
  ServiceSites: string[];
  URL: string;
}
