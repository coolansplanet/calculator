import React, { Component } from 'react';
import math from 'mathjs';

class Calculator extends Component {

    constructor(){
        super();
        this.state = {
            display: '0',          //Number shown on the screen
            total: '0',            //Result of previous operations
            operator: null,        //Current operator ( + - * / )
            displayingTotal: true  //Self explanatory flag
        }
    }

    inputNumber( value ){
        /*
            If the previous number shown in the display screen
            was a result (a total), the new input number replaces it.
            Otherwise, the new input number is added
            as a new digit to it.
        */
        let stringeredNumber = value.toString();
        let display =
            this.state.displayingTotal || this.state.display === '0' ?
            stringeredNumber : this.state.display + stringeredNumber;

        /*
            If the previous shown number, the new input number
            and the stored result equals to 0, then the component
            assumes the display is showing a result;
        */
        let displayingTotal =
            this.state.total === '0' &&
            this.state.display === '0' &&
            stringeredNumber === '0';

        /*
            The new input number is added as a new digit
            only if there's available space on the display.
        */
        display =
            display.split('.').join().length <= 11 ?
            display : this.state.display;

        this.setState({
            display: display,
            displayingTotal: displayingTotal
        });
    }

    inputPoint(){
        /*
            Inputs a point only once.
            Also, if the previous number on the display was a result (total),
            clicking the point deletes it, and replaces it by a "0."
        */
        let display;

        if (this.state.displayingTotal) {
            display = '0.';
        }else{
            display = this.state.display;
            display += display.indexOf('.') < 0 ? '.' : '';
        }

        this.setState({
            display: display,
            displayingTotal: false
        });
    }

    inputOperator(inputOperator){

        let nextDisplay;
        let { display, total, operator, displayingTotal } = this.state;

        //Gets the results of the previous operation:
        let previousResult = operator ?
            math.eval(total + operator + display) : total;

        //Gets the new total:
        let nextTotal = operator && !displayingTotal ?
            previousResult.toString() : display;

        //Gets the next number (or value) to show on the display:
        nextDisplay = isNaN(previousResult) ? 'Error' : nextTotal.substr(0, 11);

        //Gets the next operator symbol ( + - * / ):
        let nextOperator = inputOperator === '=' ? null : inputOperator;

        //Updates the state:
        this.setState({
            display: nextDisplay,
            total: nextTotal,
            operator: nextOperator,
            displayingTotal: true
        });
    }


    clear(value){

        //Deletes all the values:
        if (value === 'all') {
            this.setState({
                display: '0',
                total: '0',
                operator: null,
                displayingTotal: true
            });

        //Deletes only the value on the display:
        }else if (value === 'entry'){
            this.setState({
                display: '0'
            });

        //Deletes only one character on the display:
        }else if (value === 'character' && this.state.display !== '0'){
            let display = this.state.display;
            let newDisplay = display.substr(0, display.length - 1);
            newDisplay = display.length > 1 && !isNaN(newDisplay) ? newDisplay : '0';

            this.setState({
                display: newDisplay
            });
        }
    }


    showAbout(){
        //The button "A", when clicked shows the "about" dialog:
        alert('\nCalculator:\nMade with ♥ by Herman Schmidt\n');
    }


    render() {

        const {
            inputNumber,
            inputPoint,
            inputOperator,
            clear
        } = this;

        return (
          <div className="calculator">
            <div className="display">
                {this.state.display}
            </div>

            <div className="buttons">
                <button
                    onClick={inputNumber.bind(this, 7)}
                    className="b7">
                    7
                </button>

                <button
                    onClick={inputNumber.bind(this, 8)}
                    className="b8">
                    8
                </button>

                <button
                    onClick={inputNumber.bind(this, 9)}
                    className="b9">
                    9
                </button>

                <button
                    onClick={inputOperator.bind(this, '/')}
                    className="division">
                    ÷
                </button>

                <button
                    className="special-button clear-all"
                    onClick={clear.bind(this, 'all')}>
                    C
                </button>

                <button
                    onClick={inputNumber.bind(this, 4)}
                    className="b4">
                    4
                </button>

                <button
                    onClick={inputNumber.bind(this, 5)}
                    className="b5">
                    5
                </button>

                <button
                    onClick={inputNumber.bind(this, 6)}
                    className="b6">
                    6
                </button>

                <button
                    onClick={inputOperator.bind(this, '*')}
                    className="multiplication">
                    ×
                </button>

                <button
                    className="special-button clear-entry"
                    onClick={clear.bind(this, 'entry')}>
                    CE
                </button>

                <button
                    onClick={inputNumber.bind(this, 1)}
                    className="b1">
                    1
                </button>

                <button
                    onClick={inputNumber.bind(this, 2)}
                    className="b2">
                    2
                </button>

                <button
                    onClick={inputNumber.bind(this, 3)}
                    className="b3">
                    3
                </button>

                <button
                    onClick={inputOperator.bind(this, '-')}
                    className="substraction">
                    -
                </button>

                <button
                    className="special-button delete"
                    onClick={clear.bind(this, 'character')}>
                    DEL
                </button>

                <button
                    onClick={inputNumber.bind(this, 0)}
                    className="b0">
                    0
                </button>

                <button
                    onClick={inputPoint.bind(this)}
                    className="point">
                    .
                </button>

                <button
                    onClick={inputOperator.bind(this, '=')}
                    className="equals">
                    =
                </button>

                <button
                    onClick={inputOperator.bind(this, '+')}
                    className="addition">
                    +
                </button>

                <button
                    className="special-button about"
                    onClick={this.showAbout}>
                    A
                </button>
            </div>
          </div>
        );
    }
}

export default Calculator;
