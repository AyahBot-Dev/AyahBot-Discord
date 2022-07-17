#!/bin/sh
set -eu

TEMP_WIKI_DIR="temp_wiki_$GITHUB_SHA"
WIKI_DIR='wiki'

#Clone wiki repo
echo "Cloning wiki repo https://github.com/$GITHUB_REPOSITORY.wiki.git"
git clone "https://$GITHUB_ACTOR:$GH_TOKEN@github.com/$GITHUB_REPOSITORY.wiki.git" "$TEMP_WIKI_DIR"

#Get commit details
author=`git log -1 --format="%an"`
email=`git log -1 --format="%ae"`
message=`git log -1 --format="%s"`

echo "Copying edited wiki"
cp -R "$WIKI_DIR/"* "$TEMP_WIKI_DIR/"

echo "Checking if wiki has changes"
cd "$TEMP_WIKI_DIR"
git config --local user.email "$email"
git config --local user.name "$author" 
git add .
if git diff-index --quiet HEAD; then
  echo "Nothing changed"
  exit 0
fi

echo "Pushing changes to wiki"
git commit -m "$message" && git push "https://$GITHUB_ACTOR:$GH_TOKEN@github.com/$GITHUB_REPOSITORY.wiki.git"
