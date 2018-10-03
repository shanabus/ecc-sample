import * as React from 'react'
import { Provider } from 'mobx-react'
import { Fabric } from 'office-ui-fabric-react'
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import Store from '@/store'
import SidebarMenu from '@/components/sidebarmenu'
import NavBar from '@/components/navbar'
import Footer from '@/components/footer'
import EmployeeStore from '@/store/employees';
import Employees from '@/views/employees';

initializeIcons(/* optional base url */);

import '@/assets/css/content.scss'


const registrations = {
    store: new Store(new EmployeeStore())
}

export default class extends React.Component {
    render() {
        return (
            <Provider {...registrations}>
                <Fabric>
                    <div className="App">
                        <div className="header">
                            <NavBar />
                        </div>        
                        <div className="body">
                            <div className="content">
                                <Employees />
                            </div>
                            <div className="sidebar">
                                <SidebarMenu />
                            </div>      
                        </div>
                        <div className="footer">
                            <Footer />
                        </div>               
                    </div>
                </Fabric>
            </Provider>
        )
    }
}