import os
import urllib

from google.appengine.ext import ndb
from google.appengine.api import users

import json
import webapp2

# store the D3 data

class D3visualization(ndb.Model):
    name = ndb.StringProperty(required = True)
    value = ndb.IntegerProperty()

# ---------------------------------------------------------
#  No longer decide use instance page model use each model as instance
# ---------------------------------------------------------
# Three models

# Model- country
class Country(ndb.Model):
    Name = ndb.StringProperty(required=True)
    Total_Production = ndb.FloatProperty(required=True)
    Energy_Shortage = ndb.FloatProperty(required=True)
    API = ndb.StringProperty()
    Region = ndb.StringProperty(required=True)
    Total_Usage = ndb.FloatProperty(required=True)
    Population = ndb.FloatProperty()
    Production_API = ndb.StringProperty(required=True)
    Energy_API = ndb.StringProperty(required=True)
    Video_API = ndb.StringProperty(required=True)
    description = ndb.StringProperty(required=True)


# Model- energy
class Energy(ndb.Model):
    Name = ndb.StringProperty(required=True)
    Type = ndb.StringProperty(required=True)
    Top_Producing_Country = ndb.StringProperty()
    Consumption_Rank_in_US = ndb.IntegerProperty()
    Electrical_Generating_Rank = ndb.IntegerProperty()
    Major_Use = ndb.StringProperty()
    API = ndb.StringProperty()
    Country_API = ndb.StringProperty(required=True)
    Production_API = ndb.StringProperty(required=True)
    Video_API = ndb.StringProperty(required=True)
    description = ndb.StringProperty(required=True)


# Model- Production and usage
class ProductionAndUse(ndb.Model):
    Name = ndb.StringProperty(required=True)
    Type = ndb.StringProperty(required=True)
    Related_Energy = ndb.StringProperty(required=True)
    Carbon_Emission = ndb.IntegerProperty()
    Year_of_Invention = ndb.IntegerProperty()
    Usage_Field = ndb.StringProperty()
    API = ndb.StringProperty()
    Country_API = ndb.StringProperty(required=True)
    Energy_API = ndb.StringProperty(required=True)
    Video_API = ndb.StringProperty(required=True)
    description = ndb.StringProperty(required=True)
