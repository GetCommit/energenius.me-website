import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import "isomorphic-fetch";
Enzyme.configure({ adapter: new Adapter() });
import { BrowserRouter } from 'react-router-dom';


import Home from './pages/home';
import Navigation from './pages/Navigation';
import App from './App';
import CountryInstance from './pages/Instance/CountryInstance';
import EnergyInstance from './pages/Instance/EnergyInstance';
import ProductionInstance from './pages/Instance/ProductionInstance';


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

describe('Search Component and Classes', () => {
  it('Contains a Navigation ', () => {
    const components = shallow(<search />);
    expect(components.find('Navigation'));
  })
})

describe('Energy Instance', () => {
  it('Biomass has image', () => {
      const parameterObject = {"params": {"id": "Biomass"}};
      const wrapper = mount(<BrowserRouter><EnergyInstance match = {parameterObject}/></BrowserRouter>);
      expect(wrapper.find('img')).to.not.have.lengthOf(0);
  });
  it('Coal has image', () => {
      const parameterObject = {"params": {"id": "Coal"}};
      const wrapper = mount(<BrowserRouter><EnergyInstance match = {parameterObject}/></BrowserRouter>);
      expect(wrapper.find('img')).to.not.have.lengthOf(0);
  });
  it('Ethanol has image', () => {
      const parameterObject = {"params": {"id": "Ethanol"}};
      const wrapper = mount(<BrowserRouter><EnergyInstance match = {parameterObject}/></BrowserRouter>);
      expect(wrapper.find('img')).to.not.have.lengthOf(0);
  });
  it('Methane has image', () => {
      const parameterObject = {"params": {"id": "Methane"}};
      const wrapper = mount(<BrowserRouter><EnergyInstance match = {parameterObject}/></BrowserRouter>);
      expect(wrapper.find('img')).to.not.have.lengthOf(0);
  })
})

describe('Production and Usage Instance', () => {
  it('Hydraulic fracturing has image', () => {
      const parameterObject = {"params": {"id": "Hydraulic fracturing"}};
      const wrapper = mount(<BrowserRouter><ProductionInstance match = {parameterObject}/></BrowserRouter>);
      expect(wrapper.find('img')).to.not.have.lengthOf(0);
  });
  it('Wind turbine has image', () => {
      const parameterObject = {"params": {"id": "Wind turbine"}};
      const wrapper = mount(<BrowserRouter><ProductionInstance match = {parameterObject}/></BrowserRouter>);
      expect(wrapper.find('img')).to.not.have.lengthOf(0);
  });
  it('Airplane has image', () => {
      const parameterObject = {"params": {"id": "Airplane"}};
      const wrapper = mount(<BrowserRouter><ProductionInstance match = {parameterObject}/></BrowserRouter>);
      expect(wrapper.find('img')).to.not.have.lengthOf(0);
  });
  it('Telecommunication has image', () => {
      const parameterObject = {"params": {"id": "Telecommunication"}};
      const wrapper = mount(<BrowserRouter><ProductionInstance match = {parameterObject}/></BrowserRouter>);
      expect(wrapper.find('img')).to.not.have.lengthOf(0);
  })
})

describe('Country Instance', () => {
  it('China has image', () => {
      const parameterObject = {"params": {"id": "China"}};
      const wrapper = mount(<BrowserRouter><CountryInstance match = {parameterObject}/></BrowserRouter>);
      expect(wrapper.find('img')).to.not.have.lengthOf(0);
  });
  it('United States has image', () => {
      const parameterObject = {"params": {"id": "United States"}};
      const wrapper = mount(<BrowserRouter><CountryInstance match = {parameterObject}/></BrowserRouter>);
      expect(wrapper.find('img')).to.not.have.lengthOf(0);
  });
  it('Wakanda has image', () => {
      const parameterObject = {"params": {"id": "Wakanda"}};
      const wrapper = mount(<BrowserRouter><CountryInstance match = {parameterObject}/></BrowserRouter>);
      expect(wrapper.find('img')).to.not.have.lengthOf(0);
  });
  it('France has image', () => {
      const parameterObject = {"params": {"id": "France"}};
      const wrapper = mount(<BrowserRouter><CountryInstance match = {parameterObject}/></BrowserRouter>);
      expect(wrapper.find('img')).to.not.have.lengthOf(0);
  })
})
