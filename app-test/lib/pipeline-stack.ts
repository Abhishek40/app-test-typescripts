import * as cdk from 'aws-cdk-lib';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import { Construct } from 'constructs';
import {CodeBuildStep, CodePipeline, CodePipelineSource} from "aws-cdk-lib/pipelines";
import {AppPipelineStage} from './pipeline-stage';

export class AppTestPipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        
        // Creates a CodeCommit repository called 'WorkshopRepo'
        const repo = new codecommit.Repository(this, 'AppTestRepo', {
            repositoryName: "AppTestRepo"
        });
        
        // Pipeline declaration
        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'AppTestPipeline',
            synth: new CodeBuildStep('SynthStep', {
                    input: CodePipelineSource.codeCommit(repo, 'master'),
                    installCommands: [
                        'npm install -g aws-cdk'
                    ],
                    commands: [
                        'npm ci',
                        'npm run build',
                        'npx cdk synth'
                    ]
                }
            )
        });
        
        const deploy = new AppPipelineStage(this, 'Deploy');
        const deployStage = pipeline.addStage(deploy);
    }
}
