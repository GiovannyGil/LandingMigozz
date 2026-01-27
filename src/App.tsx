import './App.css'
import { Welcome } from './components/Welcome/Welcome'
import { Video } from './components/Video/Video'
import { JoinMigozz } from './components/JoinMigozz/JoinMigozz'
import { SlideExample } from './components/SlideExample/SlideExample'
import { MoreInfo } from './components/MoreInfo/MoreInfo'
import { SocialNetworks } from './components/SocialNetworks/SocialNetworks'

function App() {
  return (
    <>
      <JoinMigozz />
      <Video />
      <Welcome />
      <SlideExample />
      <MoreInfo />
      <SocialNetworks />
    </>
  )
}

export default App
