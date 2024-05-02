import axios from 'axios'
import { IComment, INews } from '../types/news.types'

const BASE_URL = 'https://hacker-news.firebaseio.com/v0'

export async function fetchNews(): Promise<INews[]> {
	const response = await axios.get<number[]>(
		`${BASE_URL}/newstories.json?print=pretty`
	)
	const newsIds = response.data.slice(0, 100)
	const newsPromises = newsIds.map(id => fetchNewsById(`${id}`))
	const newsResponses = await Promise.all(newsPromises)
	// const news = newsResponses.filter(item => item.type === 'story')
	return newsResponses.sort((a, b) => b.time - a.time)
}

export async function fetchNewsById(id: string) {
	const response = await axios.get<INews>(`${BASE_URL}/item/${id}.json`)
	return response.data
}
export async function fetchCommentById(id: string) {
	const response = await axios.get<IComment>(`${BASE_URL}/item/${id}.json`)
	return response.data
}

export function formatDate(time: number) {
	const date = new Date(time * 1000)
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}
