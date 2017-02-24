#!/usr/bin/env python
# encoding:utf-8

import tools
import os
import sys


station_names_version = ""

def getStationCode(station_name):
    global station_names_version
    result = {}
    # 读取文件
    print "正在读取文件..."
    station_names = open("./" + station_names_version + "_" + "station_names.dat", "r")
    content = station_names.read()
    station_names.close()
    content = content[20:-2] # 去掉多余的 js 关键字 , 只提取出字符串内容
    print "正在解析站点信息..."
    stations = content.split("@")[1:] # 由于这个文件开头就是 '@' , 因此需要去掉第一个元素
    print "解析成功 ! 总站点数 : [ " + str(len(stations)) + " ]"
    for station in stations:
        fields = station.split("|")
        # station_name_pinyin_simple = fields[0] 
        station_name_standard = fields[1] 
        station_code = fields[2] 
        # station_name_pinyin = fields[3] 
        # station_name_pinyin_simple_fuzz = fields[4] 
        # station_num = fields[5]
        if station_name_standard == station_name:
            result['station_code'] = station_code
            result['station_name'] = station_name
    return result

def getStationCodes(station_name):
    if not station_name:
        return
    global station_names_version
    results = []
    # 读取文件
    print "正在读取文件..."
    station_names = open("./" + station_names_version + "_" + "station_names.dat", "r")
    content = station_names.read()
    station_names.close()
    content = content[20:-2] # 去掉多余的 js 关键字 , 只提取出字符串内容
    print "正在解析站点信息..."
    stations = content.split("@")[1:] # 由于这个文件开头就是 '@' , 因此需要去掉第一个元素
    print "解析成功 ! 总站点数 : [ " + str(len(stations)) + " ]"
    for station in stations:
        fields = station.split("|")
        # station_name_pinyin_simple = fields[0] 
        station_name_standard = fields[1] 
        station_code = fields[2] 
        # station_name_pinyin = fields[3] 
        # station_name_pinyin_simple_fuzz = fields[4] 
        # station_num = fields[5]
        if station_name_standard.startswith(station_name):
            results.append({"station_code":station_code, "station_name":station_name_standard})
    return results

def printStationInfo(station_info):
    if not station_info:
        return
    print "[ %s ] -> [ %s ]" % (station_info["station_name"], station_info["station_code"])

def printStationsInfo(station_info):
    for result in station_info:
        print "[ %s ] -> [ %s ]" % (result["station_name"], result["station_code"])

def updateStationNames():
    global station_names_version
    # 获取官网的这个文件的版本
    print "正在获取官网的火车站信息文件版本..."
    station_names_version = tools.getStationNamesVersion()
    print "获取成功 !"
    print "官网版本号 : [",(station_names_version),"]"
    # 比对本地文件
    print "正在获取本地缓存文件文件名..."
    local_file_name = ""
    local_file_version = ""
    for filename in os.listdir("./"):
        if filename.endswith("_station_names.dat"):
            local_file_name = filename
    if local_file_name != "":
        print "获取成功 ! 本地文件名 : [", local_file_name, "]"
        print "正在解析本地文件版本号..."
        local_file_version = local_file_name.split("_")[0]
        print "本地版本号 : [", local_file_version, "]"
    else:
        print "本地没有缓存文件 , 准备开始下载..."
    # 下载文件 , 保存文件名以版本开始 (便于下次运行的时候比对)
    if local_file_version == "":
            print "官网火车站文件更新 , 正在下载..."
            tools.downloadFile(tools.getUrlForStationNames(station_names_version), station_names_version+"_"+"station_names.dat")
    else:
        if local_file_version != station_names_version:
            print "官网火车站文件更新 , 正在下载..."
            tools.downloadFile(tools.getUrlForStationNames(station_names_version), station_names_version+"_"+"station_names.dat")
        else:
            print "本地文件已最新 , 直接使用!"

def main(station_name):
    updateStationNames()
    print "=" * 8 + " [ " + station_name + "(精确搜索) ] " + "=" * 8
    printStationInfo(getStationCode(station_name))
    print "=" * 8 + " [ " + station_name + "(模糊搜索) ] " + "=" * 8
    printStationsInfo(getStationCodes(station_name))

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print "Usage : \n\t%s [station_name]" % (sys.argv[0])
        exit(1)
    main(sys.argv[1])
