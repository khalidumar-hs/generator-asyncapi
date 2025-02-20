import { z } from 'zod';

declare const optionsSchema: z.ZodObject<{
    licenseKey: z.ZodOptional<z.ZodString>;
    services: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        path: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        path: string;
        id: string;
        name?: string | undefined;
        version?: string | undefined;
    }, {
        path: string;
        id: string;
        name?: string | undefined;
        version?: string | undefined;
    }>, "many">;
    domain: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        version: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        version: string;
    }, {
        id: string;
        name: string;
        version: string;
    }>>;
    debug: z.ZodOptional<z.ZodBoolean>;
    parseSchemas: z.ZodOptional<z.ZodBoolean>;
    parseChannels: z.ZodOptional<z.ZodBoolean>;
    saveParsedSpecFile: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    services: {
        path: string;
        id: string;
        name?: string | undefined;
        version?: string | undefined;
    }[];
    licenseKey?: string | undefined;
    domain?: {
        id: string;
        name: string;
        version: string;
    } | undefined;
    debug?: boolean | undefined;
    parseSchemas?: boolean | undefined;
    parseChannels?: boolean | undefined;
    saveParsedSpecFile?: boolean | undefined;
}, {
    services: {
        path: string;
        id: string;
        name?: string | undefined;
        version?: string | undefined;
    }[];
    licenseKey?: string | undefined;
    domain?: {
        id: string;
        name: string;
        version: string;
    } | undefined;
    debug?: boolean | undefined;
    parseSchemas?: boolean | undefined;
    parseChannels?: boolean | undefined;
    saveParsedSpecFile?: boolean | undefined;
}>;
type Props = z.infer<typeof optionsSchema>;
declare const _default: (config: any, options: Props) => Promise<void>;

export { _default as default };
