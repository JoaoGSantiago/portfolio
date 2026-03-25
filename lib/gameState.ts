let _snakeUnlocked = false;

export const isSnakeUnlocked = (): boolean => _snakeUnlocked;
export const unlockSnake     = (): void    => { _snakeUnlocked = true; };
