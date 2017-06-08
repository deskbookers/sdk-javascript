# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## 2.2.1 - 2017-06-08
### Fixed
- URL encoding in IE11 and lower

## 2.2.0 - 2017-05-29
### Added
- `Availability` resource

## 2.1.3 - 2017-05-23
### Fixed
- Removed old dist files before publishing

## 2.1.2 - 2017-05-23
### Fixed
- Encoded slashes in `report` method parameters on `Actions` resource

## 2.1.1 - 2017-05-23
### Fixed
- Attached `Actions` resource to global class

## 2.1.0 - 2017-05-23
### Added
- `setTimezone`, `setLanguage` and `preferences` methods to `Account` resource
- `Actions` resource with `report` method

## 2.0.1 - 2017-05-12
### Added
- `createdAt` attribute to `Account` retrieval method

## 2.0.0 - 2017-05-12
### Changed
- Rename `list` method to `retrieve` in Events resource

### Added
- `list` method (list all) to Events resource
- `markAllAsRead` method to Events resource

## 1.3.1 - 2017-04-25
### Fixed
- `POST` request bug

## 1.3.0 - 2017-04-19
### Changed
- Added `backoffice` parameter to `account.login`

### Added
- Account method `menu()`

## 1.2.0 - 2017-04-11
### Changed
- Pass `mode` and `credentials` options to Fetch
- Switched `Promise` for `async` functions

## 1.1.0 - 2017-03-27
### Added
- Account methods `forgot()` and `urgency()`

## 1.0.0 - 2017-03-20
### Added
- Account methods `context()` and `retrieve()`
- Events resource with corresponding methods

### Changed
- Renamed `Users` resource to `Account`

### Fixed
- Tests
