export interface INews {
	by: string
	descendants: number
	id: number
	kids: Array<number>
	score: number
	time: number
	title: string
	type: string
	url: string
}
export interface IComment {
	by: string

	id: number
	kids: Array<number>
	parent: number
	time: number
	text: string
	type: string
}
