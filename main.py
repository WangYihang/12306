#!/usr/bin/env python
# encoding:utf-8

import sys

import stations
import querier

def init():
    stations.updateStationNames()

def main():
    argv_length = len(sys.argv)
    if argv_length == 4:
        init()
        TIME = sys.argv[1]
        FROM = stations.getStationCode(sys.argv[2])['station_code']
        TO = stations.getStationCode(sys.argv[3])['station_code']
        print "查询中..."
        queryResult =  querier.querier(TIME, FROM, TO, "ADULT")
        length = queryResult.length
        for i in range(length):
            print "=" * 36
            print "首发站 : ", queryResult.getStartStationName(i)
            print "起始站 : ", queryResult.getFromStationName(i)
            print "终点站 : ", queryResult.getEndStationName(i)
            print "到达站 : ", queryResult.getToStationName(i)
            print "出发时间 : ", queryResult.getStartTime(i)
            print "到达时间", queryResult.getArriveTime(i)
            print "其他 : ", queryResult.getQitaNumber(i)
            print "无座", queryResult.getWuzuoNumber(i)
            print "硬座 : ", queryResult.getYingzuoNumber(i)
            print "硬卧 : ", queryResult.getYingwoNumber(i)
            print "软座 : ", queryResult.getRuanzuoNumber(i)
            print "软卧 : ", queryResult.getRuanwoNumber(i)
            print "高级软卧 : ", queryResult.getGaojiruanwoNumber(i)
            print "二等座 : ", queryResult.getErdengzuoNumber(i)
            print "一等座 : ", queryResult.getYidengzuoNumber(i)
            print "特等座 : ", queryResult.getTengdengzuoNumber(i)
            print "商务座 : ", queryResult.getShangwuzuoNumber(i)
    else:
        print "Usage : \n\tpython %s [TIME] [FROM] [TO]" % sys.argv[0]

if __name__ == "__main__":
    main()
