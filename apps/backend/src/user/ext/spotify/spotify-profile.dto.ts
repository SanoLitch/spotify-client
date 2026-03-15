export interface SpotifyProfileDto {
  id: string;
  display_name: string;
  email: string;
  images?: {
    url: string;
    height?: number;
    width?: number;
  }[];
}
