
export function addToFrequency<T>(key: T, value: number, map: Map<T, number>): void {
    map.set(key, (map.get(key) || 0) + value);
}

export function subtractFromFrequency<T>(key: T, value: number, map: Map<T, number>): void {
    const total = (map.get(key) || 0) - value;
    if (total <= 0) {
        map.delete(key);
    } else {
        map.set(key, total);
    }
}