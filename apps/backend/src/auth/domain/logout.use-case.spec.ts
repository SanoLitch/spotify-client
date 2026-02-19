import { LogoutUseCase } from './logout.use-case';

describe('LogoutUseCase', () => {
  let logoutUseCase: LogoutUseCase;

  beforeEach(() => {
    logoutUseCase = new LogoutUseCase();
  });

  it('should execute logout successfully', async () => {
    /*
     * For now, logout might just be a placeholder if we use stateless JWTs,
     * or it might involve clearing a session/token in the repository.
     * Let's assume it completes successfully for now.
     */
    await expect(logoutUseCase.execute()).resolves.toBeUndefined();
  });
});
