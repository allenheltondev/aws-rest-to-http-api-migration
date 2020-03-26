# AWS REST to HTTP API Migration Example #
[![Twitter][1.1]][1] [![GitHub][2.1]][2] [![LinkedIn][3.1]][3]
## Description ##
This example is built to demonstrate how to take your existing REST APIs and move them over to HTTP. It illustrates the differences between the implementation of both kinds of APIs. For a detailed walkthrough, reference the [article on Medium](https://medium.com/better-programming/how-to-migrate-your-rest-api-to-the-new-http-api-in-aws-2e986c326ce0).

## AWS Resources ##
There are two CloudFormation templates contained in this repo. One that build and deploys a REST API, and another that deploys an HTTP API. Both stacks deploy the same resources as outlined below:

* **1 x Public API** (API Gateway)
* **1 x NoSQL Table** (DynamoDB)
* **4 x CRUD Functions** (Lambda)
* **4 x Roles with Policies** (IAM)

## Prerequisites ##
In order to properly run and deploy this app, you must perform the following
1. [Setup an AWS account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
2. [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
3. [Configure the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) to use your account
6. [Install Git](https://git-scm.com/downloads)

## Setup ##
1. Clone the repository to your local machine
2. In the root **package.json**, change **REPLACEME** with the name of an S3 bucket to create in your account.
  a. S3 bucket names in AWS have to be globally unique, so be sure to use something nobody has used before
3. Run `npm run provision-bucket` to create the S3 bucket in your AWS account
4. In the **HTTP-template.yaml** file, change **REPLACEME** with the name of your bucket
5. In the **REST-template.yaml** file, change **REPLACEME** with the name of your bucket

## Deployment ##
You are able to deploy the solution any way you'd like, but included in the root package.json is a script that will automatically build, package, and deploy the solution to AWS for you. Just run the following command to deploy

**REST API**
```
npm run deploy-rest
```

**HTTP API**
```
npm run deploy-http
```

## Request ##
If you are able to contribute back, I'd appreciate help on parameterizing the package.json to use a config object so users don't have to replace REPLACEME in so many places. I'd like to use a configuration variable in the scripts like `$npm_package_config_bucketname`, but I have been unsuccessful on my Windows machine in getting that to resolve.

[1.1]: http://i.imgur.com/tXSoThF.png
[2.1]: http://i.imgur.com/0o48UoR.png
[3.1]: http://i.imgur.com/lGwB1Hk.png

[1]: http://www.twitter.com/allenheltondev
[2]: http://www.github.com/allenheltondev
[3]: https://www.linkedin.com/in/allen-helton-85aa9650/
