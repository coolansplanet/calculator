import Calculator from './Calculator';
import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });


describe('Calculator component snapshot', () => {

    it('Matches the snapshot', () => {
        const tree = renderer.create(<Calculator/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});


describe('Calculator component click events', () => {


    let wrapper;
    const displayOutput = () => {
        return wrapper.find('.display').text();
    }
    const click = node => {
        wrapper.find(node).simulate('click');
    }

    beforeEach(() => {
        wrapper = shallow(<Calculator/>);
    })


    it('The first displayed number should be 0', () => {
        expect(
            displayOutput()
        ).toEqual('0');
    });

    it('All numbers buttons work', () => {

        for (let i = 0; i <= 9; i++) {
            click('.b'+i);
        }
        click('.b0');
        expect(
            displayOutput()
        ).toEqual('1234567890');

    });

    it('Button 0 inputs only once', () => {

        for (let i = 0; i < 100; i++) {
            click('.b0');
        }

        expect(
            displayOutput()
        ).toEqual('0');
    });


    it('Button 0 inputs only once (different test)', () => {

        click('.b0');
        click('.point');
        click('.equals');

        for (let i = 0; i < 9; i++) {
            click('.b0');
        }

        expect(
            displayOutput()
        ).toEqual('0');
    });


    it('Button 0 inputs only once (different test)', () => {

        click('.b2');
        click('.addition');

        for (let i = 0; i < 2; i++) {
            click('.b0');
        }

        expect(
            displayOutput()
        ).toEqual('0');
    });


    it('Point inputs only once', () => {

        for (let i = 0; i < 100; i++) {
            if (i == 0 || i == 50) {
                click('.b1');
            }else{
                click('.point');
            }
        }

        expect(
            displayOutput()
        ).toEqual('1.1');
    });


    it('Point clicked at first time is added after zero', () => {

        for (let i = 0; i < 100; i++) {
            click('.point');
        }
        click('.b0');

        expect(
            displayOutput()
        ).toEqual('0.0');
    });


    it('Multiplication works properly', () => {

        for (let i = 1; i <= 9; i++) {

            click('.b'+i);
            click('.multiplication');
        }

        expect(
            displayOutput()
        ).toEqual('362880');
    });


    it('Multiplication works properly', () => {

        for (let i = 1; i <= 9; i++) {
            click('.b9');
            click('.multiplication');
        }

        expect(
            displayOutput()
        ).toEqual('387420489');
    });


    it('Addition works properly', () => {

        for (let i = 1; i <= 9; i++) {
            click('.b'+i);
            click('.addition');
        }

        expect(
            displayOutput()
        ).toEqual('45');
    });


    it('Addition works properly (different addition)', () => {

        for (let i = 1; i <= 9; i++) {
            click('.b1');
            click('.addition');
            click('.b4');
            click('.addition');
            click('.b9');
            click('.addition');
        }

        expect(
            displayOutput()
        ).toEqual('126');
    });


    it('Division works properly', () => {

        click('.b7');
        click('.b2');
        click('.b9');
        click('.b8');
        click('.b5');
        click('.b1');
        click('.b4');
        click('.division');
        click('.b3');

        click('.equals');

        expect(
            displayOutput()
        ).toEqual('2432838');
    });


    it('Substraction and equals work properly', () => {

        click('.b8');
        click('.b7');

        for (let i = 0; i <= 9; i++) {

            click('.substraction');
            click('.b'+i);
        }
        click('.equals');

        expect(
            displayOutput()
        ).toEqual('42')
    });


    it('C (clear all) button works properly', () => {

        for (let i = 0; i <= 9; i++) {
            click('.addition');
            click('.b'+i);
        }
        click('.equals');
        click('.clear-all');

        expect(
            displayOutput()
        ).toEqual('0')
    });


    it('Del (delete one character) button works properly', () => {

        for (let i = 0; i <= 9; i++) {
            click('.b'+i);
        }
        click('.point');
        click('.b0');

        click('.delete');
        click('.delete');
        click('.delete');

        expect(
            displayOutput()
        ).toEqual('12345678')
    });


    it('Display don\'t display numbers containing more than 11 digits', () => {

        for (let i = 0; i <= 90; i++) {
            i === 5 ? click('.point') : click('.b8');
        }

        let output = displayOutput();
        let pointIndex = output.indexOf('.');
        output.slice(pointIndex, pointIndex+1);
        expect(
            output.length
        ).toBeLessThanOrEqual(11);
    });


    it('Display don\'t display numbers containing more than 11 digits when doing operation', () => {

        for (let i = 1; i < 100; i++) {
            click('.b9');
            click('.multiplication');
        }
        click('.equals');
        let output = displayOutput();
        let pointIndex = output.indexOf('.');
        output.slice(pointIndex, pointIndex+1);
        expect(
            output.length
        ).toBeLessThanOrEqual(11);
    });

    it('NaN displays as \'Error\'', () => {

        click('.b0');
        click('.division');
        click('.b0');
        click('.equals');
        expect(
            displayOutput()
        ).toEqual('Error');
    });


    it('Many addition inputs shouldn\'t change the display', () => {

        click('.b2');
        for (let i = 0; i < 20; i++) {
            click('.addition');
        }
        expect(
            displayOutput()
        ).toEqual('2');
    });


    it('Many multiplication inputs shouldn\'t change the display', () => {

        click('.b2');
        for (let i = 0; i < 20; i++) {
            click('.multiplication');
        }
        expect(
            displayOutput()
        ).toEqual('2');
    });


    it('Many division inputs shouldn\'t change the display', () => {

        click('.b2');
        for (let i = 0; i < 20; i++) {
            click('.division');
        }
        expect(
            displayOutput()
        ).toEqual('2');
    });


    it('Many subsraction inputs shouldn\'t change the display', () => {

        click('.b2');
        for (let i = 0; i < 20; i++) {
            click('.substraction');
        }
        expect(
            displayOutput()
        ).toEqual('2');
    });


    it('Button \'Del\' at the beninning, and twice clicks on 0 shouldn\'t show more than one zero', () => {

        click('.delete');
        click('.b0');
        click('.b0');
        expect(
            displayOutput()
        ).toEqual('0');
    });


    it('Button \'Del\' at the beninning shouldn\'t delete', () => {

        click('.delete');
        expect(
            displayOutput()
        ).toEqual('0');
    });


    it('Button \'Del\' shouldn\'t delete the last character. It must convert it to 0 instead', () => {

        click('.b1');
        click('.delete');
        expect(
            displayOutput()
        ).toEqual('0');
    });


    it('After clicking CE, if I input 0123 shouldn\'t show the number 0', () => {

        click('.clear-entry');
        click('.b0');
        click('.b1');
        click('.b2');
        click('.b3');
        expect(
            displayOutput()
        ).toEqual('123');
    });
});
