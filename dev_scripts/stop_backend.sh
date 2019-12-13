#!/bin/bash
sudo kill -9 $(sudo lsof -ti tcp:80)