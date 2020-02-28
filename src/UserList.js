import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Card } from 'reactstrap';
import AppNavbar from './AppNavbar';
import ToggleBox from './ToggleBox';

import { Link } from 'react-router-dom';

class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {users: [], isLoading: true}; 
    this.remove = this.remove.bind(this);
  }

  showChange(caja){
    console.log(caja);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/api/usuario')
      .then(response => response.json())
      .then(data => this.setState({users: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/usuario/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedUser = [...this.state.users].filter(i => i.id !== id);
      this.setState({users: updatedUser});
    });
  }

  render() {
    const {users, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const userList = users.map(user => {
      return <tr key={user.id}>
        <td>{user.id}</td>
        <td>
          <ToggleBox title={user.nombre}>
            <Card>
                <ul className="list-group">
                  
                  {
                    user.libros.map(libro => {
                      return <li key={libro.id} className="list-group-item list-group-item-primary">
                          Titulo: {libro.titulo}
                          </li>;
                    })
                  }
                  
                </ul>
            </Card>
          </ToggleBox>
        </td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/user/" + user.id}>Editar</Button>            
            <Button size="sm" color="warning" tag={Link} to={"/user/" + user.id+ "/book"}>Libros</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(user.id)}>Borrar</Button>
          </ButtonGroup>
          
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/user/new">Añadir usuario</Button>
          </div>
          <h3>Lista de usuarios</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {userList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default UserList;