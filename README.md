# Crypto Exchange Angular SPA

This project is an Angular Single Page Application (SPA) for cryptocurrency exchange. It allows users to log in, view cryptocurrency data through tabs, and perform various operations related to cryptocurrency.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Folder Structure](#folder-structure)
6. [APIs Used](#apis-used)
7. [Testing](#testing)
8. [Notes](#notes)
9. [Contributing](#contributing)
10. [License](#license)

## Features

1. **Login Screen:**

   - Users need to enter a username and password to access the application.

2. **Tabs Structure:**

   - The application has a tabbed layout, with the last tab denoted by a "+" sign.
   - Clicking on the "+" tab opens a popup where users can add a new cryptocurrency selected from a dropdown list.

3. **Chart Display:**
   - The active tab displays the weekly exchange rate chart for the selected cryptocurrency against USD.

## Technologies Used

- Angular 16+
- Angular CLI
- Angular Bootstrap or Angular Material
- [CoinAPI](https://docs.coinapi.io/) for cryptocurrency market data

## Installation

**Install dependencies:**

```bash
npm install

```

## Run the application

```bash
npm start

```

## Usage

1. Access the application in your browser.
2. Enter your username and password to log in.
3. Explore the tabbed layout to view cryptocurrency data and perform operations.

## Folder Structure

```bash
crypto-exchange-angular-spa/
|-- src/
| |-- app/
| |-- components/
| |-- services/
| |-- ...
|-- ...

```

## APIs Used

**CoinAPI:**

1. REST API
2. WebSocket API

## Testing

During development, it is advisable to mock the APIs for testing, as the number of daily requests may be limited.

## Notes

Ensure that the application state is cleanly managed and utilize Angular and RxJS tools for efficient handling.
Prioritize code organization, reuse, formatting, and adhere to best practices.

## License

This project is licensed under the **MIT** License.
