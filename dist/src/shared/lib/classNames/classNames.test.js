import { classNames } from './classNames';
describe('classNames', function () {
    test('with only first params', function () {
        expect(classNames('classA')).toBe('classA');
    });
    test('with additional class params', function () {
        var expected = 'main classA classB';
        expect(classNames('main', {}, ['classA classB'])).toBe(expected);
    });
    test('with only true mods', function () {
        var expected = 'main classA classB hovered scrollable';
        expect(classNames('main', { hovered: true, scrollable: true }, ['classA classB']))
            .toBe(expected);
    });
    test('with true and false mods', function () {
        var expected = 'main classA classB hovered';
        expect(classNames('main', { hovered: true, scrollable: false }, ['classA classB'])).toBe(expected);
    });
    test('with only false mods', function () {
        var expected = 'main classA classB';
        var actual = classNames('main', { hovered: false, scrollable: false }, ['classA classB']);
        expect(actual).toBe(expected);
    });
    test('with undefined mods', function () {
        var expected = 'main classA classB hovered';
        expect(classNames('main', { hovered: true, scrollable: undefined }, ['classA classB'])).toBe(expected);
    });
});
