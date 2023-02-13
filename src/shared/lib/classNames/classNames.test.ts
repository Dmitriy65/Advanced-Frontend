import { classNames } from 'shared/lib/classNames/classNames';

describe('classNames', () => {
    test('with only first params', () => {
        expect(classNames('classA')).toBe('classA');
    });

    test('with additional class params', () => {
        const expected = 'main classA classB';
        expect(classNames('main', {}, ['classA classB'])).toBe(expected);
    });

    test('with only true mods', () => {
        const expected = 'main classA classB hovered scrollable';
        expect(classNames(
            'main',
            { hovered: true, scrollable: true },
            ['classA classB'],
        ))
            .toBe(expected);
    });

    test('with true and false mods', () => {
        const expected = 'main classA classB hovered';
        expect(classNames(
            'main',
            { hovered: true, scrollable: false },
            ['classA classB'],
        )).toBe(expected);
    });

    test('with only false mods', () => {
        const expected = 'main classA classB';
        const actual = classNames(
            'main',
            { hovered: false, scrollable: false },
            ['classA classB'],
        );
        expect(actual).toBe(expected);
    });

    test('with undefined mods', () => {
        const expected = 'main classA classB hovered';
        expect(classNames(
            'main',
            { hovered: true, scrollable: undefined },
            ['classA classB'],
        )).toBe(expected);
    });
});
