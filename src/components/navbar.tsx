import * as React from 'react'
import {SearchBox} from 'office-ui-fabric-react/lib/SearchBox'

import '@/assets/css/navbar.scss'

interface Props { }

export default class NavBar extends React.Component<Props> {
    render() {
        return (
            <div className="NavBar">
                <div className="logo ms-font-xl">
                    <strong>Employee Cost Calculator</strong>
                </div>
                <div className="searchbox">
                <SearchBox labelText="Search"
                    onChange={(newValue) => console.log('SearchBox onChange fired: ' + newValue)}
                    onSearch={(newValue) => console.log('SearchBox onSearch fired: ' + newValue)}
                />
                </div>
            </div> 
        )
    }

    onChange = (newValue: string) => console.log('SearchBox onChange fired: ' + newValue)

    onSearch = (newValue: string) => console.log('SearchBox onSearch fired: ' + newValue)
}
