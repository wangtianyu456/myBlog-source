# 确保脚本抛出遇到的错误
set -e


# 打包生成静态文件
yarn build

# 进入打包好的文件夹
cd docs/.vuepress/dist

# 创建git的本地仓库，提交更改
git init
git add .
git commit -m "add: 新增数组扁平化"

# 覆盖式的将本地仓库发布至GitHub，因为发布不需要历史记录
# 格式为 git push -f git@github.com:'用户名'/'仓库名'.git master
# git push -f git@github.com:wangtianyu456/MyBlog.git master
git push git@github.com:wangtianyu456/MyBlog.git master


cd -
