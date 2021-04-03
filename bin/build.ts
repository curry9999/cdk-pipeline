#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BuildStack } from '../lib/build';

const app = new cdk.App();
new BuildStack(app, 'Build', {
  env: {
    region: 'ap-northeast-1'
  },
  owner: 'curry9999',
  repo: 'cdk-pipeline'
});
