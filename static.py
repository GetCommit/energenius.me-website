import os
import urllib

from google.appengine.api import users
from google.appengine.ext import ndb

import jinja2
import webapp2

# mport os
# import urllib
# import jinja2
# import webapp2
# from random import randint
import json
import logging


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class MainPage(webapp2.RequestHandler):
    def get(self):
         template = JINJA_ENVIRONMENT.get_template('index.html')
         self.response.write(template.render())

class AboutPage(webapp2.RequestHandler):
    def get(self):
         template = JINJA_ENVIRONMENT.get_template('about.html')
         self.response.write(template.render())

class EnergyPage(webapp2.RequestHandler):
    def get(self):
         template = JINJA_ENVIRONMENT.get_template('energy/energy.html')
         self.response.write(template.render())

class UsagePage(webapp2.RequestHandler):
    def get(self):
         template = JINJA_ENVIRONMENT.get_template('production_usage/production_usage.html')
         self.response.write(template.render())

class CountryPage(webapp2.RequestHandler):
    def get(self):
         template = JINJA_ENVIRONMENT.get_template('country/country.html')
         self.response.write(template.render())

class EnergySolarPage(webapp2.RequestHandler):
    def get(self):
         template = JINJA_ENVIRONMENT.get_template('/energy/solar.html')
         self.response.write(template.render())

class EnergyNuclearPage(webapp2.RequestHandler):
    def get(self):
         template = JINJA_ENVIRONMENT.get_template('/energy/nuclear.html')
         self.response.write(template.render())

class EnergyNGasPage(webapp2.RequestHandler):
    def get(self):
         template = JINJA_ENVIRONMENT.get_template('/energy/natural_gas.html')
         self.response.write(template.render())

class UsageFrackPage(webapp2.RequestHandler):
    def get(self):
         template = JINJA_ENVIRONMENT.get_template('/production_usage/fracking.html')
         self.response.write(template.render())

class UsageMedPage(webapp2.RequestHandler):
    def get(self):
         template = JINJA_ENVIRONMENT.get_template('/production_usage/medical.html')
         self.response.write(template.render())

class UsageResPage(webapp2.RequestHandler):
    def get(self):
         template = JINJA_ENVIRONMENT.get_template('/production_usage/residential.html')
         self.response.write(template.render())

class CountryChinaPage(webapp2.RequestHandler):
    def get(self):
         template = JINJA_ENVIRONMENT.get_template('/country/china.html')
         self.response.write(template.render())

class CountryUSAPage(webapp2.RequestHandler):
    def get(self):
         template = JINJA_ENVIRONMENT.get_template('/country/usa.html')
         self.response.write(template.render())

class CountryAusPage(webapp2.RequestHandler):
    def get(self):
         template = JINJA_ENVIRONMENT.get_template('/country/australia.html')
         self.response.write(template.render())

app = webapp2.WSGIApplication([
        ('/', MainPage),
        ('/index.html', MainPage),
        ('/about.html', AboutPage),
        ('/energy/energy.html',EnergyPage),
        ('/production_usage/production_usage.html',UsagePage),
        ('/country/country.html',CountryPage),
        ('/energy/solar.html',EnergySolarPage),
        ('/energy/nuclear.html',EnergyNuclearPage),
        ('/energy/natural_gas.html',EnergyNGasPage),
        ('/production_usage/fracking.html',UsageFrackPage),
        ('/production_usage/medical.html',UsageMedPage),
        ('/production_usage/residential.html',UsageResPage),
        ('/country/china.html',CountryChinaPage),
        ('/country/usa.html',CountryUSAPage),
        ('/country/australia.html',CountryAusPage),
], debug=True)
