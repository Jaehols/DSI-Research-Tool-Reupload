# Defence Science Institute: Academic Analysis

## Latest Release

[SWEN90014_DS_Quokka_Final_Submission](https://github.com/Unimelb-audahm/ds-quokka/releases/tag/SWEN90014_DS_Quokka_Final_Submission)

## Development Team

James Hollingsworth,
Haiyao Yan,
Emaad Beig,
Abhi Bajaj,
Xi Zhao

## Main Functionality

This application serves to search, parse and present information about academic articles, authors, and institutions. This is a front to back end application that handles all aspects sans the aggregation of academic articles which is handled by an external service

## Technology Stack

### Front End

The front end is implemented through Javascript using Vue3 as the framework and Element+ as our primary component library.
Multiple front end libraries are utilised within the Vue3 framework.

### Back End

Backend is implemented in Nodejs.

### Server

There is no server implementation in the source code however the backend is designed to work with a MongoDB database. Any database can be used however adjustments to the backend will be required.

## Development Configuration

### Prerequisites

#### NodeJS:

NodeJS can be downloaded from the official website at: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

#### Scopus API Access

A **Scopus API key** can be self provisioned by DSI through the [Scopus Portal](https://dev.elsevier.com/). DSI will also need to contact Scopus and have an **Institutional Token** provisioned to grant them additional access. The additional access is **mandatory** for the DS Quokka application. DSI can contact Scopus via the online [support form](https://service.elsevier.com/app/contact/supporthub/scopus/).

#### MongoDB:

MongoDB database setup can me accessed here: [MongoDB Setup](https://www.mongodb.com/docs/atlas/getting-started/?tck=docs_driver_nodejs) ensure you save your connection string for use later.

### Setup

#### Server

1.  Navigate to the source-code directory `ds-quokka/server/` through the command line.
2.  Open the `.env` file and provide values for each of the following variables:
    - SCOPUS_API_KEY: This value is based on the **self-provisioned Scopus API Key** as per the above pre-requisites
    - SCOPUS_INST_TOKEN: This value is based on the **Scopus** **Institutional Token** and will need to be provisioned by Scopus through the support form as per the above pre-requisites.
    - SEARCH_DB: This value is the MongoDB connection string and can be provisioned as per the above Deployment Steps for MongoDB
3.  Navigate to the directory `ds-quokka/server/` through the command line.
4.  Run the command `npm install.`
5.  Run the command `npm run dev` to run the server.

#### Client

1.  Navigate to the directory `ds-quokka/client/client/` through the command line.
2.  Run the command `npm install.`
3.  Run the command `npm run dev`
