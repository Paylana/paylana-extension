import { createRoot } from 'react-dom/client'
import refreshOnUpdate from 'virtual:reload-on-update-in-view'
import InjectedButton from './InjectedButton'

refreshOnUpdate('pages/amazon')
console.log('Intit content sciprt')
const root = document.createElement('div')
root.id = 'content'
document.body.append(root)

createRoot(root).render(<InjectedButton />)
