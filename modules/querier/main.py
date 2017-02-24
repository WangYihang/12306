#!/usr/bin/env python
# encoding:utf-8

import querier

result = querier.querier("2017-02-23", "BJP", "SHH", "ADULT")
length = result.length
for i in range(length):
    print "=" * 36
    print "首发站 : ", result.getStartStationName(i)
    print "终点站 : ", result.getEndStationName(i)
    print "起始站 : ", result.getFromStationName(i)
    print "到达站 : ", result.getToStationName(i)
    print "出发时间 : ", result.getStartTime(i)
    print "到达时间", result.getArriveTime(i)
    print "其他 : ", result.getQitaNumber(i)
    print "无座", result.getWuzuoNumber(i)
    print "硬座 : ", result.getYingzuoNumber(i)
    print "硬卧 : ", result.getYingwoNumber(i)
    print "软座 : ", result.getRuanzuoNumber(i)
    print "软卧 : ", result.getRuanwoNumber(i)
    print "高级软卧 : ", result.getGaojiruanwoNumber(i)
    print "二等座 : ", result.getErdengzuoNumber(i)
    print "一等座 : ", result.getYidengzuoNumber(i)
    print "特等座 : ", result.getTengdengzuoNumber(i)
    print "商务座 : ", result.getShangwuzuoNumber(i)
