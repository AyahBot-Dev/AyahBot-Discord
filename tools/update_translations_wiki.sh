#!/bin/sh
set -eu

TEMP_REPO_DIR="wiki_action_repo"
TEMP_WIKI_DIR="temp_wiki"

echo "Cloning repo https://github.com/$GITHUB_REPOSITORY"
git clone "https://$GITHUB_ACTOR:$GH_TOKEN@github.com/$GITHUB_REPOSITORY" "$TEMP_REPO_DIR"

echo "Creating updated translations file"
cd $TEMP_REPO_DIR
git checkout dev
ls tools
yarn install --frozen-lockfile
yarn tsm -r dotenv/config $TEMP_REPO_DIR/tools/update_translations_wiki.ts
echo "Done creating translations markdown file"

#Clone wiki repo
echo "Cloning wiki repo https://github.com/$GITHUB_REPOSITORY.wiki.git in parent folder"
cd ../
git clone "https://$GITHUB_ACTOR:$GH_TOKEN@github.com/$GITHUB_REPOSITORY.wiki.git" "$TEMP_WIKI_DIR"
#Get commit details
author=`git log -1 --format="%an"`
email=`git log -1 --format="%ae"`
message=`git log -1 --format="%s"`

echo "Copying edited translations file"
cp "$TEMP_REPO_DIR/Translations.md" "$TEMP_WIKI_DIR/"

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