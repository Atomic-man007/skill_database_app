import React, { Component } from 'react';
import UserService from '../services/UserService';

class ListUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser(id) {
    UserService.deleteUser(id).then((res) => {
      this.setState({
        users: this.state.users.filter((user) => user.id !== id),
      });
    });
  }
  viewUser(id) {
    this.props.history.push(`/view-user/${id}`);
  }
  editUser(id) {
    this.props.history.push(`/add-user/${id}`);
  }

  componentDidMount() {
    UserService.getUsers().then((res) => {
      if (res.data == null) {
        this.props.history.push('/add-user/_add');
      }
      this.setState({ users: res.data });
    });
  }

  addUser() {
    this.props.history.push('/add-user/_add');
  }

  render() {
    return (
      <div className='bg-gradient-to-r from-sky-400 to-indigo-400 '>
        <div className='container '>
          <h2 className='text-center heading-secondary pt-4'>Users List</h2>

          <div className='row'>
            <button className='btn btn-primary mb-3' onClick={this.addUser}>
              {' '}
              Add User
            </button>
          </div>
          <div className='row'>
            <table className='table mb-5 bg-white tableCustom'>
              <thead>
                <tr>
                  <th> User Name</th>
                  <th> User Skill</th>
                  <th> User Domain</th>
                  <th> User Years</th>
                  <th> User Level</th>
                  <th> Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user) => (
                  <tr key={user.id}>
                    <td> {user.Name} </td>
                    <td> {user.Skill}</td>
                    <td> {user.Domain}</td>
                    <td> {user.Years}</td>
                    <td> {user.Level}</td>
                    <td>
                      <button
                        onClick={() => this.editUser(user.id)}
                        className='btn btn-outline-warning'
                      >
                        Update{' '}
                      </button>
                      <button
                        style={{ marginLeft: '10px' }}
                        onClick={() => this.viewUser(user.id)}
                        className='btn btn-outline-info'
                      >
                        View{' '}
                      </button>
                      <button
                        style={{ marginLeft: '10px' }}
                        onClick={() => this.deleteUser(user.id)}
                        className='btn btn-outline-danger'
                      >
                        Delete{' '}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ListUserComponent;
