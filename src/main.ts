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
    const issue: number = Number.parseInt(core.getInput('issueId'))

    core.debug(`Requesting issue ${issue} ...`)

    const issueBody = await getIssue(issue)
    const parsedIssue = parseIssue(issueBody as string)

    core.setOutput('file', stringify(parsedIssue))
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
