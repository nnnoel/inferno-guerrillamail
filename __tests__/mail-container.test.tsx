import InfernoTestUtils from 'inferno-test-utils'
import MailContainer from '../app/components/mail-container';

it('MailContainer should exist', () => {
  const mailComponent = InfernoTestUtils.renderIntoDocument(
    <MailContainer />
  );
  const predicate = (vNode) => vNode.type === MailContainer;
  const result = InfernoTestUtils.findAllInRenderedTree(mailComponent, predicate);
  expect(result).toBeTruthy();
});