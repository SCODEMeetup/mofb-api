import freshtrakResponseDto from "./freshtrakResponseDto";
import freshtrakEventDto from "./freshtrakEventDto";

export default interface freshtrakLocationDto {

  zipURL: string;
  agencyURL: string;
  agencyName: string;
  events: freshtrakEventDto[] | null;
}