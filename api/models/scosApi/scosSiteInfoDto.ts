import ScosServiceGroupDto from './scosServiceGroupDto';
import ScosSiteDto from './scosSiteDto';
import ScosServiceDto from './scosServiceDto';

export default interface ScosSiteInfoDto {
  DetailText: {
    Label: string;
    Text: string;
  }[];
  Documents: string[];
  Logos: string[];
  OtherLocations: string[];
  OtherServiceGroups: {
    ID: string;
    Name: string;
  }[];
  ServiceGroup: ScosServiceGroupDto[];
  Services: ScosServiceDto[];
  Site: ScosSiteDto[];
  SiteKey: string;
}
