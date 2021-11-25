import React, { Component } from "react";
import PubSub from "pubsub-js";

class Burger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.tokenClose);
    PubSub.unsubscribe(this.tokenRoute);
  }
  componentDidMount() {
    this.tokenRoute = PubSub.subscribe("ROUTE_UPDATE", (e, d) => {
      this.setState({
        active: false
      });
    });

    this.tokenClose = PubSub.subscribe("BURGER.CLOSE", (e, d) => {
      this.setState(
        {
          active: false
        },
        () => {
          PubSub.publish("BURGER", this.state.active);
        }
      );
    });
  }

  _onClick() {
    this.setState(
      {
        active: !this.state.active
      },
      () => {
        PubSub.publish("BURGER", this.state.active);
      }
    );
  }

  render() {
    const { active } = this.state;
    const burgerClass = active ? "active" : "";
    return (
      <div
        className={"burger-wrapper sm-only " + burgerClass}
        onClick={() => this._onClick()}
        role='button'
        tabIndex={0}>
        <div className='burger'></div>
      </div>
    );
  }
}

export default Burger;
