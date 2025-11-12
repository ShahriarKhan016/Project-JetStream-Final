/**
 * JetStream Web App
 * Minimalistic Dark-Themed Music Player
 */

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import AppRouter from './router/AppRouter'
import { PlayerProvider } from './contexts/PlayerContext'
import { OfflineIndicator } from './components/OfflineIndicator'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PlayerProvider>
          <OfflineIndicator />
          <AppRouter />
        </PlayerProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
