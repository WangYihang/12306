#!/usr/bin/env python
# encoding:utf-8

import re

def getYear(content):
    result = ""
    return result

def getMonth(content):
    result = ""
    return result

def getDay(content):
    result = ""
    return result

def timeParser(content):
    result = ""
    return result


timeParser("2017-01-01")

# m = re.match(r'[0-9][0-9][0-9]\.[0-9][0-9][0-9]\.[0-9][0-9][0-9]\.[0-9][0-9][0-9]', 'ip: 123.321.321.222')
# m = re.match('...\....\....\....', 'ip: 123.321.321.222')
# print m.group()

print "=" * 24

pattern = re.compile('\d')
match = pattern.match('dsahdjska123.234.213.222dsad')
if match:
    print match.group()
else:
    print "Error!"
