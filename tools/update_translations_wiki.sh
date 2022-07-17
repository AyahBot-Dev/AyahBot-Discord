#!/bin/sh
set -eu

REPO_PATH=${PWD}

yarn install --frozen-lockfile
yarn tsm -r dotenv/config tools/update_translations_wiki.ts
echo "Done creating translations markdown file"

#Clone wiki repo
echo "Cloning wiki repo https://github.com/$GITHUB_REPOSITORY.wiki.git in parent folder"
cd ../
git clone "https://$GITHUB_ACTOR:$GH_TOKEN@github.com/$GITHUB_REPOSITORY.wiki.git" "wiki"
#Get commit details
author=`git log -1 --format="%an"`
email=`git log -1 --format="%ae"`
message=`git log -1 --format="%s"`

echo "Copying edited wiki"
cp "$REPO_PATH/Translations.md" "wiki/"

echo "Checking if wiki has changes"
cd "wiki"
git config --local user.email "$email"
git config --local user.name "$author" 
git add .
if git diff-index --quiet HEAD; then
  echo "Nothing changed"
  exit 0
fi

echo "Pushing changes to wiki"
git commit -m "$message" && git push "https://$GITHUB_ACTOR:$GH_TOKEN@github.com/$GITHUB_REPOSITORY.wiki.git"
