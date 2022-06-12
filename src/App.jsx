import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap'
import api from './services/api'
import './App.css'
export const App = () => {
  const [data, setData] = useState([]);
  const [nome, setNome] = useState('');
  const [documento, setDocumento] = useState('')
  const [sexo, setSexo] = useState(0);

  const list = async () => {
    const response = await api.get('/clientes');
    const results = await response.data;
    console.log(results);
    setData(results);
  }

  useEffect(() => {
    list();
  }, []);

  const handleSubmit = () => {

    api.post('/clientes', {
      nome: nome,
      documento: documento,
      sexo: 0,
    })
      .then((response) => {
        console.log(response);
        setData(response.data)
      });
  }

  return (
    <div className="App">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Informe o nome</Form.Label>
          <Form.Control type="text" placeholder="Insira o nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Informe o documento</Form.Label>
          <Form.Control type="text" placeholder="Insira o documento" value={documento} onChange={(e) => setDocumento(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Masculino" checked />
          <Form.Check type="checkbox" label="Feminino" />
        </Form.Group>
        <Button
          variant="primary"
          onClick={() => handleSubmit()}
        >
          Cadastrar
        </Button>
      </Form>

      <Table responsive="sm">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Documento</th>
            <th>Sexo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => (
            <tr key={key}>
              <th>{item.nome}</th>
              <th>{item.documento}</th>
              <th>{item.sexo == 0 ? 'Masculino' : 'Feminino'}</th>
              <Button color='primary' variant='danger'>Deletar</Button>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default App
