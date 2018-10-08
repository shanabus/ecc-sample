import * as React from 'react'
import { Employee } from '@/store/employees';


interface Props {
    employee?: Employee
}

export default class Dependents extends React.Component<Props> {

    constructor(props: any) {
        super(props)
    }

    render() {
        const employee = this.props.employee
        if (employee != null && employee.dependents.length > 0){
            return (
            <ul>
                {employee.dependents.map( (d) => {
                    return <li key={d}>{d}</li>
                })}
            </ul>
            )
        }
        return (
            <em>no dependents yet</em>
        )
    }
}