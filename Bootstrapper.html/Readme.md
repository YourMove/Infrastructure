### Bootstrapper.html / Readme.md - Reference
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published 24/12/2013
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.
    Draft keywords: <Other Topics>, <Example Content>

## Forward

A simple, incredibly light weight async resource loader.

## Getting Started

1. Grab the latest version of Bootstrapper. This is always available from http://github.io/MJCD/YMI/Internal/Bootstrapper.html/Builds/ . It is probably always worth checking the History.md for any significant changes.
2. Rename to 'index.html'
3. Open the file, and find the first variable declaration - 'Resources'.

## Managing your resources

Bootstrapper accepts only a single array, which can contain other arrays or objects. A single resource request takes the format of:

    [{ URL: <URL String, Array of strings>, When: <Function, Array>, Callback: <Function, Array of functions> }]

### URL's

1. URL can be specified either as a single string, eg..

    [{ URL: 'http://some/thing.js', When: <...>, Callback: <...> }]

2. Alternatively, this can be an array of URL's if they are ALL needed as part of the batch callbacks (described below), eg..

    [{ URL: ['http://some/thing.js', 'http://some/thing2.js'], When: <...>, Callback: <...> }]

### When conditionals

Note: You can go without a When conditional however NO attempt will be made to check if it is loaded. You will have to handle this yourself.

1. A function that must return true or false based on abstract internal logic, eg..

    [{
    	URL: <...>,
    	When: function () { if (window.SomeVar === 2) return true; else return false; },
    	Callback: <...>
    }]

2. An array of variables that must exists under the window (global) scope, eg..

    [{
    	URL: <...>,
    	When: ['MyLibrary', 'SomeOtherLibrary'],
    	Callback: <...>
    }]

### Callbacks

Note: You can go without a When conditional however you will have to handle any additional load logic manually. This can be handy when loading a library that is heavily tied into another - where it's easier to have that library init this one with no callback.

1. As a function, this will just be directly run when all the When conditionals are passed.

    [{ URL: <URL String, Array of strings>, When: <Function, Array>, Callback: function () { DoSomething(); }]

2. You can also use this to batch tasks as part of the loading process, using nested arrays

    [{
    	URL: <...>,
    	When: ['MyLibrary', 'SomeOtherLibrary'],
    	Callback: [
            [
                function () { Batch1Task(); },
                function () { Batch2Task(); }
            ],
            function () { FinalTask(); },
    	]
    }]

### Abstract processing

You can also input batch jobs to be run as part of the series. To so, instead of a crafted object with many properties - simply define a function, eg..

    [function () { SomeOperation(); }]

## In the future..

### Load Screens

Several loading screen options powered by CSS3 transforms.

## Examples

I intend to add some real world examples over time - for now, you can review the items under Specification/1/Tests/ which contain limitless functionality combinations.

#### - YourMove Infrastructure