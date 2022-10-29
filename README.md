# Setup project:

    - Rename the .env.example to .env
    - Update the API_KEY and API_SECRET to a valid key and secret4

# To run the grape

    - Navigate to grenache-grape folder and execute below command
        npm install

    - to start two Grapes and connect them to each other:

        grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
        grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'

# To run the server:

    - Navigate to server folder and execute below commands

            npm install
            npm start

# To run a client:

    - Navigate to client folder and execute below commands

            npm install
            npm start

# functionality available for client:

    - Function to get the ticker information => getTicker
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
