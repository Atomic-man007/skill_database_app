import React from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";

const columns = [
    {
        name: "Name",
        label: "Name"
    },
    {
        name: "Skill",
        label: "Skill"
    },
    {
        name: "Domain",
        label: "Domain"
    },
    {
        name: "Years",
        label: "Years"
    },
    {
        name: "Level",
        label: "Level"
    }
]


export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/all_users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <div className='bg-gradient-to-r from-sky-400 to-indigo-400 pb-4 h-full container-xxl'>
        <MUIDataTable 
            title={"All users Data"}
            data={this.state.persons}
            columns={columns}
            options={{
              selectableRows: false // <===== will turn off checkboxes in rows
            }}
            />
            <div>
            <br></br>
            <button className="bg-blue-500 ps-2 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={(e) => {
              e.preventDefault();
              window.location.href='/users';
              }}>Go Back to users page</button>
            </div>
        </div>
    )
  }
}