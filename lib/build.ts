import { Stack, StackProps, Construct } from '@aws-cdk/core';
import {
  Cache,
  LinuxBuildImage,
  LocalCacheMode,
  Project,
  Source
} from '@aws-cdk/aws-codebuild';

interface BuildStackProps extends StackProps {
  /**
   * GitHub Repository Owner Name.
   */
  owner: string;
  /**
   * GitHub Repository.
   */
  repo: string;
}

export class BuildStack extends Stack {
  constructor(scope: Construct, id: string, props: BuildStackProps) {
    super(scope, id, props);

    const buildProject = new Project(this, 'build', {
      badge: true,
      source: Source.gitHub({
        owner: props.owner,
        repo: props.repo,
        webhook: true
      }),
      cache: Cache.local(LocalCacheMode.DOCKER_LAYER, LocalCacheMode.CUSTOM),
      environment: {
        buildImage: LinuxBuildImage.STANDARD_3_0
      }
    });
  }
}
