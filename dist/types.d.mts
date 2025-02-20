interface MessageOperations {
    write: (payload: any, options: any) => Promise<void>;
    version: (id: string) => Promise<any>;
    get: (id: string, version: string) => Promise<any>;
    addSchema: (id: string, schema: any, version: any) => Promise<void>;
}
type EventType = 'event' | 'command' | 'query';

export type { EventType, MessageOperations };
