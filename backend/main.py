import os
import urllib

from google.appengine.api import users
from google.appengine.ext import ndb
from google.appengine.api import search

import webapp2
import jinja2
import json
import logging
import urllib2

from model import Energy
from model import Country
from model import ProductionAndUse

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=["jinja2.ext.autoescape"],
    autoescape=True,
)


def default_json_serializer(obj):
    """Default JSON serializer."""
    import calendar, datetime

    if isinstance(obj, datetime.datetime):
        if obj.utcoffset() is not None:
            obj = obj - obj.utcoffset()
        millis = int(calendar.timegm(obj.timetuple()) * 1000 + obj.microsecond / 1000)
        return millis
    raise TypeError("Not sure how to serialize %s" % (obj,))


# [START search]
# class Search(webapp2.RequestHandler):
#
#     def get(self):
#
#         options = search.QueryOptions(limit=10)
#
#         query_string = self.request.get('queryString')
#         print("searching for ", query_string)
#         query = search.Query(query_string=query_string, options=options)
#         results = search.Index('tags').search(query)
#         print(results)

# [END search]
wikiURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&exsentences=6&titles="

# energy API
class EnergyAPI(webapp2.RequestHandler):
    def get(self):
        energyname = self.request.get("name")
        if energyname == "all":
            energy_query = Energy.query()
        elif energyname == "list":
            energy_query = Energy.query(projection=[Energy.Name])
        else:
            energy_query = Energy.query(Energy.Name == energyname)

        self.response.headers["Content-Type"] = "application/json"
        self.response.out.write(
            json.dumps(
                [temp.to_dict() for temp in energy_query],
                default=default_json_serializer,
            )
        )


# producation API
class ProductionAPI(webapp2.RequestHandler):
    def get(self):
        producationname = self.request.get("name")
        if producationname == "all":
            production_query = ProductionAndUse.query()
        elif producationname == "list":
            production_query = ProductionAndUse.query(
                projection=[ProductionAndUse.Name]
            )
        else:
            production_query = ProductionAndUse.query(
                ProductionAndUse.Name == producationname
            )

        self.response.headers["Content-Type"] = "application/json"
        self.response.out.write(
            json.dumps(
                [temp.to_dict() for temp in production_query],
                default=default_json_serializer,
            )
        )


# Country APU
class CountryAPI(webapp2.RequestHandler):
    def get(self):
        countryname = self.request.get("name")
        if countryname == "all":
            country_query = Country.query()
        elif countryname == "list":
            country_query = Country.query(projection=[Country.Name])
        else:
            country_query = Country.query(Country.Name == countryname)

        self.response.headers["Content-Type"] = "application/json"
        self.response.out.write(
            json.dumps(
                [temp.to_dict() for temp in country_query],
                default=default_json_serializer,
            )
        )


