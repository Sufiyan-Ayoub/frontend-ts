import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from 'js-cookie'
import { dynamic } from "@/types";
import axios, { AxiosProgressEvent, RawAxiosRequestHeaders } from "axios";

export const getCartesianProduct = (
    ...args: string[][]
) : string[] => {
    return args.reduce(
        (acc, curr) => acc.flatMap(x => curr.map(y => x + (x ? "-" : "") + y)), [""]
    );
}

export const getData = <T extends Record<string, string | boolean>>(current: HTMLDivElement) => {
    const data: Record<string, string | boolean> = {};
    current.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`[name]`)
        .forEach((el) => {
            if (el.type == `checkbox`) {
                data[el.name] = (el as HTMLInputElement).checked;
            } else if (el.type != `file`) {
                data[el.name] = el.value.trim();
            }
        })
    return data as T;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setCookie = (key: string, value: string, expiry?: number) => Cookies.set(key, value, { expires: expiry || 7 });
export const getCookie = (key: string) => key == `` ? Cookies.get() : Cookies.get(key) || null;
export const removeCookie = (key: string) => Cookies.remove(key);
export const buildFormData = (fields: dynamic) => {
	const fd = new FormData();

	for (const [key, value] of Object.entries(fields)) {
		if (Array.isArray(value)) {
			fd.append(key, value[0], value[1]);
		} else {
			fd.append(key, value);
		}
	}

	console.log(fd)
	return fd;
}

export const eKeyOf = (i: string | number, o: Record<string, string | number>): string | undefined => {
    const value = String(i).toLowerCase();

    for (const [key, val] of Object.entries(o)) {
        if (String(val).toLowerCase() === value || String(key).toLowerCase() === value) return key; 
    }
    return undefined;
}

export const withPost = async <T>(uri: string, data: dynamic, timeout: number = 60, ignoreKind: boolean = false, headers?: dynamic, onProgress?:(ev: AxiosProgressEvent) => void) : Promise<T> => {
    const _cookies = Cookies.get();
    if (data instanceof FormData) {
        for (const c in _cookies) {
            data.append(c, _cookies[c]);
        }
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: uri,
                data: data,
                timeout: timeout * 1000,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...(headers || {})
                },
                onUploadProgress: ev => onProgress && onProgress(ev)
            })
                .then(resp => {
                if (resp.data && (ignoreKind || ("kind" in resp.data))) {
                    resolve(resp.data as T);
                }
                else {
                    reject(resp.data);
                }
            })
                .catch(err => reject(err));
        });
    }
    else if (typeof data == `string`) {
        return new Promise((resolve, reject) => {
            axios.post(uri, data, {
                timeout: 1000 * timeout,
                headers: {
                    'Content-Type': 'application/json',
                    ...(headers || {})
                }
            })
                .then(resp => {
                if (resp.data && (ignoreKind || ("kind" in resp.data))) {
                    resolve(resp.data as T);
                }
                else {
                    reject(resp.data);
                }
            })
                .catch(err => {
                if (err?.response?.data)
                    reject(err.response.data);
                else
                    reject(err.code && err.code == `ERR_NETWORK` ? { error: err.code, message: `Network error: Unable to connect. Please check your internet connection and try again.` } : err);
            });
        });
    }
    else if (typeof data === "object" && !Array.isArray(data) && data !== null) {
        return new Promise((resolve, reject) => {
            axios.post(uri, {
                ...data,
                ..._cookies,
                __stmp: new Date().getTime() / 1000
            }, {
                timeout: 1000 * timeout,
                headers: {
                    'Content-Type': 'application/json',
                    ...(headers || {})
                }
            })
                .then(resp => {
                if (resp.data && (ignoreKind || ("kind" in resp.data))) {
                    resolve(resp.data as T);
                }
                else {
                    reject(resp.data);
                }
            })
                .catch(err => {
                if (err?.response?.data)
                    reject(err.response.data);
                else
                    reject(err.code && err.code == `ERR_NETWORK` ? { error: err.code, message: `Network error: Unable to connect. Please check your internet connection and try again.` } : err);
            });
        });
    }
    return new Promise((resolve, reject) => {
        reject();
    });
}

export const withGet = async <T>(uri: string, timeout:number = 60, ignoreKind: boolean = false, headers?: RawAxiosRequestHeaders) : Promise<T> => {
    return new Promise((resolve, reject) => {
        axios
            .get(uri, { timeout: timeout * 1000, ...(headers && { headers }) })
            .then((resp) => {
            if (resp.data && (ignoreKind || "kind" in resp.data)) {
                resolve(resp.data as T);
            }
            else {
                reject(resp.data);
            }
        })
            .catch((err) => {
            if (err?.response?.data)
                reject(err.response.data);
            else
                reject(err.code === `ERR_NETWORK`
                    ? {
                        error: err.code,
                        message: `Network error: Unable to connect. Please check your internet connection and try again.`
                    }
                    : err);
        });
    });
}