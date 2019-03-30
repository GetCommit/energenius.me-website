import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import "isomorphic-fetch";
Enzyme.configure({ adapter: new Adapter() });

import Home from './pages/home';
import Navigation from './pages/Navigation';
import App from './App';


describe('IndexContent Component', () => {
    it('Contains Jumbotron', () => {
      const components = shallow(<Home />);
      expect(components.find('Jumbotron'));
    })
})

describe('IndexContent Component', () => {
    it('Contains carousel slide', () => {
      const components = shallow(<Home />);
      expect(components.find('Carousel'));
    })
})

describe('IndexContent Component', () => {
    it('Contains Carousel Inner', () => {
      const components = shallow(<Home />);
      expect(components.find('Carousel.Item'));
    })
})

describe('App Component and Classes', () => {
    it('Contains a Router Component', () => {
      const about = shallow(<App />)
      expect(about.find('Router'))
    })
})

describe('App', function() {
    describe('App Components & classes', () => {
      assert.equal(1, 0)

      it('contains a Router Component', () => {
        const about = shallow(<App />)
        expect(about.find('Router'))
      })

      it('contains a Component', () => {
        const about = shallow(<App />)
        expect(about.find('Navigation'))
      })

      it('contains a Component', () => {
        const about = shallow(<App />)
        expect(about.find('Home'))
      })

      it('contains a Component', () => {
        const about = shallow(<App />)
        expect(about.find('Energy'))
      })

      it('contains a Component', () => {
        const about = shallow(<App />)
        expect(about.find('EnergyInstance'))
      })

      it('contains a Component', () => {
        const about = shallow(<App />)
        expect(about.find('Production'))
      })

      it('contains a Component', () => {
        const about = shallow(<App />)
        expect(about.find('ProductionInstance'))
      })

      it('contains a Component', () => {
        const about = shallow(<App />)
        expect(about.find('Country'))
      })

      it('contains a Component', () => {
        const about = shallow(<App />)
        expect(about.find('CountryInstance'))
      })

      it('contains a Component', () => {
        const about = shallow(<App />)
        expect(about.find('About'))
      })

      it('contains a Component', () => {
        const about = shallow(<App />)
        expect(about.find('Footer'))
      })
    })
});


describe('Navigation Component', () => {
  it('contains Navbar', () => {
    const components = shallow(<Navigation />);
    expect(components.find('Navigation'));
  })
})