class Addcountry(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template(
            "/html_frontend/database_input/postcountry.html"
        )
        self.response.write(template.render())

    def post(self):
        post_country = Country()
        post_country.Name = self.request.get("countryname")
        post_country.Total_Production = float(self.request.get("totalproduction"))
        post_country.Total_Usage = float(self.request.get("totalusage"))
        post_country.Energy_Shortage = float(self.request.get("shorageDay"))
        post_country.Region = self.request.get("region")
        post_country.Population = float(self.request.get("population"))
        api = self.request.get("api")
        post_country.API = api
        post_country.Energy_API = self.request.get("energy_api")
        post_country.Production_API = self.request.get("production_api")
        post_country.Video_API = self.request.get("video_api")
        # parse from apis
        try:
            response = urllib2.urlopen(wikiURL + api)
            data = json.load(response)
            keys = data["query"]["pages"].keys()
            temp = data["query"]["pages"][keys[0]]["extract"]
        except urllib2.URLError:
            temp = ""
        post_country.description = temp
        post_country.put()
        self.redirect("/api/add/country")


class Addenergy(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template(
            "/html_frontend/database_input/postenergy.html"
        )
        self.response.write(template.render())

    def post(self):
        post_energy = Energy()
        post_energy.Name = self.request.get("energyname")
        post_energy.Type = self.request.get("energytype")
        post_energy.Major_Use = self.request.get("energyMajorUse")
        post_energy.Consumption_Rank_in_US = int(self.request.get("consumptionUSRank"))
        post_energy.Electrical_Generating_Rank = int(
            self.request.get("electricalGenerRank")
        )
        post_energy.Top_Producing_Country = self.request.get("topProduceCountry")
        api = self.request.get("api")
        post_energy.API = api
        post_energy.Country_API = self.request.get("country_api")
        post_energy.Production_API = self.request.get("production_api")
        post_energy.Video_API = self.request.get("video_api")
        try:
            response = urllib2.urlopen(wikiURL + api)
            data = json.load(response)
            keys = data["query"]["pages"].keys()
            temp = data["query"]["pages"][keys[0]]["extract"]
        except urllib2.URLError:
            temp = ""
        post_energy.description = temp
        post_energy.put()
        self.redirect("/api/add/energy")


class Addproduction(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template(
            "/html_frontend/database_input/postproduction.html"
        )
        self.response.write(template.render())

    def post(self):
        post_prod = ProductionAndUse()
        post_prod.Name = self.request.get("producationname")
        post_prod.Type = self.request.get("puType")
        post_prod.Year_of_Invention = int(self.request.get("yearofinvention"))
        post_prod.Related_Energy = self.request.get("puRelatedEnergy")
        post_prod.Carbon_Emission = int(self.request.get("carbon"))
        post_prod.Usage_Field = self.request.get("usageField")
        api = self.request.get("api")
        post_prod.API = api
        post_prod.Country_API = self.request.get("country_api")
        post_prod.Energy_API = self.request.get("energy_api")
        post_prod.Video_API = self.request.get("video_api")
        try:
            response = urllib2.urlopen(wikiURL + api)
            data = json.load(response)
            keys = data["query"]["pages"].keys()
            temp = data["query"]["pages"][keys[0]]["extract"]
        except urllib2.URLError:
            temp = ""
        post_prod.description = temp
        post_prod.put()
        self.redirect("/api/add/production")


# three basic search, think about the special case and improve it
class FilterEnergy(webapp2.RequestHandler):
    def get(self):
        # use Continued filter to filter out the condition and "all" situation
        energy_query = Energy.query()
        energyType = self.request.get("Type")
        if energyType != "all":
            energy_query = energy_query.filter(Energy.Type.IN(energyType.split("|")))

        majorUse = self.request.get("Major_Use")
        if majorUse != "all" and energy_query.fetch() != []:
            energy_query = energy_query.filter(Energy.Major_Use.IN(majorUse.split("|")))

        topCountry = self.request.get("Top_Producing_Country")
        if topCountry != "all" and energy_query.fetch() != []:
            energy_query = energy_query.filter(
                Energy.Top_Producing_Country.IN(topCountry.split("|"))
            )

        self.response.headers["Content-Type"] = "application/json"
        self.response.out.write(
            json.dumps(
                [temp.to_dict() for temp in energy_query],
                default=default_json_serializer,
            )
        )


class FilterProduction(webapp2.RequestHandler):
    def get(self):
        production_query = ProductionAndUse.query()
        productionType = self.request.get("Type")
        if productionType != "all":
            production_query = production_query.filter(
                ProductionAndUse.Type.IN(productionType.split("|"))
            )

        usageField = self.request.get("Usage_Field")
        if usageField != "all" and production_query.fetch() != []:
            production_query = production_query.filter(
                ProductionAndUse.Usage_Field.IN(usageField.split("|"))
            )

        year = self.request.get("Year_of_Invention")
        if year != "all" and production_query.fetch() != []:
            listOfEle = year.split("|")
            listOFKey = []
            for year in listOfEle:
                if year == "BC":
                    temp = production_query.filter(
                        ProductionAndUse.Year_of_Invention < 0
                    ).fetch(keys_only=True)
                elif year == "1700-1900":
                    temp = production_query.filter(
                        ProductionAndUse.Year_of_Invention < 1900,
                        ProductionAndUse.Year_of_Invention >= 1700,
                    ).fetch(keys_only=True)
                elif year == "1900-2000":
                    temp = production_query.filter(
                        ProductionAndUse.Year_of_Invention < 2000,
                        ProductionAndUse.Year_of_Invention >= 1900,
                    ).fetch(keys_only=True)
                else:
                    temp = production_query.filter(
                        ProductionAndUse.Year_of_Invention >= 2000
                    ).fetch(keys_only=True)
                listOFKey += temp
            production_query = ndb.get_multi(listOFKey)

        self.response.headers["Content-Type"] = "application/json"
        self.response.out.write(
            json.dumps(
                [temp.to_dict() for temp in production_query],
                default=default_json_serializer,
            )
        )


class FilterCountry(webapp2.RequestHandler):
    def get(self):
        country_query = Country.query()

        region = self.request.get("Region")
        if region != "all":
            country_query = country_query.filter(Country.Region.IN(region.split("|")))

        population = self.request.get("Population")
        if population != "all" and country_query.fetch() != []:
            listOfEle = population.split("|")
            listOFKey = []
            for rang in listOfEle:
                if rang == "0-100":
                    temp = country_query.filter(Country.Population < 100).fetch(
                        keys_only=True
                    )
                elif rang == "100-500":
                    temp = country_query.filter(
                        Country.Population < 500, Country.Population >= 100
                    ).fetch(keys_only=True)
                else:
                    temp = country_query.filter(Country.Population >= 500).fetch(
                        keys_only=True
                    )
                listOFKey += temp
            country_query = ndb.get_multi(listOFKey)

        totalProduce = self.request.get("Total_Production")
        if totalProduce != "all" and country_query != []:
            listOfEle = totalProduce.split("|")
            listOFResult = []
            for rang in listOfEle:
                for each in country_query:
                    if rang == "0-1000" and each.Total_Production < 1000:
                        listOFResult.append(each)
                    elif (
                        rang == "1000-2000"
                        and each.Total_Production < 2000
                        and each.Total_Production >= 1000
                    ):
                        listOFResult.append(each)
                    elif rang == ">2000" and each.Total_Production >= 2000:
                        listOFResult.append(each)
            country_query = listOFResult

        self.response.headers["Content-Type"] = "application/json"
        self.response.out.write(
            json.dumps(
                [temp.to_dict() for temp in country_query],
                default=default_json_serializer,
            )
        )


# search function
# class SearchEnergy(webapp2.RequestHandler):
#     def get(self):
#         target = self.request.get("search")

# class SearchProduction(webapp2.RequestHandler):
#
# class SearchCountry(webapp2.RequestHandler):
#
# class SearchHome(webapp2.RequestHandler):


app = webapp2.WSGIApplication(
    [
        ("/api/add/country", Addcountry),
        ("/api/add/energy", Addenergy),
        ("/api/add/production", Addproduction),
        ("/api/energy", EnergyAPI),
        ("/api/production", ProductionAPI),
        ("/api/country", CountryAPI),
        # filter API
        ("/api/filter/energy", FilterEnergy),
        ("/api/filter/production", FilterProduction),
        ("/api/filter/country", FilterCountry),
        # ("/api/search/energy", SearchEnergy),
        # ("/api/search/production", SearchProduction),
        # ("/api/search/country", SearchCountry),
        # ("/api/search/home", SearchHome),
    ],
    debug=True,
)
