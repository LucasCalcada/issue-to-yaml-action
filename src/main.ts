import * as core from '@actions/core'
import { getIssue } from './issue.js'
import { parseIssue } from './parser.js'
import { stringify } from 'yaml'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const issue: number = Number.parseInt(core.getInput('issue_id'))

    core.debug(`Requesting issue ${issue} ...`)

    const issueBody = await getIssue(issue)
    core.debug(`Issue body: ${issueBody} ...`)

    const parsedIssue = parseIssue(issueBody as string)
    core.debug(`Parsed issue: ${parsedIssue} ...`)

    core.setOutput('file', stringify(parsedIssue))
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
