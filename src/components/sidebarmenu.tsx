import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Nav, INavLink, INavProps } from 'office-ui-fabric-react/lib/Nav'
import Store from '@/store'

interface Props {
    store: Store
}

@inject('store')
@observer
export default class extends React.Component<Props> {

    constructor(props: Props){
        super(props)
    }

    render() {
        return (
            <div className='SidebarMenu'>
                <Nav {...navProps} onLinkClick={this.onLinkClick} />
            </div>
        )
    }  

    private onLinkClick = (e: any, link?: INavLink) => {
      e.preventDefault()
      if (link) {
        const { router } = this.props.store
        router.push(link.url)
      }
    }
}

const navProps: INavProps = {
  groups: [{
    links: [
      { name: 'Home', icon: 'home', url: '/' },
      { name: 'Benefits', icon: 'health', url: '/benefits' },
      { name: 'Help', icon: 'help', url: '/help' }
    ]
  }]
}
