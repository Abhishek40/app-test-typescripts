// import { Duration, Stack, StackProps } from 'aws-cdk-lib';
// import * as sns from 'aws-cdk-lib/aws-sns';
// import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
// import { Construct } from 'constructs';

// export class AppTestStack extends Stack {
//   constructor(scope: Construct, id: string, props?: StackProps) {
//     super(scope, id, props);

//     const queue = new sqs.Queue(this, 'AppTestQueue', {
//       visibilityTimeout: Duration.seconds(300)
//     });

//     const topic = new sns.Topic(this, 'AppTestTopic');

//     topic.addSubscription(new subs.SqsSubscription(queue));
//   }
// }

import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib/core';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Cluster, ContainerImage, TaskDefinition, Compatibility, FargateService } from 'aws-cdk-lib/aws-ecs';

export class AppTestStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    //Create VPC
    const vpc = new Vpc(this, 'ecsDevVpc');
    
    //Create ECS Cluster
    const cluster = new Cluster(this, 'PetClinicCluster', { vpc });
    
    //Define task definition
    const taskDefinition = new TaskDefinition(this, 'petClinicTask', {
        compatibility: Compatibility.FARGATE,
        cpu: '256',
        memoryMiB: '512',
    });
    
    //Add container to task definition
    const container = taskDefinition.addContainer('petClinicContainer', {
        image: ContainerImage.fromRegistry('ikolaxis/petclinic'),
        memoryReservationMiB: 256,
    });
    
    //Create ECS service
    new FargateService(this, 'PetClinicFargateService', {
        cluster,
        taskDefinition,
    });
  }
}
