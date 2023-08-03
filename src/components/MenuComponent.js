import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { siteUrl } from "../shared/baseUrl";

function RenderMenuItems({ dish }) {
  return (
    <Card key={dish.id} className="shadow">
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={siteUrl + dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

const Menu = (props) => {
  const menu = props.dishes.dishes.map((dish) => {
    return (
      <div key={dish.id} className="m-2">
        <RenderMenuItems dish={dish} />
      </div>
    );
  });
  if (props.dishes.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.dishes.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.dishes.errMess}</h4>
        </div>
      </div>
    );
  } else
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Products</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Products</h3>
            <hr />
          </div>
        </div>
        <div className="row d-flex align-content-around">{menu}</div>
      </div>
    );
};

export default Menu;
