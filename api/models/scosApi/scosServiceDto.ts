import ScosPhoneDto from './ScosPhoneDto';

export default interface ScosServiceDto {
  email: string;
  filters: string;
  id: string;
  name: string;
  note1: string;
  note2: string;
  phones: ScosPhoneDto[];
  refer: string;
  url: string;
}
