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

export interface SpotifyTokenResponseDto {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}
