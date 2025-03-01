import * as core from '@actions/core'
import * as gh from '@actions/github'

const token = core.getInput('token', { required: true })
const octokit = gh.getOctokit(token)

export async function getIssue(id: number) {
  const response = await octokit.rest.issues.get({
    ...gh.context.repo,
    issue_number: id
  })

  if (response.status !== 200) {
    throw new Error('Unexpected response from issue request')
  }
  return response.data.body
}
