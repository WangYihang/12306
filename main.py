#!/usr/bin/env python
# encoding:utf-8

import 
import requests

url = "https://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date=2017-03-10&leftTicketDTO.from_station=HBB&leftTicketDTO.to_station=BJP&purpose_codes=0X00"

response = requests.get(url, verify=False)
print response.text
