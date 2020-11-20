import getLogger from '../utils/logger';
import { FRESHTRAK_API_HOST, FRESHTRAK_ZIP_URL, FRESHTRAK_AGENCY_URL } from '../utils/constants';
import freshtrakEventDto from '../models/freshtrakAPI/freshtrakEventDto';
import freshtrakLocationDto from '../models/freshtrakAPI/freshtrakLocationDto';
import freshtrakResponseDto from '../models/freshtrakAPI/freshtrakResponseDto';
import { getFreshTrakEvents } from './freshtrakApiService'

const log = getLogger('freshtrakService');

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

async function getFTLocationData(site_id: string, zip: string): Promise<freshtrakLocationDto> {
  const freshTrakAgencyID = freshTrakAgencies.get(parseInt(site_id));
  var agencyURL = "";
  var agencyName = "";
  var events: freshtrakEventDto[] | null = null;
  
  if(freshTrakAgencyID) {
    agencyURL = FRESHTRAK_AGENCY_URL + freshTrakAgencyID;
    //const response: freshtrakResponseDto | null = await getFreshTrakEvents(freshTrakAgencyID);
    const response = await getFreshTrakEvents(freshTrakAgencyID);
    if(response)  {
      agencyName = response.agency.name;
      events = response.agency.events;
    }
  }
  const ftLocationData: freshtrakLocationDto = {
    zipURL: FRESHTRAK_ZIP_URL + zip,
    agencyURL: agencyURL,
    agencyName: agencyName,
    events: events,
  }
  return(ftLocationData);
}

export { getFTLocationData };
