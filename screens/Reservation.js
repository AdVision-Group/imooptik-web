import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";

import { getValidTimesByDate } from "../config/Calendar";
import { redirect, hideTransition, showTransition } from "../config/Config";
import { hideBanner, showBanner } from "../components/Banner";

import SmoothScroll from "../components/SmoothScroll";

import Api from "../config/Api";

import Calendar from "../components/Calendar";
import Loading from "../components/Loading";
import Popup from "../components/Popup";
import Heading from "../components/Heading";

//import "../styles/reservation.css";

const months = [ "Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December" ];

class Reservation extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",

        calendars: [],
        calendar: null,
        service: null,
        validTimes: [],

        day: "",
        time: "",

        calendarDays: [],

        year: new Date().getFullYear(),
        month: new Date().getMonth(),

        loading: false,

        popup: false,
        popupLoading: false,
        title: "",

        step: 1
    }

    constructor() {
        super();

        this.getCalendars = this.getCalendars.bind(this);
        this.setCalendar = this.setCalendar.bind(this);
        this.setService = this.setService.bind(this);
        this.setDay = this.setDay.bind(this);
        this.setTime = this.setTime.bind(this);
        this.createReservation = this.createReservation.bind(this);
        this.setBookingLineClamp = this.setBookingLineClamp.bind(this);
        this.increaseMonth = this.increaseMonth.bind(this);
        this.decreaseMonth = this.decreaseMonth.bind(this);
        this.loadCalendarDays = this.loadCalendarDays.bind(this);
    }

    setBookingLineClamp(event, id) {
        event.stopPropagation();

        var booking = document.getElementById(id);
        
        if (booking.classList.contains("line-clamp")) {
            booking.classList.remove("line-clamp");
        } else {
            booking.classList.add("line-clamp");
        }
    }

    async createReservation() {
        this.setState({ popup: true, popupLoading: true });

        const { firstName, lastName, email, phone, service, day, time } = this.state;

        if (firstName.trim() === "" ||
            lastName.trim() === "" ||
            email.trim() === "" ||
            phone.trim() === "") {
            this.setState({
                popupLoading: false,
                title: "Všetky polia musia byť vyplnené"
            });
            return;
        }

        const call = await Api.createReservation({
            booking: service._id,
            name: firstName.trim() + " " + lastName.trim(),
            email: email,
            phone: phone,
            note: "Žiadne poznámky",
            dueTime: time + ":" + day,
            values: {}
        });

        if (call.userBooking) {
            showTransition();
            this.props.history.push("/dakujeme-za-rezervaciu");
        } else {
            this.setState({ popupLoading: false, title: "Nepodarilo sa objednať termín" });
        }
    }

    async getCalendars() {
        const call = await Api.calendars();

        if (call.calendars) {
            this.setState({ calendars: call.calendars });
        }
    }

    setCalendar(calendar) {
        this.setState({
            calendar: calendar,
            day: "",
            time: "",
            validTimes: {},

            step: 2
        }, () => {
            SmoothScroll.scroll("#reservation-service-choice");
        });
    }

    setService(service) {
        this.setState({
            service: service,
            day: "",
            time: "",
            validTimes: {},

            step: 3
        }, () => {
            SmoothScroll.scroll("#reservation-day-choice");
            this.loadCalendarDays();
        });
    }

    async setDay(day) {
        this.setState({ day: day, step: 4, loading: true }, () => {
            SmoothScroll.scroll("#reservation-time-choice");
        });

        const { calendar, service, month } = this.state;

        const call = await Api.getValidTimes(calendar._id, {
            date: day,
            booking: service._id
        });

        if (call.validTimes) {
            var realValidTimes = [];

            const currentDay = new Date().getDate();
            const currentMonth = new Date().getMonth() + 1;

            if (currentMonth === month + 1 && currentDay === parseInt(day.split("/")[0])) {
                const currentHours = parseInt(new Date().getHours());
                const currentMinutes = parseInt(new Date().getMinutes());
                const currentMinuteCount = (currentHours * 60) + currentMinutes;

                const minutesBefore = calendar.allowMinutesBefore;

                for (let i = 0; i < call.validTimes.length; i++) {
                    const timeHours = parseInt(call.validTimes[i].split("/")[0]);
                    const timeMinutes = parseInt(call.validTimes[i].split("/")[1]);
                    const timeMinuteCount = (timeHours * 60) + timeMinutes;

                    if (timeMinuteCount - minutesBefore > currentMinuteCount) {
                        realValidTimes.push(call.validTimes[i]);
                    }
                }
            } else {
                realValidTimes = call.validTimes;
            }

            this.setState({
                validTimes: realValidTimes,
                time: "",
                loading: false
            });
        }
    }

    setTime(time) {
        this.setState({
            time: time,
            step: 5
        });
    }

    loadCalendarDays() {
        const year = this.state.year;
        const month = this.state.month;

        const firstDayOfCurrentMonth = parseInt(new Date(year, month).getDay());
        const daysInMonth = parseInt(new Date(year, month + 1, 0).getDate());

        var emptyDaysBefore = [];
        for (let i = 1; i < firstDayOfCurrentMonth; i++) emptyDaysBefore.push("");

        if (emptyDaysBefore.length === 7) emptyDaysBefore = [];

        var days = [];
        for (let i = 0; i < daysInMonth; i++) {
            const day = (i + 1) + "/" + (parseInt(month) + 1) + "/" + year;
            days.push(day)
        }

        const calendar = emptyDaysBefore.concat(days);
        this.setState({ calendarDays: calendar });
    }

    increaseMonth() {
        const { month, year } = this.state;

        if (month === 11) {
            this.setState({
                month: 0,
                year: year + 1,
                step: 3,
                day: ""
            }, () => this.loadCalendarDays());
        } else {
            this.setState({
                month: month + 1,
                step: 3,
                day: ""
            }, () => this.loadCalendarDays());
        }
    }

    decreaseMonth() {
        const { month, year } = this.state;

        if (year === new Date().getFullYear() && month === new Date().getMonth()) {
            return;
        }

        if (month === 0) {
            this.setState({
                month: 11,
                year: year - 1,
                step: 3,
                day: ""
            }, () => this.loadCalendarDays());
        } else {
            this.setState({
                month: month - 1,
                step: 3,
                day: ""
            }, () => this.loadCalendarDays());
        }
    }

    async componentDidMount() {
        await this.getCalendars();

        hideTransition();
    }

    render() {
        return(
            <div className="screen" id="reservation">
                <div className="body">
                    <Heading
                        heading="REZERVÁCIA"
                        title="Zarezervujte si termín na prehliadku"
                        withBorder
                    />

                    <div className="content">
                        <div className="title">Zadajte Vaše údaje</div>
                        
                        <div className="form">
                            <div className="row">
                                <div className="item">
                                    <div className="heading">Meno</div>
                                    <input className="field" type="text" value={this.state.firstName} onChange={(event) => this.setState({ firstName: event.target.value })} />
                                </div>

                                <div className="item">
                                    <div className="heading">Priezvisko</div>
                                    <input className="field" type="text" value={this.state.lastName} onChange={(event) => this.setState({ lastName: event.target.value })} />
                                </div>
                            </div>

                            <br />

                            <div className="row">
                                <div className="item">
                                    <div className="heading">E-mail</div>
                                    <input className="field" type="text" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                                </div>

                                <div className="item">
                                    <div className="heading">Telefónne číslo</div>
                                    <input className="field" type="text" value={this.state.phone} onChange={(event) => this.setState({ phone: event.target.value })} />
                                </div>
                            </div>
                        </div>

                        <div className="title">Vyberte si pobočku</div>

                        {this.state.calendars.length === 0 ? <div className="message">Nenašli sa žiadne pobočky</div> :
                            <div className="chooser">
                                {this.state.calendars.map((calendar) => <div className="item" onClick={() => this.setCalendar(calendar)} style={this.state.calendar ? (this.state.calendar._id === calendar._id ? { backgroundColor: "rgb(235, 172, 1)", color: "white" } : null) : null}>{calendar.name}</div>)}
                            </div>
                        }

                        {this.state.step >= 2 ? (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} id="reservation-service-choice">
                                <div className="title">Vyberte si typ služby</div>

                                <div className="bookings">
                                    {this.state.calendar.bookings.length === 0 ? <div className="message">Nenašli sa žiadne služby na tejto prevádzke</div> : this.state.calendar.bookings.map((booking, index) => (
                                        <div className="booking" onClick={() => this.setService(booking)} style={this.state.service ? (this.state.service._id === booking._id ? { backgroundColor: "rgba(0, 0, 0, 0.05)" } : null) : null}>
                                            <div className="name">{booking.name}</div>
                                            <div className="description line-clamp" id={"booking-description-" + index}>{booking.description}</div>
                                            <div style={{ height: 5 }} />
                                            <div className="bottom-panel">
                                                <div className="left-panel">
                                                    <div className="parameter">
                                                        <ion-icon name="time-outline"></ion-icon>
                                                        {booking.time} minút
                                                    </div>
                                                    <div className="parameter">
                                                        <ion-icon name="wallet-outline"></ion-icon>
                                                        {booking.price}€
                                                    </div>
                                                </div>

                                                <div className="button" onClick={(event) => this.setBookingLineClamp(event, "booking-description-" + index)}>Zisti viac</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}

                        {this.state.step >= 3 ? (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }} id="reservation-day-choice">
                                <div className="title">Vyberte si deň prehliadky</div>

                                <div className="month-choice">
                                    <ion-icon name="caret-back-outline" onClick={() => this.decreaseMonth()}></ion-icon>
                                    <div className="month">{months[this.state.month]} {this.state.year}</div>
                                    <ion-icon name="caret-forward-outline" onClick={() => this.increaseMonth()}></ion-icon>
                                </div>

                                <Calendar
                                    month={this.state.month}
                                    year={this.state.year}
                                    calendarDays={this.state.calendarDays}
                                    setDay={this.setDay}
                                    selectedDay={this.state.day}
                                />
                            </div>
                        ) : null}

                        {this.state.step >= 4 ? (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} id="reservation-time-choice">
                                <div className="title">Vyberte si čas prehliadky</div>

                                {this.state.loading ? <Loading /> : (
                                    this.state.validTimes.length > 0 ? (
                                        <div className="chooser">
                                            {this.state.validTimes.map((time) => {
                                                const hours = time.split("/")[0];
                                                const minutes = time.split("/")[1];

                                                return <div className="item" onClick={() => this.setTime(time)} style={this.state.time === time ? { backgroundColor: "rgb(235, 172, 1)", color: "white" } : null}>{hours + ":" + minutes}</div>
                                            })}
                                        </div>
                                    ) : <div className="message">Žiadne voľné časy v tento deň</div>
                                )}
                            </div>
                        ) : null}

                        {this.state.step >= 5 ? (
                            <div className="button" onClick={() => this.createReservation()}>Objednať termín</div>
                        ) : null}
                    </div>
                </div>

                {this.state.popup ? (
                    <Popup
                        loading={this.state.popupLoading}
                        title={this.state.title}
                        close={() => this.setState({ popup: false })}
                    />
                ) : null}
            </div>
        )
    }
}

export default withRouter(Reservation);