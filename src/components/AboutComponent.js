import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from "./LoadingComponent";
import { siteUrl } from '../shared/baseUrl';
import {FadeTransform, Stagger } from "react-animation-components";


function RenderLeader({leader}){
            return(
                <div key={leader.id} className="col-12 mt-5">
                    <FadeTransform in
            transformProps={{
                exitTransform:'scale(0.5) translateY(-50)'
            }}>
                    <Stagger in>
                    <Media tag="li">
                    <Media left middle>
                        <Media object src={siteUrl+ leader.image} alt={leader.name} />
                    </Media>
                    <Media body className="ml-4">
                        <Media heading>{leader.name}</Media>
                        <Media tag="h6">{leader.designation}</Media>
                        <p>{leader.description}</p>
                    </Media>
                    </Media>
                    </Stagger>
                    </FadeTransform>
                </div>
        );
    }





function About(props) {
    const menu = props.leaders.leaders.map((leader) => {
        return (
          <div key={leader.id} className="col-12 m-1">
              <RenderLeader leader={leader}/>
          </div>
        );
    });
    if (props.leaders.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div> 
            </div>
        );
    }
    else if (props.leaders.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.leaders.errMess}</h4>
                </div> 
            </div>
        );
    }
    else
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Started in 2016, Wilbro Green Energy quickly established itself as a fast growing enterprise providing sustainable solutions for energy needs particulary in the state of kerala. With its unique brand of WELLGEN solar panels that can be found nowhere else, it enjoys patronage from the large factories and industries in Kerala.
                          </p>
                    <p>The company traces its humble beginnings to <em>Go Green</em>, a successful initiative started by our CEO, Mr. Wilbert Joseph Maliackal, that featured for the unique way of sustainable developement by harnessing solar power.</p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">5 Jan. 2016</dd>
                                <dt className="col-6">Proprietor</dt>
                                <dd className="col-6">Wilbert Joseph Maliackal</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$13,375</dd>
                                <dt className="col-6">Major Project Completions</dt>
                                <dd className="col-6">32</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">Our universe is a sea of energy-free,clean energy. it is all out there waiting for us to set sail upon it.</p>
                                <footer className="blockquote-footer">Robert Adams
                
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <Media list>
                        {menu}
                    </Media>
                </div>
            </div>
        </div>
    );
}

export default About;    