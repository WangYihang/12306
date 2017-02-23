#!/usr/bin/env python
# encoding:utf-8

import json
import requests

class query:
    train_date = "2017-01-01"
    from_station = "BJ"
    to_station = "SHH"
    purpose_codes = "ADULT"
    url = ""
    resultJson = ""
    trainsJson = ""
    def init(self, train_date, from_station, to_station, purpose_codes):
        self.train_date = train_date
        self.from_station = from_startion
        self.to_station = to_station
        self.purpose_codes = purpose_codes
        self.url = self.__buildQueryUrl(self.train_date, self.station_from, self.station_to, self.purpose_code)
        self.resultJson = json.loads(requests.get(self.url).text)
        self.trainsJson = self.resultJson["data"]["queryLeftNewDTO"]

    def __buildQueryUrl(train_date, station_from, station_to, purpose_code):
        url = "https://kyfw.12306.cn/otn/leftTicket/query?"
        url += "leftTicketDTO.train_date=" + train_date
        url += "&leftTicketDTO.from_station=" + station_from
        url += "&leftTicketDTO.to_station=" + station_to
        url += "&purpose_codes=" + purpose_code
        return url

    def getStartStationName(self):
        return self.trains["start_station_name"]

    def getEndStationName(self):
        return self.trains["end_station_name"]

    def getFromStationName(self):
        return self.trains["from_station_name"]

    def getToStationName(self):
        return self.trains["to_station_name"]

    def getStartTime(self):
        return self.trains["start_time"]

    def getArriveTime(self):
        return self.trains["arrive_time"]

    def getQitaNumber(self):
        return self.trains["qt_num"]

    def getWuzuoNumber(self):
        return self.trains["wz_num"]

    def getYingzuoNumber(self):
        return self.trains["yz_num"]

    def getYingwoNumber(self):
        return self.trains["yw_num"]

    def getRuanzuoNumber(self):
        return self.trains["rz_num"]

    def getRuanwoNumber(self):
        return self.trains["rw_num"]

    def getGaojiruanwoNumber(self):
        return self.trains["gr_num"]

    def getErdengzuoNumber(self):
        return self.trains["ze_num"]

    def getYidengzuoNumber(self):
        return self.trains["zy_num"]

    def getTengdengzuoNumber(self):
        return self.trains["tz_num"]

    def getShangwuzuoNumber(self):
        return self.trains["swz_num"]

