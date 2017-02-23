#!/usr/bin/env python
# encoding:utf-8

import tools
import station

# get station name version
station_name_version = station.getStationNameVersion()
# create url of station name
url = station.createUrlForStationName(station_name_version)
# get station name
print url

tools.downloadFile(url, "station_name.dat")


