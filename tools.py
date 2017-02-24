#!/usr/bin/env python
# encoding:utf-8

import requests
import bs4
import logging

def getStationNamesVersion():
    '''
    获取 station_names.js 这个文件最新的版本号
    '''
    logging.captureWarnings(True)
    url = "https://kyfw.12306.cn/otn/"
    station_name_version = "" # 先初始化为 0 , 防止没有获取到的时候不能正常返回
    response = requests.get(url, verify=False)
    content = response.text.encode("UTF-8")
    soup = bs4.BeautifulSoup(content, "html.parser")
    scripts = soup.findAll("script")
    srcs = [] # 保存 HTML 中所有的 script 标签的 src 属性
    for i in scripts:
        try: # 这里使用 try 是因为有的 script 标签并没有 src 这个属性
            src = i['src']
            srcs.append(src)
        except:
            pass
    for i in srcs: # 这里设计地比较有扩展性 , 如果还要获取别的某个文件的版本 , 只需要在循环中添加判断即可
        if "station_name" in i: # 找到含有 station_names 的一条 src
            station_name_version = i.split("station_version=")[1] # 截取版本号
            # print "成功获取到车站信息版本 :" , station_name_version # 打印日志
    return station_name_version

def getUrlForStationNames(station_name_version):
    '''
    构建用于下载 station_names.js 这个文件的地址
    '''
    return "https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=" + station_name_version

def downloadFile(url, filename):
    '''
    下载文件并保存到本地
    '''
    logging.captureWarnings(True)
    f = open(filename, "a");
    f.write(requests.get(url, verify=False).text.encode("UTF-8"))
    f.close()

