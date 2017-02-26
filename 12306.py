#!/usr/bin/env python
# encoding:utf-8

import sys
import requests

import tools
import stations
import querier
import price
import timeman

def init():
    stations.updateStationNames()
    

def main():
    argv_length = len(sys.argv)
    if argv_length == 4:
        init()
        TIME = timeman.timeConvertor(sys.argv[1])
        try:
            FROM = stations.getStationCode(sys.argv[2])['station_code']
        except:
            print "出发站点不存在!"
            exit(1)
        try:
            TO = stations.getStationCode(sys.argv[3])['station_code']
        except:
            print "目的站点不存在!"
            exit(1)
        print "查询中..."

        session = requests.Session()
        session.headers = {
	    "Host": "kyfw.12306.cn",
	    "Connection": "keep-alive",
	    "Cache-Control": "max-age=0",
	    "Upgrade-Insecure-Requests": "1",
	    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36",
	    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
	    "Accept-Encoding": "gzip, deflate, sdch, br",
	    "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6",
        }
        queryResult =  querier.querier(TIME, FROM, TO, "ADULT")
        length = queryResult.length
        for i in range(length):
            print "=" * 36

            train_no = queryResult.getTrainNo(i)
            from_station_no = queryResult.getFromStationNo(i)
            to_station_no = queryResult.getToStationNo(i)
            seat_types = queryResult.getSeatTypes(i)
            train_date = TIME

            print "座位类型 :",seat_types

            priceResult = price.price(train_no, from_station_no, to_station_no, seat_types, train_date, session)

            qita_price = "--"
            wuzuo_price = "--"
            yingzuo_price = "--" 
            yingwo_price = "--"
            ruanzuo_price = "--"
            ruanwo_price = "--"
            gaojiruanwo_price = "--"
            erdengzuo_price = "--"
            yidengzuo_price = "--"
            tedengzuo_price = "--"
            shangwuzuo_price = "--"

            if tools.checkStringChars(seat_types, "OOMP"):
                qita_price = "--"
                wuzuo_price = priceResult.getPrice("WZ")
                yingzuo_price = "--" 
                yingwo_price = "--"
                ruanzuo_price = "--"
                ruanwo_price = "--"
                gaojiruanwo_price = "--"
                erdengzuo_price = priceResult.getPrice("O")
                yidengzuo_price = priceResult.getPrice("M")
                tedengzuo_price = priceResult.getPrice("P")
                shangwuzuo_price = "--"
            elif tools.checkStringChars(seat_types, "OMP"):
                qita_price = "--"
                wuzuo_price = "--"
                yingzuo_price = "--" 
                yingwo_price = "--"
                ruanzuo_price = "--"
                ruanwo_price = "--"
                gaojiruanwo_price = "--"
                erdengzuo_price = priceResult.getPrice("O")
                yidengzuo_price = priceResult.getPrice("M")
                tedengzuo_price = priceResult.getPrice("P")
                shangwuzuo_price = "--"
            elif tools.checkStringChars(seat_types, "O9OMP"):
                qita_price = "--"
                wuzuo_price = priceResult.getPrice("WZ")
                yingzuo_price = "--" 
                yingwo_price = "--"
                ruanzuo_price = "--"
                ruanwo_price = "--"
                gaojiruanwo_price = "--"
                erdengzuo_price = priceResult.getPrice("O")
                yidengzuo_price = priceResult.getPrice("M")
                tedengzuo_price = priceResult.getPrice("P")
                shangwuzuo_price = "A9"
            elif tools.checkStringChars(seat_types, "O9MP"):
                qita_price = "--"
                wuzuo_price = "--"
                yingzuo_price = "--" 
                yingwo_price = "--"
                ruanzuo_price = "--"
                ruanwo_price = "--"
                gaojiruanwo_price = "--"
                erdengzuo_price = priceResult.getPrice("O")
                yidengzuo_price = priceResult.getPrice("M")
                tedengzuo_price = priceResult.getPrice("P")
                shangwuzuo_price = priceResult.getPrice("A9")
            elif tools.checkStringChars(seat_types, "O9OM"):
                qita_price = "--"
                wuzuo_price = "--"
                yingzuo_price = "--" 
                yingwo_price = "--"
                ruanzuo_price = "--"
                ruanwo_price = "--"
                gaojiruanwo_price = "--"
                erdengzuo_price = priceResult.getPrice("O")
                yidengzuo_price = priceResult.getPrice("M")
                tedengzuo_price = "--"
                shangwuzuo_price = "A9"
            elif tools.checkStringChars(seat_types, "1413"):
                qita_price = "--"
                wuzuo_price = priceResult.getPrice("WZ")
                yingzuo_price = priceResult.getPrice("A1")
                yingwo_price = priceResult.getPrice("A3")
                ruanzuo_price = "--"
                ruanwo_price = priceResult.getPrice("A4")
                gaojiruanwo_price = "--"
                erdengzuo_price = "--"
                yidengzuo_price = "--"
                tedengzuo_price = "--"
                shangwuzuo_price = "--"
            elif tools.checkStringChars(seat_types, "OM9"):
                qita_price = "--"
                wuzuo_price = "--"
                yingzuo_price = "--"
                yingwo_price = "--"
                ruanzuo_price = "--"
                ruanwo_price = "--"
                gaojiruanwo_price = "--"
                erdengzuo_price = priceResult.getPrice("O")
                yidengzuo_price = priceResult.getPrice("M")
                tedengzuo_price = "--"
                shangwuzuo_price = priceResult.getPrice("A9")
            elif tools.checkStringChars(seat_types, "OMO"):
                qita_price = "--"
                wuzuo_price = priceResult.getPrice("WZ")
                yingzuo_price = "--"
                yingwo_price = "--"
                ruanzuo_price = "--"
                ruanwo_price = "--"
                gaojiruanwo_price = "--"
                erdengzuo_price = priceResult.getPrice("O")
                yidengzuo_price = priceResult.getPrice("M")
                tedengzuo_price = "--"
                shangwuzuo_price = "--"
            elif tools.checkStringChars(seat_types, "14136"):
                qita_price = "--"
                wuzuo_price = priceResult.getPrice("WZ")
                yingzuo_price = priceResult.getPrice("A1")
                yingwo_price = priceResult.getPrice("A3")
                ruanzuo_price = "--"
                ruanwo_price = priceResult.getPrice("A4")
                gaojiruanwo_price = priceResult.getPrice("A6")
                erdengzuo_price = "--"
                yidengzuo_price = "--"
                tedengzuo_price = "--"
                shangwuzuo_price = "--"
            elif tools.checkStringChars(seat_types, "113"):
                qita_price = "--"
                wuzuo_price = priceResult.getPrice("WZ")
                yingzuo_price = priceResult.getPrice("A1")
                yingwo_price = priceResult.getPrice("A3")
                ruanzuo_price = "--"
                ruanwo_price = "--"
                gaojiruanwo_price = "--"
                erdengzuo_price = "--"
                yidengzuo_price = "--"
                tedengzuo_price = "--"
                shangwuzuo_price = "--"
            elif tools.checkStringChars(seat_types, "O4"):
                qita_price = "--"
                wuzuo_price = "--"
                yingzuo_price = "--"
                yingwo_price = "--"
                ruanzuo_price = "--"
                ruanwo_price = priceResult.getPrice("A4")
                gaojiruanwo_price = "--"
                erdengzuo_price = priceResult.getPrice("O")
                yidengzuo_price = "--"
                tedengzuo_price = "--"
                shangwuzuo_price = "--"
            elif tools.checkStringChars(seat_types, "24"):
                qita_price = "--"
                wuzuo_price = "--"
                yingzuo_price = "--"
                yingwo_price = "--"
                ruanzuo_price = priceResult.getPrice("A2")
                ruanwo_price = priceResult.getPrice("A4")
                gaojiruanwo_price = "--"
                erdengzuo_price = "--"
                yidengzuo_price = "--"
                tedengzuo_price = "--"
                shangwuzuo_price = "--"
            elif tools.checkStringChars(seat_types, "4"):
                qita_price = "--"
                wuzuo_price = "--"
                yingzuo_price = "--"
                yingwo_price = "--"
                ruanzuo_price = "--"
                ruanwo_price = priceResult.getPrice("A4")
                gaojiruanwo_price = "--"
                erdengzuo_price = "--"
                yidengzuo_price = "--"
                tedengzuo_price = "--"
                shangwuzuo_price = "--"
            elif tools.checkStringChars(seat_types, "112"):
                qita_price = "--"
                wuzuo_price = priceResult.getPrice("WZ")
                yingzuo_price = priceResult.getPrice("A1")
                yingwo_price = "--"
                ruanzuo_price = priceResult.getPrice("A2")
                ruanwo_price = "--"
                gaojiruanwo_price = "--"
                erdengzuo_price = "--"
                yidengzuo_price = "--"
                tedengzuo_price = "--"
                shangwuzuo_price = "--"
            elif tools.checkStringChars(seat_types, "1416H3"):
                qita_price = priceResult.getPrice("OT")[0]
                wuzuo_price = priceResult.getPrice("WZ")
                yingzuo_price = priceResult.getPrice("A1")
                yingwo_price = priceResult.getPrice("A3")
                ruanzuo_price = "--"
                ruanwo_price = priceResult.getPrice("A4")
                gaojiruanwo_price = priceResult.getPrice("A6")
                erdengzuo_price = "--"
                yidengzuo_price = "--"
                tedengzuo_price = "--"
                shangwuzuo_price = "--"
            elif tools.checkStringChars(seat_types, "43"):
                qita_price = "--"
                wuzuo_price = "--"
                yingzuo_price = "--"
                yingwo_price = priceResult.getPrice("A3")
                ruanzuo_price = "--"
                ruanwo_price = priceResult.getPrice("A4")
                gaojiruanwo_price = "--"
                erdengzuo_price = "--"
                yidengzuo_price = "--"
                tedengzuo_price = "--"
                shangwuzuo_price = "--"
            elif tools.checkStringChars(seat_types, "46"):
                qita_price = "--"
                wuzuo_price = "--"
                yingzuo_price = "--"
                yingwo_price = "--"
                ruanzuo_price = "--"
                ruanwo_price = priceResult.getPrice("A4")
                gaojiruanwo_price = priceResult.getPrice("A6")
                erdengzuo_price = "--"
                yidengzuo_price = "--"
                tedengzuo_price = "--"
                shangwuzuo_price = "--"
            else:
                print "座位类型无法解析!"
            

            print "列车号 : ", queryResult.getStationTrainCode(i)
            print "列车编号 : ", queryResult.getTrainNo(i)
            print "是否可凭身份证进出站 : ", queryResult.getIsSupportCard(i)
            print "首发站 : ", queryResult.getStartStationName(i)
            print "终点站 : ", queryResult.getEndStationName(i)
            print "起始站 : ", queryResult.getFromStationName(i)
            print "到达站 : ", queryResult.getToStationName(i)
            print "出发时间 : ", queryResult.getStartTime(i)
            print "到达时间 : ", queryResult.getArriveTime(i)
            print "历时 : ", queryResult.getLishi(i)
            print "其他 [", qita_price, "] :", queryResult.getQitaNumber(i)
            print "无座 [", wuzuo_price, "] :", queryResult.getWuzuoNumber(i)
            print "硬座 [", yingzuo_price, "] :", queryResult.getYingzuoNumber(i)
            print "硬卧 [", yingwo_price, "] :", queryResult.getYingwoNumber(i)
            print "软座 [", ruanzuo_price, "] :", queryResult.getRuanzuoNumber(i)
            print "软卧 [", ruanwo_price, "] :", queryResult.getRuanwoNumber(i)
            print "高级软卧 [", gaojiruanwo_price, "] :", queryResult.getGaojiruanwoNumber(i)
            print "二等座 [", erdengzuo_price, "] :", queryResult.getErdengzuoNumber(i)
            print "一等座 [", yidengzuo_price, "] :", queryResult.getYidengzuoNumber(i)
            print "特等座 [", tedengzuo_price, "] :", queryResult.getTengdengzuoNumber(i)
            print "商务座 [", shangwuzuo_price, "] :", queryResult.getShangwuzuoNumber(i)
    else:
        print "命令 :" 
        print "    python %s [TIME] [FROM] [TO]" % (sys.argv[0])
        print "参数 : "
        print "    [TIME] : 出发的日期 (今天|明天|后天|7天后|2017-02-26)"
        print "    [FROM] : 出发地的中文名 , 支持模糊查询"
        print "    [TO] : 目的地的中文名 , 支持模糊查询"
                    
if __name__ == "__main__":
    main()
