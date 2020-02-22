import { makeSCOSRequest } from './scosService';
import getLogger from '../utils/logger';
import { AGENCIES_TABLE } from '../utils/constants';
import LocationDto from '../models/dto/locationDto';
import ScosAgencyDto from '../models/scosApi/scosAgencyDto';
import { notEmpty } from '../utils/typeGuards';

const log = getLogger('locationService');

function mapToLocationDto(agency: ScosAgencyDto): LocationDto | null {
  // "Site" is an array of 1 element
  const site = agency.site_info.site[0];

  if (!site) {
    // there's no location data
    return null;
  }

  // as far as I can tell, "Address" has 2 elements but the second is a throwaway
  const address = site.address[0];
  const address1 = address.line1;
  const address2 = `${address.line2} ${address.line3}`.trim();

  // not sure the difference between "st" vs "stg" phones
  // so we'll just pick the first one that exists
  const phoneList = [...site.stgphones, ...site.stphones];
  const phoneNumber = phoneList[0]?.phone ?? '';

  const hours =
    agency.site_info.detailtext.find(x => x.label === 'Hours')?.text ?? '';

  // TODO: this doesn't exist on this dataset: defaulting to no so we don't have false positives
  const handicapAccessFlag = 'N';

  return {
    id: agency.site_id,
    address1,
    address2,
    zipCode: address.zip,
    name: site.name,
    areaCode: '',
    phoneNumber,
    phoneExtension: '',
    handicapAccessFlag,
    hours,
    lat: `${site.latitude}`,
    long: `${site.longitude}`,
  };
}

async function getLocations(
  taxonomyId: string,
  limit: number,
  pageNumber: number
): Promise<LocationDto[]> {
  log.debug(
    `Getting locations by taxonomy id: ${taxonomyId}; limit: ${limit}; pageNumber: ${pageNumber}`
  );

  const query = `
    SELECT * FROM ${AGENCIES_TABLE}
    WHERE taxonomy.category = '${taxonomyId}'
    OR taxonomy.sub_category = '${taxonomyId}' 
    LIMIT ${limit}`;
  const response: ScosAgencyDto[] = await makeSCOSRequest(query);

  return response.map(mapToLocationDto).filter(notEmpty);
}

export { getLocations };
