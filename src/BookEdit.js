import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class BookEdit extends Component {

  emptyItem = {
    id:'',
    isbn:'',
    titulo: '',
    editorial: '',
    npaginas: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      users: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.hor !== 'new') {
      const book = await (await fetch(`/api/usuario/${this.props.match.params.ins}/libro/${this.props.match.params.hor}`)).json();
      this.setState({item: book});
    }
    fetch('/api/usuario')
      .then(response => response.json())
      .then(data => this.setState({users: data}));
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;   
    await fetch(`/api/usuario/${this.props.match.params.ins}/libro`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push(`/user/${this.props.match.params.ins}/book`);
  }

  render() {
    const {item} = this.state;
    this.emptyItem.usuario = item.usuario
    const title = <h2>{item.titulo ? 'Editar Libro' : 'Añadir Libro'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="id">Id</Label>
            <Input type="number" name="id" id="id" value={item.id || ''}
                   onChange={this.handleChange} autoComplete="id" disabled/>
          </FormGroup>
          <FormGroup>
            <Label for="isbn">ISBN</Label>
            <Input type="text" name="isbn" id="isbn" value={item.isbn || ''}
                   onChange={this.handleChange} autoComplete="isbn"/>
          </FormGroup>
          <FormGroup>
            <Label for="titulo">Titulo</Label>
            <Input type="text" name="titulo" id="titulo" value={item.titulo || ''}
                   onChange={this.handleChange} autoComplete="titulo"/>
          </FormGroup>
          <FormGroup>
            <Label for="editorial">Editorial</Label>
            <Input type="text" name="editorial" id="editorial" value={item.editorial || ''}
                   onChange={this.handleChange} autoComplete="editorial"/>
          </FormGroup>
          <FormGroup>
            <Label for="npaginas">Número de páginas</Label>
            <Input type="number" name="npaginas" id="npaginas" value={item.npaginas || ''}
                   onChange={this.handleChange} autoComplete="npaginas"/>
          </FormGroup>
          {/* <FormGroup>
            <Label for="usuario">Usuario</Label>
            <select onChange={this.handleChange}>
              {(this.state.users.map(user => {
                user.libros = null
                return <option name="usuario" id="usuario">{user.nombre}</option>
              }))}
            </select>
          </FormGroup> */}
          <FormGroup>
            <Button color="primary" type="submit">Guardar</Button>{' '}
            <Button color="secondary" tag={Link} to={"/user/" + this.props.match.params.ins + "/book"}>Cancelar</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(BookEdit);
