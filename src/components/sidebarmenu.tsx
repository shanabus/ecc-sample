import * as React from 'react'
import { inject, observer } from 'mobx-react'
import {Nav, INavLinkGroup} from 'office-ui-fabric-react/lib/Nav'
import Store from '@/store'

interface Props {
    store?: Store
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
                <Nav {...defaultProps}/>
            </div>
        )
    }  
}

const defaultProps = {
  groups: [{
    links: [{
        name: 'Dashboard',
        url: '/dashboard',
        iconClassName: 'ms-Icon--FunctionalManagerDashboard',
        icon: 'FunctionalManagerDashboard'
      }, {
        name: 'Activity',
        url: '/activity',
        iconClassName: 'ms-Icon--AreaChart',
        icon: 'AreaChart'
    }, {
      name: 'Devices',
      url: '/devices',
      iconClassName: 'ms-Icon--Devices3',
      icon: 'Devices3'
    }, {
      name: 'Alerts',
      url: '/alerts',
      iconClassName: 'ms-Icon--DateTime2',
      icon: 'DateTime2'
    }, {
      name: 'Recipes',
      url: '/recipes',
      iconClassName: 'ms-Icon--Album',
      icon: 'Album'
    }, {
      name: 'Help',
      url: '/help',
    }, {
      name: 'Administration',
      links: [{
        name: 'DataFlow',
        url: '/settings/dataflow',
        iconClassName: 'ms-Icon--OpenSource',
        icon: 'OpenSource'
      }, {
        name: 'Users',
        url: '/settings/users',
        iconClassName: 'ms-Icon--People',
        icon: 'People'
      }, {
        name: 'Settings',
        url: '/settings',
        iconClassName: 'ms-Icon--DeveloperTools',
        icon: 'DeveloperTools'
      }]
    }]
  }],
  expanded: 'expanded',
  collapsed: 'collapsed',
}
