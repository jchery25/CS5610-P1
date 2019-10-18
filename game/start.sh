#!/bin/bash

export MIX_ENV=prod
export PORT=4999

echo "Starting app..."

# Start to run in background from shell.
_build/prod/rel/game/bin/game start
