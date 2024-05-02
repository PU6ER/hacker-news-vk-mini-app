import { Button, Card, Div, Headline, Spinner } from '@vkontakte/vkui'
import { useEffect, useState } from 'react'
import { fetchCommentById } from '../../api/api'
import { IComment } from '../../types/news.types'

export interface ICommentProps {
	id: number
}

const Comment = ({ id }: ICommentProps) => {
	const [commentData, setCommentData] = useState<IComment>()
	const [isLoading, setIsLoading] = useState(true)
	const [showTree, setShowTree] = useState(false)

	const handleToggleTree = () => {
		setShowTree(prevState => !prevState)
	}

	useEffect(() => {
		fetchCommentById(`${id}`).then(res => {
			setCommentData(res)
			setIsLoading(false)
		})
	}, [id])

	return (
		<Div>
			{isLoading ? (
				<Spinner size='medium' style={{ margin: '20px 0' }} />
			) : (
				commentData && (
					<Div>
						<Card style={{ padding: '5px' }}>
							<Headline>by {commentData.by}</Headline>
							<Headline>{commentData.text}</Headline>
						</Card>
						{commentData.kids && (
							<Button
								appearance={showTree ? 'negative' : 'positive'}
								mode='tertiary'
								style={{ marginTop: '5px' }}
								onClick={handleToggleTree}
							>
								{showTree ? 'Hide' : 'See more'}
							</Button>
						)}
					</Div>
				)
			)}
			{showTree &&
				commentData &&
				commentData.kids.map(id => (
					<Div>
						<Comment id={id} />
					</Div>
				))}
		</Div>
	)
}

export default Comment
