import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const now = moment();
console.log(now.format('MMM Do, YYYY'));


class ExpenseForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            description:props.expense ? props.expense.description : '',
            note:props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount/100).toString() : '',
            createdAt:props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused:false,
            errorState:''
        };
    }

    onDescriptionChange = (e) => {
        const newdescription = e.target.value;
        this.setState( () => ({ description:newdescription }));
    }

    onNoteChange = (e) => {
        const newnote = e.target.value;
        this.setState( () => ({ note:newnote }));
    }

    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    }

    onDateChange = (createdAt) => {
        if(createdAt){
            this.setState(() => ({createdAt}));
        }
    }

    onFocusChange = ({focused}) => {
        this.setState(() => ({
            calendarFocused:focused
        }));
    }

    onSubmit = (e) =>{
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            const errorMsg = 'could not submit. Check Fields.'
            console.log('state should change here');
            this.setState(()=> ({
                errorState:errorMsg
            }));
        }
        else{
            this.setState(()=>({
                errorState:''
            }));

            this.props.onSubmit({
                description:this.state.description,
                amount:parseFloat(this.state.amount, 10) * 100,
                createdAt:this.state.createdAt.valueOf(),
                note:this.state.note
            });
        }
    };

    render(){
        return (
            <div>
            {this.state.errorState && <p>{this.state.errorState}</p>}
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.description} onChange={this.onDescriptionChange} placeholder="Description" autoFocus/>
                    <input type="number" value={this.state.amount} onChange={this.onAmountChange} placeholder="Amount"/>
                    <SingleDatePicker 
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    />
                    <textarea placeholder="Add a note for your expense (optional)" value={this.state.note} onChange={this.onNoteChange}></textarea> 
                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}

export default ExpenseForm;