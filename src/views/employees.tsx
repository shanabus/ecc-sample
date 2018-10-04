import * as React from 'react'
import { AddEmployeePanel } from '@/components/addemployee'

export default class Employees extends React.Component<any> {
    render() {
        return (
            <React.Fragment>               
                <AddEmployeePanel />
            </React.Fragment>            
        )
    }
}