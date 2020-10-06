import React, { Component } from 'react'
import {
    Card, CardImg, CardBody, CardTitle, CardText,
    CardSubtitle, Container, Row, Col
} from 'reactstrap';

import classes from './SingleFeedStructure.module.css';


export default class SingleFeedStructure extends Component {
    render() {
        return (
            <div>
                <Card className={classes.MainCard}>
                    <CardBody className={classes.CardHeaderBody}>
                        <Container>
                            <Row>
                                <Col xs="2">
                                    <CardImg className={classes.CardHeaderImage}
                                    src={this.props.data.userAvatar}
                                    alt="user img" />
                                </Col>

                                <Col xs="10">
                                    <CardTitle className={classes.CardHeaderTitle}>
                                        {this.props.data.userName}
                                    </CardTitle>
                                    <CardSubtitle className={classes.CardHeaderDate}>
                                        {this.props.data.date}
                                    </CardSubtitle>
                                </Col>
                            </Row>
                        </Container>
                    </CardBody>
                
                    <CardBody className={classes.CardDescription} >
                        <CardText>{this.props.data.title}</CardText>
                    </CardBody>

                    <CardImg className={classes.MainCardGif} 
                    src={this.props.data.gifUrl}
                    // src="https://media2.giphy.com/media/gVoPEm5JkFdwUBNMoU/giphy.gif?cid=70002724ab861197151419f26e22777d9006ba598ee59ad7&rid=giphy.gif"
                    alt="gif" />

                </Card>
            </div>
        )
    }
}
