import os
import urllib

from google.appengine.ext import ndb
from google.appengine.api import users

import json
import webapp2

# Database for the all instance page
# ---------------------------------
# Front end get the info directly from the other API, NO need for all instance page
# ---------------------------------
# class SectionContent(ndb.Model):
#     title = ndb.StringProperty(required = True, indexed = True)
#     content = ndb.StringProperty(required = True, indexed = True)
#     # if need image put here
#     # sectionimage = ndb.ndb.BlobProperty()
#
# class SideSectioncontent(ndb.Model):
#     uptitle = ndb.StringProperty(required = True)
#     upcontent = ndb.StringProperty(repeated = True)
#     # if need link or url, also could store here
#     downtitle = ndb.StringProperty(required = True)
#     downcontent = ndb.StringProperty(repeated = True)
#
# class AllInstancePage(ndb.Model):
#     pagename = ndb.StringProperty(required = True, indexed=True)
#     intro = ndb.StringProperty(required = True, indexed = True)
#     bodysection = ndb.StructuredProperty(SectionContent, repeated = True)
#     sidesection = ndb.StructuredProperty(SideSectioncontent)

# country API
# class Top3Energy (ndb.Model):
#     t3energyname = ndb.StringProperty(required = True)
#     t3energyproduce = ndb.StringProperty()

class Country (ndb.Model):
    countryName = ndb.StringProperty(required = True)
    totalProduction = ndb.FloatProperty(required = True)
    totalUsage = ndb.FloatProperty(required = True)
    shorageDay = ndb.FloatProperty()
    rankRenewableEnergy = ndb.IntegerProperty()
    region = ndb.StringProperty(required = True)
    population = ndb.FloatProperty(required = True)

# energy API
class Energy (ndb.Model):
    energyName = ndb.StringProperty(required = True)
    energyType = ndb.StringProperty(required = True)
    energyMajorUse = ndb.StringProperty()
    consumptionUSRank = ndb.IntegerProperty()
    electricalGenerRank = ndb.IntegerProperty()
    topProduceCountry = ndb.StringProperty()

    # energydevelop = ndb.BooleanProperty(required = True)
    # cumulativeCap = ndb.StringProperty()

# Production API
class ProductionAndUse (ndb.Model):
    puName = ndb.StringProperty(required = True)
    puType = ndb.StringProperty(required = True)
    puRelatedEnergy = ndb.StringProperty(required = True)
    carbon = ndb.FloatProperty()
    yearOfInvention = ndb.IntegerProperty()
    usageField = ndb.StringProperty()
