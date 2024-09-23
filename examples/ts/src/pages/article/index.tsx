import {
	Article as ArticleService,
	Comment,
	ADMIM_CURRENT_STATE,
} from "tistory-react/theme";

export default function Article() {
	return (
		<ArticleService>
			<ArticleService.ThumbnailImg>
				
			</ArticleService.ThumbnailImg>
			<Comment.InputSubmit />
			<Comment></Comment>
			<Comment.InputTextArea />
			{ADMIM_CURRENT_STATE}
		</ArticleService>
	);
}