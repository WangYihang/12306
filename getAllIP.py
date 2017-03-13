#!/usr/bin/env python
# encoding:utf-8

import requests
import json

def updateIP():
    url = "http://tools.cloudxns.net/index/getMdigResultOne"
    headers = {
        "Host": "tools.cloudxns.net",
        "Connection": "keep-alive",
        "Content-Length": "1166",
        "Accept": "*/*",
        "Origin": "http://tools.cloudxns.net",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Referer": "http://tools.cloudxns.net/index/mdig",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6",
    }
    postData = {
        "task_id":"5",
        "view_ids":"111009,112009,112109,112209,112309,112409,112509,112709,112809,112909,113119,113519,113719,114319,114519,114719,115319,115519,115719,115919,117319,117719,117919,118519,118719,118919,118989,119319,119519,119719,119919,121009,122009,122109,122209,122309,122409,122509,122709,122809,122909,123119,123519,123719,124319,124519,124719,125319,125519,125719,125919,127319,127719,127919,128519,128719,128919,128989,129319,129519,129719,129919,131009,132009,132109,132209,132309,132409,132509,132709,132809,132909,133119,133519,133719,134319,134519,134719,135319,135519,135719,135919,137319,137719,137919,138519,138719,138919,138989,139319,139519,139719,139919,141009,142009,142109,142209,142309,142409,142509,142709,142809,142909,143119,143519,143719,144319,144519,144719,145319,145519,145719,145919,147319,147719,147919,148519,148719,148919,148989,149319,149519,149719,149919,151009,152009,152109,152209,152309,152409,152509,152709,152809,152909,153119,153519,153719,154319,154519,154719,155319,155519,155719,155919,157319,157719,157919,158519,158719,158919,158989,159319,159519,159719,159919,211009,212009,998529,998629",
        "from":"mdig",
        "query_type":"A",
        "result_id":"0",
    }
    try:
        response = requests.post(url, headers=headers, data=postData)
        response.encoding = response.apparent_encoding
        content = response.text
        with open("./ip.dat", "w") as f:
            f.write(content)
    except:
        print "Cookie 已过期! / 打开文件失败!"

def main():
    # updateIP()
    data = open("./ip.dat", "r")
    content = data.read()
    results = json.loads(content)
    results = results["data"]
    jokers = []
    for city in results:
        if city == "result_id":
            continue
        for result in results[city]:
            if result["type_trans"] == "A":
                bar = {}
                temp = result["result_trans"]
                ip = temp.split("(")[0]
                address = temp.split("(")[1][:-1]
                foo = address.split("_")
                bar["ip"] = ip
                bar["carr"] = foo[0]
                bar["prov"] = foo[1]
                if len(foo) == 3:
                    bar["city"] = foo[2]
                else:
                    bar["city"] = ""
                jokers.append(bar)
    print jokers 
if __name__ == "__main__":
    main()
