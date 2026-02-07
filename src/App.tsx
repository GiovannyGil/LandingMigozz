import './App.css'
import { Welcome } from './components/Welcome/Welcome'
import { JoinMigozz } from './components/JoinMigozz/JoinMigozz'
import { EmbedVideo } from './components/EmbedVideo/EmbedVideo'
// import { PreRegisters } from './components/PreRegisters/PreRegisters'
import { SlideExample } from './components/SlideExample/SlideExample'
import { MoreInfo } from './components/MoreInfo/MoreInfo'
import { SocialNetworks } from './components/SocialNetworks/SocialNetworks'

function App() {
  return (
    <>
      <JoinMigozz />
      {/* <PreRegisters /> */}
      <EmbedVideo />
      <Welcome />
      <SlideExample />
      <MoreInfo />
      <SocialNetworks />
    </>
  )
}

export default App
