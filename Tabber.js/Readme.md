### Tabber / Readme.md - Up To Date Library Reference
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published 23/01/2014
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.
    Draft keywords: <Project>, <Publish Date>, <Forward Content>, <Getting Started Content>, <Other Topics>, <Example Content>

## Forward

Tabber.js is an incredibly lightweight and easy to use library for adding a tabbed interface for many disparate sites. It will also incorporate functionality for automating many formats of authentication into a single sign on simply by having all passwords in the backend set to the same values.

## Getting Started

* Method 1 - Using Bootstrapper

This is by far the easiest method, especially obviously if you are already using Bootstrapper. Simply add a Bootstrapper resource line like:

    {
        URL: 'http://Something/Tabber.js',
        Where: 'Tabber',
        Callback: function () {
            Tabber.init([
                { Name: 'Example1', URL: 'http://Site.Example/1' },
                { Name: 'Example2', URL: 'http://Site.Example/2' }
            ]);
        }
    }

* Method 2 - Manually

1. Download Tabber.js and place where you want to load it from.
2. Link it to your HTML document through your preferred method.
3. Put the URL's in the same format as above, into the variable in the config section at the top "TabResources"

## Display options

* Placement - Can be "Top", "Bottom", "Left", "Right" or "Inline". Default: Bottom
* InlineElement - Set to the ID of the element to insert into. This will be monitored until it exists if Placement is set to "Inline", Default: None.
* Stylesheet - An external stylesheet to load (see below). Default: None

## Extra Stylesheet Classes/Selectors

* Tabber

This is the core container class. Even if inline, styles on this will affect the general display of your tabs and potentially the layout of your site if inline. Anything inside this will not have such effects.

* TabberTab

This, as the name implies, is the basic style unit for all tabs. They can be defined however they want, however cannot exceed the area of the Tabber container or will have their overflow hidden.

* TabberTab-Foucsed

The same as above, except for when the tab is active. Especially useful for making the text remain clear when the tab becomes the colour of TabberHighlighted1-10 (below).

* TabberHighlight1 through TabberHighlight10

Highlights are coloured indicators shown within tabs to bring a greater identity and separation. By default, whatever properties are set on this will only be X high/wide - however active tabs will also be indicated using a border on the Tabber container, and the entire TabberTab will become this colour.

## Examples

<Example Content, raw>

#### - YourMove Infrastructure