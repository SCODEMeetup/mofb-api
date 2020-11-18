import { uniq } from 'lodash';
import { makeSCOSRequest } from './scosService';
import getLogger from '../utils/logger';
import { AGENCIES_TABLE, CATEGORIES_TABLE }
  from '../utils/constants';
import LocationDto from '../models/dto/locationDto';
import ScosAgencyDto from '../models/scosApi/scosAgencyDto';
import { notEmpty } from '../utils/typeGuards';
import { getFTLocationData } from './freshtrakService';
import freshtrakLocationDto from '../models/freshtrakAPI/freshtrakLocationDto';

const log = getLogger('locationService');

async function mapToLocationDto(agency: ScosAgencyDto): Promise<LocationDto | null> {
  // "Site" is an array of 1 element
  const [site] = agency.site_info.site;

  if (!site) {
    // there's no location data
    return null;
  }

  // as far as I can tell, "Address" has 2 elements but the second is a throwaway
  const [address] = site.address;
  const address1 = address.line1;
  const address2 = `${address.line2} ${address.line3}`.trim();

  // not sure the difference between "st" vs "stg" phones
  // so we'll just show them all
  const phoneList = [...site.stgphones, ...site.stphones];
  const phones = uniq(phoneList.map(p => p.phone));

  const hours =
    agency.site_info.detailtext.find(x => x.label === 'Hours')?.text || '';

  // TODO: find out how we can determine if locations have handicap access
  const handicapAccessFlag = 'N';

  // retrieve FreshTrak data if sub_category is 'Emergency Food'
  var freshtrakData: freshtrakLocationDto | null;
  if(agency.taxonomy.sub_category.includes('Emergency Food'))
    freshtrakData = await getFTLocationData(agency.site_id, address.zip);
  else
    freshtrakData = null;
  

  return {
    id: agency.site_id,
    provider_id: agency.provider_id,
    address1,
    address2,
    zipCode: address.zip,
    name: site.name,
    phones,
    handicapAccessFlag,
    hours,
    lat: `${site.latitude}`,
    long: `${site.longitude}`,
    freshtrakData,
  };
}

async function getLocations(
  taxonomyIds: string[],
  limit: number,
  pageNumber: number
): Promise<LocationDto[]> {
  log.debug(
    `Getting locations by taxonomy ids: ${taxonomyIds}; limit: ${limit}; pageNumber: ${pageNumber}`
  );

  const categories = taxonomyIds.map(t => `'${t}'`).join(', ');

  const query = `
  SELECT DISTINCT a.* FROM 
    ${AGENCIES_TABLE} a 
    JOIN ${CATEGORIES_TABLE} c ON a.taxonomy.category = c.category 
    CROSS JOIN UNNEST(c.subcat) AS subcat
  WHERE
    a.taxonomy.sub_category = subcat.subcategory AND
    (
      c.categoryid IN (${categories}) OR
      subcat.subcategoryid IN (${categories})
    )
  LIMIT ${limit}`;

  const response = await makeSCOSRequest<ScosAgencyDto[]>(query);
  const promises = response.map(mapToLocationDto);
  const mapped = await Promise.all(promises);
  const filtered = mapped.filter(notEmpty);
  log.debug(`Returning ${filtered.length} locations`);
  return filtered;
}

export { getLocations };
