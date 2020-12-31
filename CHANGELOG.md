- v. 1.1.4

  - Version 1 release. Support for objects and arrays being passed in. Under the hood, objects were still being used to manage the state value and the value setter. No abstract key support.

- v. 2.0.0

  - Version 2 release. Support for abstract values now in place. To accomplish this we no longer depend on objects at all and now use a map inside a map. This version also introduces the `complexKeysEnabled` config property which returns only getters and setters and allows a user to use an object as a key for state management

- v. 2.0.1

  - Updates some readme text.

- v. 2.0.2

  - Updates some readme text.

- v. 2.0.3

  - Updates some readme text.

- v. 2.0.4

  - Updates the roll up config to exclude unnecessary files and decrease bundle size

- v. 2.0.5

  - Updates the roll up config

- v. 2.0.6

  - Finally removed examples from build

- v. 2.0.7

  - Added in typings

- v. 2.0.8

  - fixed issue ith typings

- v. 3.0.0

  - converted project to Typescript
  - Added in batching for both regular and abstract keys
  - Added in tests to cover the project

- v. 3.0.1

  - typings were not bundling correctly

- v. 3.0.2

  - corrected failed typings

- v. 3.0.3

  - corrected failed typings

- v. 3.0.4

  - Correct bad link to issues and github

- v. 4.0.0 **_BREAKING CHANGES_**

  - Removes abstract keys feature
  - Adds in better typings support by switching many any typings to unknown, and without abstract keys support the overall typing becomes much more simpler
  - Updates the API to no longer support object based initial state. This is because, the library previously used Object.entries() which can possibly not be executed in the eact same order, which is a requirement of Hooks API. This change eliminates bugs around using integers as keys mixed with strings, and the order of excecution not as expected. To eliminate any confusion, we have moved solely to "Map" format, `[[key, value]]` which will guarantee order of calls.
  - Updates example to be more complex and use much more state than the simple example
  - Adds in a suite of tests to cover the Example, which ends up covering the custom hook itself

- v. 4.0.1
  - updates dependencies to be all dev dependencies
