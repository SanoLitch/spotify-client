import { Readable } from 'stream';
import { StreamTrackUseCase } from './stream-track.use-case';
import { StreamingPort } from './streaming.port';

describe('StreamTrackUseCase', () => {
  let useCase: StreamTrackUseCase;
  let streamingPort: jest.Mocked<StreamingPort>;

  beforeEach(() => {
    streamingPort = {
      getTrackStream: jest.fn(),
    };
    useCase = new StreamTrackUseCase(streamingPort);
  });

  it('should request a track stream from the port', async () => {
    const trackId = '123';
    const token = '123';
    const mockStream = new Readable();

    streamingPort.getTrackStream.mockResolvedValue(mockStream);

    const result = await useCase.execute(trackId, token);

    expect(streamingPort.getTrackStream).toHaveBeenCalledWith(trackId, token);
    expect(result).toBe(mockStream);
  });
});
