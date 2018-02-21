import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Input, Switch, Button } from 'antd';
import { addEvent, fetchEvents } from '../../../actions/events';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const now = new Date();

let eventsList =  [
    {
        id: 0,
        title: 'All Day Event very long title',
        allDay: true,
        start: new Date(2018, 2, 21),
        end: new Date(2018, 3, 1),
    },
    {
        id: 1,
        title: 'Long Event',
        start: new Date(2018, 3, 7),
        end: new Date(2018, 3, 10),
    },

    {
        id: 2,
        title: 'DTS STARTS',
        start: new Date(2018, 2, 23, 0, 0, 0),
        end: new Date(2018, 2, 24, 0, 0, 0),
    },

    {
        id: 4,
        title: 'Some Event',
        start: new Date(2018, 2, 9, 0, 0, 0),
        end: new Date(2018, 2, 10, 0, 0, 0),
    },
    {
        id: 5,
        title: 'Conference',
        start: new Date(2018, 2, 11),
        end: new Date(2018, 2, 13),
        desc: 'Big conference for important people',
    },
    {
        id: 6,
        title: 'Meeting',
        start: new Date(2018, 2, 12, 10, 30, 0, 0),
        end: new Date(2018, 2, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
        id: 7,
        title: 'Lunch',
        start: new Date(2018, 2, 12, 12, 0, 0, 0),
        end: new Date(2018, 2, 12, 13, 0, 0, 0),
        desc: 'Power lunch',
    },
    {
        id: 8,
        title: 'Meeting',
        start: new Date(2018, 2, 12, 14, 0, 0, 0),
        end: new Date(2018, 2, 12, 15, 0, 0, 0),
    },
    {
        id: 9,
        title: 'Happy Hour',
        start: new Date(2018, 2, 12, 17, 0, 0, 0),
        end: new Date(2018, 2, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day',
    },
    {
        id: 10,
        title: 'Dinner',
        start: new Date(2018, 2, 12, 20, 0, 0, 0),
        end: new Date(2018, 2, 12, 21, 0, 0, 0),
    },
    {
        id: 11,
        title: 'Birthday Party',
        start: new Date(2018, 2, 13, 7, 0, 0),
        end: new Date(2018, 2, 13, 10, 30, 0),
    },
    {
        id: 12,
        title: 'Late Night Event',
        start: new Date(2018, 2, 17, 19, 30, 0),
        end: new Date(2018, 2, 18, 2, 0, 0),
    },
    {
        id: 13,
        title: 'Multi-day Event',
        start: new Date(2018, 2, 20, 19, 30, 0),
        end: new Date(2018, 2, 22, 2, 0, 0),
    },
]

// new Date(Number(start[0]), Number(start[1]), Number(start[2]), Number(startTime[0]), Number(startTime[1]), 0)
// new Date(Number(end[0]), Number(end[1]), Number(end[2]), Number(endTime[0]), Number(endTime[1]), 0)

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
const eventSchema = [{ name: 'title', type: 'text', label: 'Название События' }, { name: 'start', type: 'date', label: 'дата начала' }, { name: 'startTime', type: 'time', label: 'время начала' }, { name: 'end', type: 'date', label: 'дата конца' },{ name: 'endTime', type: 'time', label: 'время конца' }, { name: 'desc', type: 'text', label: 'описание' }]


class Calendar extends Component {
    state = {
        title: '',
        start: '',
        startTime: '',
        end: '',
        endTime: '',
        desc:'',
        switch:false
    }
    onChange(checked) {
        console.log(`switch to ${checked}`);
    }


    componentWillMount(){
        this.props.fetchEvents(this.props.match.params.groupTitle);


    }
    handleSubmit = (e)=>{
        e.preventDefault();

        const event = this.state;

        event.groupTitle = this.props.match.params.groupTitle

        console.log(event)
        this.props.addEvent(event)
    }

    renderFormRows = ()=>{
        return eventSchema.map((item) => {
            return (
                <div style={{ margin: '5px', width: '50%' }}>
                    <label>{item.label}</label>
                    <Input value={this.state[item.name]} 
                           onChange={(e)=>this.setState({[item.name]: e.target.value})} 
                           placeholder={item.name} name={item.name} type={item.type}
                           required />
                </div>
            )
        })
    }
    render(){
        return(
            <div style={{padding: '2%'}}>
                <div className="group_header" style={{ textAlign: 'center' }}>
                    <h1>Календарь группы {this.props.match.params.groupTitle}</h1>
                </div>
                <div className="add_event_form" style={{margint: 'auto', padding: '1%'}}>
                    <h4>Добавить Событие</h4>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderFormRows()}
                        <div style={{ margin: '5px', width: '50%' }}>
                            <label>На весь день?</label>
                            <Switch ref="switch" onChange={()=>this.setState({switch: !this.state.switch})} />
                        </div>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                               Отправить
                            </Button>
                    </form>
                </div>
                <button onClick={this.addEvent}>Добавить Событие</button>
                <div style={{height: '100vh'}}>
                    <BigCalendar
                        events={this.props.events}
                        views={allViews}
                        step={60}
                        showMultiDayTimes
                        defaultDate={new Date(2018, 1, 21)}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({eventsReducer}) => {
    console.log(eventsReducer)
    return {
        events: eventsReducer
    }
}

export default connect(mapStateToProps, { addEvent, fetchEvents })(withRouter(Calendar));