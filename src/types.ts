import { ReactNode } from "react";

export type dynamic = { [key: string]: any };
export type Keys<T> = keyof T;
export type Children<T = {}> = { children: ReactNode & T };