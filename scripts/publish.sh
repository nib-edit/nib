git checkout master
git checkout -b tmp-gh-pages
rm .gitignore

npm run build-docs

git add styleguide
git commit -am 'deploying docs'

git subtree split --prefix styleguide -b gh-pages
git push -f origin gh-pages:gh-pages
git checkout master
git branch -D tmp-gh-pages
git branch -D gh-pages