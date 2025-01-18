# Uber-like Microservices Architecture

A scalable Node.js microservices-based ride-sharing platform using Express, RabbitMQ, PostgreSQL, and AWS infrastructure.

![Architecture Diagram](uber.png)

## System Architecture

### Microservices
- **API Gateway**: Express-based gateway for routing and authentication
- **User Service**: Handles user management and authentication
- **Ride Service**: Manages ride requests and driver matching
- **Capital Service**: Processes payments and financial transactions

### Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Message Broker**: RabbitMQ
- **Database**: PostgreSQL
- **Caching**: Redis
- **Containerization**: Docker & Docker Compose
- **Cloud**: AWS (ECS, RDS, ElastiCache)
- **API Documentation**: Swagger/OpenAPI

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- AWS CLI configured
- PostgreSQL
- RabbitMQ

## Quick Start

1. Clone the repository
  
 - ` git clone https://github.com/Ashisharjun12/uber-microservice.git`

 
The key is to always specify the language/format after the opening triple backticks. Here are the common ones to use:

- `bash` for terminal commands
- `yaml` for Docker/configuration files
- `env` for environment variables
- `http` for API endpoints
- `javascript` or `js` for JavaScript code
- `json` for JSON data
- `sql` for database queries