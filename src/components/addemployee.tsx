import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export class AddEmployeePanel extends React.Component<{}, {showPanel: boolean; }> {

    private readonly baseSalary: number = 2000
    private cost: number
    private dependents: string[]

  constructor(props: {}) {
    super(props);
    this.state = { showPanel: false };

    this.cost = 1000
    this.dependents = []
  }

  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton secondaryText="Click to open New Employee form" onClick={this._setShowPanel(true)} text="Add Employee" />
        <Panel
          isOpen={this.state.showPanel}
          onDismiss={this._setShowPanel(false)}
          type={PanelType.medium}
          headerText="Add Employee"
        >
            <div className="ms-Large">{this.cost}</div>
            <p></p>
            <span>Enter employee data. Preview of cost will update automatically.</span>
          
            <TextField label="Full Name " required={true} />
            <br />
            <TextField label="Salary " value={this.baseSalary.toString()} readOnly={true} />
            <br />
            <hr />
            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm6">
                        <TextField label="Dependent Name" />            
                    </div>
                    <div className="ms-Grid-col ms-sm6 ms-textAlignRight">
                        <br />
                        <DefaultButton
                            primary={true}
                            data-automation-id="test"
                            text="Add Dependent"
                            onClick={this._addDependentClicked}
                            allowDisabledFocus={true}
                        />
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <DefaultButton
                primary={true}
                data-automation-id="submit"
                text="Submit"
                onClick={this._submitClicked}
                allowDisabledFocus={true}
            />
        </Panel>
      </div>
    );
  }

  private _submitClicked = () => {
      console.log("tried to submit")
  }

  private _addDependentClicked = () => {
      
  }

  private _setShowPanel = (showPanel: boolean): (() => void) => {
    return (): void => {
      this.setState({ showPanel });
    };
  };
}