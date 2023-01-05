import React, { Component } from 'react';
import UserService from '../services/UserService';
import { Link } from 'react-router-dom';

class CreateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step 2
      id: this.props.match.params.id,
      Name: '',
      Skill: '',
      Domain: '',
      Years: '',
      Level: 'Basic',
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeSkillHandler = this.changeSkillHandler.bind(this);
    this.changeDomainHandler = this.changeDomainHandler.bind(this);
    this.changeYearsHandler = this.changeYearsHandler.bind(this);
    this.changeLevelHandler = this.changeLevelHandler.bind(this);
    this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
  }

  // step 3
  componentDidMount() {
    // step 4
    if (this.state.id === '_add') {
      return;
    } else {
      UserService.getUserById(this.state.id).then((res) => {
        let user = res.data;
        this.setState({
          Name: user.Name,
          Skill: user.Skill,
          Domain: user.Domain,
          Years: user.Years,
          Level: user.Level,
        });
      });
    }
  }
  saveOrUpdateUser = (e) => {
    e.preventDefault();
    let user = {
      Name: this.state.Name,
      Skill: this.state.Skill,
      Domain: this.state.Domain,
      Years: this.state.Years,
      Level: this.state.Level,
    };
    console.log('user => ' + JSON.stringify(user));

    // step 5
    if (this.state.id === '_add') {
      UserService.createUser(user).then((res) => {
        this.props.history.push('/users');
      });
    } else {
      UserService.updateUser(user, this.state.id).then((res) => {
        this.props.history.push('/users');
      });
    }
  };

  changeNameHandler = (event) => {
    this.setState({ Name: event.target.value });
  };

  changeSkillHandler = (event) => {
    this.setState({ Skill: event.target.value });
  };

  changeDomainHandler = (event) => {
    this.setState({ Domain: event.target.value });
  };

  changeYearsHandler = (event) => {
    this.setState({ Years: event.target.value });
  };

  changeLevelHandler = (event) => {
    console.log('level Selected!!');
    this.setState({ Level: event.target.value });
  };

  cancel() {
    this.props.history.push('/users');
  }

  getTitle() {
    if (this.state.id === '_add') {
      return <h3 className='text-center py-4 customHeader'>Add User</h3>;
    } else {
      return <h3 className='text-center py-4 customHeader'>Update User</h3>;
    }
  }

  // userTable() {
  //   console.log('working');
  //   this.history.push('/');
  // }

  render() {
    return (
      <div className='bg-gradient-to-r from-sky-400 to-indigo-400 pb-4 h-full'>
        {/* <button className='btn btn-primary' onClick={this.userTable}>
          Back
        </button> */}
        <img
          src='../img/Ellipse.png'
          className='z-20 animate-ping w-6 absolute left-24 top-56'
        />
        <img
          src='../img/Ellipse.png'
          className='z-20 animate-ping w-6 absolute right-96 top-36'
        />
        <img
          src='../img/Ellipse.png'
          className='z-20 animate-ping w-6 absolute left-64 bottom-24'
        />
        <img
          src='../img/Ellipse.png'
          className='z-20 animate-ping w-6 absolute right-40 top-64'
        />
        <br></br>
        <div className='container'>
          <div className='row'>
            <div className='cardCustom card col-md-6 offset-md-3 offset-md-3 rounded-3xl'>
              {this.getTitle()}
              <div className='card-body'>
                <form>
                  <div className='form-group'>
                    <label className='text-gray-600'> Name: </label>
                    <input
                      id='Name'
                      type='text'
                      required
                      placeholder='Please enter your Name'
                      name='Name'
                      className='peer h-10 w-full border-b-2 text-gray-900  focus:outline-none focus:border-rose-600'
                      value={this.state.Name}
                      onChange={this.changeNameHandler}
                    />
                  </div>
                  <label className='text-gray-600'> Domain: </label>
                  <select
                  value={this.state.Domain}
                  onChange={this.changeDomainHandler}
                  className='form-select 
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding bg-no-repeat
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-rose-600 focus:outline-none'
                > <option>Select Option ... </option>
                  <option value='Leadership'>Leadership</option>
                  <option value='Business'>Business</option>
                  <option value='Tech'>Tech</option>
                </select>
                  <div className='form-group'>
                    <label className='text-gray-600 pt-2'> Skill: </label>
                    <input
                      type='text'
                      required
                      placeholder='Please enter your Skill'
                      name='Skill'
                      className='peer h-10 w-full border-b-2 text-gray-900  focus:outline-none focus:border-rose-600'
                      value={this.state.Skill}
                      onChange={this.changeSkillHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label className='text-gray-600'> Years: </label>
                    <input
                      type='text'
                      required
                      placeholder='Please enter your Years'
                      name='Years'
                      className='peer h-10 w-full border-b-2 text-gray-900  focus:outline-none focus:border-rose-600'
                      value={this.state.Years}
                      onChange={this.changeYearsHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label className='text-gray-600 pr-4'>Skill Level: </label>
                    <select
                      value={this.state.Level}
                      onChange={this.changeLevelHandler}
                      className='form-select 
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding bg-no-repeat
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-rose-600 focus:outline-none'
                    >
                      <option value='Basic'>Basic</option>
                      <option value='Intermediate'>Intermediate</option>
                      <option value='Expert'>Expert</option>
                    </select>
                    {/* <div className='container'>
                      <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>
                          
                        </div>
                        <div className='col-md-4'></div>
                      </div>
                    </div> */}
                  </div>
                  <button
                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded'
                    onClick={this.saveOrUpdateUser}
                  >
                    Save
                  </button>
                  <button
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded'
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: '10px' }}
                  >
                    Cancel
                  </button>
                  <Link
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                    style={{ marginLeft: '10px' }}
                    to='/users'
                  >
                    Back
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUserComponent;
