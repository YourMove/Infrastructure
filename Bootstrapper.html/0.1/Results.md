### <Project> / Results.md - Functional Testing Summary
#### YourMove Infrastructure (Boilerplate 0.1)
#### Published <Publish date, Day/MM/Year>
##### All rights reserved.

    IMPORTANT NOTICE
    This document is as of the time of this notice being visible, available in DRAFT format only. Please take this as general advice only, and not on a factual basis. Please send any queries through github @MJCD.
    Draft keywords: <Project>, <Publish Date>, <Test, many>

## Field Format

    <TestNumber(Int)>.<URL(Int)>-<When(Int)>-<Callback(Int)>-<Abstract Logic(Int)>.<Keywords>

## Version milestone: 0.1 **ACHIEVED*

1. 0.0.0.0.	No Resources Variable
2. 0.0.0.0.	Empty Resources

## Glossary

* "Unmanaged Resource" - Has no defined Where conditionals or Callbacks, only one or more URL's.
* "Basic Managed Resource" - Presents one conditional for one or more URL's.
* "Complex Managed Resource" - Presents more than one conditional for one or more URL's.
* "Abstracts" are functions to be run as part of the chain without any resource.

## Tests

1. No resources array

### Expected..
The page hangs and will never load anything.

### Results..
- No output -

### **Success**

2. Empty resources array

### Expected..
Bootloader will recognize an empty array and perform no actions.

### Results..
Bootstrapper.html/Specification.md:3.2		 Bootstrapper is run with Resources.. [] Bootstrapper.html:193
Bootstrapper.html/Specification.md:5		 Bootstrapper internal storage is cleared Bootstrapper.html:12
Bootstrapper.html/Specification.md:5		 Failed, already running or no resources given.. [] Bootstrapper.html:19

### **Success**

#### - YourMove Infrastructure