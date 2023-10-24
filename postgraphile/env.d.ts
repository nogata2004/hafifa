declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CONNECTION_STRING: string;
            SCHEMA: string;
            PORT: number;
        }
    }
}

export {};