#!/usr/bin/env python
# encoding:utf-8

import requests
import bs4
import logging

def getStationNameVersion():
    logging.captureWarnings(True)
    url = "https://kyfw.12306.cn/otn/"
    station_name_version = ""
    response = requests.get(url, verify=False)
    content = response.text.encode("UTF-8")
    soup = bs4.BeautifulSoup(content, "html.parser")
    scripts = soup.findAll("script")
    srcs = []
    for i in scripts:
        try:
            src = i['src']
            srcs.append(src)
        except:
            pass
    for i in srcs:
        if "station_name" in i:
            station_name_version = i.split("station_version=")[1]
            print "成功获取到车站信息版本 :" , station_name_version
    return station_name_version

def createUrlForStationName(station_name_version):
    return "https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=" + station_name_version

def convertStationNameToCode():

