import { FRESHTRAK_ZIP_URL, FRESHTRAK_AGENCY_URL } from '../utils/constants';
import freshtrakEventDto from '../models/freshtrakAPI/freshtrakEventDto';
import freshtrakLocationDto from '../models/freshtrakAPI/freshtrakLocationDto';
import { getFreshTrakEvents } from './freshtrakApiService';

async function getFTLocationData(
  siteId: string,
  zip: string
): Promise<freshtrakLocationDto> {
  // in memory map to link siteId to FreshTrak agency id
  // ToDo add linkage in FreshTrak Agencies endpoint
  const freshTrakAgencies = new Map();

  freshTrakAgencies.set(5013, 106);
  freshTrakAgencies.set(11481, 803);
  freshTrakAgencies.set(13452, 200);
  freshTrakAgencies.set(4205, 532);
  freshTrakAgencies.set(4863, 6);
  freshTrakAgencies.set(13796, 80);
  freshTrakAgencies.set(4985, 848);
  freshTrakAgencies.set(4556, 515);
  freshTrakAgencies.set(11844, 723);
  freshTrakAgencies.set(11937, 615);
  freshTrakAgencies.set(13742, 549);
  freshTrakAgencies.set(6003, 3537);
  freshTrakAgencies.set(13549, 508);
  freshTrakAgencies.set(5294, 849);
  freshTrakAgencies.set(11479, 502);
  freshTrakAgencies.set(10948, 606);
  freshTrakAgencies.set(14137, 3536);
  freshTrakAgencies.set(13978, 744);
  freshTrakAgencies.set(13919, 691);

  const freshTrakAgencyID = freshTrakAgencies.get(parseInt(siteId, 10));

  let agencyURL = '';
  let agencyName = '';
  let events: freshtrakEventDto[] | null = null;

  if (freshTrakAgencyID) {
    agencyURL = FRESHTRAK_AGENCY_URL + freshTrakAgencyID;
    const response = await getFreshTrakEvents(freshTrakAgencyID);
    if (response) {
      agencyName = response.agency.name;
      events = response.agency.events;
    }
  }
  return {
    zipURL: FRESHTRAK_ZIP_URL + zip,
    agencyURL,
    agencyName,
    events,
  };
}

export { getFTLocationData };
