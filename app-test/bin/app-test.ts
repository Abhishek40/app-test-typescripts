#!/usr/bin/env node
// import * as cdk from 'aws-cdk-lib';
// import { AppTestStack } from '../lib/app-test-stack';

// const app = new cdk.App();
// new AppTestStack(app, 'AppTestStack');

import * as cdk from 'aws-cdk-lib';
//import { AppTestStack } from '../lib/app-test-stack';
import {AppTestPipelineStack} from '../lib/pipeline-stack';

const app = new cdk.App();
new AppTestPipelineStack(app, 'AppTestStack');
