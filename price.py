#!/usr/bin/env python
# encoding:utf-8

import json
import logging
import requests

logging.captureWarnings(True)

class price(object):
    train_no="24000C22290C"
    from_station_no="01"
    to_station_no="03"
    seat_types="OOMP"
    train_date="2017-02-26"
    url = ""
    resultJson = {}
    priceJson = {}

    def __init__(self, train_no, from_station_no, to_station_no, seat_types, train_date, session, cdn):
        self.train_no = train_no
        self.from_station_no = from_station_no
        self.to_station_no = to_station_no
        self.seat_types = seat_types
        self.train_date = train_date
        self.cdn = cdn
        self.url = self.__buildQueryUrl(self.cdn, self.train_no, self.from_station_no, self.to_station_no, self.seat_types, self.train_date)
        self.resultJson = json.loads(session.get(self.url, verify=False).text.encode("UTF-8"), "UTF-8")
        print self.resultJson
        self.priceJson = self.resultJson["data"]

    def __buildQueryUrl(self, cdn, train_no, from_station_no, to_station_no, seat_types, train_date):
	url = "https://"+cdn+"/otn/leftTicket/queryTicketPrice?"
	url += "train_no=" + train_no
	url += "&from_station_no=" + from_station_no
	url += "&to_station_no=" + to_station_no
	url += "&seat_types=" + seat_types
	url += "&train_date=" + train_date
        print url
        return url

    def getPrice(self, key):
        '''
        自定义获取价格
        '''
        try:
            return self.priceJson[key]
        except:
            pass


    def getQitaPrice(self):
        '''
        其他价格
        '''
        return self.priceJson["train_no"]

    def getWuzuoPrice(self):
        '''
        无座价格
        '''
        return self.priceJson["train_no"]

    def getYingzuoPrice(self):
        '''
        硬座价格
        '''
        return self.priceJson["train_no"]

    def getYingwoPrice(self):
        '''
        硬卧价格
        '''
        return self.priceJson["train_no"]

    def getRuanzuoPrice(self):
        '''
        软座价格
        '''
        return self.priceJson["train_no"]

    def getRuanwoPrice(self):
        '''
        软卧价格
        '''
        return self.priceJson["train_no"]

    def getGaojiruanwoPrice(self):
        '''
        高级软卧价格
        '''
        return self.priceJson["train_no"]

    def getErdengzuoPrice(self):
        '''
        二等座价格
        '''
        return self.priceJson["train_no"]

    def getYidengzuoPrice(self):
        '''
        一等座价格
        '''
        return self.priceJson["train_no"]

    def getTedengzuoPrice(self):
        '''
        特等座价格
        '''
        return self.priceJson["train_no"]

    def getShangwuzuoPrice(self):
        '''
        商务座价格
        '''
        return self.priceJson["train_no"]
