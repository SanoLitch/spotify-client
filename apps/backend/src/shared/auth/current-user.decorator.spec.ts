import { vi, describe, it, expect, beforeEach } from 'vitest';
import { createParamDecorator } from '@nestjs/common';

// Мокаем @nestjs/common для перехвата фабрики декоратора
vi.mock('@nestjs/common', async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    createParamDecorator: vi.fn(actual.createParamDecorator),
  };
});

describe('CurrentUser Decorator', () => {
  let decoratorFactory: (data: unknown, ctx: any) => any;

  beforeEach(async () => {
    // Импортируем декоратор ПОСЛЕ того, как vi.mock настроен.
    // Это заставит CurrentUser использовать наш замоканный createParamDecorator.
    await import('./current-user.decorator');
    
    // Извлекаем фабрику, переданную в createParamDecorator
    const calls = vi.mocked(createParamDecorator).mock.calls;
    // Находим вызов, который создал CurrentUser (обычно первый, но для надежности можем проверить контекст)
    decoratorFactory = calls[0][0];
  });

  it('должен извлекать user из запроса в ExecutionContext', () => {
    // Arrange
    const mockUser = { id: 'user-1', accessToken: 'token-123' };
    const mockRequest = { user: mockUser };
    
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    };

    // Act
    const result = decoratorFactory(undefined, mockContext);

    // Assert
    expect(result).toEqual(mockUser);
  });

  it('должен возвращать undefined, если user нет в запросе', () => {
    // Arrange
    const mockRequest = { user: undefined };
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    };

    // Act
    const result = decoratorFactory(undefined, mockContext);

    // Assert
    expect(result).toBeUndefined();
  });
});
