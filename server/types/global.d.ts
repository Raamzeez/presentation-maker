

// Adding user to the request object in express
// See followig stackoverlfow answer: https://stackoverflow.com/a/55718334/12321989
// declare module 'express-serve-static-core' {
// 	interface Request {
// 		user?: { sub: string, iat: number }
// 	}
// }


// type AsyncReturnType<T extends (...args: any) => any> =
// 	T extends (...args: any) => Promise<infer U> ? U :
// 	T extends (...args: any) => infer U ? U :
// 	any