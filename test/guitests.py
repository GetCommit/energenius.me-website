
"""
UniTest for energenius.me
"""

import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class GUI_tests(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome('./chromedriver')

    def test_web_name(self):
        home_page_name = "Energenius"
        
        driver = self.driver
        driver.get("https://www.energenius.me/")
        self.assertIn(home_page_name, driver.title)

    def test_navbar_home(self):
        home_page_name = "Energenius"
        driver = self.driver
        driver.get("https://www.energenius.me/")
        home_link = driver.find_element_by_link_text('Home')
        home_link.click()
        self.assertIn(home_page_name, driver.title)

    def test_navbar_Energy(self):
        species_page_name = "Energenius"
        driver = self.driver
        driver.get("https://www.energenius.me/")
        species_link = driver.find_element_by_link_text('Energy Category')
        species_link.click()
        self.assertIn(species_page_name, driver.title)

    def test_navbar_Usage(self):
        location_page_name = "Energenius"
        driver = self.driver
        driver.get("https://www.energenius.me/")
        location_link = driver.find_element_by_link_text('Production and Usage')
        location_link.click()
        self.assertIn(location_page_name, driver.title)

    def test_navbar_Consumtion(self):
        causes_page_name = "Energenius"
        driver = self.driver
        driver.get("https://www.energenius.me/")
        causes_link = driver.find_element_by_link_text('Country of Consumtion')
        causes_link.click()
        self.assertIn(causes_page_name, driver.title)

    def test_navbar_About(self):
        about_page_name = "Energenius"
        driver = self.driver
        driver.get("https://www.energenius.me/")
        about_link = driver.find_element_by_link_text('About Us')
        about_link.click()
        self.assertIn(about_page_name, driver.title)

    
    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
