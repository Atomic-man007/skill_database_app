import React, { Component } from 'react';
import UserService from '../services/UserService';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import { cyan, amber, red } from '@mui/material/colors';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ColorButton = styled(IconButton )(({ theme }) => ({
  color: theme.palette.getContrastText(cyan[400]),
  backgroundColor: cyan[400],
  '&:hover': {
    backgroundColor: cyan[700],
  },
}));

const ColorButtonamber = styled(IconButton )(({ theme }) => ({
  color: theme.palette.getContrastText(amber[400]),
  backgroundColor: amber[400],
  '&:hover': {
    backgroundColor: amber[700],
  },
}));
const ColorButtonred = styled(IconButton )(({ theme }) => ({
  color: theme.palette.getContrastText(red[400]),
  backgroundColor: red[400],
  '&:hover': {
    backgroundColor: red[700],
  },
}));

class ListUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      open: false,
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
  handleClickOpen = () => {
    this.setState({
      open:this.state(true)
    });
  }
  handleClose  = () => {
    this.setState({
      open:this.state(false)
    });
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
          <div>
              <button className="btn btn-primary" onClick={this.addUser}> Add User</button>
          </div>
       <br></br>
       <div>
       <button className="btn btn-dark" onClick={(e) => {
        e.preventDefault();
        window.location.href='/getall';
        }}>Click here to view or download users data</button>
      </div>
      <br></br>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1000 }} aria-label="customized table">
              <TableHead>
              <TableRow>
                <StyledTableCell>User Name</StyledTableCell>
                <StyledTableCell align="center">User Domain</StyledTableCell>
                <StyledTableCell align="center">User Skill</StyledTableCell>
                <StyledTableCell align="center">User Years</StyledTableCell>
                <StyledTableCell align="center">User Level</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {this.state.users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.Name}
                </StyledTableCell>
                <StyledTableCell align="center">{user.Domain}</StyledTableCell>
                <StyledTableCell align="center">{user.Skill}</StyledTableCell>
                <StyledTableCell align="center">{user.Years}</StyledTableCell>
                <StyledTableCell align="center">{user.Level}</StyledTableCell>
            <DialogActions style={{ justifyContent: "space-evenly" }}>
              <ColorButtonamber size="small"
                onClick={() => this.editUser(user.id)}
              >
              <EditTwoToneIcon />
              </ColorButtonamber>
              <ColorButton size="small"
              onClick={() => this.viewUser(user.id)}>
              <RemoveRedEyeTwoToneIcon />
              </ColorButton>
              <ColorButtonred size="small"
              onClick={() => this.deleteUser(user.id)}>
              <DeleteForeverTwoToneIcon />
              </ColorButtonred>
              </DialogActions>
              </StyledTableRow>
            ))}
            </TableBody>
          </Table>
      </TableContainer> 
      <br></br>
        </div>
      </div>
    );
  }
}

export default ListUserComponent;
