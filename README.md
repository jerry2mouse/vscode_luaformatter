# luaformatter README

## Features

lua代码格式化，premake脚本格式化

使用ltokenp进行lua代码格式化

ltokenp代码基于lua5.4.7

ltokenp来自lua作者，是在lua代码上简单改动，原生lua语法解析器[ltokenp from Luiz Henrique de Figueiredo](http://www.tecgraf.puc-rio.br/~lhf/ftp/lua/#ltokenp)。
为了输出注释，本项目对ltokenp进行了修改。
格式化的内容：

* 修改代码缩进
* 增删空格
* 删除多余空白行（最多保持2个连续空白行）
* **不**自动给代码换行

gemini tranlate:

Formatting Lua code

Formatting premake code

Using ltokenp to format Lua code

ltokenp code based on lua5.4.7

ltokenp is derived from the original Lua syntax parser. 

ltokenp is a slightly modified version of the original Lua, ltokenp created by the Lua author.

Formatting operations:
* Modify code indentation
* Add or remove spaces
* Delete extra blank lines (maximum of 2 consecutive blank lines)
* **Do not** automatically wrap lines

### 使用说明
当被格式化文件中有 '-- fmt-premake' 标志时，按premake格式化脚本，

When the file to be formatted contains the '-- fmt-premake' flag, the script will be formatted according to premake's style.
``` lua
    if is_premake == false and string.find(value, "%-%-%s*fmt%-premake") ~= nil then
        is_premake = true
    end
```

``` lua
local premake_tk =
{
    ["workspace"] = { cur_incount = 0, next_incount = 1 },
    ["solution"] = { cur_incount = 0, next_incount = 1 },
    ["project"] = { cur_incount = 0, next_incount = 1 },
    ["filter"] = { cur_incount = 1, next_incount = 2 },
    ["configuration "] = { cur_incount = 1, next_incount = 2 },
} 
-- workspace缩进是0，workspace下一级1个缩进单位，即缩进4个空格
-- filter缩进是1，filter下一级2个缩进单位
-- This table defines the indentation levels for different elements in a premake script. For example, 
-- 'workspace' has an indentation level of 0, and its children have an indentation level of 1.
-- Indentation for 'workspace' is 0, and for its children, it's 1 unit (4 spaces).
-- Indentation for 'filter' is 1, and for its children, it's 2 units.
```


所有格式化逻辑在fmtlcode.lua脚本中，您可根据需要修改**fmtlcode.lua**脚本

All the formatting rules are implemented in the fmtlcode.lua file. You can customize it to fit your specific needs.

可以从 [这里](https://github.com/jerry2mouse/ltokenp) 的test目录下载最新的fmtlcode.lua文件，更新到本地ltokenp目录。

您也可以执行一下命令格式化文件:
* ltokenp -s fmtlcode.lua yourescript.lua




To update the fmtlcode.lua file, you can download the latest version from [here]((https://github.com/jerry2mouse/ltokenp)).

To format your Lua script, simply run the following command:
* ltokenp -s fmtlcode.lua your_script.lua

## Extension Settings

配置需要设置ltokenp所在的路径，路径结尾不能有"/"。

The configuration requires you to set the path to ltokenp. The path cannot end with a "/".


* `luaformatter.path`: ltokenp可执行下程序所在目录，如: d:/fmt,

The installation package includes the executable file ltokenp.exe for Windows systems and the corresponding executable ltokenp for Linux systems.

安装程序带了ltokenp.exe（windows）和ltokenp（linux），fmtlcode.lua,设置`luaformatter.path`为安装路径

windows:
* `luaformatter.path`：C:\Users\您的用户名\\.vscode\extensions\jerry2mouse.luaformatter-x.x.x\out

ubuntu

* `luaformatter.path`：home/xxxx/.vscode/extensions/jerry2mouse.luaformatter-x.x.x/out
* 修改ltokenp属性，勾选“允许将文件作为程序执行”
* Modify the properties of ltokenp，check 'Allow executing files as program'

## Installing ltokenp


下载 ltokenp源码 [https://github.com/jerry2mouse/ltokenp](https://github.com/jerry2mouse/ltokenp) 

下载 [premake](https://premake.github.io/)

进入源码目录，在windows系统上

premake5 vs20xx

在linux上

./premake5 gmake2

### 0.0.3
增加支持格式化 premake脚本功能


## For more information


* [ltokenp from Luiz Henrique de Figueiredo](http://www.tecgraf.puc-rio.br/~lhf/ftp/lua/#ltokenp)
* [ltokenp  announcement](http://lua-users.org/lists/lua-l/2018-07/msg00683.html)
* [premake](https://premake.github.io/)
* [https://github.com/jerry2mouse/ltokenp](https://github.com/jerry2mouse/ltokenp) 
* [https://github.com/jerry2mouse/vscode_luaformatter](https://github.com/jerry2mouse/vscode_luaformatter) 

**Enjoy!**
