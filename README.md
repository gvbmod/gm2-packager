# Gvbvdxx Mod 2 - Project Packager

Designed to automatically "package" projects using gm2-player.
This allows them to be presented without the scratch editor.

# How to use.

The packager is pretty straight forward to use:
* Choose if you prefer loading from file (gm2 and sb3) or from a project id (normal unmodded sb3 only).
* Select the options you want.
* Click "Package this project".
* Wait for it to finish.
* Click "Download Output".

# Building

Simular to gui when it comes to building, but requires to use a build of gm2-player to run.

Inserting build of gm2-player (required if you want to build):
* Build the gm2-player repo
* Copy the dist folder contents into "static/player-build" (if the folder does not exist, then make it).
* Run "create build index.js" in the directory of "static/", this generates the index for when requesting the player assets.