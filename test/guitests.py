
"""
UniTest for energenius.me
"""

import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class GUI_tests(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome('./chromedriver')

    # def test_web_name(self):
    #     home_page_name = "Energenius"
        
    #     driver = self.driver
    #     driver.get("https://www.energenius.me/")
    #     self.assertIn(home_page_name, driver.title)

    # def test_navbar_Energy(self):
    #     species_page_name = "Energy"
    #     driver = self.driver
    #     driver.get("https://www.energenius.me/")
    #     species_link = driver.find_element_by_link_text('Energy')
    #     species_link.click()
    #     self.assertIn(species_page_name, driver.title)

    # def test_navbar_Usage(self):
    #     location_page_name = "Production and Usage"
    #     driver = self.driver
    #     driver.get("https://www.energenius.me/")
    #     location_link = driver.find_element_by_link_text('Production & Usage')
    #     location_link.click()
    #     self.assertIn(location_page_name, driver.title)

    # def test_navbar_Consumtion(self):
    #     causes_page_name = "Country"
    #     driver = self.driver
    #     driver.get("https://www.energenius.me/")
    #     causes_link = driver.find_element_by_link_text('Country')
    #     causes_link.click()
    #     self.assertIn(causes_page_name, driver.title)

    def test_navbar_About(self):
        about_page_name = "Energenius"
        driver = self.driver
        driver.get("https://www.energenius.me/")
        about_link = driver.find_element_by_link_text('About Us')
        about_link.click()
        print driver.title
        self.assertIn(about_page_name, driver.title)
    
    
    # def test_Global_Search(self):
    #     about_page_name = "undefined"
    #     driver = self.driver
    #     driver.get("https://www.energenius.me/")
    #     about_link = driver.find_element_by_link_text('Global Search')
    #     about_link.click()
    #     print driver.title
    #     self.assertIn(about_page_name, driver.title)

    
    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
