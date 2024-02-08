import { left, right } from '@shared/either';
describe('Either', () => {
  // Tests the left function
  it('test_left_function', () => {
    const result = left('Error');
    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBe('Error');
  });

  // Tests the right function
  it('test_right_function', () => {
    const result = right('some valid value');
    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toEqual('some valid value');
  });
});
