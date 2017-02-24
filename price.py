#!/usr/bin/env python
# encoding:utf-8

import json
import requests
import logging

logging.captureWarnings(True)

class querier(object):
    train_no = ""
    from_station_no = ""
    to_station_no = ""
    seat_types = ""
    train_date = ""
    url = ""
    resultJson = {}
    priceJson = {}

    def __init__(self, train_no, from_station_no, to_station_no, seat_types, train_date):
        self.train_no = train_no
        self.from_station_no = from_station_no
        self.to_station_no = to_station_no
        self.seat_types = seat_types
        self.train_date = train_date
        self.url = self.__buildQueryUrl(train_no, from_station_no, to_station_no, seat_types, train_date)
        self.resultJson = json.loads(requests.get(self.url, verify=False).text)
        self.priceJson = self.resultJson["data"]

    def __buildQueryUrl(self, train_no, from_station_no, to_station_no, seat_types, train_date):
	url = "https://kyfw.12306.cn/otn/leftTicket/queryTicketPrice?"
	url += "train_no=" + train_no
	url += "&from_station_no=" + from_station_no
	url += "&to_station_no=" + to_station_no
	url += "&seat_types=" + seat_types
	url += "&train_date=" + train_date
        return url

    def getYingzuoPrice(self):
        '''
        软卧价格
        '''
        return self.priceJson["A1"]

    def getRuanzuoPrice(self):
        '''
        软座价格
        '''
        return self.priceJson["A2"]

    def getYingwoPrice(self):
        '''
        硬卧价格
        '''
        return self.priceJson["A3"]
    
    def getRuanwoPrice(self):
        '''
        软卧价格
        '''
        return self.priceJson["A4"]

    def getRuanwoPrice(self):
        '''
        高级软卧价格
        '''
        return self.priceJson["A6"]

    def getRuanwoPrice(self):
        '''
        商务座价格
        '''
        return self.priceJson["A9"]

    def getWuzuoPrice(self):
        '''
        无座价格
        '''
        return self.priceJson["WZ"]

