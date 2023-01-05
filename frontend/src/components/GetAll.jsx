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
        <MUIDataTable 
            title={"All users Data"}
            data={this.state.persons}
            columns={columns}
            />
    //   <ul>
    //     {
    //       this.state.persons
    //         .map(person =>
    //           <li key={person.Name}>{person.Skill}</li>
    //         )
    //     }
    //   </ul>
    )
  }
}