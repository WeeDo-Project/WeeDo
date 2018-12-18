import React, { Component } from 'react'
import PlansService from '../../PlansService'
import { Link, Redirect } from "react-router-dom";
import Map from "../../Map/Map.jsx"
import "./PlanPage.css"

export default class PlanPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      plan_id: this.props.match.params.id,
      plan: null,
      notifications: null,
      redirectWhenDelete: false
    }

    this.plansService = new PlansService();


  }


  componentDidMount() {
    this.plansService.getPlan(this.state.plan_id)
      .then(response => {
        this.plansService.getNotifications(this.state.plan_id)
          .then(responseNotifications => {
            console.log(responseNotifications)
            console.log(response)
            this.setState({ ...this.state, plan: response.plan, notifications: responseNotifications.confirmations })
          })
      })
  }

  handleDeletePlan = (e) => {
    e.preventDefault();
    console.log("holaaa delete")
    const { plan_id } = this.state;

    this.plansService.deletePlan(plan_id)
      .then(response => {
        console.log("planesborrados", response.message)
        if (response.message === "Plan deleted!") {
          this.setState({ ...this.state, redirectWhenDelete: true })
        }
      });
  }

  acceptPlan = (id) => {
    this.plansService.acceptPlan(id)
      .then(response => {
        console.log(response)
      })
  }

  declinePlan = (id) => {
    this.plansService.declinePlan(id)
      .then(response => {
        console.log(response)
      })
  }

  planRequest = (id) => {
    this.plansService.planRequest(id)
      .then(response => {
        console.log(response)
      })
  }

  addPlanFav = (id) => {
    this.plansService.addPlanFav(id)
      .then(response => {
        console.log(response)
      })
  }

  delPlanFav = (id) => {
    this.plansService.delPlanFav(id)
      .then(response => {
        console.log(response)
      })
  }

  printPlan = (planRequest, addPlanFav, delPlanFav) => {
    const { title, description, date, chat } = this.state.plan
    const users = this.state.plan.users.length
    return (
      <React.Fragment>
        <div className="planImage">
          <img src="https://as01.epimg.net/tikitakas/imagenes/2017/08/16/portada/1502909050_145252_1502909120_noticia_normal.jpg" />
          <Link to={`/profile/${this.state.plan.owner._id}`}><img className="planImageOwner" src={this.state.plan.owner.image} /></Link>
        </div>
        <div className="informationPlan">
          <div className="headerPlan">
            <div className="datePlan">
              {date}
            </div>
            <div className="titlePlan">
              {title}
            </div>
          </div>
          <div className="locationPlan">
            {this.state.plan.location.lat}
          </div>
          <div className="descriptionPlan">
          <p className="descriptionPlan2">Descripción del plan</p>
          <p className="descriptionPlan3">{description}</p>
          </div>
          <div className="usersPlan">
            <p>{users} personas van a acudir</p>
            <span>{this.state.plan.users.map(function (user, index) {
                  return (
                    <Link to={`/profile/${user._id}`}><img src={user.image} /></Link>
                  )
                })}</span>
          </div>
          <div className="buttonsPlan">
            <button onClick={() => planRequest(this.state.plan_id)}>Quiero apuntarme</button>
            <button onClick={() => addPlanFav(this.state.plan_id)}>Add to Favourites</button>
            <button onClick={() => delPlanFav(this.state.plan_id)}>Del from Favourites</button>
            <form onSubmit={this.handleDeletePlan} className="new-plan-form">
              <input type="submit" value="delete-plan" />
            </form>
            {/* <Link to={`/chat/${chat}`}><p> Chat</p></Link> */}
          </div>
        </div>
      </React.Fragment>
    )
  }

  printMap = () => {
    console.log(this.state.plan)
    return (
      <React.Fragment>

        <Map center={this.state.plan.location} view={false} />
      </React.Fragment>
    )
  }

  printNotifications = (acceptPlan, declinePlan) => {
    return (
      <React.Fragment>
        {this.state.notifications.map(function (notification, index) {
          return (
            <div>
              <div>{notification.plan.title}</div>
              <div>{notification.user.username}</div>
              <div><img src={notification.user.image} /></div>
              <div>
                <button onClick={() => acceptPlan(notification._id)}>✓</button>
                <button onClick={() => declinePlan(notification._id)}>X</button>
              </div>
              <Link to={`/profile/${notification.user._id}`}><p>View profile</p></Link>
            </div>
          )
        })}
      </React.Fragment>
    )
  }

  render() {

    if (this.state.redirectWhenDelete) {
      return <Redirect to={"/ownplans"} />
    }

    return (

      <div>
        {
          this.state.plan !== null &&
          <div>
            {this.printPlan(this.planRequest, this.addPlanFav, this.delPlanFav)}
            <br></br>
            <br></br>
            <br></br>
          </div>

        }

        {
          this.state.notifications !== null &&
          <div>{this.printNotifications(this.acceptPlan, this.declinePlan)}</div>

        }

        {/* {this.state.plan !== null &&

          <div> {this.printMap()} </div>
        } */}

      </div>
    )
  }
}
