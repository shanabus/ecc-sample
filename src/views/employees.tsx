import * as React from 'react'
import { DetailsList, IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import { inject, observer } from 'mobx-react'
import { observable, computed } from 'mobx'
import { CommandBar, ICommandBarItemProps, Selection, Dialog, DialogType, TextField, DialogFooter, PrimaryButton, DefaultButton } from 'office-ui-fabric-react'
import Store from '@/store'
import { AddEmployeePanel } from '@/components/addemployee'
import { Employee } from '@/store/employees'
import Dependents from '@/components/dependents'

interface Props {
    store: Store    
}

@inject('store')
@observer
export default class EmployeesView extends React.Component<Props> {

    @observable private _isNewDialogOpen: boolean
    @observable private _isNewEmployee: boolean
    private _name: string
    @observable private _activeEmployee: Employee
    @observable private _dependent: string

    public static defaultProps = {
        store: null
    }

    private static _columns: IColumn[] = [
        { key: 'name', fieldName: 'name', name: 'Name', minWidth: 100, isResizable: true },
        { key: 'last-modified', fieldName: 'dateLastModified', name: 'Last Modified', minWidth: 150 },
        { key: 'dependents', fieldName: 'dependents', name: 'Dependents', minWidth: 100 },
        { key: 'cost', fieldName: 'cost', name: 'Cost', minWidth: 100 }
    ]

    private _selection: Selection

    constructor(props: Props) {
        super(props)
        this._isNewDialogOpen = false
        this._name = ''
        this._dependent = ''
        this._selection = new Selection({
            onSelectionChanged: () => {
                const indices = this._selection.getSelectedIndices()
                this.props.store.employees.setSelection(indices)
            }
        })        
        this._activeEmployee = new Employee("", 2000)
    }

    async componentDidMount() {

        const { employees } = this.props.store

        employees.clearSelection()
        await employees.fetch()
    }

    render() {
        const divStyle = {
            maxWidth: "95%"
        }
        const emplStore = this.props.store.employees
        const items = emplStore.employees.map(empl => ({
            key: empl.id,
            name: empl.name,
            cost: empl.cost(),
            dependents: empl.dependents.length
        }))
        const commandItems: ICommandBarItemProps[] = [
            {
                key: 'add',
                name: 'New',
                ariaLabel: 'Create a new Employee',
                iconProps: {
                    iconName: 'add'
                },
                onClick: this._onNewClick
            },
            {
                key: 'edit',
                name: 'Edit',
                ariaLabel: 'Edit Employee',
                disabled: !this._hasSingleSelection,
                iconProps: {
                    iconName: 'edit'
                },
                onClick: this._onEditClick
            },
            {
                key: 'delete',
                name: 'Delete',
                ariaLabel: 'Delete the selected employees',
                disabled: !this._hasSelection,
                iconProps: {
                    iconName: 'delete',
                    color: '#ff0000'
                },
                onClick: this._onDeleteClick
            }
        ]
        return (
            <React.Fragment>
                <div className='container'>
                    <h1 className='ms-font-su'>Employees</h1>
                    <div style={ divStyle }>
                    <CommandBar items={commandItems} />
                    <DetailsList columns={EmployeesView._columns} setKey='key' items={items} selection={this._selection} />
                    </div>
                </div>
                <Dialog
                    hidden={!this._isNewDialogOpen}
                    dialogContentProps={{
                        type: DialogType.largeHeader,
                        onDismiss: this._onNewDialogClose,
                        showCloseButton: true,
                        title: 'New Employee',
                        subText:
                          '...'
                      }}
                      modalProps={{
                        isBlocking: true,
                        containerClassName: 'ms-dialogMainOverride'
                      }}          
                    >
                    <div className="ms-Grid">
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col">
                            <TextField label="Name" type="text" className="ms-input" value={this._activeEmployee.name} onChanged={this._onNameChanged} />
                            <br />
                        </div>
                      </div>
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col">
                            <label>Dependents:</label>                                      
                        </div>
                      </div>        
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm8">
                            <TextField placeholder="Dependent Name" type="text" className="ms-input" value={this._dependent} onChanged={this._onDependentNameChanged} />                    
                        </div>
                        <div className="ms-Grid-col ms-sm4">
                            <DefaultButton onClick={this._onAddDependentClick}>Add</DefaultButton>
                        </div>
                      </div>
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col">                  
                            <br />
                            <Dependents employee={this._activeEmployee} />
                        </div>
                      </div>   
                    </div>                    
                    <br />
                    
                    <DialogFooter>
                        { this._isNewEmployee? 
                            <React.Fragment>
                                <PrimaryButton onClick={this._onCreateClick} hidden={!this._isNewEmployee}>Create</PrimaryButton>
                                <DefaultButton onClick={this._onNewDialogClose}>Cancel</DefaultButton>
                            </React.Fragment>
                            : <DefaultButton onClick={this._onUpdateClick} hidden={this._isNewEmployee}>Save &amp; Close</DefaultButton>
                        }
                        
                    </DialogFooter>
                </Dialog>            
            </React.Fragment>            
        )
    }

    private _onNameChanged = (value: string) => {
        this._name = value
    }

    private _onDependentNameChanged = (value: string) => {
        this._dependent = value
    }

    private _onCreateClick = async () => {
        const { employees } = this.props.store
        await employees.createEmployee(this._activeEmployee)
        this._isNewDialogOpen = false
    }

    private _onNewClick = () => {        
        console.log('create new employee')     
        this._isNewEmployee = true   
        this._isNewDialogOpen = true
    }

    private _onNewDialogClose = () => {
        console.log('dismiss dialog')
        this._isNewDialogOpen = false
    }

    private _onEditClick = () => {
        const { employees } = this.props.store
        this._activeEmployee = employees.getById(this._selection.getSelection()[0].key)
        console.log('edit employee', this._activeEmployee)
        this._isNewEmployee = false
        this._isNewDialogOpen = true
    }

    private _onUpdateClick = () => {
        console.log('update clicked')
        this._isNewDialogOpen = false
    }

    private _onDeleteClick = () => {
        const { employees } = this.props.store
        employees.deleteSelectedEmployees()
    }

    private _onAddDependentClick = () => {
        console.log('add dependent')
        this._activeEmployee.addDependent(this._dependent)        
        this._dependent = ''
    }

    @computed
    private get _hasSelection() {
        const { employees } = this.props.store
        return employees.selectedEmployees.length > 0
    }

    @computed
    private get _hasSingleSelection() {
        const { employees } = this.props.store
        return employees.selectedEmployees.length === 1
    }

}