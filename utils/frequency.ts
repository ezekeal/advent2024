export class Frequencies<T> {
    private readonly data: Map<T, number>;

    constructor(input: T[]) {
        this.data = new Map();
        for( const item of input ) {
            this.increment(item)
        }
    }

    increment(key: T): void {
        this.data.set(key, this.data.get(key) || 0 + 1);
    }

    decrement(key: T): void {
        const total = this.data.get(key) || 0 - 1;
        if (total < 0) {
            this.data.delete(key);
        } else {
            this.data.set(key, total);
        }
    }
}