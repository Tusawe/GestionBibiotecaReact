import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class BookList extends Component {

  constructor(props) {
    super(props);
    this.state = {books: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch(`/api/usuario/${this.props.match.params.ins}/libro`)
      .then(response => response.json())
      .then(data => this.setState({books: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/libro/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedBook = [...this.state.books].filter(i => i.id !== id);
      this.setState({books: updatedBook});
    });
  }

  render() {
    const {books, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const bookList = books.map(book => {
      return <tr key={book.id}>
        <td>{book.id}</td>
        <td>{book.titulo}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/user/" + this.props.match.params.ins + "/book/" + book.id}>Editar</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(book.id)}>Borrar</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to={"/user/" + this.props.match.params.ins + "/book/new"}>Añadir libro</Button>
          </div>
          <h3>Lista de libros</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th>ID</th>
              <th>Libro</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {bookList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default BookList;