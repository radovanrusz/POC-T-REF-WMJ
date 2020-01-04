# Warehouse journal service

Warehouse journal service is part of model application. Its responsibility is to consume events from Kafka warehouse-movement topic.
Messages are stored in MongoDB (part of service). WMJ exposes REST interface for obtaining of journal data.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Implementation requires Nodejs and Docker.

### Installing

* Clone repository.
* Run npm install (to get all dependencies).

Service requires Kafka and MongoDB. In case that mentioned services are installed and running locally, it is possible to to connect them directly (by specification in configuration files). Otherwise docker images can be used (used in further description).

#### Running in dev mode

* Make sure that Kafka and Mongo db is running. If not start containers by running 'docker-compose -f docker-compose-services.yml up -d'.
* If Kafka topic does not exists it can be created and initial messages can be proviced executing 'npm run producer' (inserts data from mockdata/initialMessagesForKafka.json).
* Use 'npm run dev command' to start the application

#### Running in test mode

Automated test and eslint check is implemented. Tests requires backend services to be running.
* Use 'npm run pretest' for eslint check.
* Use 'npm run test' for executing test suite.

#### Running in docker

Whole application can run in Docker containers. Steps to setup application in containers:
* Execute 'docker-compose -f docker-compose-services.yml up -d' to run Kafka and MongoDB container (running as daemon on background).
* Create topic and prepare initial data with 'npm run producer'.
* Execute 'docker-compose -f docker-compose-app.yml up' to start WMJ service container.


### Configurations

Following configurations are part of project:
* env config - connection to db, Kafka and exposed ports.
* docker-compose-*.yml - docker configurations file.

## Exposed APIs and example of calls

/journal  
GET method to obtain journal messages.  
Examples:  
curl.exe wmjURL/journal  
curl.exe wmjURL/journal?mvm1=wh4  
