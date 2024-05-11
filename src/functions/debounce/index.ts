export default function debounce<T, F extends (...args: any[]) => T>(
    func: F,
    wait: number
): (...args: Parameters<F>) => void {
    let timer: any = null;

    return function (this: ThisType<F>, ...args: Parameters<F>) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}
