import React from "react";
import moment from "moment";

//import "../styles/calendar.css";

export default class Calendar extends React.Component {

    state = {
        days: [],

        selectedDay: ""
    }

    constructor() {
        super();

        this.loadCalendar = this.loadCalendar.bind(this);
    }

    loadCalendar() {
        const date = new Date();
        const year = this.props.year;
        const month = this.props.month;

        const firstDayOfCurrentMonth = parseInt(new Date(year, month).getDay());
        const daysInMonth = parseInt(new Date(year, month + 1, 0).getDate());

        var emptyDaysBefore = [];
        var emptyDaysAfter = [];
        for (let i = 1; i < firstDayOfCurrentMonth; i++) emptyDaysBefore.push("");
        for (let i = 0; i < (42 - (daysInMonth + firstDayOfCurrentMonth) + 1); i++) emptyDaysAfter.push("");

        if (emptyDaysBefore.length === 7) emptyDaysBefore = [];
        if (emptyDaysAfter.length === 7 || emptyDaysAfter.length === 14) emptyDaysAfter = [];

        var days = [];
        for (let i = 0; i < daysInMonth; i++) {
            const day = (i + 1) + "/" + (parseInt(month) + 1) + "/" + year;
            days.push(day)
        }

        const calendar = emptyDaysBefore.concat(days);
        this.setState({ days: calendar });
    }

    componentDidMount() {
        //this.loadCalendar();
    }

    render() {
        const currentDay = parseInt(String(new Date().getDate()).padStart(2, "0"));

        return(
            <div id="calendar">
                <div className="heading">Po</div>
                <div className="heading">Ut</div>
                <div className="heading">St</div>
                <div className="heading">Št</div>
                <div className="heading">Pi</div>
                <div className="heading">So</div>
                <div className="heading">Ne</div>

                {this.props.calendarDays.map((day) => {
                    const dayNumber = parseInt(day.split("/")[0]);

                    if (day === "") return <div className="empty" />
                    if (dayNumber < currentDay && this.props.month === new Date().getMonth()) return <div className="empty">{dayNumber}</div>

                    const formattedDay = day.split("/")[0].length === 1 ? "0" + day.split("/")[0] : day.split("/")[0];
                    const formattedMonth = day.split("/")[1].length === 1 ? "0" + day.split("/")[1] : day.split("/")[0];
                    const formattedYear = day.split("/")[2];
                    const formattedDate = formattedDay + "/" + formattedMonth + "/" + formattedYear;

                    return (
                        <div
                            className="block"
                            onClick={() => this.props.setDay(formattedDate)}
                            style={this.props.selectedDay === formattedDate ? { backgroundColor: "rgb(235, 172, 1)", color: "white" } : null}
                        >
                            {dayNumber}
                        </div>
                    )
                })}
            </div>
        )
    }
}