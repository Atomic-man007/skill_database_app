import React, { Component } from 'react'
import UserService from '../services/UserService';

class UpdateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            Name: '',
            Skill: '',
            Domain: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSkillHandler = this.changeSkillHandler.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount(){
        UserService.getUserById(this.state.id).then( (res) =>{
            let user = res.data;
            this.setState({Name: user.Name,
                Skill: user.Skill,
                Domain : user.Domain
            });
        });
    }

    updateUser = (e) => {
        e.preventDefault();
        let user = {Name: this.state.Name, Skill: this.state.Skill, Domain: this.state.Domain};
        console.log('user => ' + JSON.stringify(user));
        console.log('id => ' + JSON.stringify(this.state.id));
        UserService.updateUser(user, this.state.id).then( res => {
            this.props.history.push('/users');
        });
    }
    
    changeNameHandler= (event) => {
        this.setState({Name: event.target.value});
    }

    changeSkillHandler= (event) => {
        this.setState({Skill: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({Domain: event.target.value});
    }

    cancel(){
        this.props.history.push('/users');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update User</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="Name" className="form-control" 
                                                value={this.state.Name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="Skill" className="form-control" 
                                                value={this.state.Skill} onChange={this.changeSkillHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="Domain" className="form-control" 
                                                value={this.state.Domain} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateUser}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateUserComponent
