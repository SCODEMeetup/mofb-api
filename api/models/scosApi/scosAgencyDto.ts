import ScosSiteInfoDto from './scosSiteInfoDto';
import { ScosTaxonomyDto } from './scosTaxonomyDto';

/* eslint-disable camelcase */
export default interface ScosAgencyDto {
  provider_id: string;
  provider_name: string;
  service_id: string;
  site_id: string;
  site_info: ScosSiteInfoDto;
  taxonomy: ScosTaxonomyDto;
}
/* eslint-enable camelcase */
