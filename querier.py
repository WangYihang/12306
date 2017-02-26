#!/usr/bin/env python
# encoding:utf-8

import json
import requests
import logging

logging.captureWarnings(True)

class querier(object):
    train_date = "2017-01-01"
    from_station = "BJ"
    to_station = "SHH"
    purpose_codes = "ADULT"
    url = ""
    resultJson = {}
    trainsJson = []
    length = 0
    def __init__(self, train_date, from_station, to_station, purpose_codes):
        self.train_date = train_date
        self.from_station = from_station
        self.to_station = to_station
        self.purpose_codes = purpose_codes
        self.url = self.__buildQueryUrl(self.train_date, self.from_station, self.to_station, self.purpose_codes)
        self.resultJson = json.loads(requests.Session().get(self.url, verify=False).text.encode("UTF-8"))
        self.trainsJson = self.resultJson["data"]
        self.length = len(self.trainsJson)

    def __buildQueryUrl(self, train_date, from_station, to_station, purpose_codes):
        url = "https://kyfw.12306.cn/otn/leftTicket/query?"
        url += "leftTicketDTO.train_date=" + train_date
        url += "&leftTicketDTO.from_station=" + from_station
        url += "&leftTicketDTO.to_station=" + to_station
        url += "&purpose_codes=" + purpose_codes
        return url

    def getLishi(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["lishi"]

    def getStationTrainCode(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["station_train_code"]

    def getTrainNo(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["train_no"]

    def getIsSupportCard(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["is_support_card"]

    def getStartStationName(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["start_station_name"]

    def getEndStationName(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["end_station_name"]

    def getFromStationName(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["from_station_name"]

    def getToStationName(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["to_station_name"]

    def getStartTime(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["start_time"]

    def getArriveTime(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["arrive_time"]

    def getQitaNumber(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["qt_num"]

    def getWuzuoNumber(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["wz_num"]

    def getYingzuoNumber(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["yz_num"]

    def getYingwoNumber(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["yw_num"]

    def getRuanzuoNumber(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["rz_num"]

    def getRuanwoNumber(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["rw_num"]

    def getGaojiruanwoNumber(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["gr_num"]

    def getErdengzuoNumber(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["ze_num"]

    def getYidengzuoNumber(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["zy_num"]

    def getTengdengzuoNumber(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["tz_num"]

    def getShangwuzuoNumber(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["swz_num"]

    def getTrainNo(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["train_no"]

    def getSeatTypes(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["seat_types"]

    def getFromStationNo(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["from_station_no"]

    def getToStationNo(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["to_station_no"]

    def getTrainDate(self, index):
        return self.trainsJson[index]["queryLeftNewDTO"]["train_date"]
