import React,{ Component} from "react";
import { Card, CardImg, CardText, CardBody,Breadcrumb,BreadcrumbItem,Label,Row,Col,Button,
    CardTitle,Modal,ModalBody,ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control,LocalForm,Errors} from 'react-redux-form'
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import {FadeTransform,Fade, Stagger } from "react-animation-components";

const required = (val) => val && val.length;
const minLength = (len) => (val) => (val) && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false,
            username:'',
            password:''
        };
        this.toggleModal =this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        }

    
    toggleModal(){
        this.setState({isModalOpen:!this.state.isModalOpen});
    }
    
    
    
    handleSubmit(values){
        this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);
        this.setState({isModalOpen:!this.state.isModalOpen});
    }    
    render(){
        return(
            <div className="col-12 col-md-9">
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values)=> this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="Rating" md={10}>Rating</Label>
                                    <Col md={10}>
                                        <Control.select model=".rating" 
                                        className="form-select" aria-label="rating"
                                        validators={{required}}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        </Control.select>
                                    </Col>
                                    <Errors className='text-danger'
                                        model='.rating'
                                        show='touched'
                                        messages={{required:"Required"}}/>
                                    </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={10}>Your Name</Label>
                                    <Col md={10}>
                                        <Control.text model=".author" id="author" name="author"
                                        className="form-control" 
                                        placeholder="Name"
                                        validators={{
                                            required, minLength: minLength(3),maxLength: maxLength(15)
                                        }}/>
                                    <Errors
                                        className='text-danger'
                                        model=".author"
                                        show='touched'
                                        messages={{
                                            required:"Required",
                                            minLength: 'Must be greater than 2 characters!!',
                                            maxLength: "Must be 15 characters or less"
                                        }}/>
                                        </Col>
                                </Row>
        
                                <Row className="form-group">
                                    <Label htmlFor="feedback" md={10}>Comment</Label>
                                    <Col md={10}>
                                        <Control.textarea model=".comment" id="comment" name="comment" 
                                        rows="6" clasName="form-control"/>
                                    </Col>
                                    </Row>
                                <Row className="form-group">
                                    <Col md={{size:10,offset:2}}>
                                        <Button type="submit" color="primary">
                                            Submit</Button>   
                                    </Col>
                                    </Row>
                            </LocalForm>
            </ModalBody>
            </Modal>
            <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
            </div>
            )
        }
}
    function RenderDish({dish}) {
        if (dish != null)
            return(
                <FadeTransform in
            transformProps={{
                exitTransform:'scale(0.5) translateY(-50)'
            }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </FadeTransform>
            );
        else
            return(
                <div></div>
            );
    }

    function RenderComments({comments,postComment,dishId}) {
            
        if (comments != null)
        return(
        <CardText>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                <Stagger in>
                { comments.map((item) => {
                    return (
                        <Fade in>
                        <li key={item.id}>{item.comment}
                        <br/>
                        --{item.author} 
                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
                                .format(new Date(Date.parse(item.date)))}<br /><br /></li></Fade>);
                })}</Stagger>
            </ul>
            <CommentForm dishId={dishId} postComment={postComment}/>
        </CardText>
            
            
    );

        else
            return(
                <div></div>
            );}
    
    const DishdetailComponent=(props)=>{
        if (props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div> 
                </div>
            );
        }
        else if (props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div> 
                </div>
            );
        }
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/Menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>

                </div>
                <div className="row">
                  <div  className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                  </div>
                  <div className="col-12 col-md-5 m-1">
                      <Card>
                          <CardBody>
                              <RenderComments comments={props.comments}
                              postComment={props.postComment}
                              dishId={props.dish.id}/>
                            </CardBody>
                            
                        </Card>
                  </div>
                </div>
            </div>
        );
    }



export default DishdetailComponent;
