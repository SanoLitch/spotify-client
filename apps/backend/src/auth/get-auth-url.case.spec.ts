import { GetAuthUrlUseCase } from './get-auth-url.case';
import { AuthPort } from './ext/spotify/auth.port';

describe('GetAuthUrlUseCase', () => {
  let useCase: GetAuthUrlUseCase;
  let authPort: jest.Mocked<AuthPort>;

  beforeEach(() => {
    authPort = {
      getAuthUrl: jest.fn(),
    } as unknown as jest.Mocked<AuthPort>;
    useCase = new GetAuthUrlUseCase(authPort);
  });

  it('should return auth url from port', () => {
    const mockUrl = 'https://spotify.com/auth';

    authPort.getAuthUrl.mockReturnValue(mockUrl);

    const result = useCase.execute();

    expect(result).toBe(mockUrl);
    expect(authPort.getAuthUrl).toHaveBeenCalled();
  });
});
