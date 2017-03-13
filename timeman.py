#!/usr/bin/env python
# encoding:utf-8

# TODO : 
# 不能查询以前的时间

import datetime
import re

def isNumber(char):
    return ((ord(char) > ord("0")) and (ord(char) < ord("9")))

def getDay():
    now = datetime.datetime.now()
    return now.strftime("%D")

def getMonth():
    now = datetime.datetime.now()
    return now.strftime("%M")

def getYear():
    now = datetime.datetime.now()
    return now.strftime("%Y")

def timeConvertor(content):
    # 为了能匹配到更多的分隔符 , 进行以下的操作
    if re.match(r"\d{4}.[0|1]\d.[0|1|2|3]\d", content): # 2017/02/28
        return content[0:4]+"-"+content[5:7]+"-"+content[8:10]
    elif re.match(r"\d{4}.\d.\d", content): # 2016/8/8
        return content[0:4]+"-"+"0"+content[5:6]+"-"+"0"+content[7:8]
    elif re.match(r"\d{4}年[0|1]\d月[0|1|2|3]\d[日|号]", content): # 2016年03月23日 2016年04月21号
        content = content.replace("年","")
        content = content.replace("月","")
        content = content.replace("日","")
        content = content.replace("号","")
        return content[0:4]+"-"+content[4:6]+"-"+content[6:8]
    #elif re.match(r"\d{4}年\d月\d[日|号]", content): # 2016年3月15日 2016年3月15号
    #    content = content.replace("年","")
    #    content = content.replace("月","")
    #    content = content.replace("日","")
    #    content = content.replace("号","")
        return content[0:4]+"-"+"0"+content[4:5]+"-"+"0"+content[5:6]
    elif re.match(r"[0|1]\d月[0|1|2|3]\d[日|号]", content): # 05月23日 03月12号
        content = content.replace("月","")
        content = content.replace("日","")
        content = content.replace("号","")
        return getYear()+"-"+content[0:2]+"-"+content[2:4]
    elif re.match(r"\d月\d[日|号]", content): # 2月 2月23号
        content = content.replace("月","")
        content = content.replace("日","")
        content = content.replace("号","")
        return getYear()+"-"+"0"+content[0:1]+"-"+"0"+content[1:2]
    elif re.match(r"[0|1|2|3]\d[日|号]", content): # 
        content = content.replace("日","")
        content = content.replace("号","")
        return getYear()+"-"+getMonth()+"-"+content
    elif re.match(r"\d[日|号]", content): # 
        content = content.replace("日","")
        content = content.replace("号","")
        return getYear()+"-"+getMonth()+"-"+"0"+content
    elif re.match(r"\d{8}", content): # 年月日之间没有分隔 , 例如 : 20170228
        return content[0:4]+"-"+content[4:6]+"-"+content[6:8]
    elif content == "明天":
        now = datetime.datetime.now()
        delta = datetime.timedelta(days=1)
        n_days = now + delta
        return n_days.strftime("%Y-%m-%d")
    elif content == "后天":
        now = datetime.datetime.now()
        delta = datetime.timedelta(days=2)
        n_days = now + delta
        return n_days.strftime("%Y-%m-%d")
    elif content.endswith("天后"):
        content = content.replace("天后", "")
        days = int(content)
        now = datetime.datetime.now()
        delta = datetime.timedelta(days=days)
        n_days = now + delta
        return n_days.strftime("%Y-%m-%d")
    else: # 所有其他没有的规则都默认查询今天
        now = datetime.datetime.now()
        print "全没匹配到"
        return  now.strftime("%Y-%m-%d")  

def test():
    print "2016/08/08 :", timeConvertor("2016/08/08")
    print "20160808", timeConvertor("20160808")
    print "2016-08-08", timeConvertor("2016-08-08")
    print "2016.08.08", timeConvertor("2016.08.08")
    print "2016!08!08", timeConvertor("2016!08!08")
    print "2016!8!8", timeConvertor("2016!8!8")
    print "2016年08月08日", timeConvertor("2016年08月08日")
    print "2016年8月8日", timeConvertor("2016年8月8日")
    print "08月08日", timeConvertor("08月08日")
    print "8月8日", timeConvertor("8月8日")
    print "08日", timeConvertor("O8日")
    print "8日", timeConvertor("8日")

def main():
    test()

if __name__ == "__main__":
    main()
