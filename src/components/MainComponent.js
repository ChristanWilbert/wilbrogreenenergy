import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponents';
import DishdetailComponent from './DishdetailComponent';
import { Component } from 'react/cjs/react.production.min';
import {Switch, Route,Redirect} from "react-router-dom";
import About from './AboutComponent';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import { actions } from 'react-redux-form';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders,postFeedback } from '../redux/ActionCreators';
import {TransitionGroup,CSSTransition} from 'react-transition-group';


const mapStateToProps =state =>{
  return {
    dishes:state.dishes,
    comments: state.comments,
    promotions:state.promotions,
    leaders:state.leaders

  }
}


const mapDispatchToProps = dispatch =>({
  postComment: (dishId,rating,author,comment)=> dispatch(postComment(dishId,rating,author,comment)) ,
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm:()=>{dispatch(actions.reset("feedback"))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () =>{dispatch(fetchLeaders())},
  postFeedback: (firstname,lastname,telnum,email,agree,constactType,message) => {dispatch(postFeedback(firstname,lastname,telnum,email,agree,constactType,message))}
});


class Main extends Component {

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  
  render(){

    const Homepage=()=>{
      return(
        <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leaders={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leadersLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}
          />
      );

    }

    const DishWithId =({match})=>{
      return(
        <DishdetailComponent dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
      />
      );
    }

    return (
      <div>
          <Header/>
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch>
            <Route path="/home" component={Homepage}/>
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
            <Route path="/menu/:dishId" component={DishWithId}/>
            <Route exact path="/contactus" component={()=><Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
            <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />}/>
            <Redirect to="/home"/>
          </Switch>
            </CSSTransition>
          </TransitionGroup>
           <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
