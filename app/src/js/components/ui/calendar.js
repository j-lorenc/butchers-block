import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

class Header extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {month: props.month || moment().month() + 1 ,
                      year:props.year || moment().year(),
                      day:props.day || moment().date()}
        
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleDateClick = this.handleDateClick.bind(this);
        this.setCurrentDay = this.setCurrentDay.bind(this);
    }
    
    handleNextClick(){
        let currMonth = this.state.month - 1;
        let newMonth = moment().year(this.state.year).month(currMonth).add(1, 'month')    
        this.setState({month: newMonth.month() + 1, year: newMonth.year(), day:1 });
    }
    
    handlePrevClick(){
        let currMonth = this.state.month - 1;
        let newMonth = moment().year(this.state.year).month(currMonth).subtract(1, 'month')    
        this.setState({month: newMonth.month() + 1, year: newMonth.year(), day: 1 });
    }
    
    isEqualCurrentMonth(month, currentMonth){
        return month==currentMonth;
    }
    
    getMonthClassName(day, month){
        //console.log(month, this.state.month);
        
        let className = this.isEqualCurrentMonth(month, this.state.month - 1) ? "current" : "diff";
        
        className += (this.state.day == day && this.state.month - 1 == month) ? " current-day" : ""
        return className;
    }
    
    handleDateClick(day, month, year){
        this.setCurrentDay(day,month, year)    
    }
    
    setCurrentDay(day,month, year){
        console.log("Month", month, "Day", day, "year", year)
        
        year = month > 12 ? year + 1: year;
        month = month > 12 ? month -12 : month;
        console.log("Month", month, "Day", day, "year", year)
        
        this.setState({day, month, year})
    }
    
    getCalendarObject(){
        /*
        console.log("state year", this.state.year);
        console.log("state month", this.state);
        */
        
        let year = this.state.year || moment().year();
        let month = this.state.month || moment().month() + 1;
        
        let refMonth = () => moment().year(year).month(month -1);
        
        let currentMonth = refMonth().startOf('month');
        let previousMonth = refMonth().startOf('month').subtract(1, 'month').endOf("month");
        let nextMonth = refMonth().add(1, 'month').startOf('month');
        
        let firstDayOfWeek = refMonth().startOf('month').day();
        let firstDateOfWeek = refMonth().startOf('month').subtract(firstDayOfWeek > 0 ? firstDayOfWeek : 7, 'days').startOf('day');
        
        let lastDayOfPrevMonth = previousMonth.endOf('month').date();
        let lastDayOfMonth = refMonth().add(1, 'month').date(0).date();
        
        
       /* 
        console.log("previous month", previousMonth.format("MMMM DD YYYY"));
        console.log("current month", currentMonth.format("MMMM DD YYYY"));
        console.log("next month", nextMonth.format("MMMM DD YYYY"));
        console.log("first day of week", firstDayOfWeek + 1);
        console.log("first date of week", firstDateOfWeek.format("MMMM DD YYYY"));
        console.log("last date of previous month", lastDayOfPrevMonth);
        */

        
        let calendarDays = [];
        for (let i = lastDayOfPrevMonth; i >= firstDateOfWeek.date(); i--){
            calendarDays.push([i, previousMonth.month()]);
        }
        
        calendarDays.reverse();
        
        for(let i = 1; i <= lastDayOfMonth; i++){
            calendarDays.push([i,currentMonth.month()]);
        }
        
        for(let i=1; calendarDays.length < 42; i++){
            calendarDays.push([i, currentMonth.month()+1]);
        }
        
        let calendarArr = calendarDays.reduce((acc, val)=>{
            if(acc.length >0){
                if(acc[acc.length -1].length >= 7){
                    acc.push([]);   
                }                    
                acc[acc.length -1].push({day: val[0], month: val[1]});
                
            }else{
                acc.push([].concat({day:val[0], month:val[1]}));
            }
            
            return acc;
        }, []);
        
        return calendarArr;
    }
    
    
    render(){
        const calendarArr = this.getCalendarObject();
        
        
                
        return (
            <div className="calendar">
                <div className="monthHeader">
                    <span className="prevMonth" onClick={this.handlePrevClick}>&lt;</span>
                    <span>{moment().month(this.state.month -1).format("MMMM")} {this.state.year}</span>
                    <span className="nextMonth" onClick={this.handleNextClick}>&gt;</span>
                </div>
                <div className="dates">
                    <div className="weekDayHeader"> 
                        <span>Sun</span><span>Mon</span><span>Tues</span><span>Weds</span><span>Thurs</span><span>Fri</span><span>Sat</span>
                    </div>
                    {calendarArr.map((week)=>(
                        <div className="week">{week.map((day)=>(<span className={this.getMonthClassName(day.day, day.month)+ ` weekday`} onClick={()=>{this.handleDateClick(day.day,day.month + 1, this.state.year)}} >{day.day}</span>))}</div>
                    
                    ))}
                </div>
            </div>       
        )
    }   
}

export default Header;