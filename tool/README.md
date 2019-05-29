---
title: git
lang: zh-CN
description: 用于积累git中的实用代码段。按照实现的功能进行划分，不区分先后。
meta:
  - name: keywords
    content: git, 实用代码段
---

# git #

[git教程](https://learngitbranching.js.org/)

## git init ##

初始化一个Git仓库。

## git add ${file} ##

把文件添加到暂存区。

## git status ##

哪些文件被修改过。

## git diff ${file} ##

可以查看修改内容。

## git Commit ##

提交暂存区的修改。

### git commit -m ${message} ###

提交仓库时添加的备注信息。

## git log ##

从最近到最远的提交日志。

git log --graph  命令可以看到分支合并图

## git reset ##

git reset HEAD~1 ===>（等价于） git reset --hard HEAD^   取消上一次提交

git revert 撤销远程库提交，恢复上次提交记录

## git branch ##

git branch  命令会列出所有分支，当前分支前面会标一个*号

git branch ${分支名}  创建分支

git branch -d ${分支名}  删除分支

git branch -D ${分支名}  强行删除分支（未合并的分支）

git branch --set-upstream-to=origin/dev dev  指定本地dev分支与远程origin/dev分支的链接

git branch -f master HEAD~3  会将 master 分支强制指向 HEAD 的第 3 级父提交

git branch -u origin/master foo   这样 foo 就会跟踪 origin/master 了。如果当前就在 foo 分支上, 还可以省略 foo： git branch -u origin/master

## git checkout ##

git checkout -- ${file}  让这个文件回到最近一次git commit或git add时的状态。

git checkout ${分支名}  切换分支

git checkout ${哈希值}  将HEAD指向提交记录哈希值（在git中移动）

git checkout -b ${your-branch-name}  创建并切换分支

git checkout -b dev origin/dev  创建远程origin的dev分支到本地

git checkout master^  相对引用，切换到master的父节点

git checkout -b totallyNotMaster origin/master  就可以创建一个名为 totallyNotMaster 的分支，它跟踪远程分支 origin/master。

## git remote ##

查看远程库的信息

git remote -v  查看远程库更加详细的信息

### git remote add origin ###

添加远程库。

### git remote rm origin ###

删除远程库。

## git push ##

git push  负责将你的变更上传到指定的远程仓库，并在远程仓库上合并你的新提交记录。

git push origin master   切到本地仓库中的master分支，获取所有的提交，再到远程仓库origin中找到master分支，将远程仓库中没有的提交记录都添加上去。

git push origin dev  将dev分支推送到远程库对应的远程分支上

### git push -u origin master ###

第一次推送master分支的所有内容。之后提交就可以用 git push origin master

## git merge ##

git merge ${分支名}  需要先通过 git checkout master 切换到主分支，再通过git merge ${分支名} 将该分支合并到主分支

git merge --no-ff -m "merge with no-ff" dev   --no-ff参数，表示禁用Fast forward（合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息，如果要强制禁用Fast forward模式，Git就会在merge时生成一个新的commit）。

## git rebase ##

git rebase ${目标分支} ${将某个分支}  合并分支

git rebase -i HEAD~4  ui界面调整最近4次的提交记录

## git cherry-pick ##

git cherry-pick <提交号>...   如果你想将一些提交复制到当前所在的位置（HEAD）下面的话， Cherry-pick 是最直接的方式了。

## git tag ##

永久地将某个特定的提交命名为里程碑，然后就可以像分支一样引用了，git tag 查看所有标签

git tag v1  在当前分支上面加上标签v1

git tag v1 ${commit id}  我们将这个标签命名为 v1，并且明确地让它指向提交记录 ${commit id}，如果你不指定提交记录，Git 会用 HEAD 所指向的位置。

git tag -a v0.1 -m "version 0.1 released" 1094adb   创建带有说明的标签，用-a指定标签名，-m指定说明文字

git show v1  查看标签信息

git tag -d v0.1  删除标签

git push origin v1  将tag推送到远程库

git push origin --tags  一次性推送全部尚未推送到远程的本地标签

git push origin :refs/tags/${tagname}  可以删除一个远程标签。

## git describe ##

git describe   由于标签在代码库中起着“锚点”的作用，Git 还为此专门设计了一个命令用来描述离你最近的锚点（也就是标签），它就是 git describe！

git describe ${ref}   ${ref} 可以是任何能被 Git 识别成提交记录的引用，如果你没有指定的话，Git 会以你目前所检出的位置（HEAD）。

## git bisect ##

git bisect  一个查找产生 Bug 的提交记录的指令

## git fetch ##

git fetch 完成了仅有的但是很重要的两步:

1. 从远程仓库下载本地仓库中缺失的提交记录
2. 更新远程分支指针(如 origin/master)

git fetch 实际上将本地仓库中的远程分支更新成了远程仓库相应分支最新的状态。

## git pull ##

git pull ===>（等价于） git fetch; git merge origin/master

git pull --rebase  ===>（等价于） git fetch; git rebase origin/master

## git stash ##

把当前工作现场储藏起来，等以后恢复现场后继续工作。

git stash list  所有储藏起来的工作现场。

恢复stash，有两个办法：

一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除；

另一种方式是用git stash pop，恢复的同时把stash内容也删了

多人协作的工作模式通常是这样：

1. 首先，可以试图用git push origin ${branch-name} 推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用git push origin ${branch-name}推送就能成功！

**.gitignore** 文件，把要忽略的文件名填进去，Git就会自动忽略这些文件。
