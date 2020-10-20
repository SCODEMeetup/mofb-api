import request from 'request-promise';
import getLogger from '../utils/logger';
import { FRESHTRAK_API_HOST, FRESHTRAK_ZIP_URL, FRESHTRAK_AGENCY_URL, FRESHTRAK_UTM_PARAMS } from '../utils/constants';
import ScosAgencyDto from '../models/scosApi/scosAgencyDto';
import freshtrakEventDto from '../models/freshtrakApi/freshtrakEventDto';
import freshtrakLocationDto from '../models/freshtrakApi/freshtrakLocationDto';
import freshtrakResponseDto from '../models/freshtrakAPI/freshtrakResponseDto';

// in memory map to link site_id to FreshTrak agency id
// ToDo add linkage in FreshTrak Agencies endpoint
let freshTrakAgencies = new Map()

freshTrakAgencies.set(5013, 106)
freshTrakAgencies.set(11481,803)
freshTrakAgencies.set(13452, 200)
freshTrakAgencies.set(4205, 532)
freshTrakAgencies.set(4863, 6)
freshTrakAgencies.set(13796, 80)
freshTrakAgencies.set(4985, 848)
freshTrakAgencies.set(4556, 515)
freshTrakAgencies.set(11844, 723)
freshTrakAgencies.set(11937, 615)
freshTrakAgencies.set(13742, 549)
freshTrakAgencies.set(6003, 3537)
freshTrakAgencies.set(13549, 508)
freshTrakAgencies.set(5294, 849)
freshTrakAgencies.set(11479, 502)
freshTrakAgencies.set(10948, 606)


async function getFTLocationData(agency: ScosAgencyDto, zip: string) {
  if(agency.taxonomy.sub_category.includes('Emergency Food')) {
    const freshTrakAgencyID = freshTrakAgencies.get(parseInt(agency.site_id));
    var agencyURL = "";
    var agencyName = "";
    var events: freshtrakEventDto[] | null = null;
    
    if(freshTrakAgencyID) {
      agencyURL = FRESHTRAK_AGENCY_URL + freshTrakAgencyID + FRESHTRAK_UTM_PARAMS;
      const response: freshtrakResponseDto = await getFreshTrakEvents(freshTrakAgencyID);
      if(response)  {
        agencyName = response.agency.name;
        events = response.agency.events;
      }
    }
    const ftLocationData: freshtrakLocationDto = {
      zipURL: FRESHTRAK_ZIP_URL + zip + FRESHTRAK_UTM_PARAMS,
      agencyURL: agencyURL,
      agencyName: agencyName,
      events: events,
    }
    return(ftLocationData);
  }
}

const log = getLogger('freshtrakService');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getFreshTrakEvents(agencyId: any): Promise<any>{
  const opts = {
    headers: {
      'User-Agent': 'mofb-api',
    },
  };
  const url = `${FRESHTRAK_API_HOST}/api/agencies/${agencyId}`;

  log.debug(`Making GET request to ${url}`);

  try {
    const response = await request.get(url);
    return JSON.parse(response);
  } catch (err) {
    log.debug(`Error from FreshTrak API: ${err}`);
  }
}

export { getFTLocationData };
