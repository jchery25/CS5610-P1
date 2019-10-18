#!/bin/bash

source ./prod-env.sh

echo "Starting app..."

# Start to run in background from shell.
_build/prod/rel/game/bin/game start
