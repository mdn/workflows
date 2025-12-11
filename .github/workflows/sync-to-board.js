const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const REPOS = [
  'fred', 'content', 'rari', 'browser-compat-data', 'mdn-http-observatory',
  'webextensions-examples', 'web-components-examples', 'houdini-examples',
  'dom-examples', 'js-examples', 'webaudio-examples', 'express-locallibrary-tutorial',
  'django-locallibrary-tutorial', 'webassembly-examples', 'pwa-examples',
  'interactive-examples', 'css-examples', 'beginner-html-site',
  'beginner-html-site-styled', 'django-diy-blog', 'todo-vue', 'html-examples'
];

const LABELS = ['help wanted', 'good first issue', 'accepting pr', 'accepting prs', 'PR welcome'];

let PROJECT_ID = null;

async function getProjectId() {
  const result = await octokit.graphql(`
    query {
      organization(login: "mdn") {
        projectV2(number: 25) {
          id
        }
      }
    }
  `);
  return result.organization.projectV2.id;
}

async function addToProject(issueNodeId) {
  try {
    await octokit.graphql(`
      mutation {
        addProjectV2ItemById(input: {
          projectId: "${PROJECT_ID}"
          contentId: "${issueNodeId}"
        }) {
          item { id }
        }
      }
    `);
    return true;
  } catch (error) {
    if (!error.message.includes('already exists')) {
      console.log(`${error.message}`);
    }
    return false;
  }
}

async function syncRepo(repo) {
  console.log(`\n ${repo}`);
  let added = 0;

  for (const label of LABELS) {
    try {
      const { data } = await octokit.issues.listForRepo({
        owner: 'mdn',
        repo,
        labels: label,
        state: 'open',
        per_page: 100
      });

      for (const issue of data) {
        if (!issue.pull_request) {
          const success = await addToProject(issue.node_id);
          if (success) {
            console.log(`#${issue.number} - ${issue.title.substring(0, 50)}`);
            added++;
          }
          await new Promise(r => setTimeout(r, 100));
        }
      }
    } catch (error) {
      if (error.status === 404) {
        console.log(`Repository not found`);
        break;
      }
    }
  }

  return added;
}

async function main() {
  console.log('MDN Contributor Board Sync\n');

  console.log('Getting project...');
  PROJECT_ID = await getProjectId();
  console.log('Connected to project\n');

  let totalAdded = 0;
  for (const repo of REPOS) {
    const added = await syncRepo(repo);
    totalAdded += added;
  }

  console.log(`\n Done! Added ${totalAdded} new issues`);
}

main().catch(console.error);