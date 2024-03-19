import gitCommitInfo from 'git-commit-info';
import { inc } from 'semver';
import { execFile } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

const versionBump = async () => {
  const commits = gitCommitInfo({});

  const lastCommitMessage = commits.message;
  const lastCommitMessageTriggerString = lastCommitMessage.split(':')[0];
  let releaseType = '';

  console.log('last commit message', lastCommitMessage);

  switch (true) {
    case ['doc-only'].includes(lastCommitMessageTriggerString):
      releaseType = '';
      break;

    case lastCommitMessage.toLocaleLowerCase().search('breaking-change') > 0:
      releaseType = 'major';
      break;

    case ['fix', 'style', 'docs', 'test', 'ci', 'chore'].includes(lastCommitMessageTriggerString):
      releaseType = 'patch';
      break;

    case ['feat', 'pref', 'build'].includes(lastCommitMessageTriggerString):
      releaseType = 'minor';
      break;

    default:
      releaseType = 'prepatch';
      break;
  }
  console.log('release type', releaseType);

  const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'));
  const newVersion = inc(pkg.version, releaseType);
  console.log('bump version to ', newVersion);
  if (newVersion) execFile('npm', ['pkg', 'set', `version=${newVersion}`]);

  process.exit(0);
};

versionBump();
