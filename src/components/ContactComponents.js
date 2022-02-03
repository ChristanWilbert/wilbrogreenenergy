import React,{Component} from 'react';
import { Breadcrumb,BreadcrumbItem,Label,Row,Col,Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control,Form,Errors} from 'react-redux-form';
import Iframe from 'react-iframe';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    


    
    handleSubmit(values){
        console.log("Current state is: "+ JSON.stringify(values));
        alert("Current state is: "+ JSON.stringify(values));
        this.props.postFeedback(values.firstname,values.lastname,values.telnum,values.email,values.agree,values.contactType,values.message);
    
        this.props.resetFeedbackForm();
        }


    render(postFeedback){
        return(
            <div className="container">
                <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>Contact Us</h3>
                            <hr/>
                        </div>

                    </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            3/376-B,Arafa Shoping Complex,Opp.Edathiruthy Co-operative Bank<br />
                            P.O Edathiruthy,Thrissur-680703<br />
                            Kerala, India<br />
                            <i className="fa fa-phone"></i>: +917025812997<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:wilbrogreenenergy@gmail.com">wilbrogreenenergy@gmail.com</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                        <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.2844016749493!2d76.14839793023684!3d10.37778550019983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9b837f39625b5855!2sWilbro%20Green%20Energy!5e0!3m2!1sen!2sin!4v1639963614461!5m2!1sen!2sin" width="400" height="250" style="border:0;" allowfullscreen="" loading="lazy"></Iframe>
                         </div>
 
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+917025812997"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-success" href="mailto:wilbrogreenenergy@gmail.com"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>
                            Send us Your Feedback
                        </h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values)=> this.handleSubmit(values)} postFeedback={postFeedback}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                    className="form-control" 
                                    placeholder="First Name"
                                    validators={{
                                        required, minLength: minLength(3),maxLength: maxLength(10)
                                    }}/>
                                <Errors
                                    className='text-danger'
                                    model=".firstname"
                                    show='touched'
                                    messages={{
                                        required:"Required",
                                        minLength: 'Must be greater than 2 characters!!',
                                        maxLength: "Must be 15 characters or less"
                                    }}/>
                                    </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                    className="form-control" 
                                    placeholder="Last Name"                                    validators={{
                                        required, minLength: minLength(3),maxLength: maxLength(10)
                                    }}/>
                                <Errors
                                    className='text-danger'
                                    model=".lastname"
                                    show='touched'
                                    messages={{
                                        required:"Required",
                                        minLength: 'Must be greater than 2 characters!!',
                                        maxLength: "Must be 15 characters or less"
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Tel Num</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum"
                                    placeholder="Tel. Number" 
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(2),maxLength: maxLength(15),isNumber
                                    }}/>
                                <Errors
                                    className='text-danger'
                                    model=".telnum"
                                    show='touched'
                                    messages={{
                                        required:"Required",
                                        minLength: 'Must be greater than 2 numbers!!',
                                        maxLength: "Must be 15 numbers or less",
                                        isNumber: "Must be a number"

                                    }}/>
                                </Col>
                                </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                    placeholder="Email" className="form-control"
                                    validators={{
                                        required, validEmail
                                    }}/>
                                <Errors
                                    className='text-danger'
                                    model=".email"
                                    show='touched'
                                    messages={{
                                        required:"Required",
                                        validEmail: 'Invalid email address'

                                    }}/>
                                </Col>
                                </Row>
                            <Row className="form-group">
                                <Col md={{size:6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree"
                                            className="form-check-input"/>
                                            {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size:3, offset: 2}}>
                                    <Control.select model=".contactType" name="contactType"
                                    className="form-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                                <Col md={{size:6, offset: 2}}></Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message" 
                                    rows="12" clasName="form-control"/>
                                </Col>
                                </Row>
                            <Row className="form-group">
                                <Col md={{size:10,offset:2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback</Button>   
                                </Col>
                                </Row>
                        </Form >
                    </div>
                </div>
            </div>
        );
    }
}
export default Contact;