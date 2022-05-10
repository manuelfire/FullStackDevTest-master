import React, { useState } from 'react';
import './ConfigWidget.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const ConfigWidget = (props) => {
    
   const {setValidStateConfig,serverError} = props;
   const isServerValid = new RegExp("[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+");
   const [invalidClass, setInvalidClass] = useState("");
   const [config,setConfig] = useState({
      username: "",
      password: "",
      server:"",
      port:"",
      encryption : "Unencrypted",
      serverType : "IMAP",
  
    });

    function handleinputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      
      if(name === "server" && isServerValid.test(value)) {

            setInvalidClass("");
                  
      }else if(name === "server" && !isServerValid.test(value)){

            setInvalidClass("invalidField");
                  
      }
      
      setConfig({
            ...config,[name]: value
          });
      
      
      
    }

    function handleSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false && invalidClass ==="invalidField") {
       
          event.stopPropagation();
        }else{

            setValidStateConfig(config);
           
        }
    
       
      }
  
    
      return (
        <Container >
                <Row>
                  <Col sm={10}></Col>
                  <Col sm={1} md="auto">{serverError}</Col>
            </Row>
        <Form  onSubmit={handleSubmit}>
          
            <Row> 
                  <Form.Group as={Col} xs="auto">
                          <Form.Label >Server type</Form.Label>
                           <Form.Select name="serverType" aria-label="IMAP or POP3?" value={config.serverType} onChange={handleinputChange}>
                           <option value="IMAP">IMAP</option>
                            <option value="POP3">POP3</option>
                           </Form.Select>
                           </Form.Group>
                   <Form.Group as={Col} xs="auto">
                          <Form.Label >
                          Encryption
                          </Form.Label>
                          <Form.Select name="encryption" value={config.encryption} onChange={handleinputChange}>
                          <option value="Unencrypted">Unencrypted</option>
                          <option value="SSL/TLS">SSL/TLS</option>
                          <option value="STARTTLS">STARTTLS</option>
                          </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} xs="auto" >
                          <Form.Label >
                           Server
                          </Form.Label>
                          <Form.Control type="text" className={invalidClass} name="server" value={config.server} onChange={handleinputChange}  />
                    </Form.Group>
                    <Form.Group as={Col} xs="auto" >
                          <Form.Label >
                           Port
                           </Form.Label>
                          <Form.Control  type="number" name="port" value={config.port} onChange={handleinputChange} />
                    </Form.Group>
                    <Form.Group as={Col} xs="auto">
                          <Form.Label >Username</Form.Label>
                          <Form.Control  type="text" name="username" value={config.username} onChange={handleinputChange} />
            
                    </Form.Group>
                    <Form.Group as={Col} xs="auto">
                          <Form.Label >Password</Form.Label>
                          <Form.Control  type="password" name="password" value={config.password} onChange={handleinputChange}/>
                    </Form.Group>
                    </Row>
                    
                    <Button style={{marginTop:'10px'}} type="submit" >Start</Button>
        
        </Form>
        </Container>
      );
    
  }

  export default ConfigWidget
  