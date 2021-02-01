// Type definitions for febs-decorator

/// <reference types="node" />


export interface Body {
  arrayBuffer(): Promise<ArrayBuffer>;
  blob(): Promise<any>;
  json(): Promise<any>;
  text(): Promise<string>;
  body?: any;
}

export interface Headers extends Iterable<[string, string]> {
  forEach(callback: (value: string, name: string) => void): void;
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  has(name: string): boolean;
  set(name: string, value: string): void;

  // Iterable methods
  entries(): IterableIterator<[string, string]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<[string]>;
  [Symbol.iterator](): Iterator<[string, string]>;
}

export interface Request extends Body {
  url: string;
  headers?: Headers;
  method?: string;
  referrer?: string;
  timeout?: number;
  mode?: RequestMode,
  credentials?: RequestCredentials,
}

export interface RequestInit {
  body?: any;
  headers?: HeadersInit;
  method?: string;
  referrer?: string;
  timeout?: number;
  mode?: RequestMode,
  credentials?: RequestCredentials,
  progress?: (progress:number)=>void,
}

export namespace Response {
  function error(): Response;
  function redirect(url: string, status: number): Response;
}

export interface Response extends Body {
  headers: Headers;
  ok: boolean;
  status: number;
  statusText: string;
  type: ResponseType;
  url: string;
}

export type HeadersInit = Headers | string[][] | { [key: string]: string };
export type RequestInfo = string | Request;
export type RequestMode = "cors" | "no-cors" | "same-origin";
export type RequestCredentials = "omit" | "include" | "same-origin";
export type ResponseType =
    "basic"
    | "cors"
    | "default"
    | "error"
    | "opaque"
    | "opaqueredirect";

/**
 * @example
 *  fetch(...).then(...).catch(e=>{
 *    if (e instanceof Error) {
 *      // network error.
 *      if (e.code === 'NetworkFailed') {
 *      }
 *      // network timeout.
 *      if (e.code === 'NetworkTimeout') {
 *      }
 *    }
 *    throw e;
 *  });
 * 
 * @desc 
 * 
 * exception: 
 *   - Network error: 
 *        Error.code = 'NetworkFailed'
 *   - Network timeout:
 *        Error.code = 'NetworkTimeout'
 */
export type Fetch = (
    url: RequestInfo,
    init?: RequestInit
)=>Promise<Response>;
