import { VortexusClientConfig } from "@vortexus.js/core"

export interface VortexusConfig extends VortexusClientConfig {
    version: string;
    modules: VortexusConfigModuleOptions;
    logger?: VortexusConfigLoggerOptions
}

export interface VortexusConfigModuleOptions {
    dirs: string[];
    ignore?: string[];
}

export interface VortexusConfigLoggerOptions {
    enable: boolean;
    debugs?: boolean;
    pretty_print?: boolean;
    file_stream?: {
        enable: boolean;
        dir: string;
        file: string;
    }
}