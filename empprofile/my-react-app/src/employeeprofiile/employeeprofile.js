import { Badge, NavDropdown, Nav, Navbar, Container } from "react-bootstrap";
import './employee.css';
import { FaBars } from 'react-icons/fa';
import { RiChat1Line, RiNotification2Line } from 'react-icons/ri';
import details from './data';

function EmployeeProfile() {
  return (
    <>
      <Navbar  fluid ="true" bg="carrot" expand="lg" className="bg-body-carrot  " style={{ height: '60px', background: 'linear-gradient(to right, #ff7e5f, #feb47b)', margin: '0' ,width:"100%"}}>
        <Container >
          <div className="logo-container d-flex align-items-center">
            <img
              src={details[0].image}
              width="30"
              height="30"
              className="d-inline-block align-top text-center img-responsive"
              alt="logo"
            />
            <FaBars className="menu-icon" />
          </div>

          <Navbar.Brand href="#home" style={{ color: 'white', marginTop: '0px' }} className="heading ms-sm-2, mt-lg-0">Dream Technologies</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end ms-auto">
              <Container className="container mr-sm-9 d-flex align-items-center" style={{marginLeft:"70px"}}>
                <form action="#" method="post" className="serach-bar">
                  <input style={{ color: 'red' }} type="text" name="search-bar" placeholder="search" />
                  <button type="submit"><img src={details[0].search} alt="icon" className="white-icon" /></button>
                </form>
              </Container>

              <div className="logo-container ms-sm-2, mt-lg-0"  >
                <img
                  className="image"
                  style={{ marginRight: '-5px', marginTop: "33px" }}
                  src={details[0].usa}
                  width="0"
                  height="0"
                  alt="logo"
                />
              </div>

              <NavDropdown title="English" id="basic-nav-dropdown" className="text-white" style={{ marginTop: "20px", fontSize: "15px" }}>
                <NavDropdown.Item href="#">application</NavDropdown.Item>
                <NavDropdown.Item href="#">home</NavDropdown.Item>
                <NavDropdown.Item href="#">blog</NavDropdown.Item>
                <NavDropdown.Item href="#">contact</NavDropdown.Item>
              </NavDropdown>

                            

<RiNotification2Line id="icon" className="notification-icon" style={{marginTop:"30px"}} />
<h6>
  <Badge bg="primary" style={{ marginTop: "20px", marginRight: "20px" }} >3</Badge>
</h6>

<RiChat1Line  id="icon"  className="notification-icon"  style={{color:"white" ,marginTop:"30px"}} />
<h6>
  <Badge bg="primary" style={{ marginTop: "20px", marginRight: "10px" }} >3</Badge>
</h6>










              <div className="logo-container ms-sm-2, mt-3">
                <img
                  style={{ marginTop: "0px", borderRadius: "15px" }}
                  src={details[0].profile}
                  width="30"
                  height="30"
                  className="d-inline-block align-top mr-sm-2"
                  alt="logo"
                />
              </div>

              <NavDropdown title="Admin" id="basic-nav-dropdown" className="text-white" style={{ marginTop: "20px", fontSize: "15px" }}>
                <NavDropdown.Item href="#">application</NavDropdown.Item>
                <NavDropdown.Item href="#">home</NavDropdown.Item>
               
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    
    </>
  );
}









export default EmployeeProfile;