export class ChangeManger {
    constructor() {
    }

    changeStorage(name: string, newValue: any): void {
        localStorage.setItem(name, newValue);
    }
}
