import os
import urllib

from google.appengine.api import users
from google.appengine.ext import ndb

import webapp2
import jinja2
import json
import logging

# from model import AllInstancePage
from model import Energy
from model import Country
from model import ProductionAndUse
# from model import SectionContent
# from model import SideSectioncontent
# from model import Top3Energy


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

def default_json_serializer(obj):
    """Default JSON serializer."""
    import calendar, datetime

    if isinstance(obj, datetime.datetime):
        if obj.utcoffset() is not None:
            obj = obj - obj.utcoffset()
        millis = int(
            calendar.timegm(obj.timetuple()) * 1000 +
            obj.microsecond / 1000
        )
        return millis
    raise TypeError('Not sure how to serialize %s' % (obj,))


# front-end request
# ------------------ do not need all instance page anymore
# class AllInstancePageRequest(webapp2.RequestHandler):
#     def get(self, inputpagename):
#          page_query = AllInstancePage.query(AllInstancePage.pagename == inputpagename)
#
#          # template_values = {
#          #     'pagename': page_query.pagename,
#          #     'intro': page_query.intro,
#          #     'bodysectionlist': page_query.bodysection,
#          #     'sidesection': page_query.sidesection,
#          # }
#
#         self.response.headers['Content-Type'] = 'application/json'
#         self.response.out.write(json.dumps([temp.to_dict() for temp in page_query], default=default_json_serializer))

# energy API
class EnergyAPI(webapp2.RequestHandler):
    def get(self):
        energyname = self.request.get('name')
        if energyname == "all":
            energy_query = Energy.query()
        else:
            energy_query = Energy.query(Energy.energyName == energyname)

        # template_values = {
        #     'energyname': energy_query.energyname,
        #     'energytype': energy_query.energytype,
        #     'development': energy_query.energydevelop,
        #     'cumulativeCap': energy_query.cumulativeCap,
        # }

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps([temp.to_dict() for temp in energy_query], default=default_json_serializer))




# producation API
class ProductionAPI(webapp2.RequestHandler):
    def get(self):
        producationname = self.request.get('name')
        if producationname == "all":
            production_query = Production.query()
        else:
            production_query = Production.query(Production.puName == producationname)

         # template_values = {
         #     'producationname': production_query.producationname,
         #     'producevolumn': production_query.producevolumn,
         #     'yearofinvention': production_query.yearofinvention,
         #     'topdevelopcountry': production_query.topdevelopcountry,
         # }

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps([temp.to_dict() for temp in production_query], default=default_json_serializer))


# Country APU
class CountryAPI(webapp2.RequestHandler):
    def get(self):
        countryname = self.request.get('name')
        if countryname == "all":
            country_query = Country.query()
        else:
            country_query = Country.query(Country.countryName == countryname)

         # template_values = {
         #     'countryname': country_query.countryname,
         #     'totalproducation': country_query.totalproducation,
         #     'totalusage': country_query.totalusage,
         #     'carbon': country_query.carbon,
         #     'top3produce': country_query.top3produce,
         # }
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps([temp.to_dict() for temp in country_query], default=default_json_serializer))


class Addcountry(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('/html_frontend/database_input/postcountry.html')
        self.response.write(template.render())
    def post(self):
        post_country = Country()
        post_country.countryName = self.request.get('countryname')
        post_country.totalProduction = float(self.request.get('totalproduction'))
        post_country.totalUsage = float(self.request.get('totalusage'))
        post_country.shorageDay = float(self.request.get('shorageDay'))
        post_country.rankRenewableEnergy = int(self.request.get('rankRenewableEnergy'))
        post_country.region = self.request.get('region')
        post_country.population = float(self.request.get('population'))
        post_country.put()
        self.redirect('/api/add/country')

class Addenergy(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('/html_frontend/database_input/postenergy.html')
        self.response.write(template.render())
    def post(self):
        post_energy = Energy()
        post_energy.energyName = self.request.get('energyname')
        post_energy.energyType = self.request.get('energytype')
        post_energy.energyMajorUse = self.request.get('energyMajorUse')
        post_energy.consumptionUSRank = int(self.request.get('consumptionUSRank'))
        post_energy.electricalGenerRank = int(self.request.get('electricalGenerRank'))
        post_energy.topProduceCountry = self.request.get('topProduceCountry')
        post_energy.put()
        self.redirect('/api/add/energy')

class Addproduction(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('/html_frontend/database_input/postproduction.html')
        self.response.write(template.render())
    def post(self):
        post_prod = ProductionAndUse()
        post_prod.puName = self.request.get('producationname')
        post_prod.puType = self.request.get('puType')
        post_prod.yearOfInvention = int(self.request.get('yearofinvention'))
        post_prod.puRelatedEnergy = self.request.get('puRelatedEnergy')
        post_prod.carbon = float(self.request.get('carbon'))
        post_prod.usageField = self.request.get('usageField')
        post_prod.put()
        self.redirect('/api/add/production')


# class MainPage(webapp2.RequestHandler):
#     def get(self):
#         template = JINJA_ENVIRONMENT.get_template('/html_frontend/index.html')
#         self.response.write(template.render())



app = webapp2.WSGIApplication([
        # ('/', MainPage),
        ('/api/add/country', Addcountry),
        ('/api/add/energy', Addenergy),
        ('/api/add/production', Addproduction),
        # ('/allpages/(\d+)',AllInstancePageRequest),
        ('/api/energy',EnergyAPI),
        ('/api/production',ProductionAPI),
        ('/api/country',CountryAPI),
], debug=True)
