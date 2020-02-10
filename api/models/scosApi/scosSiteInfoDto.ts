import ScosServiceGroupDto from './scosServiceGroupDto';
import ScosSiteDto from './scosSiteDto';
import ScosServiceDto from './scosServiceDto';

export default interface ScosSiteInfoDto {
  detailtext: {
    // Note: this isn't necessarily an extensive list
    label:
      | 'Service Description'
      | 'Eligibility'
      | 'Hours'
      | 'Intake Process'
      | 'Documents'
      | 'Fees'
      | 'Notes'
      | 'Additional Languages'
      | 'Additional Languages Served';
    text: string;
  }[];
  documents: string[];
  logos: string[];
  otherlocations: string[];
  otherservicegroups: {
    id: string;
    name: string;
  }[];
  servicegroup: ScosServiceGroupDto[];
  services: ScosServiceDto[];
  site: ScosSiteDto[];
  sitekey: string;
}
