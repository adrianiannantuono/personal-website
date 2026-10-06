const GA_MEASUREMENT_ID = 'G-XS3TPNRKJH'

/** Loads Google Analytics in production builds only, so local/dev usage isn't counted. */
export function initAnalytics() {
  if (!import.meta.env.PROD) return

  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
}

declare global {
  interface Window {
    dataLayer: unknown[][]
  }
}
