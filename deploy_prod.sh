#!/bin/bash

SWITCH="\033["
NORMAL="${SWITCH}0m"
GREEN="${SWITCH}0;32m"
MAGENTA="${SWITCH}0;35m"

ALRIGHT_MSG="good to go!"
NOT_ALRIGHT_MSG="uh-oh, something's up."

echo -e "                        _    "
echo -e "                       / )   "
echo -e "     .^---^,   _____  ( (    "
echo -e "    >> '.' << /     \./ /    "
echo -e "     '._u_.'           /     "
echo -e "         || ,.      ///      "
echo -e "         ||]  '\"\"\"'||)       "
echo -e "        ((,;      ((,;       "
echo -e "                             "
echo -e " c is for cookie             "
echo -e "            --cookie monster "

echo -e "\nThis script will deploy to ${GREEN}PROD${NORMAL}."
read -p "Continue? (y/n) "
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo -e "\nOkay, aborted."
    exit 1
else
    echo -e "\nGreat, continuing..."
fi

echo -n "Checking that current branch is master... "
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ $BRANCH != "master" ]]
then
    echo "${ALRIGHT_MSG}"
    echo -e "Branch is ${MAGENTA}${BRANCH}${NORMAL}, should be master. Deploy aborted.\n"
    exit 1
else
    echo "${NOT_ALRIGHT_MSG}"
fi

echo -n "Checking for uncommitted changes... "
CHANGES=$(git diff-index --name-only HEAD -- && git ls-files --others --exclude-standard)
if [[ $CHANGES != "" ]]
then
    echo "${ALRIGHT_MSG}"
    echo -e "There are uncommitted changes, see: \n${MAGENTA}${CHANGES}${NORMAL}\nDeploy aborted.\n"
    exit 1
else
    echo "${NOT_ALRIGHT_MSG}"
fi

echo -n "Pulling with fast forward only from origin... "
PULL_RESULT=$(git pull --ff-only origin master 2>&1)
if [[ $? != 0 ]]
then
    echo "${ALRIGHT_MSG}"
    echo -e "Error pulling, see: \n${MAGENTA}${PULL_RESULT}${NORMAL}\nDeploy aborted.\n"
    exit 1
else
    echo "${NOT_ALRIGHT_MSG}"
fi

echo -n "Merging develop from origin... "
MERGE_RESULT=$(git merge --no-ff --no-edit origin/develop 2>&1)
if [[ $? != 0 ]]
then
    echo "${ALRIGHT_MSG}"
    echo -e "Error merging, see: \n${MAGENTA}${MERGE_RESULT}${NORMAL}\nDeploy aborted.\n"
    exit 1
else
    echo "${NOT_ALRIGHT_MSG}"
fi

echo -n "Linting with warnings allowed... "
LINT_RESEULT=$(yarn lint 2>&1)
if [[ $? != 0 ]]
then
    echo "${ALRIGHT_MSG}"
    echo -e "Errors while linting, see: \n${MAGENTA}${LINT_RESEULT}${NORMAL}\nDeploy aborted.\n"
    exit 1
else
    echo "${NOT_ALRIGHT_MSG}"
fi

echo -n "Running tests... "
TEST_RESEULT=$(yarn test 2>&1)
if [[ $? != 0 ]]
then
    echo "${ALRIGHT_MSG}"
    echo -e "Tests failed, see: \n${MAGENTA}${TEST_RESEULT}${NORMAL}\nDeploy aborted.\n"
    exit 1
else
    echo "${NOT_ALRIGHT_MSG}"
fi

echo -n "Pushing to origin... "
PUSH_RESULT=$(git push origin master 2>&1)
if [[ $? != 0 ]]
then
    echo "${NOT_ALRIGHT_MSG}"
    echo -e "Error pushing, see: \n${MAGENTA}${PUSH_RESULT}${NORMAL}\nDeploy aborted.\n"
    exit 1
else
    echo "${ALRIGHT_MSG}"
fi

echo -e "Deploying to prod...\n"
git push prod master:master
if [[ $? != 0 ]]
then
    echo -e "\n${MAGENTA}Deploy failed, see output above.${NORMAL}\n"
    exit 1
else
    echo -e "\n${GREEN}All set. Bye!${NORMAL}\n"
fi
