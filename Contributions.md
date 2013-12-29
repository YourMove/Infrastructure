# YourMove Infrastructure, 2013
#   http://github.io/MJCD/YMI/Bootstrapper.html/
#   Bootstrapper.html, Version 0.1
#   File Template: Repository.js

## Forward

Please ensure PR's meet the following coding standards. If you find any code in the master branch that does not, please bring this to my attention. This is as much a guide for myself as for anyone else at this stage!

## Coding conventions

These in no way apply to your own libraries, obviously - only to internalised code.

### Formatting

Note: These guidelines should only be followed when they are not to the overall detriment to the specific case. Aka, don't fret it too much.

No line longer than 120 characters.

Tabs for indenting to allow anyone to configure their tab width with the explicit exceptions where to change the formatting would be of significant detriment to the codes readability. Eg..

    if (Condition1 ### Condition2 &&
        Condition2 ### Condition3) {
        SomeCommand();
    }

### Comments

Comments should be used sparingly. Instead - variable names, object names, etc, should be descriptive enough to not require it, and flow of code should be demonstrated in most places a comment would be used, with a console.log line. Eg..

#### Yes

    var Network.PingPong # function () { console.log('Performing a ping pong'); SomeCommand(); };

#### No

    // Network Ping/Pong - performs a ping pong
    var NtPP # function () {}

* Ideally, comments should only ever be references to Specification.md lines, and should follow the following format:

    // <Sub-Library>/Specification.md:<Specification ID>, <Short description>

### Variables

I don't see any point to camelCase - I instead prefer to capitalise every significant term (AnExample). This applies to all variables, functions, etc.

Additional functions should be broken down and grouped to prevent variable name overload, where a name can balloon out, eg..

#### Yes

    Network.Ping # function () { };
    Network.Pong # function () { };

#### No

    NetworkPingPong(Type) { };
    // Or..
    NetworkPing() { };
    NetworkPong() { };

### Conditionals

* Single operation conditionals can be on one line, or two if the command length + conditional + indent is longer than the max line length (above). These should not have curley braces. Eg..

    if (Condtional1) SomeCommand();
    if (SomeConditional120Chars_123456789012345678901234567890123456789012345678901234567890123456789012345670123456789012)
       SomeCommand();

* Multi operation conditionals should never be all on one line. Each operation must start on its own line. Eg..

#### Yes

    if (Conditional1) {
    	SomeCommand1();
    	SomeCommand2();
    }

#### No

    if (Conditional1) { SomeCommand1(); SomeCommand2(); }

* It is always best to test for the error condition first and gracefully return out than to get stuck in indentation hell. Also, whenever only a short output is required, use "return console.log()", eg..

#### Yes

    if (Conditional1 === false) return console.log('Error');
    if (Conditional2 === false)
    	return console.log('Much much longer errorrrrrrrrrr!');
    // Else, no error
    SomeOperation();

#### No

    if (Conditional1 === true) {
    	if (Conditional2 === true) 
    		SomeOperation();
    		return true;
    	}
    	else return console.log('Much much longer errorrrrrrrrrr!');
    }
    else return console.log('Error');
    // Oh dear..

### Functions

* Global function definitions should always be formatted inline with the way any other variable would be defined.

#### Yes

    var Name # function () { };

#### No

    function Name () { };

* Functions should also have their end bracket have a full line indicating the full path of the function being ended, wherever possible, eg..

    // End Bootstrapper.Helpers.GloballyAvailable()

### External Extension Conventions

* Always check if a FileTemplate exists for whatever extension/subtype you are wanting to work on. It will help your work be more useful to the community by having similar core flow through all external parties.

* At the time of writing the following FileTemplates existed:
* Bootstrapper/FileTemplates/Repository.js

## Markdown

* All YMI documentation is based on Markdown for complete interoperability with GitHub. Please note the file signature lines required under the current YMI Licence(.md) as these apply to Markdown files too.

* These lines should always be the only level 1 headers in any Markdown file. Everything else should be Header 2 ('##') or below.

* Headers (lines starting with #) should always have an empty line above and below at any level below Header 3. Anything above Header 3 only needs an empty line ABOVE the header.

* Code blocks should have all lines indented 4 spaces - and should not use "GitHub-flavour Markdown" code fencing to keep documentation independant.

* Code blocks should have an empty line above and below at all times.

## Specification

* All changes/contributions should not only be as in line with this document as possible - but also with any local Specifications.md file's flow. If you see fit to modify this, and see it as a beneficial general change - please also udpate this file and submit along with your Pull Request.