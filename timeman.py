#!/usr/bin/env python
# encoding:utf-8

import datetime
import re

def timeConvertor(content):
    # 首先判断用户是不是按规定格式输入的
    if re.match(r"\d{4}-\d{2}-\d{2}", content):
        return content
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
        return  now.strftime("%Y-%m-%d")  
