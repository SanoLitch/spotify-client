import { Mocked } from 'vitest';
import { Readable } from 'stream';
import { StreamTrackCase } from './stream-track.case';
import { StreamingPort } from './ext/streaming.port';

describe('StreamTrackCase', () => {
  let useCase: StreamTrackCase;
  let streamingPort: Mocked<StreamingPort>;

  beforeEach(() => {
    streamingPort = {
      getTrackStream: vi.fn(),
    } as any;
    useCase = new StreamTrackCase(streamingPort);
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
