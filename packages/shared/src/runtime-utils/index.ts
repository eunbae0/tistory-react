export const TISTORY_REACT_TEMP_DIR = ".tistory-react";

export const isProduction = () => process.env.NODE_ENV === "production";

export function removeLeadingSlash(url: string) {
	return url.charAt(0) === "/" ? url.slice(1) : url;
}

export function removeTrailingSlash(url: string) {
	return url.charAt(url.length - 1) === "/" ? url.slice(0, -1) : url;
}
