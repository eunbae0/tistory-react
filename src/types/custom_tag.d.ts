import "react";

declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			s_rctps_rep: React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				customAttribute?: string;
			};
			s_t3: React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				customAttribute?: string;
			};
		}
	}
}
