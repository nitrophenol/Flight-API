# Flight API

The Flight Ticket Pricing API is a Node.js application that allows you to retrieve the pricing of flight tickets from a specified source to a destination on a particular date. It uses the SkyScanner API to provide this functionality.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js installed on your machine
- A RapidAPI key for the SkyScanner API (You can get it from [RapidAPI](https://rapidapi.com/))

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/Flight-API.git
   cd Flight-API
   npm install
2. Setting Up Environment Variables
To use your RapidAPI key, you need to set it as an environment variable. Create a .env file in the project directory and add the following line:

    ```bash
      KEY=YOUR_RAPIDAPI_KEY
3. Running the Application
Start the API by running the following command:
    ```bash
        npm start
  
### Make a POST Request
  To use the API, you can make a POST request to the following endpoint using a tool like Postman or any other HTTP client:
  http://localhost:3001/
  with the request body in this format
   ```bash
         {
    "date": "2023-10-26T18:30:00.000Z",
    "destination": "Delhi",
    "start": "Jaipur"
         }


    
