import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

function NavbarComponent({ handlePlotTypeChange }) {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" style={{ width: '100%' }}>
      <Container>
        <Navbar.Brand href="#">Climate Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Add links here if needed */}
          </Nav>

          {/* Dropdown for selecting plot type */}
          <Form>
            <Form.Group controlId="plotTypeSelector">
              <Form.Label style={{ marginRight: '10px', color: "white" }}>Select Plot Type:</Form.Label>
              <Form.Select onChange={handlePlotTypeChange} style={{ width: '200px' }}>
                <option value="single">Single Plot</option>
                <option value="dual">Dual Plot</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
