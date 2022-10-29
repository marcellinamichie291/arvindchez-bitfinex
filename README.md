# Setup project:

    - Rename the .env.example to .env
    - Update the API_KEY and API_SECRET to a valid key and secret

# To run server:

npm start

# To run a client:

npm start

# functionality available for client:

    - Function to get the ticket information => getTicker
    - Function to get the account information for a user => getAccountInfo
    - Function to create a new order => createNewOrder
    - Function to get the order book(order history) => getOrderHistory

# Missing features:

    - Unit tests for the server,client and the helper methods

# Code refactoring:

    - Much clean code design pattern can be implemented to decide the worker instead of if/else condition
    - Project structuring can be improved

# Known issues:

    - createNewOrder - Bad request error(400). Need to troubleshoot to find the cause as I ran out of time
    - getOrderHistory - Bad request error(400). Need to troubleshoot to find the cause as I ran out of time
