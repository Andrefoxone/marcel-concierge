import { ChatProvider } from '../components/chat/chat-provider'
import { SiteHeader } from '../components/site-header'
import { Hero } from '../components/hero'
import { Fleet } from '../components/fleet'
import { HowItWorks } from '../components/how-it-works'
import { Conditions } from '../components/conditions'
import { Locations } from '../components/locations'
import { SiteFooter } from '../components/site-footer'

export default function Page() {
  return (
    <ChatProvider>
      <SiteHeader />
      <main id="top">
        <Hero />
        <Fleet />
        <HowItWorks />
        <Conditions />
        <Locations />
      </main>
      <SiteFooter />
    </ChatProvider>
  )
}
