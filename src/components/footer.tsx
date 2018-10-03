import * as React from 'react'
import {Link} from 'office-ui-fabric-react/lib/Link'
import '@/assets/css/footer.scss'

interface Props {
    
}

export default class Footer extends React.Component<Props> {
  
    render() {
        const year = new Date().getUTCFullYear();

        return (
            <div className="footer-container">
                {'© Employee Cost Calculator ' + year + ' : : '}
                <Link href="#">Contact</Link>
            </div>
        )
    }
}