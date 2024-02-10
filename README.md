# Twitter Clone

## Repository Owner

- Each group must assign one repository owner
- The repository owner must fork this repository. Only the repository owner should fork the repository
  - This could be done by clicking the "Fork" button on the top right.
- The repository owner must invite their goupmates as collaborators in their fork
  - This could be done by going to Settings>Collaborators>Add people
- The group must use the fork to collaborate on their project. They must commit and push their code in their forks.
- The group must submit the link of the repository of the repository owner in the submission bin

## Getting Started

Follow these steps to set up and run the Twitter Clone project:

1. **Install Node.js**:
   Make sure you have Node.js installed on your system. If not, download and install it from the official website.

2. **Fork and Clone the Repository**:
 
   - Clone your forked repository to your local machine using Git.

3. **Install Dependencies**:

   - Open a terminal and navigate to the cloned repository.
   - Install the API dependencies by running the command:
     ```
     npm run init-api
     ```
   - Install the UI dependencies by running the command:
     ```
     npm run init-ui
     ```

4. **Run the API**:

   - Start the API server by running:
     ```
     npm run start-api
     ```
   - Visit `http://localhost:3000` in your web browser to check if the API is up and running.
   - Visit `http://localhost:3000/docs` in your web browser to see the documentation of the API.

5. **Run the UI**:

   - Open a new terminal window (keep the API terminal running).
   - Start the UI development server with:
     ```
     npm run start-ui
     ```
   - Visit `http://127.0.0.1:8080` in your web browser to see if the UI is working.

6. **Start Developing**:
   - Begin working on the UI in the `TwitterCloneUi` folder.
   - Add your HTML, CSS, and JS files to build the Twitter Clone interface.

Remember: **Do not modify the `TwitterCloneApi` folder**; it contains essential API code.

Happy coding! 🚀🐦
