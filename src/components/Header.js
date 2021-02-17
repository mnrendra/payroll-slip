import { Navbar } from 'react-bootstrap'

const Header = () => {
  return (
    <div className='Header'>
      <Navbar bg='light' expand='lg' style={{ borderBottom: '1px solid rgba(0, 0, 0, .12)', padding: '12px 24px' }}>
        <Navbar.Brand style={{ cursor: 'default' }}>React-Bootstrap</Navbar.Brand>
      </Navbar>
    </div>
  )
}

export default Header
