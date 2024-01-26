# JSON Explorer Challenge

## Summary
A component to select keys from a JSON object that returns the keyʼs path


## User Story
Heyflow users can connect an API and need a user-friendly solution to select values from the response.

## Accepted Criteria
- The JSON data is correctly displayed: indention, (curly) brackets, string values, number
values, boolean values, arrays, objects, etc.
- All keys can be interacted with and are highlighted (e.g. color: blue)
- When a user clicks on a key, it shows its path and value:
  - When a user clicks on “date” it shows “res.date” and
    "2021-10-27T07:49:14.896Z"
  - When a user clicks on “hasError” it shows “res.hasError” and “false”
  - When a user clicks on “prop” in the first object in the `fields` array, it shows
  “res.fields[0].prop” and “iban”

## Out of Scope
- An input field that displays the correct value when given a path to the property (as
seen in the video)

## Demo Data
```json
{
    "date": "2021-10-27T07:49:14.896Z",
    "hasError": false,
    "fields": [
        {
          
            "id": "4c212130",
            "prop": "iban",
            "value": "DE81200505501265402568",
            "hasError": false
        }
    ]
}
```
## Installation
1. Open a terminal or command prompt and navigate to the project directory.
2. Run `npm install` to install the project dependencies.

## Running
`npm start` to start the project
