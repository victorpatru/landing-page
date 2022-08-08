import { ScrollTrigger } from 'lib/gsap'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useViewportSize } from '~/hooks/use-viewport-size'

import { Link } from '../primitives/link'
import { AnnouncementBar } from './announcement-bar'
import { Footer } from './footer'
import { Header } from './header'

type Props = {
  children?: React.ReactNode
}

export const PageLayout = ({ children }: Props) => {
  const router = useRouter()
  const viewport = useViewportSize()

  const [is404, setIs404] = useState(false)

  useEffect(() => {
    if (!router.pathname) return
    
    ScrollTrigger.normalizeScroll(true)
    ScrollTrigger.sort()
    ScrollTrigger.refresh()

    if (router.pathname === '/404') {
      setIs404(true)
    } else {
      setIs404(false)
    }
  }, [router])

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [viewport.height, viewport.width])

  return (
    <>
      <AnnouncementBar
        text={
          <>
            Proudly backed by Andreessen Horowitz.{' '}
            <Link href="https://medium.com/replay-io/launching-replay-the-time-travel-debugger-for-the-web-f886f0897d38">
              Read&nbsp;More
            </Link>
          </>
        }
      />
      <Header />

      <main>{children}</main>
      {!is404 && <Footer />}
    </>
  )
}
