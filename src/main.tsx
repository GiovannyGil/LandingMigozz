import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { LanguageProvider } from './Providers/LanguageContext/LanguageContext'
import { FirebaseProvider } from './Providers/FirebaseContext/FirebaseContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirebaseProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </FirebaseProvider>
  </StrictMode>,
)
