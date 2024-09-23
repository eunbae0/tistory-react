import type { Rule } from 'eslint';

export function report(
  context: Rule.RuleContext,
  messageId: string,
  data: Omit<Rule.ReportDescriptor, 'messageId'>,
) {
  context.report(Object.assign({ messageId }, data) as Rule.ReportDescriptor);
}
