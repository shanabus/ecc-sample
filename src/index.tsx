import * as React from 'react'
import * as ReactDom from 'react-dom'
import App from './app'

import '@/assets/css/app.scss'
//import 'office-ui-fabric-react/dist/sass/Fabric.scss'

ReactDom.render(
    <App />,
    document.getElementById('app'))
