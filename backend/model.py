import os
import urllib

from google.appengine.ext import ndb
from google.appengine.api import users

import json
import webapp2

# Database for the all instance page
class AllInstancePage(ndb.Model):
    pagename = ndb.StringProperty(required = True, indexed=True)
    intro = ndb.StringProperty(required = True, indexed=True)
    bodysection = ndb.StructuredProperty(SectionContent, repeated = True)
    sidesection = ndb.StructuredProperty(SideSectioncontent)

class SectionContent(ndb.Model):
    title = ndb.StringProperty(required = True, indexed=True)
    content = ndb.StringProperty(required = True, indexed=True)
    # if need image put here

class SideSectioncontent(ndb.Model):
    uptitle = ndb.StringProperty(required = True)
    upcontent = ndb.StringProperty(repeated = True)
    # if need link or url, also could store here
    downtitle = ndb.StringProperty(required = True)
    downcontent = ndb.StringProperty(repeated = True)


# country API
class Country (ndb.Model):
    countryname = ndb.StringProperty(required = True, indexed=True)
    totalproducation = ndb.IntegerProperty(required = True)
    totalusage = ndb.IntegerProperty(required = True)
    top3produce = ndb.StructuredProperty(Top3Energy, repeated = True)
    carbon = ndb.FloatProperty(required=True)

class Top3Energy (ndb.Model):
    t3energyname = ndb.StringProperty()
    t3energyproduce = ndb.IntegerProperty()

# energy API
class Energy (ndb.Model):
    energyname = ndb.StringProperty(required = True, indexed=True)
    energytype = ndb.StringProperty(required = True, indexed=True)
    energydevelop = ndb.BooleanProperty(required = True, indexed=True)
    cumulativeCap = ndb.FloatProperty(required=True)

# Production API
class Production (ndb.Model):
    producationname = ndb.StringProperty(required = True, indexed=True)
    producevolumn = ndb.IntegerProperty(required = True)
    yearofinvention = ndb.IntegerProperty()
    topdevelopcountry = ndb.StringProperty(repeated = True, indexed=True)
