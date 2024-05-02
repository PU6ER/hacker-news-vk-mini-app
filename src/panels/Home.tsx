import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import {
	Button,
	Group,
	NavIdProps,
	Panel,
	PanelHeader,
	RichCell,
	Spinner,
} from '@vkontakte/vkui'
import { FC, useEffect, useState } from 'react'
import { fetchNews, formatDate } from '../api/api'
import { INews } from '../types/news.types'

export const Home: FC<NavIdProps> = ({ id }) => {
	const routeNavigator = useRouteNavigator()
	const [news, setNews] = useState<INews[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetchNews().then(res => {
			setNews(res)
			setIsLoading(false)
		})

		const interval = setInterval(() => {
			setIsLoading(true)
			fetchNews().then(res => {
				setNews(res)
				setIsLoading(false)
			})
		}, 60000)

		return () => clearInterval(interval)
	}, [])

	const handleRefreshClick = () => {
		setIsLoading(true)
		fetchNews().then(res => {
			setNews(res)
			setIsLoading(false)
		})
	}
	return (
		<Panel id={id}>
			<PanelHeader>Hacker News</PanelHeader>
			<Button mode='primary' appearance='positive' onClick={handleRefreshClick}>
				Refresh
			</Button>
			{isLoading ? (
				<Spinner size='large' style={{ margin: '20px 0' }} />
			) : (
				news && (
					<Group>
						{news.map(news => (
							<RichCell
								key={news.id}
								text={`by ${news.by}`}
								subhead={`${news.score} points`}
								caption={formatDate(news.time)}
								onClick={() => routeNavigator.push(`news/${news.id}`)}
							>
								{news.title}
							</RichCell>
						))}
					</Group>
				)
			)}
		</Panel>
	)
}
