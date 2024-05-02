import { useParams } from '@vkontakte/vk-mini-apps-router'
import { NavIdProps, Panel, PanelHeader } from '@vkontakte/vkui'
import { useState } from 'react'
import { INews } from '../types/news.types'

export const News = ({ id }: NavIdProps) => {
	const newsId = useParams<'newsId'>()
	const [newsItem, setNewsItem] = useState<INews | null>(null)
	const [comments, setComments] = useState<number[]>([])

	return (
		<Panel id={id}>
			<PanelHeader>Новости</PanelHeader>
		</Panel>
	)
}
