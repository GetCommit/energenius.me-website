import unittest
import json
import requests

url = "https://www.energenius.me/api/"

class TestBeckendAPIMethods(unittest.TestCase):

    def test_API_Page_1(self):
        r = requests.get(url + "add/energy")
        self.assertEqual(r.status_code, 200)

    def test_API_Page_2(self):
        r = requests.get(url + "add/country")
        self.assertEqual(r.status_code, 200)

    def test_API_Page_3(self):
        r = requests.get(url + "add/production")
        self.assertEqual(r.status_code, 200)

    def test_Page_Not_Found_1(self):
        r = requests.get(url)
        self.assertEqual(r.status_code, 404)

    def test_Page_Not_Found_2(self):
        r = requests.get(url + "usage/")
        self.assertEqual(r.status_code, 404)

    def test_Page_Not_Found_3(self):
        r = requests.get(url + "energy/")
        self.assertEqual(r.status_code, 404)

    def test_API_all(self):
        r = requests.get(url + "energy?name=all")
        d = json.loads(r.text)
        self.assertEqual(len(d), 9)

    def test_API_list(self):
        r = requests.get(url + "energy?name=list")
        d = json.loads(r.text)
        self.assertEqual(len(d[0]), 1)

    def test_API_name_match_API(self):
        r = requests.get(url + "energy?name=Biomass")
        d = json.loads(r.text)
        self.assertEqual(d[0]["API"], "Biomass")

    def test_API_name_match_Type(self):
        r = requests.get(url + "energy?name=Biomass")
        d = json.loads(r.text)
        self.assertEqual(d[0]["Type"], "Reneable Energy")

    def test_API_name_match_Region(self):
        r = requests.get(url + "country?name=Australia")
        d = json.loads(r.text)
        self.assertEqual(d[0]["Region"], "Pacific")

    def test_API_name_match_Carbon_Emission(self):
        r = requests.get(url + "production?name=Offshore drilling")
        d = json.loads(r.text)
        self.assertEqual(d[0]["Carbon_Emission"], 2338)

if __name__ == '__main__':
    unittest.main()
