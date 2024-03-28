import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import CheckoutButton from '@src/components/CheckoutButton/CheckoutButton'

export default function InjectedButton() {
  useEffect(() => {
    console.log('current page is: ', document.location.hostname)

    let container = document.createElement('div')

    switch (document.location.hostname) {
      case 'www.amazon.com': {
        injectAmazon(container)
        break
      }
      case 'checkout.lazada.vn': {
        injectLazada(container)
        break
      }
    }

    return () => {
      if (container) {
        container.remove()
      }
    }
  }, [])

  const injectAmazon = (container) => {
    var checkoutBox = document.getElementById('submitOrderButtonId')
    checkoutBox.parentNode.insertBefore(container, checkoutBox.nextSibling)
    const root = createRoot(container)
    root.render(<CheckoutButton />)
  }

  const injectLazada = (container) => {
    var checkoutBox = document.getElementsByClassName('checkout-order-total-row')[0]
    console.log('checkout box is: ', checkoutBox)
    checkoutBox.parentNode.insertBefore(container, checkoutBox.nextSibling)
    const root = createRoot(container)
    root.render(<CheckoutButton />)
  }

  return null
}
