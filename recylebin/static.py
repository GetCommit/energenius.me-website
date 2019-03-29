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

# from model import AllInstancePage
# from model import Energy
# from model import Country
# from model import Production
# from model import SectionContent
# from model import SideSectioncontent
# from model import Top3Energy

class SectionContent(ndb.Model):
    title = ndb.StringProperty(required = True)
    content = ndb.StringProperty(required = True)
    # if need image put here

class SideSectioncontent(ndb.Model):
    uptitle = ndb.StringProperty(required = True)
    upcontent = ndb.StringProperty(repeated = True)
    # if need link or url, also could store here
    downtitle = ndb.StringProperty(required = True)
    downcontent = ndb.StringProperty(repeated = True)


class AllInstancePage(ndb.Model):
    pagename = ndb.StringProperty(required = True, indexed=True)
    intro = ndb.StringProperty(required = True)
    bodysection = ndb.StructuredProperty(SectionContent, repeated = True)
    sidesection = ndb.StructuredProperty(SideSectioncontent)

# country API
class Top3Energy (ndb.Model):
    t3energyname = ndb.StringProperty()
    t3energyproduce = ndb.IntegerProperty()

class Country (ndb.Model):
    countryname = ndb.StringProperty(required = True)
    totalproducation = ndb.IntegerProperty(required = True)
    totalusage = ndb.IntegerProperty(required = True)
    top3produce = ndb.StructuredProperty(Top3Energy, repeated = True)
    carbon = ndb.FloatProperty(required=True)



# energy API
class Energy (ndb.Model):
    energyname = ndb.StringProperty(required = True)
    energytype = ndb.StringProperty(required = True)
    energydevelop = ndb.BooleanProperty(required = True)
    cumulativeCap = ndb.FloatProperty(required=True)

# Production API
class Production (ndb.Model):
    producationname = ndb.StringProperty(required = True)
    producevolumn = ndb.StringProperty(required = True)
    yearofinvention = ndb.StringProperty()
    topdevelopcountry = ndb.StringProperty()

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

# class Addcountry(webapp2.RequestHandler):
#     def get(self):
#         template = JINJA_ENVIRONMENT.get_template('/database-input/postcountry.html')
#         self.response.write(template.render())
#     def post(self):
#         temp1 = Top3Energy()
#         temp1.t3energyname = self.request.get('energyname1')
#         temp1.t3energyname = self.request.get('energyp1')
#         temp1.put()
#         temp2 = Top3Energy()
#         temp2.t3energyname = self.request.get('energyname2')
#         temp2.t3energyname = self.request.get('energyp2')
#         temp2.put()
#         temp3 = Top3Energy()
#         temp3.t3energyname = self.request.get('energyname3')
#         temp3.t3energyname = self.request.get('energyp3')
#         temp3.put()
#         listoftop3 = []
#         listoftop3.append(temp1)
#         listoftop3.append(temp2)
#         listoftop3.append(temp3)
#         post_country = Country()
#         post_country.countryname = self.request.get('countryname')
#         post_country.totalproducation = self.request.get('totalproducation')
#         post_country.totalusage = self.request.get('totalusage')
#         post_country.carbon = self.request.get('carbon')
#         post_country.top3produce = listoftop3
#         post_country.put()
#         self.redirect('/')

class Addenergy(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('/database_input/postenergy.html')
        self.response.write(template.render())
    def post(self):
        post_energy = Energy()
        post_energy.energyname = self.request.get('energyname')
        post_energy.energytype = self.request.get('energytype')
        post_energy.energydevelop = self.request.get('energydevelop')
        post_energy.cumulativeCap = self.request.get('cumulativeCap')
        post_energy.put()
        self.redirect('/')

class Addproduction(webapp2.RequestHandler):

    def get(self):
        template = JINJA_ENVIRONMENT.get_template('/database_input/postproduction.html')
        self.response.write(template.render())

    def post(self):
        post_prod = Production()
        post_prod.producationname = self.request.get('producationname')
        post_prod.producevolumn = self.request.get('producevolumn')
        post_prod.yearofinvention = self.request.get('yearofinvention')
        post_prod.topdevelopcountry = self.request.get('topdevelopcountry')
        post_prod.put()
        self.redirect('/')

app = webapp2.WSGIApplication([
        ('/', MainPage),
        # -------------
        # ('/add/country', Addcountry),
        ('/database_input/postenergy.html', Addenergy),
        ('/database_input/postproduction.html', Addproduction),
        # ---------------
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
