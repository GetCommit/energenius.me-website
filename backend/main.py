import os
import urllib

from google.appengine.api import users
from google.appengine.ext import ndb

# import jinja2
import webapp2

# mport os
# import urllib
# import jinja2
# import webapp2
# from random import randint
import json
import logging

from model import AllInstancePage
from model import Energy
from model import Country
from model import Production

# JINJA_ENVIRONMENT = jinja2.Environment(
#     loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
#     extensions=['jinja2.ext.autoescape'],
#     autoescape=True)

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
class AllInstancePageRequest(webapp2.RequestHandler):
    def get(self, inputpagename):
         page_query = AllInstancePage.query(AllInstancePage.pagename == inputpagename)

         # template_values = {
         #     'pagename': page_query.pagename,
         #     'intro': page_query.intro,
         #     'bodysectionlist': page_query.bodysection,
         #     'sidesection': page_query.sidesection,
         # }

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps([temp.to_dict() for temp in page_query], default=default_json_serializer))

# energy API
class EnergyAPI(webapp2.RequestHandler):
    def get(self, energyname):
         energy_query = Energy.query(Energy.energyname == energyname)

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
    def get(self, producationname):
         production_query = Production.query(Production.producationname == producationname)

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
    def get(self, countryname):
         country_query = Country.query(Country.countryname == countryname)

         # template_values = {
         #     'countryname': country_query.countryname,
         #     'totalproducation': country_query.totalproducation,
         #     'totalusage': country_query.totalusage,
         #     'carbon': country_query.carbon,
         #     'top3produce': country_query.top3produce,
         # }
         self.response.headers['Content-Type'] = 'application/json'
         self.response.out.write(json.dumps([temp.to_dict() for temp in country_query], default=default_json_serializer))


app = webapp2.WSGIApplication([
        ('/allpages/(\d+)',AllInstancePageRequest),
        ('/energy/api/(\d+)',EnergyAPI),
        ('/production/api/(\d+)',ProductionAPI),
        ('/country/api/(\d+)',CountryAPI),
], debug=True)
