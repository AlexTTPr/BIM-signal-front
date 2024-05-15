export class ServerConfig {
    protocol: string
    url: string;
    port: number;
    isClientLocal: boolean;
    constructor() {
        this.isClientLocal = false;
        this.port = 9000;
        this.protocol = "http";                 // Для прода https
        this.url = "mtdtesting.ru"
    }

    fullServerString(): string {
        return `${this.protocol}://${this.url}:${this.port}`;
    }
}