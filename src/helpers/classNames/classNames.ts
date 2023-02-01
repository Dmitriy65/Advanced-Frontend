type Mods = Record<string, boolean | string>

export function classNames(mainCls: string, mods: Mods, additionalCls: string[]): string {
    const modsCls =
        Object.entries(mods || {})
            .filter(([_, value]) => Boolean(value))
            .map(([className]) => className);

    return [
        mainCls,
        ...additionalCls,
        ...modsCls
    ].join(' ');
}
