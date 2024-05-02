import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router'
import { SplitCol, SplitLayout, View } from '@vkontakte/vkui'

import { Home, News } from './panels'
import { DEFAULT_VIEW_PANELS } from './routes'

export const App = () => {
	const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
		useActiveVkuiLocation()

	return (
		<SplitLayout>
			<SplitCol>
				<View activePanel={activePanel}>
					<Home id='home' />
					<News id='news' />
				</View>
			</SplitCol>
		</SplitLayout>
	)
}
