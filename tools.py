#!/usr/bin/env python
# encoding:utf-8

import requests
import logging

def downloadFile(url, filename):
    logging.captureWarnings(True)
    f = open(filename, "a");
    f.write(requests.get(url, verify=False).text.encode("UTF-8"))
    f.close()
