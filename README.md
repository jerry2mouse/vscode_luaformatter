# luaformatter README

## Features

lua代码格式化

使用ltokenp进行lua代码格式化

ltokenp来自lua作者，是在lua代码上简单改动，原生lua语法解析器[ltokenp from Luiz Henrique de Figueiredo](http://www.tecgraf.puc-rio.br/~lhf/ftp/lua/#ltokenp)。
为了输出注释，本项目对ltokenp进行了修改。
格式化的内容：

* 修改代码缩进
* 增删空格
* 删除多余空白行（最多保持2个连续空白行）
* **不**自动给代码换行

gemini tranlate:

Formatting Lua code
Using ltokenp to format Lua code

ltokenp is derived from the original Lua syntax parser. 

ltokenp is a slightly modified version of the original Lua, ltokenp created by the Lua author.

Formatting operations:
* Modify code indentation
* Add or remove spaces
* Delete extra blank lines (maximum of 2 consecutive blank lines)
* **Do not** automatically wrap lines

## Extension Settings

配置需要设置ltokenp所在的路径，路径结尾不能有"/"。

The configuration requires you to set the path to ltokenp. The path cannot end with a "/".


* `luaformatter.path`: ltokenp可执行下程序所在目录，如: d:/fmt,

The installation package includes the executable file ltokenp.exe for Windows systems and the corresponding executable ltokenp for Linux systems.

安装程序带了ltokenp.exe（windows）和ltokenp（linux），fmtlcode.lua,设置`luaformatter.path`为安装路径

windows:
* `luaformatter.path`：C:\Users\您的用户名\\.vscode\extensions\jerry2mouse.luaformatter-0.0.2\out

ubuntu

* `luaformatter.path`：home/xxxx/.vscode/extensions/jerry2mouse.luaformatter-0.0.2/out
* 修改ltokenp属性，勾选“允许将文件作为程序执行”
* Modify the properties of ltokenp，check 'Allow executing files as program'

## Installing ltokenp


下载 ltokenp源码 [https://github.com/jerry2mouse/ltokenp](https://github.com/jerry2mouse/ltokenp) 

下载 [premake](https://premake.github.io/)

进入源码目录，在windows系统上

premake5 vs20xx

在linux上

./premake5 gmake2

## For more information


* [ltokenp from Luiz Henrique de Figueiredo](http://www.tecgraf.puc-rio.br/~lhf/ftp/lua/#ltokenp)
* [ltokenp  announcement](http://lua-users.org/lists/lua-l/2018-07/msg00683.html)
* [premake](https://premake.github.io/)
* [https://github.com/jerry2mouse/ltokenp](https://github.com/jerry2mouse/ltokenp) 
* [https://github.com/jerry2mouse/vscode_luaformatter](https://github.com/jerry2mouse/vscode_luaformatter) 

**Enjoy!**
