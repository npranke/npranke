#!/bin/bash

SWITCH="\033["
NORMAL="${SWITCH}0m"
CYAN="${SWITCH}0;36m"
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
echo -e " \"c is for cookie\"           "
echo -e "            --cookie monster "

echo -e "\nThis script will deploy to ${CYAN}STAGING${NORMAL}."
read -p "Continue? (y/n) "
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo -e "\nOkay, aborted."
    exit 1
else
    echo -e "\nGreat, continuing..."
fi

echo -n "Checking that current branch is develop... "
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ $BRANCH != "develop" ]]
then
    echo "${NOT_ALRIGHT_MSG}"
    echo -e "Branch is ${MAGENTA}${BRANCH}${NORMAL}, should be develop. Deploy aborted.\n"
    exit 1
else
    echo "${ALRIGHT_MSG}"
fi

echo -n "Checking for uncommitted changes... "
CHANGES=$(git diff-index --name-only HEAD -- && git ls-files --others --exclude-standard)
if [[ $CHANGES != "" ]]
then
    echo "${NOT_ALRIGHT_MSG}"
    echo -e "There are uncommitted changes, see: \n${MAGENTA}${CHANGES}${NORMAL}\nDeploy aborted.\n"
    exit 1
else
    echo "${ALRIGHT_MSG}"
fi

echo -n "Pulling with fast forward only from origin... "
PULL_RESULT=$(git pull --ff-only origin develop 2>&1)
if [[ $? != 0 ]]
then
    echo "${NOT_ALRIGHT_MSG}"
    echo -e "Error pulling, see: \n${MAGENTA}${PULL_RESULT}${NORMAL}\nDeploy aborted.\n"
    exit 1
else
    echo "${ALRIGHT_MSG}"
fi

echo -n "Linting python with ruff... "
RUFF_RESULT=$(pipenv run ruff check . 2>&1)
if [[ $? != 0 ]]
then
    echo "${NOT_ALRIGHT_MSG}"
    echo -e "Errors while linting, see: \n${MAGENTA}${RUFF_RESULT}${NORMAL}\nDeploy aborted.\n"
    exit 1
else
    echo "${ALRIGHT_MSG}"
fi

echo -n "Type checking python with pyright... "
PYRIGHT_RESULT=$(pipenv run yarn run pyright 2>&1)
if [[ $? != 0 ]]
then
    echo "${NOT_ALRIGHT_MSG}"
    echo -e "Errors while type checking, see: \n${MAGENTA}${PYRIGHT_RESULT}${NORMAL}\nDeploy aborted.\n"
    exit 1
else
    echo "${ALRIGHT_MSG}"
fi

echo -n "Linting javascript, warnings allowed... "
ESLINT_RESULT=$(yarn lint 2>&1)
if [[ $? != 0 ]]
then
    echo "${NOT_ALRIGHT_MSG}"
    echo -e "Errors while linting, see: \n${MAGENTA}${ESLINT_RESULT}${NORMAL}\nDeploy aborted.\n"
    exit 1
else
    echo "${ALRIGHT_MSG}"
fi

echo -n "Running tests... "
TEST_RESULT=$(yarn test 2>&1)
if [[ $? != 0 ]]
then
    echo "${NOT_ALRIGHT_MSG}"
    echo -e "Tests failed, see: \n${MAGENTA}${TEST_RESULT}${NORMAL}\nDeploy aborted.\n"
    exit 1
else
    echo "${ALRIGHT_MSG}"
fi

echo -n "Pushing to origin... "
PUSH_RESULT=$(git push origin develop 2>&1)
if [[ $? != 0 ]]
then
    echo "${NOT_ALRIGHT_MSG}"
    echo -e "Error pushing, see: \n${MAGENTA}${PUSH_RESULT}${NORMAL}\nDeploy aborted.\n"
    exit 1
else
    echo "${ALRIGHT_MSG}"
fi

echo -e "Deploying to staging...\n"
git push staging develop:main
if [[ $? != 0 ]]
then
    echo -e "\n${MAGENTA}Deploy failed, see output above.${NORMAL}\n"
    exit 1
else
    echo -e "\n${CYAN}All set. Bye!${NORMAL}\n"
fi
