import { Container } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import './global.css'

import { Header, Form, PaySlip, TaxDetails, BPJSDetails, CompanyOutlay } from './components'

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Container>
        <Form />
        <PaySlip />
        <TaxDetails />
        <BPJSDetails />
        <CompanyOutlay />
      </Container>
    </div>
  )
}

export default App
