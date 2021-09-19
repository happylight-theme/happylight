#!/bin/sh

__DIR__=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

"${__DIR__}/rush" install
