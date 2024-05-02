import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import {
	Button,
	Div,
	Group,
	Link,
	NavIdProps,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Spinner,
	Text,
	Title,
} from '@vkontakte/vkui'
import { useEffect, useState } from 'react'
import { fetchNewsById, formatDate } from '../api/api'
import Comment from '../components/comment/Comment'
import { INews } from '../types/news.types'

export const News = ({ id }: NavIdProps) => {
	const params = useParams<'newsId'>() ?? { newsId: '0' }
	const routeNavigator = useRouteNavigator()

	const [newsItem, setNewsItem] = useState<INews | null>(null)
	const [comments, setComments] = useState<number[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		params.newsId &&
			fetchNewsById(params.newsId).then(res => {
				setNewsItem(res)
				setIsLoading(false)
			})
		newsItem && newsItem.kids && setComments(newsItem.kids)
	}, [newsItem])

	const handleRefreshClick = () => {
		setIsLoading(true)
		params.newsId &&
			fetchNewsById(params.newsId).then(res => {
				setNewsItem(res)
				setIsLoading(false)
			})
		newsItem && newsItem.kids && setComments(newsItem.kids)
	}
	return (
		<Panel id={id}>
			<PanelHeader
				before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
			>
				News
			</PanelHeader>
			<Group>
				{isLoading ? (
					<Spinner size='large' style={{ margin: '20px 0' }} />
				) : (
					newsItem && (
						<Div>
							<Title>{newsItem.title}</Title>
							<Link href={newsItem.url}>Link</Link>
							<Text>
								by {newsItem.by} {formatDate(newsItem.time)}
							</Text>
							<Button
								mode='primary'
								appearance='positive'
								loading={isLoading}
								onClick={handleRefreshClick}
								style={{ marginTop: '5px' }}
							>
								Refresh
							</Button>
							{newsItem.kids ? (
								<Text>Comments: {newsItem.kids.length}</Text>
							) : (
								<Text>Comments: 0</Text>
							)}
							{newsItem.kids ? (
								<Div>
									<Div>
										{comments.map(comment => (
											<Comment id={comment} />
										))}
									</Div>
								</Div>
							) : null}
						</Div>
					)
				)}
			</Group>
		</Panel>
	)
}
