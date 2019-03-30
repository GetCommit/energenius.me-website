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
    it('Contains a Router ', () => {
      const about = shallow(<App />)
      expect(about.find('Router'))
    })
})

describe('App Component and Classes', () => {
    it('Contains a Home', () => {
      const about = shallow(<App />)
      expect(about.find('Home'))
    })
})

describe('App Component and Classes', () => {
    it('Contains a Navigation', () => {
            const about = shallow(<App />)
            expect(about.find('Navigation'))
        })
})

describe('App Component and Classes', () => {
    it('Contains a Energy', () => {
      const about = shallow(<App />)
      expect(about.find('Energy'))
    })
})

describe('App Component and Classes', () => {
    it('Contains a Production', () => {
      const about = shallow(<App />)
      expect(about.find('Production'))
    })
})

describe('App Component and Classes', () => {
    it('Contains a Country', () => {
      const about = shallow(<App />)
      expect(about.find('Country'))
    })
})

describe('App Component and Classes', () => {
    it('Contains a EnergyInstance', () => {
      const about = shallow(<App />)
      expect(about.find('EnergyInstance'))
    })
})

describe('App Component and Classes', () => {
    it('Contains a CountryInstance', () => {
      const about = shallow(<App />)
      expect(about.find('CountryInstance'))
    })
})

describe('App Component and Classes', () => {
    it('Contains a ProductionInstance', () => {
      const about = shallow(<App />)
      expect(about.find('ProductionInstance'))
    })
})

describe('App Component and Classes', () => {
    it('Contains a About', () => {
      const about = shallow(<App />)
      expect(about.find('About'))
    })
})

describe('App Component and Classes', () => {
    it('Contains a Footer', () => {
      const about = shallow(<App />)
      expect(about.find('Footer'))
    })
})

describe('Navigation Component', () => {
  it('contains Navbar', () => {
    const components = shallow(<Navigation />);
    expect(components.find('Navigation'));
  })
})