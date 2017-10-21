import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import React from 'react';

import App from '../App.react';

Enzyme.configure({adapter: new Adapter()});

describe('App', () => {
    test('contains expected message', () => {
        const app = shallow(<App />);

        expect(
            app.find('.text').text()
        ).toEqual("Hello frontend world, hello!!!");
    });
});

describe('App snapshot', () => {
    test('matches snapshot', () => {
        const app = shallow(<App />);

        expect(app).toMatchSnapshot();
    });
});
