import axios from "axios";
import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";




function ForgotPassword() {
    const[values, setValues] = useState({idNumber: "", email: ""})
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    
    }


    const handleSubmit = async(event) => {

        event.preventDefault()

        const res = await axios.post('/userroute/forgot_password', {...values});
        if(res.data.msg) {
            alert(res.data.msg)
        } else{

            navigate('/reset', { state: {data: res.data.accessToken}})


        }



    }


return(<>
<Container style={{marginTop: "4rem", fontFamily: "Times New Roman"}}>
        <h4 className="text-center">Enter Details For Password Reset</h4>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
      
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
            
              

              <Form.Group className="mb-3" controlId="formBasicAuthorCountry">
                
                <Form.Control
                  type="text"
                  name="idNumber"
                  value={ values.idNumber }
                  onChange={handleChange}

                  placeholder="write your ID number"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                
                <Form.Control
                  type="email"
                  name="email"
                  value={ values.email }
                  onChange={handleChange}

                  placeholder="write your email"
                  required
                />
              </Form.Group>




              <Button type="submit">Submit</Button>


</Form>
</Col>
</Row>
</Container>
    



</>)
}

export default ForgotPassword