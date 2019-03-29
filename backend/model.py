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
class SectionContent(ndb.Model):
    title = ndb.StringProperty(required = True, indexed = True)
    content = ndb.StringProperty(required = True, indexed = True)
    # if need image put here
    # sectionimage = ndb.ndb.BlobProperty()

class AllInstancePage(ndb.Model):
    pagename = ndb.StringProperty(required = True, indexed=True)
    intro = ndb.StringProperty(required = True, indexed = True)
    bodysection = ndb.StructuredProperty(SectionContent, repeated = True)
    uptitle = ndb.StringProperty(required = True)
    upcontent = ndb.StringProperty(repeated = True)
    # if need link or url, also could store here
    downtitle = ndb.StringProperty(required = True)
    downcontent = ndb.StringProperty(repeated = True)

# country API
# class Top3Energy (ndb.Model):
#     t3energyname = ndb.StringProperty(required = True)
#     t3energyproduce = ndb.StringProperty()

class Country (ndb.Model):
    Name = ndb.StringProperty(required = True)
    Total_Production = ndb.FloatProperty(required = True)
    Energy_Shortage = ndb.FloatProperty(required = True)
    Renewable_Energy_Rank = ndb.IntegerProperty()
    API = ndb.StringProperty()
    Region = ndb.StringProperty(required = True)
    Total_Usage = ndb.FloatProperty(required = True)
    Population = ndb.FloatProperty()


# energy API
class Energy (ndb.Model):
    Name = ndb.StringProperty(required = True)
    Type = ndb.StringProperty(required = True)
    # country key in the future
    Top_Producing_Country = ndb.StringProperty()
    Consumption_Rank_in_US = ndb.IntegerProperty()
    Electrical_Generating_Rank = ndb.IntegerProperty()
    Major_Use = ndb.StringProperty()
    API = ndb.StringProperty()

    # energydevelop = ndb.BooleanProperty(required = True)
    # cumulativeCap = ndb.StringProperty()

# Production API
class ProductionAndUse (ndb.Model):
    Name = ndb.StringProperty(required = True)
    Type = ndb.StringProperty(required = True)
    # store the key in the future
    Related_Energy = ndb.StringProperty(required = True)
    Carbon_Emission = ndb.IntegerProperty()
    Year_of_Invention = ndb.IntegerProperty()
    Usage_Field = ndb.StringProperty()
    API = ndb.StringProperty()
