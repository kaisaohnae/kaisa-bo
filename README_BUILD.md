## 방법1. 깃헙에 정적페이지로 배포할경우...

```
yarn build
cd dist
touch .nojekyll
echo 'bo.kaisa.co.kr' > CNAME
git init
git checkout -b main
git add -A
git commit -m 'deploy'
git remote add origin "https://github.com/kaisaohnae/kaisa-bo.git"
git push -u --force origin main
rm -rf .git
cd ..
```

## 방법2. 

```
mkdir -p .github/workflows
touch .github/workflows/deploy.yml

저장소의 설정 → Actions → General → Workflow permissions에서 Read and write permissions로 설정되어 있는지 확인합니다.

GitHub Pages 에 gh-pages 로 설정 

```