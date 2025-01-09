import { Request } from "express";
export type EnhancedRequest = Request & {
	isAuth?: boolean
	userId?: string
	email?: string
}