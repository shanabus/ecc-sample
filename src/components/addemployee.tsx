import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import Store from '@/store'
import { inject, observer } from 'mobx-react';

interface Props {
    store: Store
}

interface State {
    showPanel: boolean
    fullName: string
    formDisabled: boolean
    dependents: string[]
}

@inject('store')
@observer
export class AddEmployeePanel extends React.Component<Props, State> {

    private readonly baseSalary: number = 2000
    private baseCost: number
    private employeeCost: number
    private dependent: string = ""

    constructor(props: Props) {
        super(props);
        this.state = { showPanel: false, fullName: "", formDisabled: true, dependents: [] }

        this.baseCost = this.employeeCost = 1000
    }

    public render(): JSX.Element {
        return (
            <div>
            <DefaultButton secondaryText="Click to open New Employee form" onClick={this.setShowPanel(true)} text="Add Employee" />
            <Panel
                isOpen={this.state.showPanel}
                onDismiss={this.setShowPanel(false)}
                type={PanelType.medium}
                headerText="Add Employee"
            >
                <div>
                Annual benefit cost: <span className="ms-fontSize-su">{this.employeeCost}</span>
                </div>
                <br />
                <TextField label="Full Name " value={this.state.fullName} onChanged={this.handleFullNameChange} required={true} />
                <br />
                <TextField label="Salary " value={this.baseSalary.toString()} readOnly={true} />
                <br />
                <hr />
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6">
                            <TextField label="Dependent Name" value={this.dependent} onChanged={(e) => this.dependent = e} />            
                        </div>
                        <div className="ms-Grid-col ms-sm6 ms-textAlignRight">
                            <br />
                            <DefaultButton
                                primary={true}
                                data-automation-id="test"
                                text="Add Dependent"
                                onClick={this.addDependentClicked}
                                allowDisabledFocus={true}
                            />
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <ul>
                {this.state.dependents.map((d) => {
                    return <li key={d}>{d}</li>
                })}
                </ul>
                <br />
                <DefaultButton
                    primary={true}
                    data-automation-id="submit"
                    text="Submit"
                    disabled={this.state.fullName.trim().split(' ').length < 2}
                    onClick={this.submitClicked}
                    allowDisabledFocus={true}
                />
            </Panel>
            </div>
        );
    }

    private checkCost = () => {
        let cost = this.baseCost

        if (this.state.fullName.toLowerCase().startsWith("a")) {
            cost = this.baseCost * .9
        }

        for(var i = 0; i < this.state.dependents.length; i++){
            if (this.state.dependents[i].toLowerCase().startsWith("a")){
                cost += 450
            } else {
                cost += 500
            }
        }
        this.employeeCost = cost
    }

    private handleFullNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({fullName: event.toString()});

        this.checkCost()
    }

    private submitClicked = () => {
        console.log("tried to submit")
    }

    private addDependentClicked = () => {
        // adds 500/year
        console.log(this.dependent)
        this.state.dependents.push(this.dependent)
        this.setState({ dependents: this.state.dependents })
        this.dependent = ""

        this.checkCost()
    }

    private setShowPanel = (showPanel: boolean): (() => void) => {
        return (): void => {
            this.setState({ showPanel });
        };
    };
}