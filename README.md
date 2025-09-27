Flat Buddy
Overview
Flat Buddy is a modern web platform designed to help users list and find rental flats as well as discover compatible roommates based on lifestyle and preference filters. The system utilizes a scalable microservice architecture with a powerful and responsive frontend.
Features

Browse Flats - Explore available rental listings with full details.
List Your Property - Landlords or users can list their own flats for rent.

Project Structure

Frontend_project: Contains the client-side application built with JavaScript/React.
BACKEND: Contains the server-side application, likely built with Maven/Java (based on the pom.xml file observed).

Getting Started
Prerequisites

Git
Node.js and npm (for Frontend)
Java Development Kit (JDK) and Maven (for Backend)
Text editor or IDE (e.g., VS Code)

Installation

Clone the Repository
git clone https://github.com/Ram0011/Flat-Buddy.git
cd Flat-Buddy

Setup Frontend

Navigate to the Frontend_project directory:cd Frontend_project

Install dependencies:npm install

Start the development server:npm start

Setup Backend

Navigate to the BACKEND directory:cd ../BACKEND

Build the project:mvn clean install

Run the application (adjust based on your setup, e.g., using a specific command or IDE):mvn spring-boot:run

(Assuming a Spring Boot application; modify if using a different framework.)

Verify

Open your browser and go to http://localhost:3000 (Frontend) and the backend endpoint (e.g., http://localhost:8080, adjust port as needed).

Contributing
Feel free to fork this repository and submit pull requests. Please ensure your code follows the project’s coding standards.
