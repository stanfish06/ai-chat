#!/usr/bin/env zsh
sudo apt install \
  libgtk-3-dev \
  libwebkit2gtk-4.1-dev
go install github.com/wailsapp/wails/v2/cmd/wails@latest
