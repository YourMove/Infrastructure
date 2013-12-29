= Global major works summary
= YourMove infrastructure

* All log items are in chronological order, sorted by date (newest to oldest).

== 24/12/2014

* Specification.md added for /Bootstrapper.html/ - this will be a common format used for all sub-projects.
* Comment specifications for /Bootstrapper.html/ bought up to standards referencing the new spec to console.

* All specification points reached, and even still the ability to externally load your Resources.js file in under 200 lines. Currently tracking at about 8kb - meaning with minification probably 5kb - leaving a spare 5kb for CSS animations to meet the project's goal of loading on essentially ANY internet connection in a max of 2 seconds (with modern broadband loading in fractions of a second).
* Generating test-case's as external resource packages - however a subset of these will require static saving of the whole library, to test the in-file Resources support (rather than waiting). These will need to be updated for every build.
* To work around this small risk, I have decided to have different gradings of test. Not all builds will have all tests completed.
* These gradings will be: 1. Critical 2. Optional
* Status of both levels will always be indicated within the builds Specification.md

* Have scrapped /Builds/ in favour of having entirely self contained version folders - eg, /Bootstrapper.html/0.1/Bootstrapper.html
* Have also scrapped the /Internal/ folder. All internal stuff is now in the /YMI/ root - and /External/ renamed to /_External/ to keep at the top of the list always. Nice and tidy.

* Opting to only have a Specification.md and a Readme.md for individual sub-projects be mandatory. Others should be considered adendums to higher tier documents of the same name. Adding reference to this fact to Licence.md

* Sub-versions will not have specific Readme file's. Instead, each will have a Readme.md that links to both the core Readme.md file, as well as to a Migration.md which will be purely the steps needed to migrate from one version to the next (but for all versions, in one file). I have made a template for this under YMI/_Templates/0.1/Documentation/Readme.Subversion.md

* Unit testing specification generated. Each subversion will have its own /Tests/ folder. At the top will be a file starting with an underscore that describes the fields for the file names, eg for Bootstrapper.html..

    _TestNumber.URL(Int)-When(Int)-Callback(Int)-AbstractLogic(Int).Keywords

Each of the integers in this string represent a **test level**. For each Field-specific feature..

0. Not tested
1. Tested at basic level
2. Tested at a higher, multi-use level
3. Tested as part of a working test of all parts at the same level.

A _Results.md file will also be included and have a boilerplate-based document template currently forked from Migration.md.

* A complete specification test must test all available functionalities to the highest level 1000 times without incident to pass specification.

== 22/12/2014

* Contributions.md added
** Contains coding standards for all internal documents. Mainly for my own reference.

* Readme.md added for Bootstrapper.html/

* Licence.md created. Notice posted restricting all rights until final licencing terms are available.
** Highly likely everything will be MIT.